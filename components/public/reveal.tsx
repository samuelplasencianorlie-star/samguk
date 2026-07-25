"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const revealIfAlreadyInView = () => {
      const rect = element.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.92) {
        setIsVisible(true);
        return true;
      }

      return false;
    };

    if (revealIfAlreadyInView()) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 12% 0px", threshold: 0.08 }
    );

    observer.observe(element);

    const fallbackId = window.setTimeout(() => {
      revealIfAlreadyInView();
    }, 650);

    return () => {
      window.clearTimeout(fallbackId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`reveal ${isVisible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
