"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import ArrowIcon from "@/components/ui/ArrowIcon";

// Circumference of the ring: 2 * PI * r where r = 40
const RING_CIRCUMFERENCE = 2 * Math.PI * 40; // ≈ 251.33

// Ghost card width as a fraction of viewport width (matches w-[60vw] below)
const GHOST_CARD_VW = 0.6;

// How much of the ghost card must be visible to trigger — 0.85 means the user
// must pull 85% of the ghost card into view before it fires. Deliberate, not accidental.
const TRIGGER_THRESHOLD = 0.85;

// Tile sizes on the 6-col grid — IfáQuant biggest, nothing under col-span-2
const sizeMap: Record<string, string> = {
  "01": "h-[420px] md:h-auto md:col-span-4 md:row-span-2", // IfáQuant
  "02": "h-[320px] md:h-auto md:col-span-2 md:row-span-2", // ExamPadi
  "03": "h-[300px] md:h-auto md:col-span-3 md:row-span-1", // Verta
  "04": "h-[300px] md:h-auto md:col-span-3 md:row-span-1", // notevault
  "05": "h-[300px] md:h-auto md:col-span-3 md:row-span-1", // NACOS
  "06": "h-[300px] md:h-auto md:col-span-3 md:row-span-1", // IOP
};

interface BentoProps {
  onOpenDrawer: () => void;
}

export default function Bento({ onOpenDrawer }: BentoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(false); // guard — fire once per pull

  const [scrollProgress, setScrollProgress] = useState(0); // 0–100, drives progress bar
  const [ringProgress, setRingProgress] = useState(0);      // 0–1, drives SVG ring

  // Intersection observer for stagger animation on desktop grid
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const stagger = el.querySelector(".stagger");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stagger?.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Snap scroll back to last real project card
  const snapBackToLastCard = useCallback(() => {
    const carousel = carouselRef.current;
    const ghost = ghostRef.current;
    if (!carousel || !ghost) return;
    // The ghost card starts at ghost.offsetLeft — snap to just before it
    carousel.scrollTo({ left: ghost.offsetLeft - 16, behavior: "smooth" });
  }, []);

  // Single scroll handler — drives both progress bar and ghost ring
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      const max = scrollWidth - clientWidth;

      // ── Progress bar ──────────────────────────────────────────────────────
      setScrollProgress(max > 0 ? (scrollLeft / max) * 100 : 0);

      // ── Ghost card ring ───────────────────────────────────────────────────
      const ghost = ghostRef.current;
      if (!ghost) return;

      // How many px past the ghost card's left edge has the user scrolled?
      const ghostStart = ghost.offsetLeft;
      const ghostWidth = ghost.offsetWidth || window.innerWidth * GHOST_CARD_VW;
      const pullDistance = scrollLeft - (ghostStart - clientWidth);
      // pullDistance: 0 = ghost card just entering the viewport right edge
      //              ghostWidth = ghost card fully in view

      const rawProgress = Math.max(0, Math.min(1, pullDistance / ghostWidth));
      setRingProgress(rawProgress);

      // ── Trigger ───────────────────────────────────────────────────────────
      if (rawProgress >= TRIGGER_THRESHOLD && !triggeredRef.current) {
        triggeredRef.current = true;
        onOpenDrawer();
        // Small delay so the drawer animation starts before we snap back
        setTimeout(() => {
          snapBackToLastCard();
          // Reset ring after snap completes
          setTimeout(() => {
            setRingProgress(0);
            triggeredRef.current = false;
          }, 500);
        }, 120);
      }

      // Reset guard when user scrolls back away from ghost
      if (rawProgress < 0.1) {
        triggeredRef.current = false;
      }
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [onOpenDrawer, snapBackToLastCard]);

  // Derived ring values
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - ringProgress);
  const showLabel = ringProgress >= 0.4;

  return (
    <section id="projects" ref={sectionRef} className="border-t border-[var(--color-grid)] min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-16 lg:px-24 py-6 border-b border-[var(--color-grid)]">
        <span className="mono text-xs tracking-widest uppercase text-[var(--color-muted)]">
          Selected Work
        </span>
        <span className="mono text-xs text-[var(--color-muted)]">02</span>
      </div>

      {/* ── DESKTOP: bento grid (unchanged) ── */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24">
        <h2 className="text-stroke font-bold mb-16 md:mb-24 text-[clamp(3rem,8vw,6rem)] leading-[0.9]">
          WORK
        </h2>
        <div className="stagger grid grid-cols-1 md:grid-cols-6 md:auto-rows-[220px] gap-3">
          {projects.map((p) => {
            const hasLink = Boolean(p.url);
            const Tag = hasLink ? "a" : "div";
            const tagProps = hasLink
              ? { href: p.url, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Tag
                key={p.id}
                {...tagProps}
                className={`group relative overflow-hidden border-b block hover:border border-lime transition-all duration-300 ease-in-out bg-[#111] rounded-none ${sizeMap[p.id]} ${
                  hasLink ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <Image
                  src={p.image}
                  alt={`${p.name} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.award && (
                  <span className="absolute top-4 left-4 z-10 mono text-xs px-2 py-1 border border-[var(--color-lime)] text-[var(--color-lime)] bg-black/70 max-w-[80%]">
                    {p.award}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between transition-opacity duration-300 group-hover:opacity-0">
                  <div>
                    <p className="mono text-xs uppercase tracking-widest mb-1 text-[var(--color-lime)]">
                      {p.category}
                    </p>
                    <h3 className="font-bold text-[clamp(1.1rem,2vw,1.75rem)]">{p.name}</h3>
                  </div>
                  <span className="mono text-xs text-[var(--color-muted)]">{p.year}</span>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-8 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 backdrop-blur-xs">
                  <p className="mono text-xs uppercase tracking-widest text-[var(--color-lime)]">
                    {p.category} — {p.year}
                  </p>
                  <h3 className="font-bold text-[clamp(1.25rem,2.5vw,2rem)]">{p.name}</h3>
                  <p className="text-sm max-w-xs leading-relaxed text-[var(--color-muted)]">
                    {p.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-xs">
                    {p.stack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="mono text-xs px-2 py-1 border border-[var(--color-grid)] text-[var(--color-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {hasLink && (
                    <span className="flex items-center gap-2 mt-1">
                      <span className="mono text-sm text-[var(--color-lime)]">View Live</span>
                      <ArrowIcon />
                    </span>
                  )}
                </div>
              </Tag>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE: horizontal snap-scroll carousel ── */}
      <div className="lg:hidden flex-1 flex flex-col pt-8 pb-6">
        <div className="px-6 sm:px-8 md:px-16 mb-8">
          <h2 className="text-stroke font-bold text-[clamp(3rem,14vw,5rem)] leading-[0.9]">
            WORK
          </h2>
        </div>

        {/* Carousel track */}
        <div
          ref={carouselRef}
          className="flex flex-row overflow-x-auto snap-x snap-mandatory carousel-hide-scrollbar px-6 sm:px-8 md:px-16 gap-3"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Project cards — snap points */}
          {projects.map((p) => {
            const hasLink = Boolean(p.url);
            const Tag = hasLink ? "a" : "div";
            const tagProps = hasLink
              ? { href: p.url, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Tag
                key={p.id}
                {...tagProps}
                className={`relative shrink-0 w-[85vw] h-[70vh] snap-start overflow-hidden border border-[var(--color-grid)] bg-[#111] rounded-none block ${
                  hasLink ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <Image
                  src={p.image}
                  alt={`${p.name} preview`}
                  fill
                  sizes="85vw"
                  className="object-cover"
                />
                {p.award && (
                  <span className="absolute top-4 left-4 z-10 mono text-xs px-2 py-1 border border-[var(--color-lime)] text-[var(--color-lime)] bg-black/70 max-w-[80%]">
                    {p.award}
                  </span>
                )}
                {/* Always-visible condensed info at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                  <p className="mono text-xs uppercase tracking-widest text-[var(--color-lime)]">
                    {p.category} — {p.year}
                  </p>
                  <h3 className="font-bold text-xl leading-tight">{p.name}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-muted)] line-clamp-2">
                    {p.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {p.stack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="mono text-xs px-2 py-1 border border-[var(--color-grid)] text-[var(--color-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {hasLink && (
                    <span className="flex items-center gap-2 mt-2">
                      <span className="mono text-sm text-[var(--color-lime)]">View Live</span>
                      <ArrowIcon />
                    </span>
                  )}
                </div>
              </Tag>
            );
          })}

          {/* ── Ghost card — pull-to-action, NOT a snap point ── */}
          <div
            ref={ghostRef}
            aria-hidden="true"
            className="relative shrink-0 w-[60vw] h-[70vh] rounded-none border border-dashed border-[var(--color-grid)] bg-[var(--color-black)] flex flex-col items-center justify-center gap-4 overflow-hidden"
            // No snap-start — browser snaps back to last real card on release
          >
            {/* SVG ring + arrow */}
            <div className="relative flex items-center justify-center" style={{ width: 100, height: 100 }}>
              {/* Track ring */}
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="absolute inset-0"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="var(--color-grid)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              {/* Progress ring */}
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="absolute inset-0"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="var(--color-lime)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="butt"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 80ms linear" }}
                />
              </svg>
              {/* Arrow centred inside ring — scaled up */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  opacity: ringProgress > 0 ? 0.4 + ringProgress * 0.6 : 0.3,
                  transition: "opacity 150ms ease",
                }}
              >
                <path
                  d="M3 9L9 3M9 3H4M9 3V8"
                  stroke="var(--color-lime)"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                />
              </svg>
            </div>

            {/* Label — fades in at 40% */}
            <span
              className="mono text-xs uppercase tracking-widest text-[var(--color-lime)]"
              style={{
                opacity: showLabel ? Math.min(1, (ringProgress - 0.4) / 0.2) : 0,
                transform: showLabel ? "translateY(0)" : "translateY(4px)",
                transition: "opacity 200ms ease, transform 200ms ease",
              }}
            >
              Start a project
            </span>
          </div>

          {/* Tiny trailing spacer so ghost card isn't flush against the track edge */}
          <div className="shrink-0 w-6" aria-hidden="true" />
        </div>

        {/* Scroll progress bar */}
        <div className="mt-6 px-6 sm:px-8 md:px-16">
          <div
            className="w-full h-px bg-[var(--color-grid)]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(scrollProgress)}
          >
            <div
              className="h-full bg-[var(--color-lime)] transition-[width] duration-100"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}