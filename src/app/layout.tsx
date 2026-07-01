import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shalom — Frontend Engineer",
  description:
    "Frontend-focused fullstack engineer based in Ile-Ife, Nigeria. Building things that work and look like they mean it.",
  keywords: ["frontend", "fullstack", "Next.js", "React", "TypeScript", "Nigeria"],
  authors: [{ name: "Atiba Shalom Oluyinka" }],
  openGraph: {
    title: "Shalom — Frontend Engineer",
    description:
      "Frontend-focused fullstack engineer based in Ile-Ife, Nigeria.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}