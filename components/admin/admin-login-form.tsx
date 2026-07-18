"use client";

import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const fieldClass =
  "mt-2 w-full rounded-[8px] border border-white/[0.14] bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/34 focus:border-white/38 focus:ring-2 focus:ring-white/12";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Introduce usuario y contraseña para acceder al panel.");
      return;
    }

    setIsSubmitting(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail, password })
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      setError(body?.message ?? "No se ha podido acceder al panel.");
      setIsSubmitting(false);
      return;
    }

    const next = searchParams.get("next") || "/admin/alumnos";
    router.push(next);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-white/[0.16] bg-white/[0.08] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-white text-[#0A2540]">
        <LockKeyhole size={21} strokeWidth={1.8} aria-hidden="true" />
      </div>

      <div className="mt-8">
        <label className="block text-sm font-semibold text-white">
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            className={fieldClass}
          />
        </label>
      </div>

      <div className="mt-5">
        <label className="block text-sm font-semibold text-white">
          Contraseña
          <input
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-[8px] bg-[#C8102E] px-5 text-sm font-semibold text-white shadow-[0_18px_46px_rgba(200,16,46,0.28)] transition-colors hover:bg-[#E1253E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#061727] disabled:cursor-not-allowed disabled:bg-[#8B95A1]"
      >
        {isSubmitting ? "Accediendo..." : "Acceder al panel"}
      </button>

      <Link
        href="/admin/reset-password"
        className="mt-5 inline-flex min-h-10 w-full items-center justify-center text-sm font-semibold text-white/64 transition-colors hover:text-white"
      >
        ¿Has olvidado la contraseña?
      </Link>
    </form>
  );
}
