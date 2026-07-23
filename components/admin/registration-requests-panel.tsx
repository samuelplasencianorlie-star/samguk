"use client";

import { Check, Search, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/admin/status-badge";
import type { RegistrationRequest, RequestStatus } from "@/lib/admin-types";
import { formatAge } from "@/lib/age";

const statusOptions: Array<RequestStatus | "Todas"> = [
  "Todas",
  "Pendiente",
  "Revisada",
  "Aceptada",
  "Rechazada"
];

type RegistrationRequestsPanelProps = {
  initialRequests: RegistrationRequest[];
};

function isLegalComplete(request: RegistrationRequest) {
  return (
    request.condicionesAceptadas &&
    request.proteccionDatosAceptada &&
    request.tutorConfirmado &&
    request.responsabilidadAceptada &&
    request.derechosImagen !== null &&
    Boolean(request.fechaAceptacionLegal) &&
    Boolean(request.textoLegalVersion)
  );
}

function legalStatus(value: boolean) {
  return value ? "Aceptadas" : "Pendientes";
}

function imageRightsStatus(value: boolean | null) {
  if (value === null) {
    return "Pendiente";
  }

  return value ? "Autorizado" : "No autorizado";
}

function formatLegalDate(value: string) {
  if (!value) {
    return "Pendiente";
  }

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function RegistrationRequestsPanel({
  initialRequests
}: RegistrationRequestsPanelProps) {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>("Todas");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(initialRequests[0]?.id ?? "");
  const [savingId, setSavingId] = useState("");
  const [actionError, setActionError] = useState("");

  const filteredRequests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus =
        statusFilter === "Todas" || request.status === statusFilter;
      const matchesQuery = normalizedQuery
        ? [
            request.fullName,
            request.guardian,
            request.phone,
            request.phone2,
            request.email,
            request.dniNie,
            request.address,
            request.postalCode
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        : true;

      return matchesStatus && matchesQuery;
    });
  }, [query, requests, statusFilter]);

  const selectedRequest =
    requests.find((request) => request.id === selectedId) ??
    filteredRequests[0] ??
    requests[0];

  async function updateStatus(id: string, status: RequestStatus) {
    if (savingId) {
      return false;
    }

    setSavingId(id);
    setActionError("");

    const response = await fetch("/api/admin/registration-requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    }).catch(() => null);
    const body = (await response?.json().catch(() => null)) as {
      message?: string;
      status?: RequestStatus;
    } | null;

    if (!response?.ok || !body?.status) {
      setActionError(
        body?.message || "No se ha podido guardar el cambio. Inténtalo de nuevo."
      );
      setSavingId("");
      return false;
    }

    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id ? { ...request, status: body.status! } : request
      )
    );
    setSelectedId(id);
    setSavingId("");
    return true;
  }

  async function convertToStudent(request: RegistrationRequest) {
    const saved = await updateStatus(request.id, "Aceptada");

    if (!saved) {
      return;
    }

    window.sessionStorage.setItem(
      "samguk-registration-to-student",
      JSON.stringify(request)
    );
    router.push("/admin/alumnos#nuevo-alumno");
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
      <section className="rounded-[14px] border border-[#D8E0E6] bg-white p-5 shadow-[0_24px_72px_rgba(10,37,64,0.06)] sm:p-6">
        {actionError ? (
          <p
            className="mb-4 rounded-[10px] border border-[#C8102E]/20 bg-[#FFF0F3] px-3 py-2 text-sm font-semibold text-[#A50D25]"
            role="alert"
          >
            {actionError}
          </p>
        ) : null}
        <div className="flex flex-col gap-4 border-b border-[#E1E7ED] pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
              Inscripciones
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#0A2540]">
              Inscripciones nuevas
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#687586]">
              Personas que han solicitado apuntarse desde la web.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="relative">
              <span className="sr-only">Buscar inscripción</span>
              <Search
                size={17}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7B8794]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar inscripción"
                className="min-h-11 w-full rounded-[8px] border border-[#CAD4DE] bg-white pl-10 pr-3 text-sm outline-none transition-colors focus:border-[#174EA6] focus:ring-2 focus:ring-[#174EA6]/15"
              />
            </label>
            <label>
              <span className="sr-only">Filtrar por estado</span>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as (typeof statusOptions)[number]
                  )
                }
                className="min-h-11 rounded-[8px] border border-[#CAD4DE] bg-white px-3 text-sm font-semibold text-[#0A2540] outline-none transition-colors focus:border-[#174EA6] focus:ring-2 focus:ring-[#174EA6]/15"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[12px] border border-[#E1E7ED]">
          <div className="hidden grid-cols-[0.9fr_0.34fr_0.62fr_0.74fr_0.68fr_0.52fr_0.52fr_0.56fr_0.5fr_0.96fr] gap-3 bg-[#F4F7FA] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#687586] 2xl:grid">
            <span>Alumno</span>
            <span>Edad</span>
            <span>DNI/NIE</span>
            <span>Tutor</span>
            <span>Contacto</span>
            <span>Condiciones</span>
            <span>Imagen</span>
            <span>Documentos</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>

          <div className="divide-y divide-[#E1E7ED]">
            {filteredRequests.length ? (
              filteredRequests.map((request) => (
                <article
                  key={request.id}
                  className="grid gap-4 px-4 py-4 2xl:grid-cols-[0.9fr_0.34fr_0.62fr_0.74fr_0.68fr_0.52fr_0.52fr_0.56fr_0.5fr_0.96fr] 2xl:items-center"
                >
                  <div>
                    <h3 className="font-semibold text-[#0A2540]">
                      {request.fullName}
                    </h3>
                    <p className="mt-1 text-sm text-[#687586]">
                      {request.submittedAt}
                    </p>
                  </div>
                  <p className="text-sm text-[#4F5F70]">
                    {formatAge(request.age, request.birthDate)}
                  </p>
                  <p className="text-sm leading-6 text-[#4F5F70]">
                    {request.dniNie}
                  </p>
                  <p className="text-sm leading-6 text-[#4F5F70]">
                    {request.guardian}
                  </p>
                  <div className="text-sm leading-6 text-[#4F5F70]">
                    <p>{request.phone}</p>
                    {request.phone2 ? (
                      <p className="text-[#687586]">{request.phone2}</p>
                    ) : null}
                    <p className="text-[#687586]">{request.email}</p>
                  </div>
                  <StatusBadge
                    status={legalStatus(request.condicionesAceptadas)}
                  />
                  <StatusBadge
                    status={imageRightsStatus(request.derechosImagen)}
                  />
                  <StatusBadge
                    status={isLegalComplete(request) ? "Completo" : "Pendiente"}
                  />
                  <StatusBadge status={request.status} />
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void updateStatus(request.id, "Aceptada")}
                      disabled={savingId === request.id}
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-[8px] border border-[#D8E0E6] px-3 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#1E8E3E] hover:text-[#1E6E35]"
                    >
                      <Check size={15} strokeWidth={1.9} aria-hidden="true" />
                      Aceptar
                    </button>
                    <button
                      type="button"
                      onClick={() => void updateStatus(request.id, "Rechazada")}
                      disabled={savingId === request.id}
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-[8px] border border-[#D8E0E6] px-3 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#C8102E] hover:text-[#C8102E]"
                    >
                      <X size={15} strokeWidth={1.9} aria-hidden="true" />
                      Rechazar
                    </button>
                    <button
                      type="button"
                      onClick={() => void updateStatus(request.id, "Revisada")}
                      disabled={savingId === request.id}
                      className="inline-flex min-h-10 items-center justify-center rounded-[8px] border border-[#D8E0E6] px-3 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#E6A500] hover:text-[#805A00]"
                    >
                      Pedir datos pendientes
                    </button>
                    <button
                      type="button"
                      onClick={() => void convertToStudent(request)}
                      disabled={savingId === request.id}
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-[8px] bg-[#0A2540] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#174EA6]"
                    >
                      <UserPlus size={15} strokeWidth={1.9} aria-hidden="true" />
                      Convertir
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-[#687586]">
                Todavía no hay solicitudes recibidas en el panel.
              </div>
            )}
          </div>
        </div>
      </section>

      <aside className="rounded-[14px] border border-[#D8E0E6] bg-white p-5 shadow-[0_24px_72px_rgba(10,37,64,0.06)] sm:p-6">
        {selectedRequest ? (
          <>
            <div className="flex items-start justify-between gap-4 border-b border-[#E1E7ED] pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
                  Información
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#0A2540]">
                  {selectedRequest.fullName}
                </h2>
              </div>
              <StatusBadge status={selectedRequest.status} />
            </div>

            <dl className="mt-5 grid gap-4 text-sm">
              {[
                [
                  "Edad",
                  formatAge(selectedRequest.age, selectedRequest.birthDate)
                ],
                [
                  "Fecha de nacimiento",
                  selectedRequest.birthDate || "No indicada"
                ],
                ["DNI/NIE", selectedRequest.dniNie || "No indicado"],
                ["Dirección", selectedRequest.address || "No indicada"],
                [
                  "Código postal",
                  selectedRequest.postalCode || "No indicado"
                ],
                ["Tutor", selectedRequest.guardian || "No indicado"],
                ["Teléfono", selectedRequest.phone],
                ["Teléfono 2", selectedRequest.phone2 || "No indicado"],
                ["Email", selectedRequest.email || "No indicado"],
                ["Fecha de solicitud", selectedRequest.submittedAt],
                ["Mensaje", selectedRequest.message || "Sin mensaje"]
              ].map(([label, value]) => (
                <div key={label} className="border-b border-[#EEF2F5] pb-4">
                  <dt className="font-semibold text-[#0A2540]">{label}</dt>
                  <dd className="mt-1 leading-6 text-[#5B6877]">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-[12px] border border-[#E1E7ED] bg-[#F8FAFB] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C8102E]">
                Autorizaciones y documentos
              </p>
              <div className="mt-3 grid gap-2">
                {[
                  [
                    "Condiciones del club",
                    legalStatus(selectedRequest.condicionesAceptadas)
                  ],
                  [
                    "Protección de datos",
                    selectedRequest.proteccionDatosAceptada ? "Aceptada" : "Pendiente"
                  ],
                  [
                    "Tutor confirmado",
                    selectedRequest.tutorConfirmado ? "Sí" : "No"
                  ],
                  [
                    "Responsabilidad deportiva",
                    selectedRequest.responsabilidadAceptada
                      ? "Aceptada"
                      : "Pendiente"
                  ],
                  [
                    "Derechos de imagen",
                    imageRightsStatus(selectedRequest.derechosImagen)
                  ]
                ].map(([label, status]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 rounded-[9px] bg-white px-3 py-2 text-xs font-semibold text-[#0A2540]"
                  >
                    <span>{label}</span>
                    <StatusBadge status={status as never} />
                  </div>
                ))}
              </div>
              <dl className="mt-4 grid gap-3 border-t border-[#E1E7ED] pt-4 text-sm">
                <div>
                  <dt className="font-semibold text-[#0A2540]">
                    Fecha de aceptación legal
                  </dt>
                  <dd className="mt-1 text-[#5B6877]">
                    {formatLegalDate(selectedRequest.fechaAceptacionLegal)}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#0A2540]">
                    Versión del texto legal aceptado
                  </dt>
                  <dd className="mt-1 break-all text-[#5B6877]">
                    {selectedRequest.textoLegalVersion || "Pendiente"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  void updateStatus(selectedRequest.id, "Revisada")
                }
                disabled={savingId === selectedRequest.id}
                className="min-h-11 rounded-[8px] border border-[#D8E0E6] px-3 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#174EA6] hover:text-[#174EA6]"
              >
                Revisada
              </button>
              <button
                type="button"
                onClick={() =>
                  void updateStatus(selectedRequest.id, "Revisada")
                }
                disabled={savingId === selectedRequest.id}
                className="min-h-11 rounded-[8px] border border-[#D8E0E6] px-3 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#E6A500] hover:text-[#805A00]"
              >
                Pedir datos pendientes
              </button>
              <button
                type="button"
                onClick={() =>
                  void updateStatus(selectedRequest.id, "Aceptada")
                }
                disabled={savingId === selectedRequest.id}
                className="min-h-11 rounded-[8px] bg-[#0A2540] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#174EA6]"
              >
                Aceptar
              </button>
              <button
                type="button"
                onClick={() =>
                  void updateStatus(selectedRequest.id, "Rechazada")
                }
                disabled={savingId === selectedRequest.id}
                className="min-h-11 rounded-[8px] bg-[#C8102E] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#A50D25]"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => void convertToStudent(selectedRequest)}
                disabled={savingId === selectedRequest.id}
                className="min-h-11 rounded-[8px] bg-[#0A2540] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#174EA6] sm:col-span-2"
              >
                Convertir en alumno
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm text-[#687586]">Selecciona una inscripción.</p>
        )}
      </aside>
    </div>
  );
}
