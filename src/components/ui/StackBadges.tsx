interface TechMeta {
  slug?: string;
  color: string; // hex, no '#'
  initials?: string;
}

// Brand color per tech — used for icon tint, hover border, and glow.
// Next.js overridden to off-white since its real brand color (black) is invisible on a black bg.
const techMeta: Record<string, TechMeta> = {
  "Next.js": { slug: "nextdotjs", color: "F0EEE6" },
  "React": { slug: "react", color: "61DAFB" },
  "TypeScript": { slug: "typescript", color: "3178C6" },
  "JavaScript": { slug: "javascript", color: "F7DF1E" },
  "Tailwind CSS": { slug: "tailwindcss", color: "38BDF8" },
  "Node.js": { slug: "nodedotjs", color: "5FA04E" },
  "Google Cloud": { slug: "googlecloud", color: "4285F4" },
  // "Vertex AI": { initials: "VX", color: "4285F4" },
  "Gemini API": { slug: "googlegemini", color: "8E75B2" },
  "Git": { slug: "git", color: "F05032" },
};

// Hand-placed scatter positions (% of container) + size (px) — deliberately uneven, not a grid.
const layout = [
  { top: 15, left: 18, size: 88 },
  { top: 12, left: 55, size: 72 },
  { top: 35, left: 38, size: 104 },
  { top: 10, left: 85, size: 80 },
  { top: 45, left: 10, size: 72 },
  { top: 55, left: 65, size: 88 },
  { top: 50, left: 90, size: 72 },
  { top: 78, left: 35, size: 80 },
  { top: 85, left: 12, size: 72 },
  { top: 80, left: 80, size: 88 },
  { top: 65, left: 45, size: 72 },
  { top: 25, left: 70, size: 64 },
];

interface StackBadgesProps {
  items: string[];
}

export default function StackBadges({ items }: StackBadgesProps) {
  return (
    <div className="relative w-full max-w-2xl h-[460px] sm:h-[520px] lg:h-[560px] mx-auto">
      {items.map((item, i) => {
        const meta = techMeta[item];
        const pos = layout[i % layout.length];
        if (!meta) return null;
        const accent = `#${meta.color}`;

        return (
          <div
            key={item}
            className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={
              {
                top: `${pos.top}%`,
                left: `${pos.left}%`,
                "--accent": accent,
              } as React.CSSProperties
            }
          >
            <div
              className="rounded-full border flex items-center justify-center transition-all duration-300 ease-out border-[var(--color-grid)] bg-[var(--color-black)] group-hover:border-[var(--accent)] group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_0_24px_var(--accent)]"
              style={{ width: pos.size, height: pos.size }}
            >
              {meta.slug ? (
                <img
                  src={`https://cdn.simpleicons.org/${meta.slug}/${meta.color}`}
                  alt={item}
                  className="w-1/2 h-1/2 object-contain grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              ) : (
                <span className="mono font-bold text-xs text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {meta.initials}
                </span>
              )}
            </div>

            {/* Label — appears on hover */}
            <span
              className="mono text-[10px] uppercase tracking-widest mt-2 whitespace-nowrap opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
              style={{ color: "var(--accent)" }}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}