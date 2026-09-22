import type { PublicLanguage } from "@/lib/public-translations";
import { siteConfig } from "@/lib/site-config";

type ScheduleItem = {
  time: string;
  label: string;
  detail?: string;
};

type CourseCopy = Record<PublicLanguage, { label: string; detail?: string }>;

const courseCopy: Record<string, CourseCopy> = {
  "Curso 1": {
    es: { label: "Curso 1", detail: "De 5 a 8 años" },
    en: { label: "Course 1", detail: "Ages 5–8" }
  },
  "Curso 2": {
    es: { label: "Curso 2", detail: "De 9 a 12 años" },
    en: { label: "Course 2", detail: "Ages 9–12" }
  },
  "Curso 3": {
    es: { label: "Curso 3", detail: "Competición" },
    en: { label: "Course 3", detail: "Competition" }
  },
  "Curso 4": {
    es: { label: "Curso 4", detail: "Más de 13 años" },
    en: { label: "Course 4", detail: "Over 13 years old" }
  },
  "Curso 5": {
    es: { label: "Curso 5", detail: "De 5 a 7 años" },
    en: { label: "Course 5", detail: "Ages 5–7" }
  },
  "Curso 6": {
    es: { label: "Curso 6", detail: "De 8 a 12 años" },
    en: { label: "Course 6", detail: "Ages 8–12" }
  },
  "Entrenamiento Funcional + GAP": {
    es: { label: "Entrenamiento Funcional + GAP" },
    en: { label: "Functional Training + GAP" }
  },
  "Programa de Tecnificación de competiciones de combate": {
    es: { label: "Programa de Tecnificación de competiciones de combate" },
    en: { label: "Combat competition technical program" }
  }
};

export function getPublicSchedule(language: PublicLanguage) {
  return siteConfig.trainingSchedule.map((block) => {
    const items: ScheduleItem[] = [...block.items];

    if (block.days === "Lunes · Miércoles · Viernes") {
      items.unshift({
        time: "09:30 — 10:30",
        label: "Entrenamiento Funcional + GAP"
      });
    } else if (block.days === "Martes · Jueves") {
      items.unshift(
        { time: "16:15 — 17:15", label: "Curso 5" },
        { time: "17:20 — 18:20", label: "Curso 6" }
      );
    }

    return {
      ...block,
      items: items.map((item) => ({
        ...item,
        ...courseCopy[item.label]?.[language]
      }))
    };
  });
}
