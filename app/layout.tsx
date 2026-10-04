import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteShell from "@/components/site-shell";
import { site } from "@/config/site";
import "./globals.css";
const bodyFont = localFont({
  src: "../public/fonts/inter-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-cp-body",
  adjustFontFallback: "Arial",
  preload: true,
});
const displayFont = localFont({
  src: "../public/fonts/manrope-latin.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-cp-display",
  adjustFontFallback: "Arial",
  preload: true,
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Toilet Cubicles & Washroom Solutions India | Cubiclepro",
    template: "%s | Cubiclepro",
  },
  description:
    "Cubiclepro commercial washroom cubicles, partitions, modesty panels, HPL lockers and coordinated washroom solutions.",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
