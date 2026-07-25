"use client";

import {
  CheckCircle2,
  ChevronDown,
  FileCheck2,
  Lock,
  ShieldCheck
} from "lucide-react";
import { FormEvent, UIEvent, useMemo, useRef, useState } from "react";
import type { RegistrationRequestDraft } from "@/lib/admin-types";
import { calculateAge } from "@/lib/age";
import {
  LEGAL_CONSENT_VERSION,
  legalConsentSections
} from "@/lib/legal-consent";
import { usePublicLanguage } from "@/components/public/language-switch";
import { publicTranslations } from "@/lib/public-translations";

const initialRequest: RegistrationRequestDraft = {
  fullName: "",
  birthDate: "",
  guardian: "",
  address: "",
  postalCode: "",
  dniNie: "",
  phone: "",
  phone2: "",
  email: "",
  message: ""
};

type FieldErrors = Partial<Record<keyof RegistrationRequestDraft, string>>;
type LegalKey =
  | "conditions"
  | "data"
  | "minor"
  | "responsibility"
  | "facilities"
  | "admission";

const legalCards: Array<{
  acceptLabel: string;
  key: LegalKey;
  sectionIndex: number;
}> = [
  {
    acceptLabel: "Acepto las condiciones del club.",
    key: "conditions",
    sectionIndex: 0
  },
  {
    acceptLabel: "Confirmo la información de protección de datos.",
    key: "data",
    sectionIndex: 1
  },
  {
    acceptLabel: "Confirmo que puedo solicitar la inscripción del menor.",
    key: "minor",
    sectionIndex: 2
  },
  {
    acceptLabel: "Acepto la responsabilidad y seguridad deportiva.",
    key: "responsibility",
    sectionIndex: 3
  },
  {
    acceptLabel: "Acepto el uso responsable de instalaciones y material.",
    key: "facilities",
    sectionIndex: 4
  },
  {
    acceptLabel: "Acepto el derecho de admisión y organización del club.",
    key: "admission",
    sectionIndex: 5
  }
];

const labelClass = "text-sm font-semibold text-[#0A2540]";
const fieldClass =
  "mt-1.5 w-full min-w-0 rounded-[6px] border border-[#CAD4DE] bg-white px-3.5 py-2.5 text-sm text-[#111318] outline-none transition-colors placeholder:text-[#8A96A3] focus:border-[#174EA6] focus:ring-2 focus:ring-[#174EA6]/20";
const errorClass = "mt-1.5 text-xs font-semibold leading-5 text-[#A50D25]";

function validatePhone(value: string) {
  return /^\+?[0-9\s]{6,16}$/.test(value.trim());
}

function validateOptionalPhone(value: string) {
  return !value.trim() || validatePhone(value);
}

function validateOptionalEmail(value: string) {
  return !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPostalCode(value: string) {
  return /^[0-9]{5}$/.test(value.trim());
}

function isValidIdentity(value: string) {
  return value.trim().length >= 5;
}

function FieldError({ error }: { error?: string }) {
  return error ? (
    <p className={errorClass} role="alert">
      {error}
    </p>
  ) : null;
}

function LegalReadCard({
  acceptLabel,
  accepted,
  onAcceptedChange,
  onRead,
  read,
  section
}: {
  acceptLabel: string;
  accepted: boolean;
  onAcceptedChange: (accepted: boolean) => void;
  onRead: () => void;
  read: boolean;
  section: (typeof legalConsentSections)[number];
}) {
  const textRef = useRef<HTMLDivElement>(null);

  function markAsReadIfFinished() {
    const target = textRef.current;

    if (!target) {
      return;
    }

    if (target.scrollHeight <= target.clientHeight + 10) {
      onRead();
      return;
    }

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      onRead();
    }
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const target = event.currentTarget;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      onRead();
    }
  }

  return (
    <section
      className={`rounded-[14px] border bg-white p-4 shadow-[0_18px_44px_rgba(10,37,64,0.05)] transition-colors ${
        accepted
          ? "border-[#B9E4C8]"
          : read
            ? "border-[#B8C8E8]"
            : "border-[#D8E0E6]"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#0A2540]">
            {section.title}
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-[#687586]">
            {section.summary}
          </p>
        </div>
        <span
          className={`inline-flex min-h-8 shrink-0 items-center rounded-full border px-3 text-xs font-semibold ${
            accepted
              ? "border-[#1E8E3E]/20 bg-[#EAF7EF] text-[#1E6E35]"
              : read
                ? "border-[#174EA6]/20 bg-[#EAF1FF] text-[#174EA6]"
                : "border-[#E6A500]/24 bg-[#FFF7DF] text-[#805A00]"
          }`}
        >
          {accepted ? "Aceptado" : read ? "Leído" : "Pendiente"}
        </span>
      </div>

      <details
        className="group mt-4 rounded-[12px] border border-[#E1E7ED] bg-[#F8FAFB]"
        onToggle={(event) => {
          if (event.currentTarget.open) {
            window.requestAnimationFrame(markAsReadIfFinished);
          }
        }}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-3.5 py-3 text-sm font-semibold text-[#0A2540]">
          Abrir y leer texto completo
          <ChevronDown
            size={17}
            strokeWidth={1.8}
            className="transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div
          ref={textRef}
          onScroll={handleScroll}
          className="max-h-48 overflow-y-auto border-t border-[#E1E7ED] px-3.5 py-3 text-sm leading-6 text-[#4F5F70]"
          tabIndex={0}
        >
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </details>

      <label
        className={`mt-4 flex gap-3 rounded-[12px] border px-3.5 py-3 text-sm font-semibold leading-6 ${
          read
            ? "border-[#D8E0E6] bg-white text-[#0A2540]"
            : "border-[#E1E7ED] bg-[#F8FAFB] text-[#7B8794]"
        }`}
      >
        <input
          type="checkbox"
          checked={accepted}
          disabled={!read}
          onChange={(event) => onAcceptedChange(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-[#CAD4DE] accent-[#C8102E] disabled:cursor-not-allowed"
        />
        <span>
          {acceptLabel}
          {!read ? (
            <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#805A00]">
              <Lock size={13} strokeWidth={1.8} aria-hidden="true" />
              Lee hasta el final para poder aceptar.
            </span>
          ) : null}
        </span>
      </label>
    </section>
  );
}

export function RegistrationRequestForm() {
  const language = usePublicLanguage();
  const formCopy = publicTranslations[language].registration.form;
  const [request, setRequest] =
    useState<RegistrationRequestDraft>(initialRequest);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [readLegal, setReadLegal] = useState<Record<LegalKey, boolean>>({
    admission: false,
    conditions: false,
    data: false,
    facilities: false,
    minor: false,
    responsibility: false
  });
  const [acceptedLegal, setAcceptedLegal] = useState<Record<LegalKey, boolean>>({
    admission: false,
    conditions: false,
    data: false,
    facilities: false,
    minor: false,
    responsibility: false
  });
  const imageRightsTextRef = useRef<HTMLDivElement>(null);
  const [imageRightsRead, setImageRightsRead] = useState(false);
  const [imageRights, setImageRights] = useState<boolean | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const age = useMemo(
    () => calculateAge(request.birthDate),
    [request.birthDate]
  );
  const isMinor = age !== null && age < 18;
  const requiredLegalCards = legalCards.filter(
    (card) => card.key !== "minor" || isMinor
  );
  const readRequiredCount = requiredLegalCards.filter(
    (card) => readLegal[card.key]
  ).length;
  const acceptedRequiredCount = requiredLegalCards.filter(
    (card) => acceptedLegal[card.key]
  ).length;

  function updateField(field: keyof RegistrationRequestDraft, value: string) {
    setRequest((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function markImageRightsAsReadIfFinished() {
    const target = imageRightsTextRef.current;

    if (!target) {
      return;
    }

    if (
      target.scrollHeight <= target.clientHeight + 10 ||
      target.scrollTop + target.clientHeight >= target.scrollHeight - 10
    ) {
      setImageRightsRead(true);
    }
  }

  function handleImageRightsScroll(event: UIEvent<HTMLDivElement>) {
    const target = event.currentTarget;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      setImageRightsRead(true);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting || isSubmitted) {
      return;
    }

    const nextErrors: FieldErrors = {};

    if (request.fullName.trim().length < 2) {
      nextErrors.fullName = formCopy.errors.fullName;
    }

    if (!request.birthDate || age === null) {
      nextErrors.birthDate = formCopy.errors.birthDate;
    }

    if (!isValidIdentity(request.dniNie)) {
      nextErrors.dniNie = formCopy.errors.dniNie;
    }

    if (request.address.trim().length < 4) {
      nextErrors.address = formCopy.errors.address;
    }

    if (!isValidPostalCode(request.postalCode)) {
      nextErrors.postalCode = formCopy.errors.postalCode;
    }

    if (isMinor && request.guardian.trim().length < 2) {
      nextErrors.guardian = formCopy.errors.guardian;
    }

    if (!validatePhone(request.phone)) {
      nextErrors.phone = formCopy.errors.phone;
    }

    if (!validateOptionalPhone(request.phone2)) {
      nextErrors.phone2 = formCopy.errors.phone2;
    }

    if (!validateOptionalEmail(request.email)) {
      nextErrors.email = formCopy.errors.email;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    const missingLegal = requiredLegalCards.some(
      (card) => !acceptedLegal[card.key]
    );

    if (missingLegal || !imageRightsRead || imageRights === null) {
      setSubmitError(formCopy.errors.legal);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/registration-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...request,
          condicionesAceptadas: true,
          derechosImagen: imageRights,
          message: "",
          proteccionDatosAceptada: true,
          responsabilidadAceptada: true,
          textoLegalVersion: LEGAL_CONSENT_VERSION,
          tutorConfirmado: isMinor ? true : true
        })
      });
      const body = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setSubmitError(
          body?.message ||
            (language === "en"
              ? "The request could not be sent. Please try again."
              : "No se ha podido enviar la preinscripción. Inténtalo de nuevo.")
        );
        return;
      }

      setIsSubmitted(true);
      setRequest(initialRequest);
    } catch {
      setSubmitError(
        language === "en"
          ? "The request could not be sent. Please try again."
          : "No se ha podido enviar la preinscripción. Inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-full min-w-0 overflow-hidden border border-[#D8E0E6] bg-white p-5 shadow-[0_24px_80px_rgba(10,37,64,0.16)] sm:p-6"
    >
      <div className="mb-5 border-b border-[#E1E7ED] pb-4">
        <p className="section-eyebrow">{formCopy.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#0A2540]">
          Preinscripción
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#687586]">
          Completa los datos del alumno y acepta las condiciones necesarias para
          que el club pueda revisar la incorporación.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[
            "Datos completos del alumno",
            "Condiciones leídas antes de aceptar",
            "Derecho de imagen separado"
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-[10px] border border-[#E1E7ED] bg-[#F8FAFB] px-3 py-2 text-xs font-semibold leading-5 text-[#0A2540]"
            >
              <FileCheck2
                size={15}
                strokeWidth={1.8}
                className="shrink-0 text-[#C8102E]"
                aria-hidden="true"
              />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5">
        <fieldset className="grid min-w-0 gap-3.5 sm:grid-cols-6">
          <legend className="mb-1 text-sm font-semibold text-[#0A2540]">
            Datos del alumno/a
          </legend>
          <label className="min-w-0 sm:col-span-6">
            <span className={labelClass}>{formCopy.fields.fullName}</span>
            <input
              required
              name="fullName"
              type="text"
              autoComplete="name"
              value={request.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.fullName} />
          </label>
          <label className="min-w-0 sm:col-span-3">
            <span className={labelClass}>{formCopy.fields.birthDate}</span>
            <input
              required
              name="birthDate"
              type="date"
              value={request.birthDate}
              onChange={(event) => updateField("birthDate", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.birthDate} />
          </label>
          <label className="min-w-0 sm:col-span-3">
            <span className={labelClass}>DNI / NIE / Pasaporte</span>
            <input
              required
              name="dniNie"
              type="text"
              value={request.dniNie}
              onChange={(event) => updateField("dniNie", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.dniNie} />
          </label>
          <label className="min-w-0 sm:col-span-4">
            <span className={labelClass}>{formCopy.fields.address}</span>
            <input
              required
              name="address"
              type="text"
              autoComplete="street-address"
              value={request.address}
              onChange={(event) => updateField("address", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.address} />
          </label>
          <label className="min-w-0 sm:col-span-2">
            <span className={labelClass}>{formCopy.fields.postalCode}</span>
            <input
              required
              name="postalCode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              value={request.postalCode}
              onChange={(event) => updateField("postalCode", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.postalCode} />
          </label>
        </fieldset>

        <fieldset className="grid min-w-0 gap-3.5 sm:grid-cols-6">
          <legend className="mb-1 text-sm font-semibold text-[#0A2540]">
            Contacto
          </legend>
          {request.birthDate ? (
            <div className="sm:col-span-6 rounded-[12px] border border-[#D8E0E6] bg-[#F8FAFB] px-3.5 py-3 text-sm leading-6 text-[#4F5F70]">
              {isMinor
                ? "Alumno menor de edad: debe constar padre, madre, tutor legal o persona responsable."
                : "Alumno mayor de edad: el responsable legal no es obligatorio."}
            </div>
          ) : null}
          {isMinor ? (
            <label className="min-w-0 sm:col-span-6">
              <span className={labelClass}>
                Padre, madre, tutor legal o persona responsable
              </span>
              <input
                required
                name="guardian"
                type="text"
                autoComplete="name"
                value={request.guardian}
                onChange={(event) => updateField("guardian", event.target.value)}
                className={fieldClass}
              />
              <FieldError error={errors.guardian} />
            </label>
          ) : null}
          <label className="min-w-0 sm:col-span-3">
            <span className={labelClass}>{formCopy.fields.phone}</span>
            <input
              required
              name="phone"
              type="tel"
              autoComplete="tel"
              value={request.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.phone} />
          </label>
          <label className="min-w-0 sm:col-span-3">
            <span className={labelClass}>{formCopy.fields.phone2}</span>
            <input
              name="phone2"
              type="tel"
              value={request.phone2}
              onChange={(event) => updateField("phone2", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.phone2} />
          </label>
          <label className="min-w-0 sm:col-span-6">
            <span className={labelClass}>{formCopy.fields.email}</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={request.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.email} />
          </label>
        </fieldset>

        <section className="rounded-[16px] border border-[#D8E0E6] bg-[#F8FAFB] p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={20}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-[#C8102E]"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-semibold text-[#0A2540]">
                  Condiciones y autorizaciones
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-[#687586]">
                  Lee cada documento hasta el final para activar su aceptación.
                  El derecho de imagen se decide por separado.
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7B8794]">
                  Versión {LEGAL_CONSENT_VERSION}
                </p>
              </div>
            </div>
            <div className="grid min-w-[132px] gap-1 rounded-[12px] border border-[#D8E0E6] bg-white px-3 py-2 text-xs font-semibold text-[#0A2540]">
              <span>
                Leídos: {readRequiredCount}/{requiredLegalCards.length}
              </span>
              <span>
                Aceptados: {acceptedRequiredCount}/{requiredLegalCards.length}
              </span>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {requiredLegalCards.map((card) => {
              const section = legalConsentSections[card.sectionIndex];

              return (
                <LegalReadCard
                  key={card.key}
                  acceptLabel={card.acceptLabel}
                  accepted={acceptedLegal[card.key]}
                  onAcceptedChange={(accepted) =>
                    setAcceptedLegal((current) => ({
                      ...current,
                      [card.key]: accepted
                    }))
                  }
                  onRead={() =>
                    setReadLegal((current) => ({
                      ...current,
                      [card.key]: true
                    }))
                  }
                  read={readLegal[card.key]}
                  section={section}
                />
              );
            })}

            <section className="rounded-[14px] border border-[#D8E0E6] bg-white p-4 shadow-[0_18px_44px_rgba(10,37,64,0.05)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#0A2540]">
                    {legalConsentSections[6].title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#687586]">
                    {legalConsentSections[6].summary}
                  </p>
                </div>
                <span
                  className={`inline-flex min-h-8 shrink-0 items-center rounded-full border px-3 text-xs font-semibold ${
                    imageRights === null
                      ? "border-[#E6A500]/24 bg-[#FFF7DF] text-[#805A00]"
                      : imageRights
                        ? "border-[#1E8E3E]/20 bg-[#EAF7EF] text-[#1E6E35]"
                        : "border-[#C8102E]/18 bg-[#FFF0F3] text-[#A50D25]"
                  }`}
                >
                  {imageRights === null
                    ? "Pendiente"
                    : imageRights
                      ? "Autorizado"
                      : "No autorizado"}
                </span>
              </div>
              <details
                className="group mt-4 rounded-[12px] border border-[#E1E7ED] bg-[#F8FAFB]"
                onToggle={(event) => {
                  if (event.currentTarget.open) {
                    window.requestAnimationFrame(markImageRightsAsReadIfFinished);
                  }
                }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-3.5 py-3 text-sm font-semibold text-[#0A2540]">
                  Abrir y leer texto completo
                  <ChevronDown
                    size={17}
                    strokeWidth={1.8}
                    className="transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div
                  ref={imageRightsTextRef}
                  onScroll={handleImageRightsScroll}
                  className="max-h-48 overflow-y-auto border-t border-[#E1E7ED] px-3.5 py-3 text-sm leading-6 text-[#4F5F70]"
                  tabIndex={0}
                >
                  {legalConsentSections[6].paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  [true, "Autorizo el uso de imagen"],
                  [false, "No autorizo el uso de imagen"]
                ].map(([value, label]) => (
                  <label
                    key={String(value)}
                    className={`flex min-h-12 items-center gap-2 rounded-[12px] border px-3.5 text-sm font-semibold transition-colors ${
                      !imageRightsRead
                        ? "border-[#E1E7ED] bg-[#F8FAFB] text-[#7B8794]"
                        : imageRights === value
                        ? "border-[#174EA6] bg-[#EAF1FF] text-[#0A2540]"
                        : "border-[#D8E0E6] bg-white text-[#0A2540] hover:border-[#174EA6]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="imageRights"
                      checked={imageRights === value}
                      disabled={!imageRightsRead}
                      onChange={() => {
                        setImageRights(value as boolean);
                        setSubmitError("");
                      }}
                      className="accent-[#C8102E] disabled:cursor-not-allowed"
                    />
                    {label}
                  </label>
                ))}
              </div>
              {!imageRightsRead ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#805A00]">
                  <Lock size={13} strokeWidth={1.8} aria-hidden="true" />
                  Lee el texto de derecho de imagen antes de elegir una opción.
                </p>
              ) : null}
            </section>
          </div>
        </section>
      </div>

      {isSubmitted ? (
        <div
          className="mt-5 flex gap-3 border border-[#B9E4C8] bg-[#F0FAF4] px-4 py-3 text-sm leading-6 text-[#246243]"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            Preinscripción enviada. El club revisará los datos antes de
            formalizar la incorporación.
          </span>
        </div>
      ) : null}

      {submitError ? (
        <p
          className="mt-4 rounded-[10px] border border-[#C8102E]/18 bg-[#FFF0F3] px-3 py-2 text-sm font-semibold leading-6 text-[#A50D25]"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-[6px] bg-[#C8102E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#A50D25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#8B95A1]"
      >
        {isSubmitting
          ? "Enviando..."
          : isSubmitted
            ? "Preinscripción enviada"
            : "Enviar preinscripción"}
      </button>
    </form>
  );
}
