"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/data";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rows = el.querySelectorAll(".project-row");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="border-t border-[var(--color-grid)]"
    >
      {/* Section label */}
      <div
        className="flex items-center justify-between px-8 md:px-16 py-4 border-b border-[var(--color-grid)]"
      >
        <span
          className="mono text-xs tracking-widest uppercase text-[var(--color-muted)]"
        >
          Projects
        </span>
        <span className="mono text-xs text-[var(--color-muted)]">
          03
        </span>
      </div>

      <div className="flex flex-col">
        {projects.map((project, i) => {
          const Tag = project.url ? "a" : "div";
          const tagProps = project.url
            ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <Tag
              key={project.id}
              {...tagProps}
              className={`project-row reveal-clip group block border-b px-8 md:px-16 py-10 transition-colors duration-300 border-[var(--color-grid)] hover:bg-[#101010] bg-transparent ${
                project.url ? "cursor-pointer" : "cursor-default"
              }`}>
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
                {/* Index */}
                <span
                  className="mono text-sm shrink-0 md:w-16 text-[var(--color-muted)]"
                >
                  {project.id}
                </span>

                {/* Name + tagline */}
                <div className="flex-1 md:pr-12">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3
                      className="font-bold text-[clamp(1.5rem,3vw,2.25rem)]"
                    >
                      {project.name}
                    </h3>
                    {project.award && (
                      <span
                        className="mono text-xs px-2 py-1 border border-[var(--color-lime)] text-[var(--color-lime)]"
                      >
                        {project.award}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm leading-relaxed max-w-xl text-[var(--color-muted)]"
                  >
                    {project.tagline}
                  </p>
                </div>

                {/* Role */}
                <div className="md:w-48 shrink-0">
                  <p
                    className="mono text-xs uppercase tracking-widest mb-1 text-[var(--color-muted)]"
                  >
                    Role
                  </p>
                  <p className="text-sm">{project.role}</p>
                </div>

                {/* Stack tags */}
                <div className="md:w-64 shrink-0 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="mono text-xs px-2 py-1 border border-[var(--color-grid)] text-[var(--color-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="shrink-0 md:w-12 flex md:justify-end">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <path
                      d="M3 9L9 3M9 3H4M9 3V8"
                      stroke="var(--color-lime)"
                      strokeWidth="1.2"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}