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
        <section className="relative isolate min-h-[calc(100vh-72px)] overflow-x-hidden bg-[#0A2540] text-white">
          <div
            className="absolute bottom-0 left-0 top-0 w-1 bg-[#C8102E]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-0 hidden w-[62%] bg-[#F5F7FA] lg:block"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-[-4rem] top-20 hidden text-[18rem] font-bold leading-none tracking-[-0.08em] text-transparent opacity-35 [-webkit-text-stroke:1px_rgba(255,255,255,0.16)] lg:block"
            aria-hidden="true"
          >
            SG
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-[1440px] min-w-0 gap-5 overflow-x-hidden px-5 py-5 sm:gap-8 sm:py-10 lg:grid-cols-[0.66fr_1.34fr] lg:items-start lg:gap-10 lg:px-8 lg:py-12">
            <div className="min-w-0 max-w-2xl lg:sticky lg:top-24 lg:max-w-[520px] lg:pr-2">
              <div className="registration-side-panel relative overflow-hidden border border-white/[0.12] bg-white/[0.055] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:p-8 lg:p-8">
                <div
                  className="absolute -right-20 -top-24 h-56 w-56 rounded-full border border-white/[0.08]"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-8 right-8 h-24 w-24 border border-[#C8102E]/20 opacity-70 rotate-45"
                  aria-hidden="true"
                />
                <div className="relative min-w-0">
                  <p className="section-eyebrow text-[#E45D6E]">
                    {copy.eyebrow}
                  </p>
                  <h1 className="mt-3 text-[2.05rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:mt-4 sm:text-5xl lg:text-[3.05rem]">
                    {copy.title}
                  </h1>
                  <p className="mt-4 max-w-xl break-words text-sm leading-6 text-white/[0.78] sm:mt-5 sm:text-lg sm:leading-7">
                    {copy.intro}
                  </p>

                  <div className="mt-4 border-l-2 border-[#C8102E] bg-white/[0.07] px-4 py-3 sm:mt-7 sm:px-5 sm:py-4">
                    <p className="break-words text-sm leading-6 text-white/[0.76]">
                      {copy.note}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 sm:mt-7 sm:gap-2.5 lg:grid lg:grid-cols-1">
                    {copy.steps.map((label) => (
                      <span
                        key={label}
                        className="inline-flex min-h-9 items-center border border-white/[0.13] bg-white/[0.06] px-3 text-xs font-semibold text-white/[0.78] lg:w-fit"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0 max-w-full overflow-hidden lg:pl-2">
              <RegistrationRequestForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
