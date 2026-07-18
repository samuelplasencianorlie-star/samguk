"use client";

import {
  ClipboardList,
  GraduationCap,
  Home,
  LogOut,
  Settings,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  {
    label: "Seguimiento",
    href: "/admin/alumnos",
    icon: UsersRound
  },
  {
    label: "Inscripciones",
    href: "/admin/solicitudes",
    icon: ClipboardList
  },
  {
    label: "Grupos",
    href: "/admin/cursos",
    icon: GraduationCap
  },
  {
    label: "Documentos y autorizaciones",
    href: "/admin/documentos",
    icon: ShieldCheck
  },
  {
    label: "Configuración",
    href: "/admin/configuracion",
    icon: Settings
  }
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": {
    title: "Seguimiento de alumnos",
    subtitle: "Gestiona grupos, alumnos y evolución desde un solo lugar."
  },
  "/admin/solicitudes": {
    title: "Inscripciones",
    subtitle: "Revisa las personas que han solicitado apuntarse."
  },
  "/admin/alumnos": {
    title: "Seguimiento de alumnos",
    subtitle: "Gestiona grupos, alumnos y evolución desde un solo lugar."
  },
  "/admin/cursos": {
    title: "Grupos",
    subtitle: "Organiza alumnos por grupo de entrenamiento."
  },
  "/admin/documentos": {
    title: "Documentos y autorizaciones",
    subtitle: "Controla condiciones, imagen y documentación del alumnado."
  },
  "/admin/configuracion": {
    title: "Configuración",
    subtitle: "Datos principales del club."
  }
};

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const page = pageTitles[pathname] ?? pageTitles["/admin/dashboard"];

  function handleSignOut() {
    void fetch("/api/admin/logout", { method: "POST" }).finally(() => {
      router.push("/admin/login");
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-[#EEF3F7] text-[#111318]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[292px] border-r border-white/[0.08] bg-[#061727] text-white lg:flex lg:flex-col">
        <div className="border-b border-white/[0.1] p-6">
          <Link
            href="/admin/alumnos"
            className="inline-flex rounded-[10px] border border-white/[0.14] bg-white/[0.06] p-2 backdrop-blur"
          >
            <Image
              src={siteConfig.assets.logo}
              alt={siteConfig.fullName}
              width={1600}
              height={543}
              sizes="180px"
              style={{ width: "180px", height: "auto" }}
              priority
            />
          </Link>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E45D6E]">
            Vista de trabajo de Leo
          </p>
          <p className="mt-2 text-sm text-white/62">{siteConfig.fullName}</p>
        </div>

        <nav className="flex-1 space-y-1 p-4" aria-label="Navegación privada">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-[10px] px-3 py-3 transition-colors ${
                  isActive
                    ? "bg-white text-[#061727] shadow-[0_18px_46px_rgba(0,0,0,0.18)]"
                    : "text-white/68 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <span
                  className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border ${
                    isActive
                      ? "border-[#D8E0E6] bg-[#F4F7FA] text-[#C8102E]"
                      : "border-white/[0.12] bg-white/[0.04] text-white/76"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold leading-5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-white/[0.1] p-4">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-sm font-semibold text-white/68 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <Home size={18} strokeWidth={1.7} aria-hidden="true" />
            Volver a la web
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex min-h-11 w-full items-center gap-3 rounded-[10px] px-3 text-left text-sm font-semibold text-white/68 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <LogOut size={18} strokeWidth={1.7} aria-hidden="true" />
            Salir
          </button>
        </div>
      </aside>

      <div className="min-w-0 overflow-x-hidden lg:pl-[292px]">
        <header className="relative z-20 overflow-hidden border-b border-[#D8E0E6] bg-white px-5 py-5 shadow-[0_16px_44px_rgba(10,37,64,0.05)] lg:px-8">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
                {siteConfig.fullName}
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#0A2540] sm:text-3xl">
                {page.title}
              </h1>
              <p className="mt-1 text-sm text-[#687586]">{page.subtitle}</p>
            </div>
            <nav
              className="flex w-full max-w-full min-w-0 gap-2 overflow-x-auto pb-1 lg:hidden"
              aria-label="Navegación privada móvil"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-3 text-sm font-semibold ${
                      isActive
                        ? "border-[#C8102E] bg-[#C8102E] text-white"
                        : "border-[#D8E0E6] bg-white text-[#0A2540]"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>

        <main className="mx-auto min-w-0 max-w-[1320px] px-5 py-8 sm:py-10 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
