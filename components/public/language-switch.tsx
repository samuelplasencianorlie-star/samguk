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
      className={`inline-flex rounded-full border p-1 text-[11px] font-semibold uppercase tracking-[0.12em] backdrop-blur ${
        isLight
          ? "border-white/[0.16] bg-white/[0.06]"
          : "border-[#D8E0E6] bg-white"
      }`}
      aria-label={copy.languageLabel}
    >
      {(["es", "en"] as const).map((item) => (
        <a
          key={item}
          href={getLanguageHref(item)}
          onClick={(event) => {
            event.preventDefault();
            handleChange(item);
          }}
          className={`min-h-8 rounded-full px-2.5 transition-colors ${
            language === item
              ? isLight
                ? "bg-white text-[#0A2540]"
                : "bg-[#0A2540] text-white"
              : isLight
                ? "text-white/62 hover:text-white"
                : "text-[#687586] hover:text-[#0A2540]"
          }`}
          aria-current={language === item ? "true" : undefined}
        >
          {item === "es" ? "ES" : "EN"}
        </a>
      ))}
    </div>
  );
}
