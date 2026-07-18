import { siteConfig } from "@/lib/site-config";
import type {
  AdminCourse,
  ClubConfigItem,
  RegistrationRequest,
  Student
} from "@/lib/admin-types";

export const adminCourses: AdminCourse[] = [
  {
    id: "curso-1",
    title: "Curso 1",
    ageRange: "Curso 1",
    days: "Lunes · Miércoles · Viernes",
    time: "17:15 a 18:15"
  },
  {
    id: "curso-2",
    title: "Curso 2",
    ageRange: "Curso 2",
    days: "Lunes · Miércoles · Viernes",
    time: "18:20 a 19:20"
  },
  {
    id: "curso-3",
    title: "Curso 3",
    ageRange: "Curso 3",
    days: "Lunes · Miércoles · Viernes",
    time: "19:25 a 20:25"
  },
  {
    id: "curso-4",
    title: "Curso 4",
    ageRange: "Curso 4",
    days: "Lunes · Miércoles · Viernes",
    time: "20:30 a 21:00"
  }
];

export const registrationRequests: RegistrationRequest[] = [];

export const students: Student[] = [];

export const adminNextActions = [
  "Añadir alumno",
  "Revisar inscripciones",
  "Completar datos del club",
  "Ver grupos de entrenamiento"
];

export const clubConfigItems: ClubConfigItem[] = [
  { label: "Nombre del club", value: siteConfig.fullName, status: "Configurado" },
  {
    label: "Teléfono / WhatsApp",
    value: siteConfig.contact.phone,
    status: "Configurado"
  },
  { label: "Email", value: siteConfig.contact.email, status: "Configurado" },
  {
    label: "Dirección",
    value: siteConfig.contact.address,
    status: "Configurado"
  },
  {
    label: "Instagram",
    value: siteConfig.contact.links.instagram,
    status: "Configurado"
  },
  {
    label: "Facebook",
    value: siteConfig.contact.links.facebook,
    status: "Configurado"
  },
  { label: "Cuotas", value: "", status: "Sin configurar" },
  { label: "Texto legal final", value: "", status: "Sin configurar" },
  {
    label: "Imágenes del club",
    value: "Imágenes reales cargadas en la web pública",
    status: "Configurado"
  }
];

export function hasCompleteStudentDocumentation(student: Student) {
  return (
    student.condicionesAceptadas &&
    student.proteccionDatosAceptada &&
    student.tutorConfirmado &&
    student.responsabilidadAceptada &&
    Boolean(student.fechaAceptacionLegal) &&
    Boolean(student.textoLegalVersion) &&
    student.documentationComplete
  );
}

export const adminDashboardStats = {
  pendingRequests: registrationRequests.filter(
    (request) => request.status === "Pendiente"
  ).length,
  activeStudents: students.filter((student) => student.status === "Activo")
    .length,
  studentsInTrial: students.filter((student) => student.status === "En prueba")
    .length,
  pendingAuthorizations: students.filter(
    (student) => !hasCompleteStudentDocumentation(student)
  ).length
};

export const adminGroupSummaries = adminCourses.map((course) => {
  const courseStudents = students.filter(
    (student) => student.course === course.title
  );

  return {
    id: course.id,
    name: course.title,
    schedule: `${course.days} · ${course.time}`,
    students: courseStudents,
    total: courseStudents.length,
    active: courseStudents.filter((student) => student.status === "Activo")
      .length,
    trial: courseStudents.filter((student) => student.status === "En prueba")
      .length,
    pendingDocuments: courseStudents.filter(
      (student) => !hasCompleteStudentDocumentation(student)
    ).length
  };
});
