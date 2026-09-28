import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Motion, MobileActions } from "@/components/motion";
import { JsonLd } from "@/lib/seo";
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
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileActions />
        <Motion />
        <Analytics />
        <SpeedInsights />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${site.url}/#organization`,
                name: site.name,
                url: site.url,
                logo: `${site.url}/images/brand/logo.png`,
                telephone: site.tel,
                email: site.email,
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "Shop No. 02, Hasnain Complex, In Mohammedi Park, Behind Canal, Fatehwadi",
                  addressLocality: "Ahmedabad",
                  addressRegion: "Gujarat",
                  postalCode: "380055",
                  addressCountry: "IN",
                },
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                name: site.name,
                url: site.url,
                publisher: { "@id": `${site.url}/#organization` },
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
