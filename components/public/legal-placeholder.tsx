"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { usePublicLanguage } from "@/components/public/language-switch";
import { publicTranslations } from "@/lib/public-translations";
import { siteConfig } from "@/lib/site-config";

type LegalPlaceholderProps = {
  title: string;
  description: string;
};

export function LegalPlaceholder({
  title,
  description
}: LegalPlaceholderProps) {
  const language = usePublicLanguage();
  const copy = publicTranslations[language].legal;
  const localizedTitle =
    title === "Política de privacidad"
      ? copy.privacyTitle
      : title === "Política de cookies"
        ? copy.cookiesTitle
        : title === "Aviso legal"
          ? copy.legalNoticeTitle
          : title;
  const localizedDescription =
    description === siteConfig.legal.privacy
      ? copy.privacy
      : description === siteConfig.legal.cookies
        ? copy.cookies
        : description === siteConfig.legal.legalNotice
          ? copy.legalNotice
          : description;

  return (
    <main className="min-h-screen bg-[#F5F7F9] px-5 py-8 text-[#111318] sm:px-8 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col">
        <Link
          href="/"
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-[6px] text-sm font-semibold text-[#0A2540] transition-colors hover:text-[#C8102E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-4"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {copy.back}
        </Link>

        <section
          className="my-auto border border-[#D6DEE5] bg-white p-6 sm:p-10 lg:p-14"
          aria-labelledby="legal-title"
        >
          <div className="flex size-12 items-center justify-center rounded-[6px] bg-[#0A2540] text-white">
            <FileText aria-hidden="true" className="size-5" />
          </div>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-[#C8102E]">
            {copy.eyebrow}
          </p>
          <h1
            id="legal-title"
            className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-[#0A2540] sm:text-5xl"
          >
            {localizedTitle}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#4A5968]">
            {localizedDescription}
          </p>
          <div className="mt-10 border-l-2 border-[#C8102E] bg-[#F8FAFB] px-5 py-4">
            <p className="text-sm leading-6 text-[#4A5968]">
              {copy.note}
            </p>
          </div>
        </section>

        <p className="pt-8 text-xs text-[#647381]">
          {siteConfig.fullName}
        </p>
      </div>
    </main>
  );
}
