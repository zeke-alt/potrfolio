"use client";

import { useRef } from "react";

interface MarqueeProps {
  items: string[];
  speed?: number;
}

export default function Marquee({ items, speed = 20 }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-grid m-5 backdrop-blur-xs">
      <div
        ref={trackRef}
        className="marquee-track py-4"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-8 text-sm font-medium text-white"
          >
            {item}
            <span className="inline-block w-1.5 h-1.5 shrink-0 bg-lime" />
          </span>
        ))}
      </div>
    </div>
  );
}