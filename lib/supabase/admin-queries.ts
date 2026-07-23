import {
  adminCourses as fallbackCourses,
  hasCompleteStudentDocumentation
} from "@/lib/admin-data";
import type {
  AdminCourse,
  RegistrationRequest,
  Student,
  StudentPayment
} from "@/lib/admin-types";
import { calculateAge } from "@/lib/age";
import { getPaymentMonthKey } from "@/lib/payment-utils";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type GroupRow = {
  age_range: string | null;
  days: string | null;
  id: string;
  name: string;
  time: string | null;
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
  status: Student["status"] | null;
  texto_legal_version: string | null;
  tutor_confirmado: boolean | null;
};

type StudentPaymentRow = {
  id: string;
  paid_at: string | null;
  payment_month: string;
  recorded_by: string | null;
  status: string | null;
  student_id: string;
};

type RegistrationRequestRow = {
  address: string | null;
  age: number | null;
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
  status: RegistrationRequest["status"] | null;
  submitted_at: string | null;
  texto_legal_version: string | null;
  tutor_confirmado: boolean | null;
};

function groupRowToCourse(group: GroupRow): AdminCourse {
  return {
    id: group.id,
    title: group.name,
    ageRange: group.age_range ?? group.name,
    days: group.days ?? "",
    time: group.time ?? ""
  };
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

function studentRowToStudent(
  student: StudentRow,
  payments: StudentPayment[] = [],
  currentPaymentMonth = getPaymentMonthKey()
): Student {
  const currentPayment = payments.find(
    (payment) =>
      payment.month === currentPaymentMonth && payment.status === "Pagado"
  );

  return {
    id: student.id,
    fullName: student.full_name,
    age: calculateAge(student.birth_date ?? "") ?? 0,
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
    notes: student.notes ?? "",
    currentPaymentMonth,
    paymentStatus: currentPayment ? "Pagado" : "Pendiente",
    paymentHistory: payments
  };
}

function requestRowToRegistrationRequest(
  request: RegistrationRequestRow
): RegistrationRequest {
  return {
    id: request.id,
    fullName: request.full_name,
    age: calculateAge(request.birth_date ?? "") ?? 0,
    birthDate: request.birth_date ?? "",
    guardian: request.guardian ?? "",
    address: request.address ?? "",
    postalCode: request.postal_code ?? "",
    dniNie: request.dni_nie ?? "",
    phone: request.phone ?? "",
    phone2: request.phone2 ?? "",
    email: request.email ?? "",
    message: request.message ?? "",
    condicionesAceptadas: Boolean(request.condiciones_aceptadas),
    proteccionDatosAceptada: Boolean(request.proteccion_datos_aceptada),
    tutorConfirmado: Boolean(request.tutor_confirmado),
    responsabilidadAceptada: Boolean(request.responsabilidad_aceptada),
    derechosImagen: Boolean(request.derechos_imagen),
    fechaAceptacionLegal: request.fecha_aceptacion_legal ?? "",
    textoLegalVersion: request.texto_legal_version ?? "",
    status: request.status ?? "Pendiente",
    submittedAt: request.submitted_at ?? ""
  };
}

export async function getAdminCourses(): Promise<AdminCourse[]> {
  if (!isSupabaseConfigured()) {
    return fallbackCourses;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("groups")
    .select("id,name,age_range,days,time")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return fallbackCourses;
  }

  return (data as GroupRow[]).map(groupRowToCourse);
}

export async function getAdminStudents(): Promise<Student[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("students")
    .select(
      [
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
      ].join(",")
    )
    .order("full_name", { ascending: true });

  if (error || !data) {
    return [];
  }

  const studentRows = data as unknown as StudentRow[];
  const studentIds = studentRows.map((student) => student.id);
  const currentPaymentMonth = getPaymentMonthKey();
  const paymentsByStudent = new Map<string, StudentPayment[]>();

  if (studentIds.length) {
    const { data: paymentData } = await supabase
      .from("student_monthly_payments")
      .select("id,student_id,payment_month,status,paid_at,recorded_by")
      .in("student_id", studentIds)
      .order("payment_month", { ascending: false });

    (paymentData as unknown as StudentPaymentRow[] | null)?.forEach(
      (payment) => {
        const existing = paymentsByStudent.get(payment.student_id) ?? [];
        existing.push(paymentRowToPayment(payment));
        paymentsByStudent.set(payment.student_id, existing);
      }
    );
  }

  return studentRows.map((student) =>
    studentRowToStudent(
      student,
      paymentsByStudent.get(student.id) ?? [],
      currentPaymentMonth
    )
  );
}

export async function getRegistrationRequests(): Promise<
  RegistrationRequest[]
> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("registration_requests")
    .select(
      [
        "id",
        "full_name",
        "age",
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
    .order("submitted_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as unknown as RegistrationRequestRow[]).map(
    requestRowToRegistrationRequest
  );
}

export function buildAdminDashboardStats(
  students: Student[],
  registrationRequests: RegistrationRequest[]
) {
  return {
    activeStudents: students.filter((student) => student.status === "Activo")
      .length,
    pendingAuthorizations: students.filter(
      (student) => !hasCompleteStudentDocumentation(student)
    ).length,
    pendingRequests: registrationRequests.filter(
      (request) => request.status === "Pendiente"
    ).length,
    studentsInTrial: students.filter((student) => student.status === "En prueba")
      .length
  };
}

export function buildAdminGroupSummaries(
  courses: AdminCourse[],
  students: Student[]
) {
  return courses.map((course) => {
    const courseStudents = students.filter(
      (student) => student.course === course.title
    );

    return {
      active: courseStudents.filter((student) => student.status === "Activo")
        .length,
      id: course.id,
      name: course.title,
      pendingDocuments: courseStudents.filter(
        (student) => !hasCompleteStudentDocumentation(student)
      ).length,
      schedule: `${course.days} · ${course.time}`,
      students: courseStudents,
      total: courseStudents.length,
      trial: courseStudents.filter((student) => student.status === "En prueba")
        .length
    };
  });
}
