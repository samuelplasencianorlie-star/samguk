import type { DocumentStatus, RequestStatus, StudentStatus } from "@/lib/admin-types";

type StatusBadgeProps = {
  status:
    | RequestStatus
    | StudentStatus
    | DocumentStatus
    | "Configurado"
    | "Sin configurar";
};

const statusStyles: Record<StatusBadgeProps["status"], string> = {
  Pendiente: "border-[#E6A500]/20 bg-[#FFF7DF] text-[#805A00]",
  Revisada: "border-[#174EA6]/18 bg-[#EAF1FF] text-[#174EA6]",
  Aceptada: "border-[#1E8E3E]/18 bg-[#EAF7EF] text-[#1E6E35]",
  Aceptadas: "border-[#1E8E3E]/18 bg-[#EAF7EF] text-[#1E6E35]",
  Rechazada: "border-[#8A96A3]/20 bg-[#EEF2F5] text-[#52606E]",
  Activo: "border-[#1E8E3E]/18 bg-[#EAF7EF] text-[#1E6E35]",
  "En prueba": "border-[#174EA6]/18 bg-[#EAF1FF] text-[#174EA6]",
  Baja: "border-[#8A96A3]/20 bg-[#EEF2F5] text-[#52606E]",
  Completo: "border-[#1E8E3E]/18 bg-[#EAF7EF] text-[#1E6E35]",
  Autorizado: "border-[#1E8E3E]/18 bg-[#EAF7EF] text-[#1E6E35]",
  "No autorizado": "border-[#C8102E]/18 bg-[#FFF0F3] text-[#A50D25]",
  Sí: "border-[#1E8E3E]/18 bg-[#EAF7EF] text-[#1E6E35]",
  No: "border-[#C8102E]/18 bg-[#FFF0F3] text-[#A50D25]",
  Pendientes: "border-[#E6A500]/20 bg-[#FFF7DF] text-[#805A00]",
  Falta: "border-[#C8102E]/18 bg-[#FFF0F3] text-[#A50D25]",
  "Falta información": "border-[#C8102E]/18 bg-[#FFF0F3] text-[#A50D25]",
  Configurado: "border-[#1E8E3E]/18 bg-[#EAF7EF] text-[#1E6E35]",
  "Sin configurar": "border-[#C8102E]/18 bg-[#FFF0F3] text-[#A50D25]"
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
