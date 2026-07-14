import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Acceso privado",
  description: "Acceso al área privada de Samguk Cabo Blanco."
};

export default function AdminLoginPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#061727] px-5 py-8 text-white sm:px-8 sm:py-10">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(23,78,166,0.26),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(200,16,46,0.18),transparent_28%),linear-gradient(145deg,#061727,#0A2540_48%,#050E19)]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-[18%] h-[28rem] w-[46rem] -translate-x-1/2 rounded-full border border-white/[0.08]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <Link
          href="/"
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-sm text-sm font-semibold text-white/[0.72] outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver a la web
        </Link>

        <section className="my-auto grid gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex border border-white/[0.16] bg-white/[0.05] p-2 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur">
              <Image
                src={siteConfig.assets.logo}
                alt={siteConfig.fullName}
                width={1600}
                height={543}
                sizes="260px"
                style={{ width: "260px", height: "auto" }}
                priority
              />
            </div>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-[#E45D6E]">
              Área privada del club
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Gestión interna de {siteConfig.fullName}.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/[0.72]">
              Acceso privado para revisar inscripciones, alumnos, grupos de
              entrenamiento y datos del club.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md lg:mr-0">
            <Suspense fallback={null}>
              <AdminLoginForm />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
