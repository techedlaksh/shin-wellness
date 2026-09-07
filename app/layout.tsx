import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "../public/fonts/dm-sans.ttf",
  variable: "--font-sans",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "../public/fonts/lora.ttf", style: "normal" },
    { path: "../public/fonts/lora-italic.ttf", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shin Wellness — Guided movement for what you need today",
  description:
    "Private guided movement sessions for tension, mobility, strength, rest, and energy. Choose from seven flexible themes and begin with one focused hour.",
  openGraph: {
    title: "Shin Wellness — Guided movement for what you need today",
    description:
      "Seven flexible session themes. Private guidance, at your pace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
