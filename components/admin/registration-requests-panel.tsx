"use client";

import { Check, Mail, Phone, Search, ShieldCheck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/admin/status-badge";
import type { RegistrationRequest, RequestStatus } from "@/lib/admin-types";
import { formatAge } from "@/lib/age";

type RegistrationRequestsPanelProps = {
  initialRequests: RegistrationRequest[];
};

function isLegalComplete(request: RegistrationRequest) {
  return (
    request.condicionesAceptadas &&
    request.proteccionDatosAceptada &&
    request.tutorConfirmado &&
    request.responsabilidadAceptada &&
    typeof request.derechosImagen === "boolean" &&
    Boolean(request.fechaAceptacionLegal) &&
    Boolean(request.textoLegalVersion)
  );
}

function imageRightsStatus(value: boolean | null) {
  if (value === null) {
    return "Pendiente";
  }

  return value ? "Autorizado" : "No autorizado";
}

function formatDateTime(value: string) {
  if (!value) {
    return "Pendiente";
  }

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function Field({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#EEF2F5] pb-4">
      <dt className="text-sm font-semibold text-[#0A2540]">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-[#5B6877]">
        {value || "No indicado"}
      </dd>
    </div>
  );
}

function RequestActions({
  disabled,
  onAccept,
  onReject
}: {
  disabled: boolean;
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={onAccept}
        disabled={disabled}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#0A2540] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#174EA6] disabled:cursor-not-allowed disabled:bg-[#8B95A1]"
      >
        <Check size={17} strokeWidth={1.9} aria-hidden="true" />
        Aceptar e incorporar
      </button>
      <button
        type="button"
        onClick={onReject}
        disabled={disabled}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-[#F4B4C0] bg-[#FFF0F3] px-4 text-sm font-semibold text-[#A50D25] transition-colors hover:border-[#C8102E] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <X size={17} strokeWidth={1.9} aria-hidden="true" />
        Rechazar
      </button>
    </div>
  );
}

export function RegistrationRequestsPanel({
  initialRequests
}: RegistrationRequestsPanelProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(initialRequests[0]?.id ?? "");
  const [savingId, setSavingId] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const filteredRequests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return requests.filter((request) =>
      normalizedQuery
        ? [
            request.fullName,
            request.guardian,
            request.phone,
            request.phone2,
            request.email,
            request.dniNie
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        : true
    );
  }, [query, requests]);

  const selectedRequest =
    filteredRequests.find((request) => request.id === selectedId) ??
    filteredRequests[0] ??
    requests[0];

  async function resolveRequest(id: string, status: Extract<RequestStatus, "Aceptada" | "Rechazada">) {
    if (savingId) {
      return;
    }

    setSavingId(id);
    setActionError("");
    setActionSuccess("");

    const response = await fetch("/api/admin/registration-requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    }).catch(() => null);
    const body = (await response?.json().catch(() => null)) as {
      message?: string;
      removed?: boolean;
      status?: RequestStatus;
    } | null;

    if (!response?.ok || !body?.status) {
      setActionError(
        body?.message || "No se ha podido resolver la solicitud. Inténtalo de nuevo."
      );
      setSavingId("");
      return;
    }

    const resolvedRequest = requests.find((request) => request.id === id);
    const nextRequests = requests.filter((request) => request.id !== id);

    setRequests(nextRequests);
    setSelectedId(nextRequests[0]?.id ?? "");
    setActionSuccess(
      status === "Aceptada"
        ? `${resolvedRequest?.fullName ?? "La solicitud"} se ha incorporado como alumno.`
        : `${resolvedRequest?.fullName ?? "La solicitud"} se ha rechazado.`
    );
    setSavingId("");
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[18px] border border-[#D8E0E6] bg-white p-5 shadow-[0_24px_72px_rgba(10,37,64,0.06)] sm:p-6">
        <div className="flex flex-col gap-4 border-b border-[#E1E7ED] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
              Inscripciones
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#0A2540]">
              Solicitudes pendientes
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#687586]">
              Revisa cada preinscripción y decide si entra en la base de alumnos.
            </p>
          </div>

          <label className="relative w-full max-w-sm">
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
              placeholder="Buscar por nombre, tutor o teléfono"
              className="min-h-11 w-full rounded-[8px] border border-[#CAD4DE] bg-white pl-10 pr-3 text-sm outline-none transition-colors focus:border-[#174EA6] focus:ring-2 focus:ring-[#174EA6]/15"
            />
          </label>
        </div>

        {actionError ? (
          <p
            className="mt-4 rounded-[10px] border border-[#C8102E]/20 bg-[#FFF0F3] px-3 py-2 text-sm font-semibold text-[#A50D25]"
            role="alert"
          >
            {actionError}
          </p>
        ) : null}
        {actionSuccess ? (
          <p
            className="mt-4 rounded-[10px] border border-[#1E8E3E]/20 bg-[#EAF7EF] px-3 py-2 text-sm font-semibold text-[#1E6E35]"
            role="status"
          >
            {actionSuccess}
          </p>
        ) : null}

        <div className="mt-5 grid gap-3">
          {filteredRequests.length ? (
            filteredRequests.map((request) => {
              const isSelected = selectedRequest?.id === request.id;

              return (
                <article
                  key={request.id}
                  className={`rounded-[14px] border p-4 transition-colors ${
                    isSelected
                      ? "border-[#174EA6] bg-[#F8FBFF]"
                      : "border-[#E1E7ED] bg-white hover:border-[#CAD4DE]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(request.id);
                      setActionError("");
                      setActionSuccess("");
                    }}
                    className="block w-full text-left"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#0A2540]">
                          {request.fullName}
                        </h3>
                        <p className="mt-1 text-sm text-[#687586]">
                          {formatAge(request.age, request.birthDate)} ·{" "}
                          {formatDateTime(request.submittedAt)}
                        </p>
                      </div>
                      <StatusBadge
                        status={isLegalComplete(request) ? "Completo" : "Falta información"}
                      />
                    </div>
                    <div className="mt-4 grid gap-2 text-sm leading-6 text-[#5B6877]">
                      <p>
                        <span className="font-semibold text-[#0A2540]">
                          Responsable:
                        </span>{" "}
                        {request.guardian || "No aplica"}
                      </p>
                      <p>
                        <span className="font-semibold text-[#0A2540]">
                          Teléfono:
                        </span>{" "}
                        {request.phone}
                      </p>
                      <p>
                        <span className="font-semibold text-[#0A2540]">
                          Imagen:
                        </span>{" "}
                        {imageRightsStatus(request.derechosImagen)}
                      </p>
                    </div>
                  </button>
                  {isSelected ? (
                    <div className="mt-4 border-t border-[#E1E7ED] pt-4">
                      <RequestActions
                        disabled={savingId === request.id}
                        onAccept={() =>
                          void resolveRequest(request.id, "Aceptada")
                        }
                        onReject={() =>
                          void resolveRequest(request.id, "Rechazada")
                        }
                      />
                    </div>
                  ) : null}
                </article>
              );
            })
          ) : (
            <div className="rounded-[14px] border border-dashed border-[#CAD4DE] bg-[#F8FAFB] p-8 text-center">
              <p className="text-sm font-semibold text-[#0A2540]">
                No hay solicitudes pendientes.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#687586]">
                Cuando llegue una preinscripción desde la web aparecerá aquí.
              </p>
            </div>
          )}
        </div>
      </section>

      <aside className="rounded-[18px] border border-[#D8E0E6] bg-white p-5 shadow-[0_24px_72px_rgba(10,37,64,0.06)] sm:p-6">
        {selectedRequest ? (
          <>
            <div className="flex flex-col gap-4 border-b border-[#E1E7ED] pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
                  Revisión
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#0A2540]">
                  {selectedRequest.fullName}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#687586]">
                  Decide si esta persona se incorpora a la base de alumnos.
                </p>
              </div>
              <StatusBadge status="Pendiente" />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {selectedRequest.phone ? (
                <a
                  href={`tel:${selectedRequest.phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-[#D8E0E6] px-3 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#174EA6] hover:text-[#174EA6]"
                >
                  <Phone size={16} strokeWidth={1.8} aria-hidden="true" />
                  Llamar
                </a>
              ) : null}
              {selectedRequest.email ? (
                <a
                  href={`mailto:${selectedRequest.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-[#D8E0E6] px-3 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#174EA6] hover:text-[#174EA6]"
                >
                  <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
                  Email
                </a>
              ) : null}
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Edad"
                value={formatAge(selectedRequest.age, selectedRequest.birthDate)}
              />
              <Field
                label="Fecha de nacimiento"
                value={selectedRequest.birthDate}
              />
              <Field label="DNI/NIE/Pasaporte" value={selectedRequest.dniNie} />
              <Field label="Dirección" value={selectedRequest.address} />
              <Field label="Código postal" value={selectedRequest.postalCode} />
              <Field label="Responsable" value={selectedRequest.guardian} />
              <Field label="Teléfono" value={selectedRequest.phone} />
              <Field label="Teléfono 2" value={selectedRequest.phone2} />
              <Field label="Email" value={selectedRequest.email} />
              <Field
                label="Fecha de solicitud"
                value={formatDateTime(selectedRequest.submittedAt)}
              />
            </dl>

            <section className="mt-5 rounded-[14px] border border-[#E1E7ED] bg-[#F8FAFB] p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={19}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-[#C8102E]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C8102E]">
                    Condiciones y autorizaciones
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#687586]">
                    Consentimiento registrado desde la preinscripción pública.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {[
                  ["Condiciones del club", selectedRequest.condicionesAceptadas ? "Aceptadas" : "Pendientes"],
                  ["Protección de datos", selectedRequest.proteccionDatosAceptada ? "Aceptada" : "Pendiente"],
                  ["Responsabilidad deportiva", selectedRequest.responsabilidadAceptada ? "Aceptada" : "Pendiente"],
                  ["Responsable legal", selectedRequest.tutorConfirmado ? "Sí" : "No"],
                  ["Derecho de imagen", imageRightsStatus(selectedRequest.derechosImagen)]
                ].map(([label, status]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 rounded-[10px] bg-white px-3 py-2 text-xs font-semibold text-[#0A2540]"
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
                    {formatDateTime(selectedRequest.fechaAceptacionLegal)}
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
            </section>

            <div className="mt-6">
              <RequestActions
                disabled={savingId === selectedRequest.id}
                onAccept={() =>
                  void resolveRequest(selectedRequest.id, "Aceptada")
                }
                onReject={() =>
                  void resolveRequest(selectedRequest.id, "Rechazada")
                }
              />
            </div>
          </>
        ) : (
          <div className="rounded-[14px] border border-dashed border-[#CAD4DE] bg-[#F8FAFB] p-8 text-center">
            <p className="text-sm font-semibold text-[#0A2540]">
              Selecciona una solicitud.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
