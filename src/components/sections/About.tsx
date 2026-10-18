"use client";

import { useEffect, useRef } from "react";
import { meta } from "@/lib/data";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const stagger = el.querySelector(".stagger");
    const reveals = el.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stagger?.classList.add("visible");
          reveals.forEach((r) => r.classList.add("visible"));
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "Based in", value: "Nigeria" },
    { label: "Education", value: "OAU, 300L CS MATH" },
    { label: "Experience", value: "4 Years" },
    { label: "Hackathons", value: "02" },
    { label: "Focus", value: "Frontend web dev" },
    { label: "Status", value: "Open to Work" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full border-t border-[var(--color-grid)] flex flex-col min-h-screen"
    >
      {/* Section label */}
      <div className="w-full border-b border-[var(--color-grid)]">
        <div className="flex items-center justify-between px-6 sm:px-8 md:px-16 lg:px-24 py-6">
          <span className="mono text-xs tracking-widest uppercase text-[var(--color-muted)]">
            About
          </span>
          <span className="mono text-xs text-[var(--color-muted)]">
            01
          </span>
        </div>
      </div>

      {/* Content grid */}
      <div className="flex-1 flex flex-col justify-center w-full px-6 sm:px-8 md:px-16 lg:px-24 py-24 md:py-32 lg:py-40">
        <h2 className="text-stroke font-bold mb-16 md:mb-24 text-[clamp(3rem,8vw,6rem)] leading-[0.9]">
          ABOUT
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          {/* Bio - left */}
          <div className="reveal flex flex-col justify-center lg:col-span-2">
            <h2 className="font-bold mb-10 leading-tight text-[clamp(5rem,4vw,3.5rem)]">
              I build things that
              <br />
              <span className="text-[var(--color-lime)]">work</span> and look
              <br />
              like they mean it.
            </h2>
            <div className="flex flex-col gap-6 text-justify max-w-[1400px] mx-auto w-full">
              <p className="text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
                I care about the gap between working and working well, and I've spent years learning to close it. <br/>
                I'm a fullstack engineer, but the interface is where I do my best work: the detail in a transition, the weight of a typeface, the way a layout breathes. It's where logic meets feel. I've built across the stack, from databases and APIs to AI integrations, but I always come back to what people actually touch.
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
                I'm studying Computer Science at OAU, and I build like I've been at it far longer, because I have. I've shipped for clients, contributed to teams like [NACOS OAU / GDG OAU], and taken ideas from a room to a working product. [One concrete win here: what it was, what it did.]
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
                Outside the editor, I play guitar and basketball, and I write about the things that move me. I'm drawn to Japanese art for how it commits to pattern and intention, and I try to bring that same commitment to my interfaces.
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-[var(--color-muted)]">
                My goal is simple: build the solutions Africa is still waiting on, and put a suit of armor around everyone who uses them.
              </p>
            </div>
          </div>

          {/* Stats - right - Bento Grid */}
          <div className="mt-12 lg:mt-0 flex items-center justify-center lg:col-span-1">
            <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-center p-6 md:p-8 transition-all duration-300 group cursor-default border border-[var(--color-grid)] bg-white/[0.03] hover:border-[rgba(200,245,0,0.3)] hover:bg-white/[0.05]"
                >
                  <span className="mono text-xs md:text-sm uppercase tracking-widest mb-3 text-[var(--color-muted)]">
                    {stat.label}
                  </span>
                  <span className="font-medium text-xl md:text-2xl transition-colors duration-300 text-[var(--color-white)]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}