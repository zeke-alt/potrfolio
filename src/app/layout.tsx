import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shalom Atiba",
  description:
    "Fullstack engineer, majorly frontend. Based in Ile-Ife, Nigeria. Building things people actually feel.",
  keywords: ["frontend", "fullstack", "Next.js", "React", "TypeScript", "Nigeria"],
  authors: [{ name: "Atiba Shalom Oluyinka" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
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