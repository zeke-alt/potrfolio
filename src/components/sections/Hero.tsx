"use client";

import { meta, stack } from "@/lib/data";
import Typewriter from "@/components/ui/Typewriter";
import Marquee from "@/components/ui/Marquee";
import StackBadges from "@/components/ui/StackBadges";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-between w-full relative">
      {/* Top bar */}
      <div className="w-full border-b border-[var(--color-grid)] sticky top-0 z-50 bg-[var(--color-black)]">
        <div className="mx-auto w-full flex items-center justify-between px-6 sm:px-8 md:px-16 lg:px-24 py-3">
          <span className="mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
            {meta.fullName}
          </span>

          <div className="flex items-center gap-6">
            <a
              href="/cv.pdf"
              download="Atiba_Shalom_CV.pdf"
              className="group flex items-center gap-2 mono text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-lime)] transition-colors duration-200"
            >
              CV
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="transition-transform duration-200 group-hover:translate-y-0.5">
                <path d="M12 3v13M5 16l7 7 7-7" />
              </svg>
            </a>

            <span className="mono text-xs flex items-center gap-2 text-[var(--color-lime)]">
              <span className="inline-block w-2 h-2 bg-[var(--color-lime)] shadow-[0_0_10px_var(--color-lime)]" />
              {meta.status}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile background texture — badges behind hero text */}
      <div className="lg:hidden absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.08]">
        <StackBadges items={stack} />
      </div>

      {/* Main hero content — 1:1 split, stacks on mobile */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left — text content */}
        <div className="relative z-10 flex flex-col justify-center gap-16 px-6 sm:px-8 md:px-16 lg:px-24 py-24 md:py-32 lg:py-0">
          <div className="flex flex-col gap-6">
            <p className="mono text-xs tracking-widest uppercase text-[var(--color-muted)]">
              {meta.location} — {meta.school}
            </p>

            <div className="flex flex-col gap-3">
              <h1
                className="font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(3rem,14vw,5rem)] lg:text-[var(--text-display)]"
              >
                <span className="text-[var(--color-lime)]">{meta.LastName}{" "}</span>
                <br className="lg:hidden" />
                {meta.FirstName}
                <span className="text-[var(--color-lime)]">.</span>
              </h1>

              <h2 className="font-medium text-[clamp(1.5rem,4vw,2.5rem)] text-[var(--color-muted)]">
                <Typewriter words={meta.role} speed={75} pause={2000} />
              </h2>
            </div>
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col gap-8 max-w-lg">
            <p className="text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
              Building interfaces that feel intentional.
              <br />
              Frontend-first. Fullstack when it counts.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="mono text-sm tracking-widest uppercase px-10 py-4 lg:py-5 border border-[var(--color-white)] text-[var(--color-white)] transition-all duration-300 hover:bg-[var(--color-white)] hover:text-black"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="mono text-sm tracking-widest uppercase px-10 py-4 lg:py-5 border border-[var(--color-lime)] text-[var(--color-lime)] transition-all duration-300 hover:bg-[var(--color-lime)] hover:text-black"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Right — stack badge grid (desktop only) */}
        <div className="hidden lg:flex items-center justify-center px-6 sm:px-8 md:px-16 lg:px-24 py-12 lg:py-0">
          <StackBadges items={stack} />
        </div>
      </div>

      {/* Marquee strip — full-bleed to break out of body padding */}
      <div className="full-bleed">
        <Marquee items={stack} speed={25} />
      </div>
    </section>
  );
}