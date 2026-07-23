import { NextRequest, NextResponse } from "next/server";
import type { PostgrestError } from "@supabase/supabase-js";
import { checkAdminAccess } from "@/lib/supabase/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Student, StudentPayment, StudentStatus } from "@/lib/admin-types";
import { calculateAge } from "@/lib/age";
import { LEGAL_CONSENT_VERSION } from "@/lib/legal-consent";
import { getPaymentMonthKey } from "@/lib/payment-utils";

export const runtime = "nodejs";

type StudentPayload = {
  id?: unknown;
  fullName?: unknown;
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

type StudentPaymentRow = {
  id: string;
  paid_at: string | null;
  payment_month: string;
  recorded_by: string | null;
  status: string | null;
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

function nullableText(value: unknown) {
  const normalized = optionalText(value);
  return normalized || null;
}

function bool(value: unknown) {
  return value === true;
}

function imageConsent(value: unknown) {
  return typeof value === "boolean" ? value : null;
}

function paymentRowToPayment(payment: StudentPaymentRow): StudentPayment {
  return {
    id: payment.id,
    month: payment.payment_month.slice(0, 7),
    paidAt: payment.paid_at ?? "",
    recordedBy: payment.recorded_by ?? "",
    status: payment.status === "Pagado" ? "Pagado" : "Pendiente"
  };
}

function rowToStudent(student: StudentRow, payments: StudentPayment[] = []): Student {
  const currentPaymentMonth = getPaymentMonthKey();
  const birthDate = student.birth_date ?? "";
  const currentPayment = payments.find(
    (payment) =>
      payment.month === currentPaymentMonth && payment.status === "Pagado"
  );

  return {
    id: student.id,
    fullName: student.full_name,
    age: calculateAge(birthDate) ?? 0,
    birthDate,
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
    notes: student.notes ?? "",
    currentPaymentMonth,
    paymentStatus: currentPayment ? "Pagado" : "Pendiente",
    paymentHistory: payments
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
  const birthDate = text(payload.birthDate);
  const age = birthDate ? calculateAge(birthDate) : null;
  const status = allowedStatuses.includes(payload.status as StudentStatus)
    ? (payload.status as StudentStatus)
    : "Pendiente";
  const isMinor = age !== null && age < 18;
  const fullName = text(payload.fullName);
  const guardian = optionalText(payload.guardian);
  const acceptanceName = optionalText(payload.acceptanceName);
  const acceptanceRelation = optionalText(payload.acceptanceRelation);
  const condicionesAceptadas = bool(payload.condicionesAceptadas);
  const proteccionDatosAceptada = bool(payload.proteccionDatosAceptada);
  const tutorConfirmado = bool(payload.tutorConfirmado);
  const responsabilidadAceptada = bool(payload.responsabilidadAceptada);
  const presencialConfirmado = bool(payload.presencialConfirmado);
  const errors: string[] = [];

  if (fullName.length < 2) {
    errors.push("Introduce el nombre y los apellidos del alumno.");
  }

  if (
    birthDate &&
    age === null
  ) {
    errors.push("La fecha de nacimiento indicada no es válida.");
  }

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

function hasCompleteLegalAcceptance(
  value: ReturnType<typeof validatePayload>["value"]
) {
  return Boolean(
    value.acceptanceName &&
      value.condicionesAceptadas &&
      value.proteccionDatosAceptada &&
      value.responsabilidadAceptada &&
      value.presencialConfirmado &&
      (!value.isMinor ||
        (value.guardian &&
          value.acceptanceRelation &&
          value.tutorConfirmado))
  );
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

async function getStudentPayments(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  studentId: string
) {
  const { data } = await supabase
    .from("student_monthly_payments")
    .select("id,payment_month,status,paid_at,recorded_by")
    .eq("student_id", studentId)
    .order("payment_month", { ascending: false });

  return ((data as unknown as StudentPaymentRow[] | null) ?? []).map(
    paymentRowToPayment
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

  const legalAcceptanceComplete = hasCompleteLegalAcceptance(value);
  const acceptedAt = legalAcceptanceComplete ? new Date().toISOString() : null;
  const version = text(payload.textoLegalVersion) || LEGAL_CONSENT_VERSION;
  const imageRights = imageConsent(payload.derechosImagen);
  const baseNotes = optionalText(payload.notes);
  const legalTrace = acceptedAt
    ? buildLegalTrace({
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
    : "";

  const { data, error } = await auth.supabase
    .from("students")
    .insert({
      full_name: text(payload.fullName),
      age: value.age,
      birth_date: nullableText(payload.birthDate),
      guardian: nullableText(payload.guardian),
      address: nullableText(payload.address),
      postal_code: nullableText(payload.postalCode),
      dni_nie: nullableText(payload.dniNie),
      group_name: nullableText(payload.course),
      schedule: nullableText(payload.schedule),
      phone: nullableText(payload.phone),
      phone2: nullableText(payload.phone2),
      email: nullableText(payload.email)?.toLowerCase() ?? null,
      status: value.status,
      enrollment_date:
        nullableText(payload.enrollmentDate) ??
        new Date().toISOString().slice(0, 10),
      condiciones_aceptadas: value.condicionesAceptadas,
      proteccion_datos_aceptada: value.proteccionDatosAceptada,
      tutor_confirmado: value.tutorConfirmado,
      responsabilidad_aceptada: value.responsabilidadAceptada,
      derechos_imagen: imageRights,
      fecha_aceptacion_legal: acceptedAt,
      texto_legal_version: acceptedAt ? version : null,
      documentation_complete: legalAcceptanceComplete,
      notes: [baseNotes, legalTrace].filter(Boolean).join("\n\n") || null,
      created_by: auth.user.id,
      updated_by: auth.user.id
    })
    .select(selectStudentColumns())
    .single();

  if (error || !data) {
    return dbErrorResponse(error);
  }

  const savedStudent = data as unknown as StudentRow;

  if (acceptedAt) {
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

  const payments = await getStudentPayments(auth.supabase, savedStudent.id);

  return NextResponse.json({ student: rowToStudent(savedStudent, payments) });
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

    const savedStudent = data as unknown as StudentRow;
    const payments = await getStudentPayments(auth.supabase, savedStudent.id);

    return NextResponse.json({
      student: rowToStudent(savedStudent, payments)
    });
  }

  const { errors, value } = validatePayload(payload);

  if (errors.length) {
    return errorResponse(errors[0]);
  }

  const existingRow = existing as unknown as StudentRow;
  const hasHistoricAcceptance = Boolean(existingRow.fecha_aceptacion_legal);
  const legalAcceptanceComplete = hasCompleteLegalAcceptance(value);
  const acceptedAt = hasHistoricAcceptance
    ? existingRow.fecha_aceptacion_legal
    : legalAcceptanceComplete
      ? new Date().toISOString()
      : null;
  const version = hasHistoricAcceptance
    ? existingRow.texto_legal_version || LEGAL_CONSENT_VERSION
    : text(payload.textoLegalVersion) || LEGAL_CONSENT_VERSION;
  const imageRights = imageConsent(payload.derechosImagen);
  const baseNotes = optionalText(payload.notes);
  const nextNotes = hasHistoricAcceptance
    ? preserveLegalTrace(existingRow.notes, baseNotes)
    : acceptedAt
      ? [
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
          .join("\n\n")
      : baseNotes;

  const { data, error } = await auth.supabase
    .from("students")
    .update({
      full_name: text(payload.fullName),
      age: value.age,
      birth_date: nullableText(payload.birthDate),
      guardian: nullableText(payload.guardian),
      address: nullableText(payload.address),
      postal_code: nullableText(payload.postalCode),
      dni_nie: nullableText(payload.dniNie),
      group_name: nullableText(payload.course),
      schedule: nullableText(payload.schedule),
      phone: nullableText(payload.phone),
      phone2: nullableText(payload.phone2),
      email: nullableText(payload.email)?.toLowerCase() ?? null,
      status: value.status,
      enrollment_date: nullableText(payload.enrollmentDate),
      condiciones_aceptadas: value.condicionesAceptadas,
      proteccion_datos_aceptada: value.proteccionDatosAceptada,
      tutor_confirmado: value.tutorConfirmado,
      responsabilidad_aceptada: value.responsabilidadAceptada,
      derechos_imagen: imageRights,
      fecha_aceptacion_legal: acceptedAt,
      texto_legal_version: acceptedAt ? version : null,
      documentation_complete:
        hasHistoricAcceptance || legalAcceptanceComplete,
      notes: nextNotes || null,
      updated_by: auth.user.id
    })
    .eq("id", id)
    .select(selectStudentColumns())
    .single();

  if (error || !data) {
    return dbErrorResponse(error);
  }

  const savedStudent = data as unknown as StudentRow;

  if (!hasHistoricAcceptance && acceptedAt) {
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

  const payments = await getStudentPayments(auth.supabase, savedStudent.id);

  return NextResponse.json({ student: rowToStudent(savedStudent, payments) });
}
