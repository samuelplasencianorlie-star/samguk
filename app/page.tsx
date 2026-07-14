"use client";

import {
  ArrowDown,
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  Facebook,
  History,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/public/reveal";
import { SiteHeader } from "@/components/public/site-header";
import { usePublicLanguage } from "@/components/public/language-switch";
import { publicTranslations } from "@/lib/public-translations";
import { siteConfig } from "@/lib/site-config";

const quickLinks = [
  { label: "Espacio", href: "#instalaciones", icon: Building2 },
  { label: "Entrenos", href: "#actividades", icon: ShieldCheck },
  { label: "Horarios", href: "#horarios", icon: Clock3 },
  { label: "Inscripción", href: "/inscripcion", icon: ArrowRight }
];

const scheduleBlocks = [...siteConfig.trainingSchedule];
const contactEmailHref = siteConfig.contact.email
  ? `mailto:${siteConfig.contact.email}`
  : undefined;
const contactWhatsappHref = "https://wa.me/34617697771";
const contactMapsHref =
  "https://www.google.com/maps/search/?api=1&query=C%2F%20Obispo%20Antonio%20Tariva%2016%2C%20Cabo%20Blanco%2C%20Arona%2C%20Tenerife%20Sur";
const contactInstagramHref = "https://www.instagram.com/tkdsamguk/";
const contactFacebookHref =
  "https://www.facebook.com/leopoldo.garciaborges/?locale=es_ES";

const contactItems = [
  {
    label: "Teléfono / WhatsApp",
    value: siteConfig.contact.phone || siteConfig.contact.whatsapp,
    action: "Escribir por WhatsApp",
    href: contactWhatsappHref,
    ariaLabel: "Escribir a SAMGUK por WhatsApp",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  {
    label: "Email",
    value: siteConfig.contact.email,
    action: "Enviar email",
    href: contactEmailHref,
    ariaLabel: "Enviar email a SAMGUK"
  },
  {
    label: "Dirección",
    value: siteConfig.contact.address,
    action: "Abrir en Google Maps",
    href: contactMapsHref,
    ariaLabel: "Abrir dirección de SAMGUK en Google Maps",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  {
    label: "Redes sociales",
    value: "@tkdsamguk",
    action: "Ver Instagram",
    href: contactInstagramHref,
    ariaLabel: "Abrir Instagram de SAMGUK",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  {
    label: "Facebook",
    value: "Leopoldo García Borges",
    action: "Ver Facebook",
    href: contactFacebookHref,
    ariaLabel: "Abrir Facebook de Leopoldo García Borges",
    target: "_blank",
    rel: "noopener noreferrer"
  }
];

const coursePhotos = [
  {
    src: siteConfig.assets.photos.trainingStudents,
    alt: "Alumnos de SAMGUK sentados en el tatami",
    className: "aspect-[16/9] min-h-[260px] lg:min-h-[360px]"
  },
  {
    src: siteConfig.assets.photos.trainingTechnique,
    alt: "Alumno de SAMGUK entrenando técnica sobre material",
    className: "aspect-[4/5] min-h-[260px] lg:min-h-[360px]"
  }
];

type PhotoPanelProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

function PhotoPanel({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 1024px) 100vw, 50vw"
}: PhotoPanelProps) {
  return (
    <div
      className={`photo-panel relative isolate overflow-hidden border border-white/[0.14] bg-[#0A2540] shadow-[0_30px_90px_rgba(10,37,64,0.18)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${imageClassName}`}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#071B2D]/50 via-transparent to-white/[0.04]"
        aria-hidden="true"
      />
    </div>
  );
}

export default function Home() {
  const language = usePublicLanguage();
  const copy = publicTranslations[language];
  const home = copy.home;
  const localizedQuickLinks = quickLinks.map((item, index) => ({
    ...item,
    label: home.quick[index] || item.label
  }));
  const localizedGroups = home.training.cards;
  const localizedScheduleBlocks = scheduleBlocks.map((block) => ({
    ...block,
    items: block.items.map((item) => {
      if (language === "es") {
        return item;
      }

      const label =
        item.label === "Curso 1"
          ? "Course 1"
          : item.label === "Curso 2"
            ? "Course 2"
            : item.label === "Curso 3"
              ? "Course 3"
              : item.label === "Curso 4"
                ? "Course 4"
                : "Combat competition technical program";

      return { ...item, label };
    })
  }));
  const localizedContactItems = contactItems.map((item, index) => ({
    ...item,
    ...home.contact.cards[index]
  }));

  return (
    <div className="public-site min-h-screen bg-white text-[#111318]">
      <a
        href="#contenido"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-[6px] bg-[#0A2540] px-4 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Saltar al contenido
      </a>

      <SiteHeader />

      <main id="contenido">
        <section
          className="hero-section relative isolate flex min-h-[780px] items-center justify-center overflow-hidden bg-[#0A2540] px-5 pb-12 pt-[96px] sm:min-h-[840px] lg:min-h-[min(940px,96vh)]"
          aria-labelledby="hero-title"
        >
          <div className="hero-atmosphere" aria-hidden="true" />
          <div
            className="absolute inset-y-0 left-[12%] w-px bg-white/[0.055]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-[12%] w-px bg-white/[0.055]"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 top-0 w-px bg-[#C8102E]/70"
            aria-hidden="true"
          />
          <div className="hero-geometry hero-geometry-centered" aria-hidden="true">
            <span className="hero-watermark">SG</span>
            <span className="hero-spark-field" />
            <span className="hero-kick-arc" />
            <span className="hero-kick-trail" />
            <span className="hero-impact-point" />
            <span className="hero-orbit hero-orbit-one" />
            <span className="hero-orbit hero-orbit-two" />
            <span className="hero-strike hero-strike-one" />
            <span className="hero-core" />
          </div>

          <div className="hero-centered-content relative z-20 mx-auto flex w-full max-w-[1180px] flex-col items-center text-center">
            <div className="hero-emblem-stage hero-rise">
              <div className="hero-brand-badge">
                <div className="hero-brand-mark">
                  <Image
                    src={siteConfig.assets.logo}
                    alt={siteConfig.fullName}
                    width={1600}
                    height={543}
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 500px, 640px"
                    style={{ width: "clamp(280px, 50vw, 640px)", height: "auto" }}
                  />
                </div>
                <div className="hero-brand-line" aria-hidden="true" />
              </div>
            </div>

            <h1 id="hero-title" className="sr-only">
              {siteConfig.fullName}
            </h1>
            <p className="hero-values hero-rise hero-delay-1 mt-8 text-sm font-semibold tracking-[0.18em] text-[#E45D6E] sm:mt-10 sm:text-base">
              {home.hero.label}
            </p>
            <p className="hero-rise hero-delay-2 mt-4 max-w-[34rem] text-base leading-7 text-white/[0.76] sm:text-xl sm:leading-8">
              {copy.site.description}
            </p>
            <div className="hero-rise hero-delay-3 mt-8 flex w-full max-w-[28rem] flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/inscripcion"
                className="hero-primary-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[#C8102E] px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#A50D25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2540] sm:min-w-[12.5rem]"
              >
                {home.hero.primary}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a
                href="#horarios"
                className="hero-secondary-cta inline-flex min-h-12 items-center justify-center rounded-[8px] border border-white/[0.24] bg-white/[0.045] px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:min-w-[10rem]"
              >
                {home.hero.secondary}
              </a>
            </div>

            <a
              href="#acceso-rapido"
              className="scroll-cue hero-rise hero-delay-3 mt-11 inline-flex min-h-11 items-center gap-3 rounded-sm text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.54] outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white sm:mt-14"
            >
              <ArrowDown size={16} aria-hidden="true" />
              {home.hero.scroll}
            </a>
          </div>
        </section>

        <section
          id="acceso-rapido"
          className="scroll-mt-24 border-b border-[#DDE3E8] bg-white"
          aria-label="Acceso rápido"
        >
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-[#DDE3E8] lg:grid-cols-4">
            {localizedQuickLinks.map((item, index) => {
              const Icon = item.icon;
              const isPrimary = item.href.startsWith("/");
              const className =
                `quick-access-link group relative flex min-h-32 items-center justify-between gap-4 overflow-hidden px-5 py-6 outline-none focus-visible:ring-2 focus-visible:ring-[#174EA6] sm:px-6 ${
                  isPrimary
                    ? "bg-[#0A2540] text-white"
                    : "bg-white text-[#0A2540]"
                }`;

              const content = (
                <>
                  <span>
                    <span
                      className={`mb-5 grid h-9 w-9 place-items-center border ${
                        isPrimary
                          ? "border-white/[0.18] text-[#E45D6E]"
                          : "border-[#D8E0E6] text-[#C8102E]"
                      }`}
                    >
                      <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="block text-[10px] font-semibold tabular-nums tracking-[0.12em] opacity-45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-1 block text-lg font-semibold ${
                        isPrimary ? "text-white" : "text-[#0A2540]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    className={`transition-transform group-hover:translate-x-1 ${
                      isPrimary ? "text-white/[0.66]" : "text-[#8995A2]"
                    }`}
                    aria-hidden="true"
                  />
                </>
              );

              if (isPrimary) {
                return (
                  <Link key={item.label} href={item.href} className={className}>
                    {content}
                  </Link>
                );
              }

              return (
                <a key={item.label} href={item.href} className={className}>
                  {content}
                </a>
              );
            })}
          </div>
        </section>

        <section
          id="instalaciones"
          className="space-section relative isolate scroll-mt-24 overflow-hidden bg-[#071B2D] py-20 text-white sm:py-24 lg:py-28"
        >
          <div className="section-orbit section-orbit-left" aria-hidden="true" />
          <div className="relative z-10 mx-auto grid max-w-[1440px] gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
            <Reveal>
              <div className="max-w-xl">
                <p className="section-eyebrow text-[#E45D6E]">
                  {home.space.eyebrow}
                </p>
                <h2 className="mt-4 text-[clamp(2.6rem,5vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
                  {home.space.title}
                </h2>
                <p className="mt-7 max-w-md text-sm leading-6 text-white/[0.68]">
                  {copy.site.description}
                </p>
                <div className="mt-10 grid gap-px overflow-hidden border border-white/[0.14] bg-white/[0.14] sm:grid-cols-2">
                  <div className="bg-white/[0.06] p-5 backdrop-blur">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/[0.42]">
                      {home.space.club}
                    </span>
                    <p className="mt-3 text-lg font-semibold">
                      {siteConfig.fullName}
                    </p>
                  </div>
                  <div className="bg-white/[0.06] p-5 backdrop-blur">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/[0.42]">
                      {home.space.address}
                    </span>
                    <p className="mt-3 text-lg font-semibold">
                      {siteConfig.contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <PhotoPanel
                src={siteConfig.assets.photos.clubSpace}
                alt="Sala de entrenamiento de Samguk Cabo Blanco"
                className="aspect-[16/10] min-h-[360px] lg:min-h-[520px]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </Reveal>
          </div>
        </section>

        <section
          id="actividades"
          className="activities-section relative isolate scroll-mt-24 overflow-hidden bg-[#F4F7FA] py-20 sm:py-24 lg:py-28"
        >
          <div className="relative z-10 mx-auto max-w-[1440px] px-5 lg:px-8">
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end">
                <div>
                  <p className="section-eyebrow">{home.training.eyebrow}</p>
                  <h2 className="section-title mt-4">{home.training.title}</h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-[#687586] lg:justify-self-end">
                  {home.training.intro}
                </p>
              </div>
            </Reveal>

            <div className="courses-media-shell mt-12">
              <div className="courses-media-grid">
                <Reveal>
                  <PhotoPanel
                    src={coursePhotos[0].src}
                    alt={coursePhotos[0].alt}
                    className="course-photo-main h-[300px] sm:h-[420px] lg:h-[560px]"
                    sizes="(max-width: 1024px) 100vw, 64vw"
                  />
                </Reveal>

                <Reveal delay={90}>
                  <div className="courses-media-side">
                    <PhotoPanel
                      src={coursePhotos[1].src}
                      alt={coursePhotos[1].alt}
                      className="course-photo-secondary h-[300px] sm:h-[420px] lg:h-[560px]"
                      sizes="(max-width: 1024px) 100vw, 32vw"
                    />
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {localizedGroups.map((group, index) => (
                <Reveal key={group.title} delay={index * 60}>
                  <article className="course-card group relative flex h-full min-h-[19rem] flex-col justify-between overflow-hidden border border-[#D8E0E6] bg-white p-6 sm:p-7">
                    <div>
                      <div className="flex items-start justify-between gap-5">
                        <span className="grid h-11 w-11 place-items-center border border-[#D8E0E6] text-xs font-semibold tabular-nums text-[#C8102E] transition-colors group-hover:border-[#C8102E]/40">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="h-px flex-1 translate-y-5 bg-[#D8E0E6]"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-10 text-2xl font-semibold leading-7 tracking-[-0.03em] text-[#0A2540]">
                        {group.title}
                      </h3>
                      <div className="mt-7 space-y-3 text-sm leading-6 text-[#4F5F70]">
                        {group.items.map((item) => (
                          <p
                            key={item}
                            className="flex gap-3 border-t border-[#E4EAF0] pt-3"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8102E]"
                              aria-hidden="true"
                            />
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                    <a
                      href="#horarios"
                      className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#174EA6] outline-none transition-colors hover:text-[#C8102E] focus-visible:ring-2 focus-visible:ring-[#174EA6]"
                    >
                      {home.training.seeSchedule}
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="horarios"
          className="schedule-section relative isolate scroll-mt-24 overflow-hidden bg-[#071B2D] py-20 text-white sm:py-24 lg:py-28"
        >
          <div className="section-orbit section-orbit-right" aria-hidden="true" />
          <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
            <Reveal>
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                  <p className="section-eyebrow text-[#E45D6E]">
                    {home.schedule.eyebrow}
                  </p>
                  <h2 className="mt-4 text-[clamp(3rem,7vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.065em]">
                    HORARIOS
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-white/[0.66]">
                  {home.schedule.intro}
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {localizedScheduleBlocks.map((block, blockIndex) => (
                <Reveal key={block.days} delay={blockIndex * 80}>
                  <article className="schedule-card relative h-full overflow-hidden border border-white/[0.14] bg-white/[0.06] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
                    <div
                      className="absolute inset-y-0 left-0 w-1 bg-[#C8102E]"
                      aria-hidden="true"
                    />
                    <div className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/[0.16] text-[#E45D6E]">
                        <CalendarDays size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/[0.42]">
                          {home.schedule.block}{" "}
                          {String(blockIndex + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                          {block.days}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      {block.items.map((item) => {
                        const [start, end] = item.time.split(" — ");

                        return (
                          <div
                            key={`${block.days}-${item.time}-${item.label}`}
                            className="schedule-item group grid gap-4 border border-white/[0.1] bg-white/[0.045] p-4 transition-colors hover:border-white/[0.22] sm:grid-cols-[10rem_1fr] sm:items-center"
                          >
                            <div className="flex items-center gap-3 text-sm font-semibold tabular-nums text-white">
                              <span>{start}</span>
                              <span
                                className="h-px flex-1 bg-[#C8102E]/50"
                                aria-hidden="true"
                              />
                              <span>{end}</span>
                            </div>
                            <p className="text-base font-semibold leading-6 text-white/[0.82]">
                              {item.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="inscripcion-info"
          className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
            <Reveal>
              <div className="cta-panel relative isolate overflow-hidden border border-[#D8E0E6] bg-[#0A2540] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-11">
                <div
                  className="absolute right-[-5rem] top-[-4rem] h-72 w-72 rounded-full border border-white/[0.08]"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[#C8102E] via-white/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                  <div className="max-w-2xl">
                    <p className="section-eyebrow text-[#E45D6E]">
                      {home.enrollment.eyebrow}
                    </p>
                    <h2 className="mt-4 text-[clamp(2.35rem,4.6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
                      {home.enrollment.title}
                    </h2>
                    <p className="mt-6 max-w-lg text-sm leading-6 text-white/[0.7]">
                      {home.enrollment.intro}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/inscripcion"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-[#C8102E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#A50D25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2540]"
                      >
                        {home.enrollment.primary}
                        <ArrowRight size={17} aria-hidden="true" />
                      </Link>
                      <a
                        href="#horarios"
                        className="inline-flex min-h-12 items-center justify-center rounded-[6px] border border-white/[0.18] bg-white/[0.05] px-6 text-sm font-semibold text-white transition-colors hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {home.enrollment.secondary}
                      </a>
                    </div>
                  </div>

                  <div className="grid gap-px overflow-hidden border border-white/[0.14] bg-white/[0.14] sm:grid-cols-3 lg:grid-cols-1">
                    {home.enrollment.steps.map((item, index) => (
                      <div key={item.label} className="bg-white/[0.06] p-5 backdrop-blur">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 place-items-center border border-white/[0.16] text-xs font-semibold tabular-nums text-[#E45D6E]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-base font-semibold">
                            {item.label}
                          </h3>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-white/[0.66]">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="profesor"
          className="scroll-mt-24 bg-[#F4F7FA] py-20 sm:py-24 lg:py-28"
        >
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
            <Reveal>
              <PhotoPanel
                src={siteConfig.assets.photos.teacherHistorical}
                alt="Leopoldo García con dobok y cinturón negro"
                className="aspect-[5/6] max-h-[640px] border-[#D8E0E6] bg-white"
                imageClassName="object-[50%_42%]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="teacher-panel border border-[#D8E0E6] bg-white p-6 sm:p-8 lg:p-10">
                <UserRound
                  size={26}
                  strokeWidth={1.5}
                  className="text-[#C8102E]"
                  aria-hidden="true"
                />
                <p className="section-eyebrow mt-8">
                  {home.teacher.eyebrow}
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#0A2540] sm:text-5xl lg:text-6xl">
                  {siteConfig.teacher.name}
                </h2>
                <div className="mt-9 divide-y divide-[#E1E7ED] border-y border-[#E1E7ED] text-sm text-[#4F5F70]">
                  {siteConfig.teacher.credentials.map((item) => (
                    <p key={item} className="py-4">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="historia"
          className="history-section relative isolate scroll-mt-24 overflow-hidden bg-[#061727] py-20 text-white sm:py-24 lg:py-28"
        >
          <div className="section-orbit section-orbit-left" aria-hidden="true" />
          <div className="relative z-10 mx-auto grid max-w-[1440px] gap-10 px-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/72 backdrop-blur">
                  <History
                    size={17}
                    strokeWidth={1.6}
                    className="text-[#E1253E]"
                    aria-hidden="true"
                  />
                  {home.history.eyebrow}
                </div>
                <h2 className="mt-7 text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  {home.history.title}
                </h2>
                <p className="mt-7 max-w-xl text-base leading-8 text-white/72 sm:text-lg">
                  {home.history.intro}
                </p>
                <Link
                  href="/historia"
                  className="history-cta mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-[#C8102E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#E1253E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#061727]"
                >
                  {home.history.cta}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative">
                <div className="history-image-frame relative min-h-[360px] overflow-hidden border border-white/[0.13] bg-[#0A2540] sm:min-h-[460px] lg:min-h-[540px]">
                  <Image
                    src={siteConfig.assets.photos.historyReception}
                    alt="Leopoldo García en la recepción de SAMGUK"
                    fill
                    className="object-cover object-[50%_44%]"
                    sizes="(max-width: 1024px) 100vw, 54vw"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,23,39,0.02),rgba(6,23,39,0.54)),linear-gradient(90deg,rgba(6,23,39,0.36),transparent_42%,rgba(6,23,39,0.08))]"
                    aria-hidden="true"
                  />
                  <div className="absolute left-5 top-5 border border-white/[0.18] bg-[#061727]/55 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md sm:left-6 sm:top-6">
                    SAMGUK
                  </div>
                </div>
                <div className="history-timeline relative mx-4 -mt-8 grid gap-0 border border-white/[0.12] bg-[#071B2D]/88 p-5 backdrop-blur-xl sm:mx-8 sm:grid-cols-2 sm:p-6 lg:-mt-12">
                  {home.history.highlights.map((item, index) => (
                    <div
                      key={item.label}
                      className="history-timeline-item relative py-5 pl-10 sm:px-8 sm:py-4"
                    >
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#E1253E]">
                        {String(index + 1).padStart(2, "0")} · {item.label}
                      </span>
                      <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="contacto"
          className="contact-section relative isolate scroll-mt-24 overflow-hidden bg-[#F4F7FA] py-20 sm:py-24 lg:py-28"
        >
          <div className="relative z-10 mx-auto max-w-[1440px] px-5 lg:px-8">
            <Reveal>
              <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
                <div className="contact-intro-panel flex min-h-[360px] flex-col justify-between border border-[#D8E0E6] bg-white p-6 sm:p-8 lg:p-10">
                  <div>
                    <p className="section-eyebrow">{home.contact.title}</p>
                    <h2 className="section-title mt-4">{home.contact.title}</h2>
                    <p className="mt-6 max-w-md text-sm leading-6 text-[#687586]">
                      {copy.site.officialContact}
                    </p>
                  </div>
                  <div className="mt-9 border-t border-[#D8E0E6] pt-6">
                    <Link
                      href="/inscripcion"
                      className="contact-main-cta inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-[#C8102E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#A50D25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2 sm:w-auto"
                    >
                      {home.contact.primary}
                      <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {localizedContactItems.map((item, index) => {
                    const icons = [Phone, Mail, MapPin, Instagram, Facebook];
                    const Icon = icons[index] || ShieldCheck;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.target}
                        rel={item.rel}
                        aria-label={item.ariaLabel}
                        className="contact-card group relative flex min-h-[220px] flex-col overflow-hidden border border-[#D8E0E6] bg-white p-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#174EA6] focus-visible:ring-offset-2 sm:p-7"
                      >
                        <span className="contact-icon grid h-12 w-12 place-items-center border border-[#D8E0E6] bg-[#F4F7FA] text-[#C8102E] transition-colors">
                          <Icon size={19} strokeWidth={1.65} aria-hidden="true" />
                        </span>
                        <span className="mt-8 block text-lg font-semibold text-[#0A2540]">
                          {item.label}
                        </span>
                        <span className="mt-3 block flex-1 text-sm leading-6 text-[#5B6877]">
                          {item.value}
                        </span>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C8102E]">
                          {item.action}
                          <ArrowRight
                            size={16}
                            strokeWidth={1.8}
                            className="transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#071B2D] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-14 lg:px-8 lg:py-16">
          <div className="grid gap-12 border-b border-white/[0.14] pb-12 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.8fr]">
            <div>
              <Link
                href="/admin/login"
                aria-label="Acceso privado del club"
                className="group inline-flex flex-col items-start gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#071B2D]"
              >
                <span className="inline-flex border border-white/[0.16] bg-white/[0.08] p-2 shadow-[0_18px_54px_rgba(0,0,0,0.18)] backdrop-blur transition duration-200 group-hover:border-white/[0.28] group-hover:bg-white/[0.11] group-hover:shadow-[0_20px_62px_rgba(200,16,46,0.12)]">
                  <Image
                    src={siteConfig.assets.logo}
                    alt={siteConfig.fullName}
                    width={1600}
                    height={543}
                    sizes="220px"
                    className="transition duration-200 group-hover:opacity-95"
                    style={{ width: "220px", height: "auto" }}
                  />
                </span>
                <span className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/[0.34] transition-colors duration-200 group-hover:text-white/[0.62]">
                  {home.footer.access}
                </span>
              </Link>
              <p className="mt-6 max-w-sm text-sm leading-6 text-white/[0.58]">
                {copy.site.description}
              </p>
              <p className="mt-4 text-sm leading-6 text-white/[0.46]">
                {siteConfig.contact.address}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/[0.46]">
                {home.footer.information}
              </p>
              <div className="mt-5 flex flex-col gap-1 text-sm text-white/70">
                <a href="#instalaciones" className="footer-link">
                  {home.quick[0]}
                </a>
                <a href="#actividades" className="footer-link">
                  {home.quick[1]}
                </a>
                <a href="#horarios" className="footer-link">
                  {home.quick[2]}
                </a>
                <a href="#inscripcion-info" className="footer-link">
                  {home.quick[3]}
                </a>
                <a href="#profesor" className="footer-link">
                  {copy.navigation.teacher}
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/[0.46]">
                {home.footer.club}
              </p>
              <div className="mt-5 flex flex-col gap-1 text-sm text-white/70">
                <a href="#historia" className="footer-link">
                  {home.footer.history}
                </a>
                <a href="#contacto" className="footer-link">
                  {home.contact.title}
                </a>
                <Link href="/legal/privacidad" className="footer-link">
                  {home.footer.privacy}
                </Link>
                <Link href="/legal/aviso-legal" className="footer-link">
                  {home.footer.legal}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-7 text-xs text-white/[0.42] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {siteConfig.fullName}</p>
            <p>{siteConfig.contact.phone} · {siteConfig.contact.email}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
