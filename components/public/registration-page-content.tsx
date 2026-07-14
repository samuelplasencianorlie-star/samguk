"use client";

import { RegistrationRequestForm } from "@/components/public/registration-request-form";
import { SiteHeader } from "@/components/public/site-header";
import { usePublicLanguage } from "@/components/public/language-switch";
import { publicTranslations } from "@/lib/public-translations";

export function RegistrationPageContent() {
  const language = usePublicLanguage();
  const copy = publicTranslations[language].registration.page;

  return (
    <div className="public-site min-h-screen bg-[#F5F7FA] text-[#111318]">
      <SiteHeader />

      <main className="pt-[72px]">
        <section className="relative isolate min-h-[calc(100vh-72px)] overflow-hidden bg-[#0A2540] text-white">
          <div
            className="absolute bottom-0 left-0 top-0 w-1 bg-[#C8102E]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-0 hidden w-[55%] bg-[#F5F7FA] lg:block"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-[-4rem] top-20 hidden text-[18rem] font-bold leading-none tracking-[-0.08em] text-transparent opacity-35 [-webkit-text-stroke:1px_rgba(255,255,255,0.16)] lg:block"
            aria-hidden="true"
          >
            SG
          </div>

          <div className="relative z-10 mx-auto grid max-w-[1440px] gap-8 px-5 py-8 sm:py-10 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-12 lg:px-8 lg:py-10">
            <div className="max-w-2xl lg:pr-6">
              <p className="section-eyebrow text-[#E45D6E]">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/[0.78] sm:text-lg">
                {copy.intro}
              </p>

              <div className="mt-7 border-l-2 border-[#C8102E] bg-white/[0.06] px-5 py-4 backdrop-blur">
                <p className="text-sm leading-6 text-white/[0.76]">
                  {copy.note}
                </p>
              </div>

              <div className="mt-8 hidden gap-3 lg:grid">
                {copy.steps.map((label, index) => (
                  <div
                    key={label}
                    className="grid grid-cols-[2.5rem_1fr] items-center gap-3 border-t border-white/[0.12] pt-3 text-sm text-white/[0.78]"
                  >
                    <span className="grid h-9 w-9 place-items-center border border-white/[0.16] text-xs font-semibold tabular-nums text-[#E45D6E]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-4">
              <RegistrationRequestForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
