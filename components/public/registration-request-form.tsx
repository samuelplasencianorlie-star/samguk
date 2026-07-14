"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import { FormEvent, UIEvent, useMemo, useState } from "react";
import type {
  LegalConsent,
  RegistrationRequest,
  RegistrationRequestDraft
} from "@/lib/admin-types";
import {
  LEGAL_CONSENT_VERSION,
  legalConsentSections,
  legalConsentSectionsEn
} from "@/lib/legal-consent";
import { usePublicLanguage } from "@/components/public/language-switch";
import { publicTranslations } from "@/lib/public-translations";
import { siteConfig } from "@/lib/site-config";

const CONTACT_PHONE = siteConfig.contact.whatsapp;
const CONTACT_EMAIL = siteConfig.contact.email;

const initialRequest: RegistrationRequestDraft = {
  fullName: "",
  age: "",
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
type RequestErrorCopy = Record<
  | "fullName"
  | "age"
  | "birthDate"
  | "guardian"
  | "address"
  | "postalCode"
  | "dniNie"
  | "phone"
  | "phone2"
  | "email"
  | "legal",
  string
>;

type LegalConsentFormState = Omit<
  LegalConsent,
  "derechosImagen" | "fechaAceptacionLegal" | "textoLegalVersion"
> & {
  derechosImagen: boolean | null;
};

const initialConsent: LegalConsentFormState = {
  condicionesAceptadas: false,
  proteccionDatosAceptada: false,
  tutorConfirmado: false,
  responsabilidadAceptada: false,
  derechosImagen: null
};

const labelClass = "text-sm font-semibold text-[#0A2540]";
const fieldClass =
  "mt-1.5 w-full rounded-[6px] border border-[#CAD4DE] bg-white px-3.5 py-2.5 text-sm text-[#111318] outline-none transition-colors placeholder:text-[#8A96A3] focus:border-[#174EA6] focus:ring-2 focus:ring-[#174EA6]/20";
const errorClass = "mt-1.5 text-xs font-semibold leading-5 text-[#A50D25]";
const consentLabelClass =
  "flex gap-3 rounded-[10px] border border-[#D8E0E6] bg-white px-3.5 py-3 text-sm leading-6 text-[#0A2540] transition-colors has-[:checked]:border-[#C8102E]/35 has-[:checked]:bg-[#FFF6F8]";

function isNearScrollEnd(element: HTMLElement) {
  return element.scrollTop + element.clientHeight >= element.scrollHeight - 12;
}

function formatLegalDate(value: string) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function validatePhone(value: string) {
  return /^\+?[0-9\s]{6,16}$/.test(value.trim());
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validateDniNie(value: string) {
  return /^[A-Za-z0-9\- ]{5,20}$/.test(value.trim());
}

function validateRequest(
  request: RegistrationRequestDraft,
  errorCopy: RequestErrorCopy
): FieldErrors {
  const errors: FieldErrors = {};
  const age = Number(request.age);
  const birthDate = request.birthDate ? new Date(request.birthDate) : null;
  const today = new Date();

  if (request.fullName.trim().length < 3) {
    errors.fullName = errorCopy.fullName;
  }

  if (!Number.isFinite(age) || age < 3 || age > 99) {
    errors.age = errorCopy.age;
  }

  if (!request.birthDate || !birthDate || birthDate > today) {
    errors.birthDate = errorCopy.birthDate;
  }

  if (request.guardian.trim().length < 3) {
    errors.guardian = errorCopy.guardian;
  }

  if (request.address.trim().length < 5) {
    errors.address = errorCopy.address;
  }

  if (!/^[0-9]{5}$/.test(request.postalCode.trim())) {
    errors.postalCode = errorCopy.postalCode;
  }

  if (!validateDniNie(request.dniNie)) {
    errors.dniNie = errorCopy.dniNie;
  }

  if (!validatePhone(request.phone)) {
    errors.phone = errorCopy.phone;
  }

  if (request.phone2.trim() && !validatePhone(request.phone2)) {
    errors.phone2 = errorCopy.phone2;
  }

  if (!validateEmail(request.email)) {
    errors.email = errorCopy.email;
  }

  return errors;
}

function FieldError({ error }: { error?: string }) {
  return error ? (
    <p className={errorClass} role="alert">
      {error}
    </p>
  ) : null;
}

export function RegistrationRequestForm() {
  const language = usePublicLanguage();
  const formCopy = publicTranslations[language].registration.form;
  const legalSections =
    language === "en" ? legalConsentSectionsEn : legalConsentSections;
  const [request, setRequest] =
    useState<RegistrationRequestDraft>(initialRequest);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [consent, setConsent] = useState<LegalConsentFormState>(initialConsent);
  const [hasReadLegalText, setHasReadLegalText] = useState(false);
  const [legalError, setLegalError] = useState("");
  const [preparedRequest, setPreparedRequest] =
    useState<RegistrationRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPrepared = Boolean(preparedRequest);
  const ageNumber = Number(request.age);
  const tutorConfirmationRequired = Number.isFinite(ageNumber) && ageNumber < 18;

  function updateField(field: keyof RegistrationRequestDraft, value: string) {
    setRequest((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setPreparedRequest(null);
  }

  function updateConsent<TField extends keyof LegalConsentFormState>(
    field: TField,
    value: LegalConsentFormState[TField]
  ) {
    setConsent((current) => ({ ...current, [field]: value }));
    setPreparedRequest(null);
    setLegalError("");
  }

  function handleLegalScroll(event: UIEvent<HTMLDivElement>) {
    if (isNearScrollEnd(event.currentTarget)) {
      setHasReadLegalText(true);
    }
  }

  function buildLegalAcceptance(): LegalConsent | null {
    const hasMandatoryConsent =
      consent.condicionesAceptadas &&
      consent.proteccionDatosAceptada &&
      consent.responsabilidadAceptada &&
      (!tutorConfirmationRequired || consent.tutorConfirmado) &&
      consent.derechosImagen !== null;

    if (!hasReadLegalText || !hasMandatoryConsent) {
      return null;
    }

    return {
      condicionesAceptadas: consent.condicionesAceptadas,
      proteccionDatosAceptada: consent.proteccionDatosAceptada,
      tutorConfirmado: consent.tutorConfirmado,
      responsabilidadAceptada: consent.responsabilidadAceptada,
      derechosImagen: Boolean(consent.derechosImagen),
      fechaAceptacionLegal: new Date().toISOString(),
      textoLegalVersion: LEGAL_CONSENT_VERSION
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting || isPrepared) {
      return;
    }

    const nextErrors = validateRequest(request, formCopy.errors);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const legalAcceptance = buildLegalAcceptance();

    if (!legalAcceptance) {
      setLegalError(
        formCopy.errors.legal
      );
      return;
    }

    setIsSubmitting(true);

    const nextRequest: RegistrationRequest = {
      id: `sol-web-${Date.now()}`,
      fullName: request.fullName.trim(),
      age: Number(request.age),
      birthDate: request.birthDate,
      guardian: request.guardian.trim(),
      address: request.address.trim(),
      postalCode: request.postalCode.trim(),
      dniNie: request.dniNie.trim(),
      phone: request.phone.trim(),
      phone2: request.phone2.trim(),
      email: request.email.trim(),
      message: request.message.trim(),
      ...legalAcceptance,
      status: "Pendiente",
      submittedAt: new Date().toISOString().slice(0, 10)
    };

    setPreparedRequest(nextRequest);
    setIsSubmitting(false);
  }

  const activeRequest = preparedRequest;
  const preparedMessage = useMemo(
    () =>
      activeRequest
        ? [
            "Solicitud de inscripción para Samguk Cabo Blanco",
            `Nombre y apellidos: ${activeRequest.fullName}`,
            `Edad: ${activeRequest.age}`,
            `Fecha de nacimiento: ${activeRequest.birthDate}`,
            `DNI/NIE: ${activeRequest.dniNie}`,
            `Dirección: ${activeRequest.address}`,
            `Código postal: ${activeRequest.postalCode}`,
            `Padre/madre/tutor o responsable: ${activeRequest.guardian}`,
            `Teléfono principal: ${activeRequest.phone}`,
            activeRequest.phone2
              ? `Teléfono 2: ${activeRequest.phone2}`
              : "",
            `Email: ${activeRequest.email}`,
            activeRequest.message ? `Mensaje: ${activeRequest.message}` : "",
            "",
            "Consentimientos legales:",
            `Condiciones del club: ${activeRequest.condicionesAceptadas ? "Aceptadas" : "Pendientes"}`,
            `Protección de datos: ${activeRequest.proteccionDatosAceptada ? "Aceptada" : "Pendiente"}`,
            `Tutor confirmado: ${activeRequest.tutorConfirmado ? "Sí" : "No"}`,
            `Responsabilidad deportiva: ${activeRequest.responsabilidadAceptada ? "Aceptada" : "Pendiente"}`,
            `Derechos de imagen: ${activeRequest.derechosImagen ? "Autorizado" : "No autorizado"}`,
            `Fecha de aceptación legal: ${formatLegalDate(activeRequest.fechaAceptacionLegal)}`,
            `Versión legal: ${activeRequest.textoLegalVersion}`
          ]
            .filter(Boolean)
            .join("\n")
        : "",
    [activeRequest]
  );

  const encodedMessage = encodeURIComponent(preparedMessage);
  const whatsappPhone = CONTACT_PHONE.replace(/\D/g, "");
  const contactLinks = [
    CONTACT_PHONE && activeRequest
      ? {
          href: `https://wa.me/34${whatsappPhone}?text=${encodedMessage}`,
          label: formCopy.whatsapp
        }
      : null,
    CONTACT_EMAIL && activeRequest
      ? {
          href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
            "Solicitud de inscripción para Samguk Cabo Blanco"
          )}&body=${encodedMessage}`,
          label: formCopy.email
        }
      : null
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-[#D8E0E6] bg-white p-5 shadow-[0_24px_80px_rgba(10,37,64,0.16)] sm:p-6"
    >
      <div className="mb-4 flex flex-col gap-2 border-b border-[#E1E7ED] pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-eyebrow">{formCopy.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#0A2540]">
            {formCopy.title}
          </h2>
        </div>
        <p className="text-xs leading-5 text-[#687586] sm:max-w-[13rem] sm:text-right">
          {formCopy.helper}
        </p>
      </div>

      <div className="grid gap-5">
        <fieldset className="grid gap-3.5 sm:grid-cols-6">
          <legend className="mb-1 text-sm font-semibold text-[#0A2540]">
            {formCopy.studentLegend}
          </legend>
          <label className="sm:col-span-4">
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

          <label className="sm:col-span-2">
            <span className={labelClass}>{formCopy.fields.age}</span>
            <input
              required
              name="age"
              type="number"
              min="3"
              inputMode="numeric"
              value={request.age}
              onChange={(event) => updateField("age", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.age} />
          </label>

          <label className="sm:col-span-3">
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

          <label className="sm:col-span-3">
            <span className={labelClass}>{formCopy.fields.dniNie}</span>
            <input
              required
              name="dniNie"
              type="text"
              autoComplete="off"
              value={request.dniNie}
              onChange={(event) => updateField("dniNie", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.dniNie} />
          </label>

          <label className="sm:col-span-4">
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

          <label className="sm:col-span-2">
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

        <fieldset className="grid gap-3.5 sm:grid-cols-6">
          <legend className="mb-1 text-sm font-semibold text-[#0A2540]">
            {formCopy.contactLegend}
          </legend>
          <label className="sm:col-span-6">
            <span className={labelClass}>
              {formCopy.fields.guardian}
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

          <label className="sm:col-span-3">
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

          <label className="sm:col-span-3">
            <span className={labelClass}>{formCopy.fields.phone2}</span>
            <input
              name="phone2"
              type="tel"
              autoComplete="tel"
              value={request.phone2}
              onChange={(event) => updateField("phone2", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.phone2} />
          </label>

          <label className="sm:col-span-6">
            <span className={labelClass}>{formCopy.fields.email}</span>
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              value={request.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={fieldClass}
            />
            <FieldError error={errors.email} />
          </label>

          <label className="sm:col-span-6">
            <span className={labelClass}>{formCopy.fields.message}</span>
            <textarea
              name="message"
              rows={3}
              value={request.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={`${fieldClass} resize-y`}
            />
          </label>
        </fieldset>
      </div>

      {isPrepared ? (
        <div
          className="mt-5 flex gap-3 border border-[#B9E4C8] bg-[#F0FAF4] px-4 py-3 text-sm leading-6 text-[#246243]"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2
            size={18}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-[#1F8A4C]"
            aria-hidden="true"
          />
          <span>
            {formCopy.success}
          </span>
        </div>
      ) : null}

      {isPrepared && contactLinks.length > 0 ? (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("https://") ? "_blank" : undefined}
              rel={
                link.href.startsWith("https://")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-[#CAD4DE] px-4 text-sm font-semibold text-[#0A2540] transition-colors hover:border-[#174EA6] hover:text-[#174EA6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174EA6] focus-visible:ring-offset-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}

      <div className="terms-panel mt-5 overflow-hidden border border-[#D8E0E6] bg-[#F8FAFB]">
        <details className="group">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 text-sm font-semibold text-[#0A2540] outline-none transition-colors hover:text-[#C8102E] focus-visible:ring-2 focus-visible:ring-[#174EA6]">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={17} strokeWidth={1.8} aria-hidden="true" />
              {formCopy.legalTitle}
            </span>
            <span
              className="text-xs text-[#687586] transition-transform group-open:rotate-180"
              aria-hidden="true"
            >
              ↓
            </span>
          </summary>
          <div
            onScroll={handleLegalScroll}
            className="max-h-[360px] overflow-y-auto border-t border-[#D8E0E6] bg-white px-4 py-4 text-sm leading-6 text-[#4F5F70] sm:max-h-[420px]"
          >
            <div className="mb-4 rounded-[10px] border border-[#E1E7ED] bg-[#F8FAFB] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#687586]">
              {formCopy.legalVersion}: {LEGAL_CONSENT_VERSION}
            </div>
            <div className="grid gap-5">
              {legalSections.map((section) => (
                <section
                  key={section.title}
                  className="border-b border-[#E8EDF2] pb-5 last:border-b-0 last:pb-0"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0A2540]">
                    {section.title}
                  </h3>
                  <div className="mt-3 grid gap-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </details>

        <div className="border-t border-[#D8E0E6] px-4 py-4">
          {!hasReadLegalText ? (
            <p className="mb-3 rounded-[10px] border border-[#E6A500]/22 bg-[#FFF7DF] px-3 py-2 text-xs font-semibold leading-5 text-[#805A00]">
              {formCopy.readToEnd}
            </p>
          ) : null}

          <div className="grid gap-2.5">
            <label
              className={`${consentLabelClass} ${
                !hasReadLegalText ? "opacity-55" : ""
              }`}
            >
              <input
                required
                disabled={!hasReadLegalText}
                type="checkbox"
                checked={consent.condicionesAceptadas}
                onChange={(event) =>
                  updateConsent("condicionesAceptadas", event.target.checked)
                }
                className="mt-1 h-4 w-4 shrink-0 rounded border-[#CAD4DE] accent-[#C8102E]"
              />
              <span>{formCopy.checks.conditions}</span>
            </label>

            <label
              className={`${consentLabelClass} ${
                !hasReadLegalText ? "opacity-55" : ""
              }`}
            >
              <input
                required
                disabled={!hasReadLegalText}
                type="checkbox"
                checked={consent.proteccionDatosAceptada}
                onChange={(event) =>
                  updateConsent(
                    "proteccionDatosAceptada",
                    event.target.checked
                  )
                }
                className="mt-1 h-4 w-4 shrink-0 rounded border-[#CAD4DE] accent-[#C8102E]"
              />
              <span>
                {formCopy.checks.data}
              </span>
            </label>

            <label
              className={`${consentLabelClass} ${
                !hasReadLegalText ? "opacity-55" : ""
              }`}
            >
              <input
                disabled={!hasReadLegalText}
                type="checkbox"
                checked={consent.tutorConfirmado}
                onChange={(event) =>
                  updateConsent("tutorConfirmado", event.target.checked)
                }
                className="mt-1 h-4 w-4 shrink-0 rounded border-[#CAD4DE] accent-[#C8102E]"
              />
              <span>
                {formCopy.checks.guardian}
              </span>
            </label>

            <label
              className={`${consentLabelClass} ${
                !hasReadLegalText ? "opacity-55" : ""
              }`}
            >
              <input
                required
                disabled={!hasReadLegalText}
                type="checkbox"
                checked={consent.responsabilidadAceptada}
                onChange={(event) =>
                  updateConsent("responsabilidadAceptada", event.target.checked)
                }
                className="mt-1 h-4 w-4 shrink-0 rounded border-[#CAD4DE] accent-[#C8102E]"
              />
              <span>
                {formCopy.checks.responsibility}
              </span>
            </label>
          </div>

          <div className="mt-4 rounded-[12px] border border-[#E1E7ED] bg-white p-3">
            <p className="text-sm font-semibold text-[#0A2540]">
              {formCopy.imageRights.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-[#687586]">
              {formCopy.imageRights.helper}
            </p>
            <div className="mt-3 grid gap-2">
              <label
                className={`${consentLabelClass} ${
                  !hasReadLegalText ? "opacity-55" : ""
                }`}
              >
                <input
                  disabled={!hasReadLegalText}
                  type="checkbox"
                  checked={consent.derechosImagen === true}
                  onChange={(event) =>
                    updateConsent(
                      "derechosImagen",
                      event.target.checked ? true : null
                    )
                  }
                  className="mt-1 h-4 w-4 shrink-0 rounded border-[#CAD4DE] accent-[#C8102E]"
                />
                <span>
                  {formCopy.imageRights.yes}
                </span>
              </label>

              <label
                className={`${consentLabelClass} ${
                  !hasReadLegalText ? "opacity-55" : ""
                }`}
              >
                <input
                  disabled={!hasReadLegalText}
                  type="checkbox"
                  checked={consent.derechosImagen === false}
                  onChange={(event) =>
                    updateConsent(
                      "derechosImagen",
                      event.target.checked ? false : null
                    )
                  }
                  className="mt-1 h-4 w-4 shrink-0 rounded border-[#CAD4DE] accent-[#C8102E]"
                />
                <span>{formCopy.imageRights.no}</span>
              </label>
            </div>
          </div>

          {legalError ? (
            <p
              className="mt-3 rounded-[10px] border border-[#C8102E]/18 bg-[#FFF0F3] px-3 py-2 text-sm font-semibold leading-6 text-[#A50D25]"
              role="alert"
            >
              {legalError}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isPrepared}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-[6px] bg-[#C8102E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#A50D25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#8B95A1]"
      >
        {isPrepared ? formCopy.prepared : formCopy.submit}
      </button>
    </form>
  );
}
