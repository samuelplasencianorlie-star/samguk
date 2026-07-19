"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { spaceCarouselImages } from "@/lib/space-carousel-images";

const AUTOPLAY_DELAY = 5000;
const SWIPE_THRESHOLD = 48;

export function SpaceCarousel() {
  const images = spaceCarouselImages;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPausedByHover, setIsPausedByHover] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [manualInteraction, setManualInteraction] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;

  const currentImage = images[activeIndex];

  const goTo = useCallback(
    (nextIndex: number, fromUser = false) => {
      if (!total) return;

      const normalizedIndex = (nextIndex + total) % total;
      setActiveIndex(normalizedIndex);

      if (fromUser) {
        setManualInteraction((value) => value + 1);
      }
    },
    [total]
  );

  const goToPrevious = useCallback(() => {
    goTo(activeIndex - 1, true);
  }, [activeIndex, goTo]);

  const goToNext = useCallback(
    (fromUser = true) => {
      goTo(activeIndex + 1, fromUser);
    },
    [activeIndex, goTo]
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(!document.hidden);
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (
      total <= 1 ||
      isPausedByHover ||
      !isDocumentVisible ||
      prefersReducedMotion
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      goToNext(false);
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    activeIndex,
    goToNext,
    isDocumentVisible,
    isPausedByHover,
    manualInteraction,
    prefersReducedMotion,
    total
  ]);

  const statusText = useMemo(
    () => `Imagen ${activeIndex + 1} de ${total}`,
    [activeIndex, total]
  );

  if (!currentImage) {
    return null;
  }

  return (
    <div
      className="space-carousel group relative"
      role="region"
      aria-label="Fotografias del espacio de SAMGUK"
      aria-roledescription="carrusel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goToPrevious();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          goToNext();
        }
      }}
      onMouseEnter={() => setIsPausedByHover(true)}
      onMouseLeave={() => setIsPausedByHover(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;

        const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const distance = touchStartX.current - endX;
        touchStartX.current = null;

        if (Math.abs(distance) < SWIPE_THRESHOLD) return;

        if (distance > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }}
    >
      <div className="relative aspect-[16/10] min-h-[360px] overflow-hidden rounded-[2rem] border border-white/[0.16] bg-[#061522] shadow-[0_34px_90px_rgba(0,0,0,0.34)] outline-none ring-1 ring-white/[0.08] lg:min-h-[520px]">
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(3,13,24,0.04),rgba(3,13,24,0.2))]" />
        <Image
          key={currentImage.src}
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 92vw, 58vw"
          className="space-carousel-image object-cover"
          draggable={false}
          style={{ objectPosition: currentImage.objectPosition ?? "50% 50%" }}
        />

        <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#061522]/65 to-transparent" />

        <button
          type="button"
          className="absolute left-4 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.18] bg-[#061522]/42 text-white shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:border-white/[0.36] hover:bg-white/[0.13] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-5"
          aria-label="Ver fotografia anterior del espacio"
          onClick={goToPrevious}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="absolute right-4 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.18] bg-[#061522]/42 text-white shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:border-white/[0.36] hover:bg-white/[0.13] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-5"
          aria-label="Ver fotografia siguiente del espacio"
          onClick={() => goToNext()}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" aria-label={statusText}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-9 bg-[#E71D36]"
                : "w-1.5 bg-white/[0.28] hover:bg-white/[0.48]"
            }`}
            aria-label={`Ver fotografia ${index + 1} del espacio`}
            aria-current={activeIndex === index}
            onClick={() => goTo(index, true)}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {statusText}
      </p>
    </div>
  );
}
