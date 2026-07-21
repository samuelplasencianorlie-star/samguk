"use client";

import { useEffect, useState } from "react";
import {
  publicTranslations,
  type PublicLanguage
} from "@/lib/public-translations";

const STORAGE_KEY = "samguk-public-language";
const EVENT_NAME = "samguk-language-change";

export function getStoredLanguage(): PublicLanguage {
  if (typeof window === "undefined") {
    return "es";
  }

  const urlLanguage = new URL(window.location.href).searchParams.get("lang");
  if (urlLanguage === "en" || urlLanguage === "es") {
    return urlLanguage;
  }

  try {
    const stored = window.localStorage?.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

export function setStoredLanguage(language: PublicLanguage) {
  try {
    window.localStorage?.setItem(STORAGE_KEY, language);
  } catch {
    // The switch still works when browser privacy settings block storage.
  }

  document.documentElement.lang = language;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: language }));
}

function getLanguageHref(language: PublicLanguage) {
  if (typeof window === "undefined") {
    return `/?lang=${language}`;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function usePublicLanguage() {
  const [language, setLanguage] = useState<PublicLanguage>(() =>
    getStoredLanguage()
  );

  useEffect(() => {
    const initialLanguage = getStoredLanguage();
    document.documentElement.lang = initialLanguage;
    setLanguage(initialLanguage);

    function handleLanguageChange(event: Event) {
      const detail = (event as CustomEvent<PublicLanguage>).detail;
      const nextLanguage = detail === "en" ? "en" : "es";
      document.documentElement.lang = nextLanguage;
      setLanguage(nextLanguage);
    }

    window.addEventListener(EVENT_NAME, handleLanguageChange);
    return () => window.removeEventListener(EVENT_NAME, handleLanguageChange);
  }, []);

  return language;
}

export function LanguageSwitch({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const language = usePublicLanguage();
  const isLight = tone === "light";
  const copy = publicTranslations[language];

  function handleChange(nextLanguage: PublicLanguage) {
    setStoredLanguage(nextLanguage);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <div
      className={`language-switch group relative inline-grid grid-cols-2 rounded-full border p-1 text-[11px] font-semibold uppercase tracking-[0.12em] shadow-[0_14px_34px_rgba(10,37,64,0.08)] backdrop-blur-xl transition-all duration-300 ${
        isLight
          ? "border-white/[0.16] bg-white/[0.08] shadow-[0_18px_42px_rgba(0,0,0,0.18)] hover:border-white/[0.28]"
          : "border-[#D8E0E6] bg-white/95 hover:border-[#B8C5D0]"
      }`}
      aria-label={copy.languageLabel}
    >
      <span
        className={`pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%_-_0.25rem)] rounded-full transition-transform duration-300 ease-out ${
          language === "en" ? "translate-x-full" : "translate-x-0"
        } ${
          isLight
            ? "bg-white shadow-[0_10px_26px_rgba(0,0,0,0.24)]"
            : "bg-[#0A2540] shadow-[0_10px_24px_rgba(10,37,64,0.18)]"
        }`}
        aria-hidden="true"
      />
      {(["es", "en"] as const).map((item) => (
        <a
          key={item}
          href={getLanguageHref(item)}
          onClick={(event) => {
            event.preventDefault();
            handleChange(item);
          }}
          className={`relative z-10 inline-flex min-h-8 min-w-10 items-center justify-center rounded-full px-3 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 ${
            language === item
              ? isLight
                ? "text-[#0A2540]"
                : "text-white"
              : isLight
                ? "text-white/58 hover:text-white focus-visible:ring-white/70"
                : "text-[#687586] hover:text-[#0A2540] focus-visible:ring-[#174EA6]"
          }`}
          aria-current={language === item ? "true" : undefined}
        >
          {item === "es" ? "ES" : "EN"}
        </a>
      ))}
    </div>
  );
}
