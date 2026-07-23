"use client";

import { CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import type { RegistrationRequestDraft } from "@/lib/admin-types";
import { usePublicLanguage } from "@/components/public/language-switch";
import { publicTranslations } from "@/lib/public-translations";

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

const labelClass = "text-sm font-semibold text-[#0A2540]";
const optionalClass = "ml-1 text-xs font-normal text-[#7B8794]";
const fieldClass =
  "mt-1.5 w-full rounded-[6px] border border-[#CAD4DE] bg-white px-3.5 py-2.5 text-sm text-[#111318] outline-none transition-colors placeholder:text-[#8A96A3] focus:border-[#174EA6] focus:ring-2 focus:ring-[#174EA6]/20";
const errorClass = "mt-1.5 text-xs font-semibold leading-5 text-[#A50D25]";

function validatePhone(value: string) {
  return /^\+?[0-9\s]{6,16}$/.test(value.trim());
}

function validateOptionalEmail(value: string) {
  return !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
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
  const optionalLabel = language === "en" ? "(optional)" : "(opcional)";
  const [request, setRequest] =
    useState<RegistrationRequestDraft>(initialRequest);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function updateField(field: keyof RegistrationRequestDraft, value: string) {
    setRequest((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
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

    if (!validatePhone(request.phone)) {
      nextErrors.phone = formCopy.errors.phone;
    }

    if (!validateOptionalEmail(request.email)) {
      nextErrors.email = formCopy.errors.email;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    if (!privacyAccepted) {
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
          proteccionDatosAceptada: privacyAccepted
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
              : "No se ha podido enviar la solicitud. Inténtalo de nuevo.")
        );
        return;
      }

      setIsSubmitted(true);
      setRequest(initialRequest);
    } catch {
      setSubmitError(
        language === "en"
          ? "The request could not be sent. Please try again."
          : "No se ha podido enviar la solicitud. Inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const optional = <span className={optionalClass}>{optionalLabel}</span>;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-[#D8E0E6] bg-white p-5 shadow-[0_24px_80px_rgba(10,37,64,0.16)] sm:p-6"
    >
      <div className="mb-5 border-b border-[#E1E7ED] pb-4">
        <p className="section-eyebrow">{formCopy.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#0A2540]">
          {formCopy.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#687586]">
          {language === "en"
            ? "Only the name and phone number are required. You can share the rest now or complete it later with the club."
            : "Solo necesitamos el nombre y un teléfono. Puedes añadir el resto ahora o completarlo más adelante con el club."}
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
            <span className={labelClass}>
              {formCopy.fields.age} {optional}
            </span>
            <input
              name="age"
              type="number"
              min="0"
              inputMode="numeric"
              value={request.age}
              onChange={(event) => updateField("age", event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="sm:col-span-3">
            <span className={labelClass}>
              {formCopy.fields.birthDate} {optional}
            </span>
            <input
              name="birthDate"
              type="date"
              value={request.birthDate}
              onChange={(event) => updateField("birthDate", event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="sm:col-span-3">
            <span className={labelClass}>
              {formCopy.fields.dniNie} {optional}
            </span>
            <input
              name="dniNie"
              type="text"
              value={request.dniNie}
              onChange={(event) => updateField("dniNie", event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="sm:col-span-4">
            <span className={labelClass}>
              {formCopy.fields.address} {optional}
            </span>
            <input
              name="address"
              type="text"
              autoComplete="street-address"
              value={request.address}
              onChange={(event) => updateField("address", event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>
              {formCopy.fields.postalCode} {optional}
            </span>
            <input
              name="postalCode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              value={request.postalCode}
              onChange={(event) => updateField("postalCode", event.target.value)}
              className={fieldClass}
            />
          </label>
        </fieldset>

        <fieldset className="grid gap-3.5 sm:grid-cols-6">
          <legend className="mb-1 text-sm font-semibold text-[#0A2540]">
            {formCopy.contactLegend}
          </legend>
          <label className="sm:col-span-6">
            <span className={labelClass}>
              {formCopy.fields.guardian} {optional}
            </span>
            <input
              name="guardian"
              type="text"
              autoComplete="name"
              value={request.guardian}
              onChange={(event) => updateField("guardian", event.target.value)}
              className={fieldClass}
            />
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
            <span className={labelClass}>
              {formCopy.fields.phone2} {optional}
            </span>
            <input
              name="phone2"
              type="tel"
              value={request.phone2}
              onChange={(event) => updateField("phone2", event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="sm:col-span-6">
            <span className={labelClass}>
              {formCopy.fields.email} {optional}
            </span>
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
          <label className="sm:col-span-6">
            <span className={labelClass}>
              {formCopy.fields.message} {optional}
            </span>
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

      <label className="mt-5 flex gap-3 rounded-[10px] border border-[#D8E0E6] bg-[#F8FAFB] px-3.5 py-3 text-sm leading-6 text-[#0A2540]">
        <input
          required
          type="checkbox"
          checked={privacyAccepted}
          onChange={(event) => {
            setPrivacyAccepted(event.target.checked);
            setSubmitError("");
          }}
          className="mt-1 h-4 w-4 shrink-0 rounded border-[#CAD4DE] accent-[#C8102E]"
        />
        <span>
          {formCopy.checks.data}{" "}
          <Link
            href="/legal/privacidad"
            className="font-semibold text-[#174EA6] underline underline-offset-2"
          >
            {language === "en" ? "Privacy policy" : "Política de privacidad"}
          </Link>
        </span>
      </label>

      {isSubmitted ? (
        <div
          className="mt-5 flex gap-3 border border-[#B9E4C8] bg-[#F0FAF4] px-4 py-3 text-sm leading-6 text-[#246243]"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            {language === "en"
              ? "Request sent. The club will contact you."
              : "Solicitud enviada. El club se pondrá en contacto contigo."}
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
          ? language === "en"
            ? "Sending..."
            : "Enviando..."
          : isSubmitted
            ? language === "en"
              ? "Request sent"
              : "Solicitud enviada"
            : language === "en"
              ? "Send request"
              : "Enviar solicitud"}
      </button>
    </form>
  );
}
