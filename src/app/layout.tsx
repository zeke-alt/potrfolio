import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shalom Atiba",
  description:
    "Fullstack engineer, majorly frontend. Based in Ile-Ife, Nigeria. Building things people actually feel.",
  keywords: ["frontend", "fullstack", "Next.js", "React", "TypeScript", "Nigeria"],
  authors: [{ name: "Atiba Shalom Oluyinka" }],
  openGraph: {
    title: "Shalom Atiba",
    description: "Fullstack engineer, majorly frontend. Based in Ile-Ife, Nigeria.",
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