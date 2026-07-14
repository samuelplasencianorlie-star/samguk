"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, History } from "lucide-react";
import { SiteHeader } from "@/components/public/site-header";
import { usePublicLanguage } from "@/components/public/language-switch";
import { historyPageTranslations } from "@/lib/public-translations";
import { siteConfig } from "@/lib/site-config";

export function HistoryPageContent() {
  const language = usePublicLanguage();
  const copy = historyPageTranslations[language];

  return (
    <div className="public-site min-h-screen bg-white text-[#111318]">
      <SiteHeader />

      <main className="pt-[72px]">
        <section className="relative isolate overflow-hidden bg-[#071B2D] px-5 py-16 text-white sm:py-20 lg:px-8 lg:py-24">
          <div className="section-orbit section-orbit-right" aria-hidden="true" />
          <div className="relative z-10 mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-white/[0.68] outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                {copy.back}
              </Link>
              <History
                size={26}
                strokeWidth={1.5}
                className="mt-12 text-[#E45D6E]"
                aria-hidden="true"
              />
              <p className="section-eyebrow mt-8 text-[#E45D6E]">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 text-[clamp(3rem,7vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.065em]">
                {copy.title}
              </h1>
              <p className="mt-7 max-w-xl text-sm leading-6 text-white/[0.66]">
                {copy.intro}
              </p>
            </div>

            <div className="relative min-h-[340px] overflow-hidden border border-white/[0.14] bg-white/[0.06] shadow-[0_30px_100px_rgba(0,0,0,0.24)] sm:min-h-[460px]">
              <Image
                src={siteConfig.assets.photos.historyReception}
                alt="Leopoldo García en la recepción de SAMGUK"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#071B2D]/54 via-transparent to-white/[0.04]"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#F4F7FA] px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="relative min-h-[520px] overflow-hidden border border-[#D8E0E6] bg-white shadow-[0_24px_72px_rgba(10,37,64,0.075)]">
                <Image
                  src={siteConfig.assets.photos.teacherHistorical}
                  alt="Leopoldo García con dobok y cinturón negro"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-[50%_42%]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#071B2D]/30 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-5 border border-[#D8E0E6] bg-white p-5 shadow-[0_18px_52px_rgba(10,37,64,0.045)]">
                <p className="section-eyebrow">{copy.contact}</p>
                <p className="mt-4 text-sm leading-6 text-[#4F5F70]">
                  {siteConfig.contact.address}
                </p>
                <p className="mt-3 text-sm font-semibold text-[#0A2540]">
                  {siteConfig.contact.phone}
                </p>
                <p className="mt-1 text-sm text-[#4F5F70]">
                  {siteConfig.contact.email}
                </p>
              </div>
            </aside>

            <article className="border border-[#D8E0E6] bg-white p-6 shadow-[0_24px_72px_rgba(10,37,64,0.055)] sm:p-8 lg:p-10">
              <p className="section-eyebrow">{copy.confirmedInfo}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#0A2540] sm:text-5xl">
                {siteConfig.teacher.name}
              </h2>

              <div className="mt-9 grid gap-px overflow-hidden border border-[#D8E0E6] bg-[#D8E0E6] sm:grid-cols-2">
                {copy.confirmedItems.map((item) => (
                  <div key={item.label} className="bg-[#F8FAFB] p-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C8102E]">
                      {item.label}
                    </span>
                    <p className="mt-3 text-xl font-semibold text-[#0A2540]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 divide-y divide-[#E1E7ED] border-y border-[#E1E7ED] text-sm text-[#4F5F70]">
                {siteConfig.teacher.credentials.map((item) => (
                  <p key={item} className="py-4">
                    {item}
                  </p>
                ))}
              </div>

              <div className="mt-10 space-y-7 text-base leading-8 text-[#344253]">
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 grid gap-px overflow-hidden border border-[#D8E0E6] bg-[#D8E0E6] sm:grid-cols-2">
                {copy.highlights.map((item) => (
                  <div key={item.label} className="bg-[#F8FAFB] p-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C8102E]">
                      {item.label}
                    </span>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#0A2540]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <section className="mt-10 border-t border-[#E1E7ED] pt-10">
                <p className="section-eyebrow">{copy.officialVenues}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {siteConfig.history.venues.map((venue) => (
                    <span
                      key={venue}
                      className="inline-flex min-h-10 items-center border border-[#D8E0E6] bg-[#F8FAFB] px-4 text-sm font-semibold text-[#0A2540]"
                    >
                      {venue}
                    </span>
                  ))}
                </div>
              </section>

              <Link
                href="/inscripcion"
                className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-[#C8102E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#A50D25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2"
              >
                {copy.request}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
