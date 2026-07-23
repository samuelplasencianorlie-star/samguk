export type RequestStatus = "Pendiente" | "Revisada" | "Aceptada" | "Rechazada";

export type StudentStatus = "Activo" | "En prueba" | "Pendiente" | "Baja";

export type MonthlyPaymentStatus = "Pagado" | "Pendiente";

export type DocumentStatus =
  | "Completo"
  | "Aceptada"
  | "Aceptadas"
  | "Autorizado"
  | "No autorizado"
  | "Pendiente"
  | "Pendientes"
  | "Falta"
  | "Falta información"
  | "Sí"
  | "No";

export type AdminCourse = {
  id: string;
  title: string;
  ageRange: string;
  days: string;
  time: string;
};

export type LegalConsent = {
  condicionesAceptadas: boolean;
  proteccionDatosAceptada: boolean;
  tutorConfirmado: boolean;
  responsabilidadAceptada: boolean;
  derechosImagen: boolean;
  fechaAceptacionLegal: string;
  textoLegalVersion: string;
};

export type RegistrationRequest = {
  id: string;
  fullName: string;
  age: number;
  birthDate: string;
  guardian: string;
  address: string;
  postalCode: string;
  dniNie: string;
  phone: string;
  phone2: string;
  email: string;
  message: string;
  condicionesAceptadas: boolean;
  proteccionDatosAceptada: boolean;
  tutorConfirmado: boolean;
  responsabilidadAceptada: boolean;
  derechosImagen: boolean;
  fechaAceptacionLegal: string;
  textoLegalVersion: string;
  status: RequestStatus;
  submittedAt: string;
};

export type RegistrationRequestDraft = {
  fullName: string;
  age: string;
  birthDate: string;
  guardian: string;
  address: string;
  postalCode: string;
  dniNie: string;
  phone: string;
  phone2: string;
  email: string;
  message: string;
};

export type Student = {
  id: string;
  fullName: string;
  age: number;
  birthDate: string;
  guardian: string;
  address: string;
  postalCode: string;
  dniNie: string;
  course: string;
  schedule: string;
  phone: string;
  phone2: string;
  email: string;
  status: StudentStatus;
  enrollmentDate: string;
  condicionesAceptadas: boolean;
  proteccionDatosAceptada: boolean;
  tutorConfirmado: boolean;
  responsabilidadAceptada: boolean;
  derechosImagen: boolean | null;
  fechaAceptacionLegal: string;
  textoLegalVersion: string;
  documentationComplete: boolean;
  notes: string;
  currentPaymentMonth: string;
  paymentStatus: MonthlyPaymentStatus;
  paymentHistory: StudentPayment[];
};

export type StudentPayment = {
  id: string;
  month: string;
  status: MonthlyPaymentStatus;
  paidAt: string;
  recordedBy: string;
};

export type ClubConfigItem = {
  label: string;
  value: string;
  status?: "Configurado" | "Sin configurar";
};
