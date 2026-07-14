import { ImageIcon, Settings } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { clubConfigItems } from "@/lib/admin-data";
import { siteConfig } from "@/lib/site-config";

export default function AdminSettingsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <section className="rounded-[14px] border border-[#D8E0E6] bg-white p-6 shadow-[0_24px_72px_rgba(10,37,64,0.06)]">
        <div className="border-b border-[#E1E7ED] pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
            Configuración
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#0A2540]">
            Datos del club
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#687586]">
            Información principal de Samguk Cabo Blanco para tener los datos
            del club localizados.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {clubConfigItems.map((item) => (
            <article
              key={item.label}
              className="grid gap-4 rounded-[12px] border border-[#E1E7ED] bg-[#F8FAFB] p-4 sm:grid-cols-[0.8fr_1.2fr_auto] sm:items-center"
            >
              <div>
                <p className="text-sm font-semibold text-[#0A2540]">
                  {item.label}
                </p>
              </div>
              <div className="rounded-[8px] border border-[#D8E0E6] bg-white px-3 py-3 text-sm leading-6 text-[#4F5F70]">
                {item.status === "Sin configurar" ? "" : item.value}
                {item.status === "Sin configurar" ? (
                  <span className="text-[#8A96A3]">Sin configurar</span>
                ) : null}
              </div>
              {item.status ? <StatusBadge status={item.status} /> : null}
            </article>
          ))}
        </div>
      </section>

      <aside className="grid gap-5">
        <section className="rounded-[14px] border border-[#D8E0E6] bg-[#061727] p-6 text-white shadow-[0_24px_72px_rgba(10,37,64,0.08)]">
          <span className="grid h-11 w-11 place-items-center rounded-[10px] border border-white/[0.12] bg-white/[0.06] text-[#E45D6E]">
            <Settings size={20} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#E45D6E]">
            Maestro
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
            {siteConfig.teacher.name}
          </h2>
          <div className="mt-5 divide-y divide-white/[0.12] border-y border-white/[0.12]">
            {siteConfig.teacher.credentials.map((credential) => (
              <p key={credential} className="py-3 text-sm text-white/72">
                {credential}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-[14px] border border-[#D8E0E6] bg-white p-6 shadow-[0_24px_72px_rgba(10,37,64,0.06)]">
          <span className="grid h-11 w-11 place-items-center rounded-[10px] border border-[#D8E0E6] bg-[#F4F7FA] text-[#C8102E]">
            <ImageIcon size={20} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#C8102E]">
            Imágenes del club
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#0A2540]">
            Recursos reales cargados
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#687586]">
            La web pública utiliza imágenes reales del club. Esta zona ayuda a
            tener localizados los recursos principales.
          </p>
        </section>
      </aside>
    </div>
  );
}
