"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LanguageSwitch,
  usePublicLanguage
} from "@/components/public/language-switch";
import { publicTranslations } from "@/lib/public-translations";
import { siteConfig } from "@/lib/site-config";

const navigation = [
  { key: "space", href: "#instalaciones" },
  { key: "training", href: "#actividades" },
  { key: "schedule", href: "#horarios" },
  { key: "registration", href: "#inscripcion-info" },
  { key: "teacher", href: "#profesor" },
  { key: "contact", href: "#contacto" }
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const language = usePublicLanguage();
  const copy = publicTranslations[language].navigation;
  const isHomePage = pathname === "/";
  const isRegistrationPage = pathname === "/inscripcion";
  const cta = isRegistrationPage
    ? { href: "/", label: copy.ctaRegistration }
    : { href: "/inscripcion", label: copy.cta };
  const mobileCta = isRegistrationPage
    ? { href: "/", label: copy.ctaRegistration }
    : { href: "/inscripcion", label: copy.mobileCta };
  const navigationLinks = navigation.map((item) => ({
    ...item,
    label: copy[item.key],
    href: isHomePage ? item.href : `/${item.href}`
  }));

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }

      if (event.key !== "Tab") {
        return;
      }

      const menu = document.querySelector<HTMLElement>("[data-mobile-menu]");
      const focusable = menu?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );

      if (!focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 ${
        isHomePage ? "site-header-home" : "site-header-light"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1440px] items-center justify-between px-3 sm:px-5 lg:px-8 ${
          isHomePage ? "h-[76px] sm:h-[92px]" : "h-[72px]"
        }`}
        aria-label={copy.mobileMenu}
      >
        <Link
          href="/"
          className="header-brand group flex min-w-fit items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#174EA6] focus-visible:ring-offset-4"
          aria-label={copy.homeAria}
        >
          <Image
            src={siteConfig.assets.logo}
            alt=""
            width={1600}
            height={543}
            sizes={
              isHomePage
                ? "(max-width: 640px) 122px, 176px"
                : "(max-width: 640px) 98px, 128px"
            }
            style={{
              width: isHomePage
                ? "clamp(122px, 10vw, 176px)"
                : "clamp(98px, 9vw, 128px)",
              height: "auto"
            }}
          />
        </Link>

        <div className="hidden items-center gap-7 xl:absolute xl:left-1/2 xl:flex xl:-translate-x-1/2">
          {navigationLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link rounded-sm text-[13px] font-semibold text-[#344253] outline-none focus-visible:ring-2 focus-visible:ring-[#174EA6] focus-visible:ring-offset-4"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitch tone={isHomePage ? "light" : "dark"} />
          </div>
          <Link
            href={cta.href}
            className={`header-cta hidden min-h-10 items-center justify-center rounded-[8px] px-3 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:inline-flex sm:min-h-11 sm:px-5 sm:text-sm ${
              isRegistrationPage
                ? "border border-[#CAD2DA] bg-white text-[#0A2540] hover:bg-[#F3F6F8] focus-visible:ring-[#174EA6]"
                : "bg-[#C8102E] text-white hover:bg-[#A50D25] focus-visible:ring-[#C8102E]"
            }`}
          >
            {cta.label}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="header-menu-button inline-grid h-10 w-10 place-items-center rounded-[8px] border border-[#CAD2DA] text-[#0A2540] transition-colors hover:bg-[#F3F6F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174EA6] focus-visible:ring-offset-2 sm:h-11 sm:w-11 xl:hidden"
            aria-label={copy.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={21} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-0 z-[60] h-[100dvh] transition-visibility xl:hidden ${isOpen ? "visible" : "invisible delay-300"}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-[#0A2540]/[0.52] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          aria-label={copy.closeMenu}
          tabIndex={isOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <div
          id="mobile-navigation"
          data-mobile-menu
          className={`absolute right-0 top-0 flex h-full w-[min(88vw,390px)] flex-col bg-white px-6 py-5 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
          aria-label={copy.mobileMenu}
        >
          <div className="flex items-center justify-between border-b border-[#E3E8EC] pb-5">
            <span className="text-sm font-bold tracking-[0.14em] text-[#0A2540]">
              {siteConfig.clubName}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-[6px] border border-[#CAD2DA] text-[#0A2540] hover:bg-[#F3F6F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174EA6]"
              aria-label={copy.closeMenu}
              onClick={closeMenu}
            >
              <X size={21} aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <div className="mb-4">
              <LanguageSwitch tone="dark" />
            </div>
            {navigationLinks.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-[#E8ECEF] py-4 text-xl font-semibold text-[#0A2540] outline-none transition-colors hover:text-[#C8102E] focus-visible:ring-2 focus-visible:ring-[#174EA6]"
                onClick={closeMenu}
              >
                <span className="mr-4 text-xs font-medium tabular-nums text-[#8A96A3]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
          </div>
          <Link
            href={mobileCta.href}
            className={`inline-flex min-h-12 items-center justify-center rounded-[6px] px-5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isRegistrationPage
                ? "border border-[#CAD2DA] bg-white text-[#0A2540] focus-visible:ring-[#174EA6]"
                : "bg-[#C8102E] text-white focus-visible:ring-[#C8102E]"
            }`}
            onClick={closeMenu}
          >
            {mobileCta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
