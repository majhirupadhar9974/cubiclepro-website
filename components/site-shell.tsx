"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Motion, MobileActions } from "@/components/motion";
import { JsonLd } from "@/lib/seo";
import { site } from "@/config/site";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/studio" ||
    pathname.startsWith("/studio/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
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
    </>
  );
}
