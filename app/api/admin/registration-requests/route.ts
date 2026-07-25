import { NextRequest, NextResponse } from "next/server";
import type { RequestStatus } from "@/lib/admin-types";
import { calculateAge } from "@/lib/age";
import { LEGAL_CONSENT_VERSION } from "@/lib/legal-consent";
import { checkAdminAccess } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type RegistrationRequestRow = {
  address: string | null;
  birth_date: string | null;
  condiciones_aceptadas: boolean | null;
  derechos_imagen: boolean | null;
  dni_nie: string | null;
  email: string | null;
  fecha_aceptacion_legal: string | null;
  full_name: string;
  guardian: string | null;
  id: string;
  message: string | null;
  phone: string | null;
  phone2: string | null;
  postal_code: string | null;
  proteccion_datos_aceptada: boolean | null;
  responsabilidad_aceptada: boolean | null;
  status: RequestStatus | null;
  submitted_at: string | null;
  texto_legal_version: string | null;
  tutor_confirmado: boolean | null;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function nullable(value: string | null | undefined) {
  return value?.trim() || null;
}

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado.", status: 401 as const, supabase, user };
  }

  const access = await checkAdminAccess(supabase);

  if (!access.allowed) {
    return { error: "No autorizado.", status: 403 as const, supabase, user };
  }

  return { supabase, user };
}

function isLegalReady(request: RegistrationRequestRow) {
  const age = calculateAge(request.birth_date ?? "");
  const isMinor = age !== null && age < 18;

  return Boolean(
    request.condiciones_aceptadas &&
      request.proteccion_datos_aceptada &&
      request.responsabilidad_aceptada &&
      typeof request.derechos_imagen === "boolean" &&
      request.fecha_aceptacion_legal &&
      request.texto_legal_version &&
      (!isMinor || request.tutor_confirmado)
  );
}

async function convertRequestToStudent({
  adminId,
  request,
  supabase
}: {
  adminId: string;
  request: RegistrationRequestRow;
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
}) {
  if (!isLegalReady(request)) {
    return {
      error:
        "La solicitud no tiene todas las condiciones legales aceptadas y no puede incorporarse.",
      status: 400
    };
  }

  const birthDate = request.birth_date ?? "";
  const age = calculateAge(birthDate);
  const isMinor = age !== null && age < 18;
  const version = request.texto_legal_version || LEGAL_CONSENT_VERSION;
  const acceptedAt = request.fecha_aceptacion_legal || new Date().toISOString();

  const { data: student, error: studentError } = await supabase
    .from("students")
    .insert({
      full_name: request.full_name,
      age,
      birth_date: nullable(request.birth_date),
      guardian: nullable(request.guardian),
      address: nullable(request.address),
      postal_code: nullable(request.postal_code),
      dni_nie: nullable(request.dni_nie),
      group_name: null,
      schedule: null,
      phone: nullable(request.phone),
      phone2: nullable(request.phone2),
      email: request.email?.toLowerCase() || null,
      status: "Pendiente",
      enrollment_date: new Date().toISOString().slice(0, 10),
      condiciones_aceptadas: true,
      proteccion_datos_aceptada: true,
      tutor_confirmado: isMinor ? Boolean(request.tutor_confirmado) : true,
      responsabilidad_aceptada: true,
      derechos_imagen: request.derechos_imagen,
      fecha_aceptacion_legal: acceptedAt,
      texto_legal_version: version,
      documentation_complete: true,
      notes: nullable(request.message),
      created_by: adminId,
      updated_by: adminId
    })
    .select("id")
    .single();

  if (studentError || !student) {
    console.error("No se pudo convertir la solicitud en alumno.", {
      code: studentError?.code,
      message: studentError?.message
    });
    return {
      error: "No se ha podido incorporar el alumno.",
      status: 500
    };
  }

  const { error: legalError } = await supabase
    .from("student_legal_acceptances")
    .insert({
      student_id: student.id,
      student_name: request.full_name,
      tutor_name: isMinor ? request.guardian : null,
      accepted_by_name: isMinor
        ? request.guardian || request.full_name
        : request.full_name,
      accepted_by_relation: isMinor
        ? "Padre, madre o tutor legal"
        : "Alumno/a mayor de edad",
      is_minor: isMinor,
      condiciones_aceptadas: true,
      proteccion_datos_aceptada: true,
      tutor_confirmado: isMinor ? Boolean(request.tutor_confirmado) : true,
      responsabilidad_aceptada: true,
      derechos_imagen: request.derechos_imagen,
      texto_legal_version: version,
      accepted_at: acceptedAt,
      created_by: adminId
    });

  if (legalError) {
    console.warn("No se pudo registrar el histórico legal de la solicitud.", {
      code: legalError.code,
      message: legalError.message
    });
  }

  return { studentId: student.id };
}

export async function PATCH(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    id?: unknown;
    status?: unknown;
  };
  const id = text(payload.id);
  const status = text(payload.status) as RequestStatus;

  if (!id || !["Aceptada", "Rechazada"].includes(status)) {
    return NextResponse.json(
      { message: "Selecciona aceptar o rechazar la solicitud." },
      { status: 400 }
    );
  }

  try {
    const auth = await requireAdmin();

    if ("error" in auth) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      );
    }

    const { data: existing, error: existingError } = await auth.supabase
      .from("registration_requests")
      .select(
        [
          "id",
          "full_name",
          "birth_date",
          "guardian",
          "address",
          "postal_code",
          "dni_nie",
          "phone",
          "phone2",
          "email",
          "message",
          "condiciones_aceptadas",
          "proteccion_datos_aceptada",
          "tutor_confirmado",
          "responsabilidad_aceptada",
          "derechos_imagen",
          "fecha_aceptacion_legal",
          "texto_legal_version",
          "status",
          "submitted_at"
        ].join(",")
      )
      .eq("id", id)
      .single();

    if (existingError || !existing) {
      return NextResponse.json(
        { message: "No se ha encontrado la solicitud." },
        { status: 404 }
      );
    }

    const existingRequest = existing as unknown as RegistrationRequestRow;

    if (existingRequest.status !== "Pendiente") {
      return NextResponse.json(
        { message: "Esta solicitud ya fue resuelta." },
        { status: 409 }
      );
    }

    if (status === "Aceptada") {
      const conversion = await convertRequestToStudent({
        adminId: auth.user.id,
        request: existingRequest,
        supabase: auth.supabase
      });

      if ("error" in conversion) {
        return NextResponse.json(
          { message: conversion.error },
          { status: conversion.status }
        );
      }
    }

    const { data, error } = await auth.supabase
      .from("registration_requests")
      .update({
        reviewed_at: new Date().toISOString(),
        reviewed_by: auth.user.id,
        status
      })
      .eq("id", id)
      .select("id,status")
      .single();

    if (error || !data) {
      console.error("No se pudo actualizar la solicitud.", {
        code: error?.code,
        message: error?.message
      });
      return NextResponse.json(
        { message: "No se ha podido guardar el estado de la solicitud." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      removed: true,
      status: data.status
    });
  } catch {
    return NextResponse.json(
      { message: "No se ha podido conectar con Supabase." },
      { status: 503 }
    );
  }
}
