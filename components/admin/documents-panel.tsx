"use client";

import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/admin/status-badge";
import type { DocumentStatus, Student } from "@/lib/admin-types";

type DocumentsPanelProps = {
  students: Student[];
};

const filterOptions = [
  "Todos",
  "Pendientes",
  "Completos",
  "Sin autorización de imagen",
  "Falta condiciones"
] as const;

type FilterOption = (typeof filterOptions)[number];

function documentStatus(value: boolean) {
  return value ? "Completo" : "Pendiente";
}

function conditionsStatus(value: boolean) {
  return value ? "Aceptadas" : "Pendientes";
}

function acceptedStatus(value: boolean) {
  return value ? "Aceptada" : "Pendiente";
}

function imageRightsStatus(value: boolean | null) {
  if (value === null) {
    return "Pendiente";
  }

  return value ? "Autorizado" : "No autorizado";
}

function hasCompleteDocumentation(student: Student) {
  return (
    student.condicionesAceptadas &&
    student.proteccionDatosAceptada &&
    student.tutorConfirmado &&
    student.responsabilidadAceptada &&
    student.derechosImagen !== null &&
    Boolean(student.fechaAceptacionLegal) &&
    Boolean(student.textoLegalVersion) &&
    student.documentationComplete
  );
}

export function DocumentsPanel({ students }: DocumentsPanelProps) {
  const [filter, setFilter] = useState<FilterOption>("Todos");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (filter === "Pendientes") {
        return !hasCompleteDocumentation(student);
      }

      if (filter === "Completos") {
        return hasCompleteDocumentation(student);
      }

      if (filter === "Sin autorización de imagen") {
        return !student.derechosImagen;
      }

      if (filter === "Falta condiciones") {
        return !student.condicionesAceptadas;
      }

      return true;
    });
  }, [filter, students]);

  const summary = {
    total: students.length,
    completos: students.filter(hasCompleteDocumentation).length,
    pendientes: students.filter((student) => !hasCompleteDocumentation(student))
      .length,
    sinImagen: students.filter((student) => !student.derechosImagen).length
  };

  return (
    <section className="rounded-[16px] border border-[#D8E0E6] bg-white p-5 shadow-[0_22px_64px_rgba(10,37,64,0.055)] sm:p-6">
      <div className="flex flex-col gap-4 border-b border-[#E1E7ED] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
            Documentos y autorizaciones
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#0A2540]">
            Control de condiciones e imagen
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#687586]">
            Revisa condiciones, protección de datos, tutor, responsabilidad e
            imagen de cada alumno.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[420px]">
          {[
            ["Total", summary.total],
            ["Completos", summary.completos],
            ["Pendientes", summary.pendientes],
            ["Sin imagen", summary.sinImagen]
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[12px] border border-[#E1E7ED] bg-[#F8FAFB] px-3 py-3"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#687586]">
                {label}
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#0A2540]">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Filtros de documentos">
        {filterOptions.map((option) => {
          const isActive = filter === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition-[background-color,border-color,color,transform] hover:-translate-y-0.5 ${
                isActive
                  ? "border-[#C8102E] bg-[#C8102E] text-white"
                  : "border-[#D8E0E6] bg-white text-[#0A2540] hover:border-[#174EA6]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-[12px] border border-[#E1E7ED]">
        <div className="hidden grid-cols-[1fr_0.68fr_0.7fr_0.78fr_0.72fr_0.78fr_0.74fr_0.82fr] gap-3 bg-[#F4F7FA] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#687586] xl:grid">
          <span>Alumno</span>
          <span>Grupo</span>
          <span>Condiciones</span>
          <span>Protección de datos</span>
          <span>Tutor confirmado</span>
          <span>Responsabilidad</span>
          <span>Derechos de imagen</span>
          <span>Documentación completa</span>
        </div>

        <div className="divide-y divide-[#E1E7ED]">
          {filteredStudents.length ? (
            filteredStudents.map((student) => (
              <article
                key={student.id}
                className="grid gap-4 px-4 py-4 transition-colors hover:bg-[#F8FAFB] xl:grid-cols-[1fr_0.68fr_0.7fr_0.78fr_0.72fr_0.78fr_0.74fr_0.82fr] xl:items-center"
              >
                <div>
                  <h3 className="font-semibold text-[#0A2540]">
                    {student.fullName}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#687586]">
                    {student.guardian} · {student.phone || "Sin teléfono"}
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#0A2540]">
                  {student.course || "Sin grupo"}
                </p>
                <DocumentCell
                  label="Condiciones"
                  status={conditionsStatus(student.condicionesAceptadas)}
                />
                <DocumentCell
                  label="Protección de datos"
                  status={acceptedStatus(student.proteccionDatosAceptada)}
                />
                <DocumentCell
                  label="Tutor confirmado"
                  status={student.tutorConfirmado ? "Sí" : "No"}
                />
                <DocumentCell
                  label="Responsabilidad"
                  status={acceptedStatus(student.responsabilidadAceptada)}
                />
                <DocumentCell
                  label="Derechos de imagen"
                  status={imageRightsStatus(student.derechosImagen)}
                />
                <DocumentCell
                  label="Documentación completa"
                  status={
                    hasCompleteDocumentation(student)
                      ? "Completo"
                      : student.documentationComplete
                        ? "Pendiente"
                        : "Falta información"
                  }
                />
              </article>
            ))
          ) : (
            <p className="p-8 text-center text-sm text-[#687586]">
              No hay alumnos con este filtro.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function DocumentCell({
  label,
  status
}: {
  label: string;
  status: DocumentStatus;
}) {
  return (
    <div className="flex items-center justify-between gap-3 xl:block">
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#687586] xl:hidden">
        {label}
      </span>
      <StatusBadge status={status} />
    </div>
  );
}
