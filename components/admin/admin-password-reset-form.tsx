"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const fieldClass =
  "mt-2 w-full rounded-[8px] border border-white/[0.14] bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/34 focus:border-white/38 focus:ring-2 focus:ring-white/12";

export function AdminPasswordResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const isUpdateMode = mode === "update";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const endpoint = isUpdateMode
      ? "/api/admin/update-password"
      : "/api/admin/password-reset";
    const payload = isUpdateMode ? { password } : { email };

    if (isUpdateMode && password.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!isUpdateMode && !email.trim()) {
      setError("Introduce el email asociado al acceso privado.");
      return;
    }

    setIsSubmitting(true);

    const response = await fetch(endpoint, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });

    const body = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setIsSubmitting(false);

    if (!response.ok) {
      setError(body?.message ?? "No se ha podido completar la operación.");
      return;
    }

    if (isUpdateMode) {
      setMessage("Contraseña actualizada correctamente.");
      router.push("/admin/alumnos");
      router.refresh();
      return;
    }

    setMessage(
      "Si el email está autorizado, recibirás un enlace para cambiar la contraseña."
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-white/[0.16] bg-white/[0.08] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E45D6E]">
        {isUpdateMode ? "Nueva contraseña" : "Recuperar acceso"}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
        {isUpdateMode ? "Crea una contraseña nueva." : "Recupera tu acceso."}
      </h2>
      <p className="mt-3 text-sm leading-6 text-white/68">
        {isUpdateMode
          ? "Introduce una contraseña segura para el área privada del club."
          : "Te enviaremos un enlace al email autorizado en Supabase."}
      </p>

      <div className="mt-7">
        <label className="block text-sm font-semibold text-white">
          {isUpdateMode ? "Nueva contraseña" : "Email"}
          <input
            required
            type={isUpdateMode ? "password" : "email"}
            autoComplete={isUpdateMode ? "new-password" : "email"}
            value={isUpdateMode ? password : email}
            onChange={(event) => {
              if (isUpdateMode) {
                setPassword(event.target.value);
              } else {
                setEmail(event.target.value);
              }
              setError("");
              setMessage("");
            }}
            className={fieldClass}
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 border border-[#C8102E]/25 bg-[#C8102E]/12 px-4 py-3 text-sm leading-6 text-white">
          {error}
        </p>
      ) : null}

      {message ? (
        <p className="mt-4 border border-[#74D99F]/25 bg-[#74D99F]/12 px-4 py-3 text-sm leading-6 text-white">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-[8px] bg-[#C8102E] px-5 text-sm font-semibold text-white shadow-[0_18px_46px_rgba(200,16,46,0.28)] transition-colors hover:bg-[#E1253E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#061727] disabled:cursor-not-allowed disabled:bg-[#8B95A1]"
      >
        {isSubmitting
          ? "Procesando..."
          : isUpdateMode
            ? "Guardar contraseña"
            : "Enviar enlace"}
      </button>
    </form>
  );
}
