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
  title: "Shin Wellness — A little space for you",
  description:
    "A softer approach to everyday wellbeing. Explore personal reset sessions, mindful routines, and little things that help you feel like yourself again.",
  openGraph: {
    title: "Shin Wellness — A little space for you",
    description: "Personal support. Small rituals. Wellbeing at your own pace.",
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
