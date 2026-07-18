import { NextRequest, NextResponse } from "next/server";
import type { PostgrestError } from "@supabase/supabase-js";
import { checkAdminAccess } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Student, StudentStatus } from "@/lib/admin-types";
import { LEGAL_CONSENT_VERSION } from "@/lib/legal-consent";

export const runtime = "nodejs";

type StudentPayload = {
  id?: unknown;
  fullName?: unknown;
  age?: unknown;
  birthDate?: unknown;
  guardian?: unknown;
  address?: unknown;
  postalCode?: unknown;
  dniNie?: unknown;
  course?: unknown;
  schedule?: unknown;
  phone?: unknown;
  phone2?: unknown;
  email?: unknown;
  status?: unknown;
  enrollmentDate?: unknown;
  condicionesAceptadas?: unknown;
  proteccionDatosAceptada?: unknown;
  tutorConfirmado?: unknown;
  responsabilidadAceptada?: unknown;
  derechosImagen?: unknown;
  textoLegalVersion?: unknown;
  notes?: unknown;
  acceptanceName?: unknown;
  acceptanceRelation?: unknown;
  presencialConfirmado?: unknown;
  deactivate?: unknown;
};

type StudentRow = {
  address: string | null;
  age: number | null;
  birth_date: string | null;
  condiciones_aceptadas: boolean | null;
  created_at: string | null;
  derechos_imagen: boolean | null;
  dni_nie: string | null;
  documentation_complete: boolean | null;
  email: string | null;
  enrollment_date: string | null;
  fecha_aceptacion_legal: string | null;
  full_name: string;
  group_name: string | null;
  guardian: string | null;
  id: string;
  notes: string | null;
  phone: string | null;
  phone2: string | null;
  postal_code: string | null;
  proteccion_datos_aceptada: boolean | null;
  responsabilidad_aceptada: boolean | null;
  schedule: string | null;
  status: StudentStatus | null;
  texto_legal_version: string | null;
  tutor_confirmado: boolean | null;
};

type LegalAcceptanceRecord = {
  acceptedAt: string;
  acceptedBy: string;
  adminId: string;
  imageRights: boolean | null;
  isMinor: boolean;
  relation: string;
  studentId: string;
  studentName: string;
  tutorName: string;
  version: string;
};

const allowedStatuses: StudentStatus[] = [
  "Activo",
  "En prueba",
  "Pendiente",
  "Baja"
];

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function bool(value: unknown) {
  return value === true;
}

function imageConsent(value: unknown) {
  return typeof value === "boolean" ? value : null;
}

function rowToStudent(student: StudentRow): Student {
  return {
    id: student.id,
    fullName: student.full_name,
    age: student.age ?? 0,
    birthDate: student.birth_date ?? "",
    guardian: student.guardian ?? "",
    address: student.address ?? "",
    postalCode: student.postal_code ?? "",
    dniNie: student.dni_nie ?? "",
    course: student.group_name ?? "",
    schedule: student.schedule ?? "",
    phone: student.phone ?? "",
    phone2: student.phone2 ?? "",
    email: student.email ?? "",
    status: student.status ?? "Pendiente",
    enrollmentDate:
      student.enrollment_date ?? student.created_at?.slice(0, 10) ?? "",
    condicionesAceptadas: Boolean(student.condiciones_aceptadas),
    proteccionDatosAceptada: Boolean(student.proteccion_datos_aceptada),
    tutorConfirmado: Boolean(student.tutor_confirmado),
    responsabilidadAceptada: Boolean(student.responsabilidad_aceptada),
    derechosImagen: student.derechos_imagen,
    fechaAceptacionLegal: student.fecha_aceptacion_legal ?? "",
    textoLegalVersion: student.texto_legal_version ?? "",
    documentationComplete: Boolean(student.documentation_complete),
    notes: student.notes ?? ""
  };
}

function buildLegalTrace({
  acceptedAt,
  acceptedBy,
  adminId,
  imageRights,
  isMinor,
  relation,
  studentName,
  tutorName,
  version
}: Omit<LegalAcceptanceRecord, "studentId">) {
  const imageLabel =
    imageRights === null
      ? "pendiente de decidir"
      : imageRights
        ? "autorizado"
        : "no autorizado";

  return [
    "Trazabilidad legal presencial:",
    `fecha=${acceptedAt}`,
    `version=${version}`,
    `alumno=${studentName}`,
    `acepta=${acceptedBy}`,
    `relacion=${isMinor ? relation : "Alumno/a mayor de edad"}`,
    `tutor=${isMinor ? tutorName : "No aplica"}`,
    `imagen=${imageLabel}`,
    "proteccion_datos=aceptada",
    "responsabilidad=aceptada",
    "condiciones=aceptadas",
    `admin=${adminId}`
  ].join(" | ");
}

function preserveLegalTrace(existingNotes: string | null, nextNotes: string) {
  const legalTraceMarker = "Trazabilidad legal presencial:";
  const existingTrace = existingNotes
    ?.split("\n\n")
    .find((block) => block.includes(legalTraceMarker));

  if (!existingTrace || nextNotes.includes(legalTraceMarker)) {
    return nextNotes;
  }

  return [nextNotes, existingTrace].filter(Boolean).join("\n\n");
}

async function recordLegalAcceptance(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  record: LegalAcceptanceRecord
) {
  const { error } = await supabase.from("student_legal_acceptances").insert({
    student_id: record.studentId,
    student_name: record.studentName,
    tutor_name: record.isMinor ? record.tutorName : null,
    accepted_by_name: record.acceptedBy,
    accepted_by_relation: record.isMinor
      ? record.relation
      : "Alumno/a mayor de edad",
    is_minor: record.isMinor,
    condiciones_aceptadas: true,
    proteccion_datos_aceptada: true,
    tutor_confirmado: record.isMinor,
    responsabilidad_aceptada: true,
    derechos_imagen: record.imageRights,
    texto_legal_version: record.version,
    accepted_at: record.acceptedAt,
    created_by: record.adminId
  });

  if (error) {
    console.warn("No se pudo registrar el histórico legal del alumno.", {
      code: error.code,
      message: error.message
    });
  }
}

function validatePayload(payload: StudentPayload) {
  const age = Number(payload.age);
  const status = allowedStatuses.includes(payload.status as StudentStatus)
    ? (payload.status as StudentStatus)
    : "Pendiente";
  const isMinor = Number.isFinite(age) && age < 18;
  const fullName = text(payload.fullName);
  const guardian = optionalText(payload.guardian);
  const acceptanceName = text(payload.acceptanceName);
  const acceptanceRelation = optionalText(payload.acceptanceRelation);
  const condicionesAceptadas = bool(payload.condicionesAceptadas);
  const proteccionDatosAceptada = bool(payload.proteccionDatosAceptada);
  const tutorConfirmado = isMinor ? bool(payload.tutorConfirmado) : true;
  const responsabilidadAceptada = bool(payload.responsabilidadAceptada);
  const presencialConfirmado = bool(payload.presencialConfirmado);
  const errors: string[] = [];

  if (!fullName) errors.push("Introduce el nombre completo del alumno.");
  if (!Number.isFinite(age) || age < 3)
    errors.push("Introduce una edad válida.");
  if (!text(payload.birthDate))
    errors.push("Introduce la fecha de nacimiento.");
  if (!text(payload.dniNie)) errors.push("Introduce el DNI/NIE.");
  if (!text(payload.address)) errors.push("Introduce la dirección.");
  if (!text(payload.postalCode)) errors.push("Introduce el código postal.");
  if (!text(payload.phone)) errors.push("Introduce el teléfono principal.");
  if (!text(payload.email)) errors.push("Introduce el email.");
  if (!text(payload.course)) errors.push("Selecciona el grupo.");
  if (!text(payload.enrollmentDate)) errors.push("Introduce la fecha de alta.");
  if (isMinor && !guardian)
    errors.push("Introduce el nombre del padre, madre o tutor legal.");
  if (!acceptanceName)
    errors.push("Introduce el nombre completo de quien acepta.");
  if (isMinor && !acceptanceRelation)
    errors.push("Indica la relación con el alumno.");
  if (!condicionesAceptadas)
    errors.push("Acepta las condiciones generales del club.");
  if (!proteccionDatosAceptada)
    errors.push("Acepta la información de protección de datos.");
  if (isMinor && !tutorConfirmado)
    errors.push("Confirma la autorización del tutor legal.");
  if (!responsabilidadAceptada)
    errors.push("Acepta la responsabilidad asociada a la práctica deportiva.");
  if (!presencialConfirmado)
    errors.push("Confirma presencialmente la aceptación legal.");

  return {
    errors,
    value: {
      acceptanceName,
      acceptanceRelation,
      age,
      condicionesAceptadas,
      guardian,
      isMinor,
      presencialConfirmado,
      proteccionDatosAceptada,
      responsabilidadAceptada,
      status,
      tutorConfirmado
    }
  };
}

function selectStudentColumns() {
  return [
    "id",
    "full_name",
    "age",
    "birth_date",
    "guardian",
    "address",
    "postal_code",
    "dni_nie",
    "group_name",
    "schedule",
    "phone",
    "phone2",
    "email",
    "status",
    "enrollment_date",
    "condiciones_aceptadas",
    "proteccion_datos_aceptada",
    "tutor_confirmado",
    "responsabilidad_aceptada",
    "derechos_imagen",
    "fecha_aceptacion_legal",
    "texto_legal_version",
    "documentation_complete",
    "notes",
    "created_at"
  ].join(",");
}

async function requireAdmin() {
  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;

  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return {
      error: "Supabase no está configurado.",
      status: 503 as const,
      supabase: null,
      user: null
    };
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "No autorizado.", status: 401 as const, supabase, user };
  }

  const { allowed } = await checkAdminAccess(supabase);

  if (!allowed) {
    return { error: "No autorizado.", status: 403 as const, supabase, user };
  }

  return { supabase, user };
}

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

function dbErrorResponse(error: PostgrestError | null) {
  return errorResponse(
    error?.message || "No se ha podido guardar el alumno.",
    500
  );
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();

  if ("error" in auth) {
    return errorResponse(auth.error || "No autorizado.", auth.status);
  }

  const payload = (await request.json().catch(() => ({}))) as StudentPayload;
  const { errors, value } = validatePayload(payload);

  if (errors.length) {
    return errorResponse(errors[0]);
  }

  const acceptedAt = new Date().toISOString();
  const version = text(payload.textoLegalVersion) || LEGAL_CONSENT_VERSION;
  const imageRights = imageConsent(payload.derechosImagen);
  const baseNotes = optionalText(payload.notes);
  const legalTrace = buildLegalTrace({
    acceptedAt,
    acceptedBy: value.acceptanceName,
    adminId: auth.user.id,
    imageRights,
    isMinor: value.isMinor,
    relation: value.acceptanceRelation,
    studentName: text(payload.fullName),
    tutorName: value.guardian,
    version
  });

  const { data, error } = await auth.supabase
    .from("students")
    .insert({
      full_name: text(payload.fullName),
      age: value.age,
      birth_date: text(payload.birthDate),
      guardian: value.guardian,
      address: text(payload.address),
      postal_code: text(payload.postalCode),
      dni_nie: text(payload.dniNie),
      group_name: text(payload.course),
      schedule: optionalText(payload.schedule),
      phone: text(payload.phone),
      phone2: optionalText(payload.phone2),
      email: text(payload.email).toLowerCase(),
      status: value.status,
      enrollment_date: text(payload.enrollmentDate),
      condiciones_aceptadas: value.condicionesAceptadas,
      proteccion_datos_aceptada: value.proteccionDatosAceptada,
      tutor_confirmado: value.tutorConfirmado,
      responsabilidad_aceptada: value.responsabilidadAceptada,
      derechos_imagen: imageRights,
      fecha_aceptacion_legal: acceptedAt,
      texto_legal_version: version,
      documentation_complete: true,
      notes: baseNotes ? `${baseNotes}\n\n${legalTrace}` : legalTrace,
      created_by: auth.user.id,
      updated_by: auth.user.id
    })
    .select(selectStudentColumns())
    .single();

  if (error || !data) {
    return dbErrorResponse(error);
  }

  const savedStudent = data as unknown as StudentRow;

  await recordLegalAcceptance(auth.supabase, {
    acceptedAt,
    acceptedBy: value.acceptanceName,
    adminId: auth.user.id,
    imageRights,
    isMinor: value.isMinor,
    relation: value.acceptanceRelation,
    studentId: savedStudent.id,
    studentName: text(payload.fullName),
    tutorName: value.guardian,
    version
  });

  return NextResponse.json({ student: rowToStudent(savedStudent) });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();

  if ("error" in auth) {
    return errorResponse(auth.error || "No autorizado.", auth.status);
  }

  const payload = (await request.json().catch(() => ({}))) as StudentPayload;
  const id = text(payload.id);

  if (!id) {
    return errorResponse("No se ha encontrado el alumno.");
  }

  const { data: existing, error: existingError } = await auth.supabase
    .from("students")
    .select(selectStudentColumns())
    .eq("id", id)
    .single();

  if (existingError || !existing) {
    return dbErrorResponse(existingError);
  }

  if (payload.deactivate === true) {
    const { data, error } = await auth.supabase
      .from("students")
      .update({
        status: "Baja",
        updated_by: auth.user.id
      })
      .eq("id", id)
      .select(selectStudentColumns())
      .single();

    if (error || !data) {
      return dbErrorResponse(error);
    }

    return NextResponse.json({
      student: rowToStudent(data as unknown as StudentRow)
    });
  }

  const { errors, value } = validatePayload(payload);

  if (errors.length) {
    return errorResponse(errors[0]);
  }

  const existingRow = existing as unknown as StudentRow;
  const hasHistoricAcceptance = Boolean(existingRow.fecha_aceptacion_legal);
  const acceptedAt: string = hasHistoricAcceptance
    ? existingRow.fecha_aceptacion_legal || new Date().toISOString()
    : new Date().toISOString();
  const version: string = hasHistoricAcceptance
    ? existingRow.texto_legal_version || LEGAL_CONSENT_VERSION
    : text(payload.textoLegalVersion) || LEGAL_CONSENT_VERSION;
  const imageRights = imageConsent(payload.derechosImagen);
  const baseNotes = optionalText(payload.notes);
  const nextNotes = hasHistoricAcceptance
    ? preserveLegalTrace(existingRow.notes, baseNotes)
    : [
        baseNotes,
        buildLegalTrace({
          acceptedAt,
          acceptedBy: value.acceptanceName,
          adminId: auth.user.id,
          imageRights,
          isMinor: value.isMinor,
          relation: value.acceptanceRelation,
          studentName: text(payload.fullName),
          tutorName: value.guardian,
          version
        })
      ]
        .filter(Boolean)
        .join("\n\n");

  const { data, error } = await auth.supabase
    .from("students")
    .update({
      full_name: text(payload.fullName),
      age: value.age,
      birth_date: text(payload.birthDate),
      guardian: value.guardian,
      address: text(payload.address),
      postal_code: text(payload.postalCode),
      dni_nie: text(payload.dniNie),
      group_name: text(payload.course),
      schedule: optionalText(payload.schedule),
      phone: text(payload.phone),
      phone2: optionalText(payload.phone2),
      email: text(payload.email).toLowerCase(),
      status: value.status,
      enrollment_date: text(payload.enrollmentDate),
      condiciones_aceptadas: value.condicionesAceptadas,
      proteccion_datos_aceptada: value.proteccionDatosAceptada,
      tutor_confirmado: value.tutorConfirmado,
      responsabilidad_aceptada: value.responsabilidadAceptada,
      derechos_imagen: imageRights,
      fecha_aceptacion_legal: acceptedAt,
      texto_legal_version: version,
      documentation_complete: true,
      notes: nextNotes,
      updated_by: auth.user.id
    })
    .eq("id", id)
    .select(selectStudentColumns())
    .single();

  if (error || !data) {
    return dbErrorResponse(error);
  }

  const savedStudent = data as unknown as StudentRow;

  if (!hasHistoricAcceptance) {
    await recordLegalAcceptance(auth.supabase, {
      acceptedAt,
      acceptedBy: value.acceptanceName,
      adminId: auth.user.id,
      imageRights,
      isMinor: value.isMinor,
      relation: value.acceptanceRelation,
      studentId: savedStudent.id,
      studentName: text(payload.fullName),
      tutorName: value.guardian,
      version
    });
  }

  return NextResponse.json({ student: rowToStudent(savedStudent) });
}
