"use client";

import { useEffect, useRef, useState } from "react";
import { meta } from "@/lib/data";
import ArrowIcon from "@/components/ui/ArrowIcon";

const INPUT_CLASS =
  "bg-transparent border-b border-[var(--color-grid)] px-0 py-4 outline-none focus:border-[var(--color-lime)] text-[var(--color-white)] w-full mono text-base transition-colors";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="mono text-[11px] uppercase tracking-widest text-[var(--color-muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}

interface ContactProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export default function Contact({ drawerOpen, setDrawerOpen }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reveals = el.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveals.forEach((r) => r.classList.add("visible"));
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    if (drawerOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, setDrawerOpen]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(meta.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    meta.github && { label: "GitHub", href: meta.github },
    meta.linkedin && { label: "LinkedIn", href: meta.linkedin },
    meta.twitter && { label: "Twitter", href: meta.twitter },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="border-t border-[var(--color-grid)] flex flex-col min-h-screen"
    >
      {/* Top eyebrow bar */}
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-16 lg:px-24 py-6 border-b border-[var(--color-grid)] w-full">
        <span className="mono text-xs tracking-widest uppercase text-[var(--color-muted)]">
          Contact
        </span>
        <span className="mono text-xs text-[var(--color-muted)]">03</span>
      </div>

      {/* Main CTA content — centered */}
      <div className="reveal flex-1 flex flex-col gap-3 items-center justify-center text-center px-6 sm:px-8 md:px-16 lg:px-24 py-24 md:py-32 lg:py-40 w-full">
        <p className="mono text-xs uppercase tracking-widest mb-6 text-[var(--color-muted)]">
          Got something in mind?
        </p>

        <h2 className="font-bold leading-none mb-16 text-[clamp(2.5rem,7vw,5.5rem)] tracking-[-0.03em]">
          Let&apos;s build<br />
          something <span className="text-[var(--color-lime)]">real</span>.
        </h2>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => { setDrawerOpen(true); setSubmitted(false); }}
            className="mono font-bold text-sm tracking-widest uppercase px-10 py-5 bg-[var(--color-lime)] text-black transition-all duration-200 border border-[var(--color-lime)] hover:bg-black hover:text-[var(--color-lime)] rounded-none"
          >
            Got an opportunity? →
          </button>
          <button
            onClick={copyEmail}
            className="group flex items-center justify-center gap-3 mono text-sm tracking-widest uppercase px-10 py-5 border border-[var(--color-white)] hover:border-[var(--color-lime)] hover:text-[var(--color-lime)] transition-all duration-200 rounded-none"
          >
            <span className={`w-1.5 h-1.5 shrink-0 ${copied ? 'bg-[var(--color-lime)]' : 'bg-[var(--color-muted)]'}`} />
            {copied ? "Copied!" : meta.email}
          </button>
        </div>

        {/* Social links */}
        {links.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 mono text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-white)] transition-colors duration-200 py-3 px-1"
              >
                {link.label}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-16 lg:px-24 py-5 border-t border-[var(--color-grid)] mono text-xs text-[var(--color-muted)] mt-auto w-full">
        <span>© {new Date().getFullYear()} {meta.fullName}</span>
        <span>{meta.location}</span>
      </div>

      {/* Full Page Form Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--color-black)] drawer-reveal overflow-y-auto drawer">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 md:px-8 md:py-8 lg:px-16 border-b border-[var(--color-grid)] shrink-0">
            <span className="mono text-xs tracking-widest uppercase text-[var(--color-lime)]">
              New Message
            </span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="mono text-sm uppercase tracking-widest hover:text-[var(--color-lime)] text-[var(--color-muted)] transition-colors px-4 py-3 shrink-0"
              aria-label="Close"
            >
              Close ✕
            </button>
          </div>

          {/* 1:1 Split Content */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-[var(--color-grid)]">

            {/* Left Column — New Text */}
            <div className="flex flex-col gap-2 justify-center items-center px-6 sm:px-8 md:px-16 lg:px-24 py-16 lg:py-24">
              <p className="mono text-xs uppercase tracking-widest mb-6 text-[var(--color-muted)]">
                The Details
              </p>
              <h2 className="font-bold leading-none mb-10 text-[clamp(2.5rem,7vw,5rem)] tracking-[-0.03em]">
                What are you<br />
                <span className="text-[var(--color-lime)]">working on?</span>
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-md leading-relaxed mb-16">
                Whether it&apos;s a completely new product, a redesign, or just an idea you want to bounce around, I&apos;m ready to help bring it to life.
              </p>

              <div className="flex items-center gap-3">

                <a href={`mailto:${meta.email}`}
                  aria-label="Email"
                  className="group w-14 h-14 flex items-center justify-center border border-[var(--color-grid)] hover:border-[var(--color-lime)] transition-colors duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="text-[var(--color-muted)] group-hover:text-[var(--color-lime)] transition-colors duration-200">
                    <rect x="2" y="4" width="20" height="16" />
                    <polyline points="2,4 12,13 22,4" />
                  </svg>
                </a>

                <a href={`tel:${meta.phone}`}
                  aria-label="Phone"
                  className="group w-14 h-14 flex items-center justify-center border border-[var(--color-grid)] hover:border-[var(--color-lime)] transition-colors duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="text-[var(--color-muted)] group-hover:text-[var(--color-lime)] transition-colors duration-200">
                    <path d="M6.6 10.8a15.6 15.6 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.6 1 1 0 011 1V18a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.6 3.6a1 1 0 01-.25 1L6.6 10.8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column — Form */}
            <div className=" flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24 py-16 lg:py-24 border-t border-[var(--color-grid)] lg:border-t-0">
              {submitted ? (
                <div className="flex flex-col gap-4">
                  <span className="text-[var(--color-lime)] font-bold leading-none text-[clamp(2rem,4vw,3rem)]">
                    Message sent.
                  </span>
                  <p className="text-base text-[var(--color-muted)] leading-relaxed">
                    I&apos;ll get back to you shortly. Looking forward to it.
                  </p>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="self-start mono text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-white transition-colors mt-6 border-b border-[var(--color-grid)] pb-1"
                  >
                    ← Back to site
                  </button>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-10 w-full max-w-xl pb-16 lg:pb-0"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
                    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
                    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
                    const company = (form.elements.namedItem("company") as HTMLInputElement).value.trim();
                    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

                    // Must provide at least one contact method
                    if (!email && !phone) {
                      setFormError("Please provide at least an email or phone number so I can reach you.");
                      return;
                    }

                    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                      setFormError("That email doesn't look right — double check it.");
                      return;
                    }

                    if (phone && !/^\+?[\d\s\-().]{7,15}$/.test(phone)) {
                      setFormError("That phone number doesn't look right — include your country code e.g. +234...");
                      return;
                    }

                    setFormError("");

                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, email, phone, company, message }),
                      });
                      if (!res.ok) throw new Error("Failed");
                      setSubmitted(true);
                    } catch {
                      setFormError("Something went wrong. Email me directly at shalomatiba90@gmail.com");
                    }
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6">
                    <Field label="Name *">
                      <input name="name" type="text" className={INPUT_CLASS} required />
                    </Field>
                    <Field label="Company (Optional)">
                      <input name="company" type="text" className={INPUT_CLASS} />
                    </Field>
                  </div>

                  {/* Contact methods — at least one required */}
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6">
                      <Field label="Email">
                        <input name="email" type="email" className={INPUT_CLASS} />
                      </Field>
                      <Field label="Phone">
                        <input name="phone" type="tel" className={INPUT_CLASS} placeholder="+234..." />
                      </Field>
                    </div>
                    <p className="mono text-[10px] text-[var(--color-muted)] tracking-widest uppercase mt-1">
                      At least one required
                    </p>
                  </div>

                  <Field label="Message *">
                    <textarea
                      name="message"
                      className={`${INPUT_CLASS} min-h-[160px] resize-none`}
                      required
                    />
                  </Field>

                  {/* Inline error */}
                  {formError && (
                    <p className="mono text-xs text-red-400 tracking-wide -mt-4">{formError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full lg:w-auto lg:self-start mono font-bold uppercase tracking-widest text-sm px-10 py-5 bg-[var(--color-lime)] text-black hover:bg-transparent hover:text-[var(--color-lime)] border border-[var(--color-lime)] transition-all duration-200"
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div >
      )
      }
    </section >
  );
}