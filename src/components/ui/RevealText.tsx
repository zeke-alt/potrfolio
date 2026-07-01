"use client";

import { useEffect, useRef } from "react";

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  clip?: boolean;
  delay?: number;
}

export default function RevealText({
  children,
  className = "",
  clip = false,
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("visible");
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${clip ? "reveal-clip" : "reveal"} ${className}`}
    >
      {children}
    </div>
  );
}