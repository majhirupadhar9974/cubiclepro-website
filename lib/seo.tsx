import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageSeo } from "@/data/seo";
export function metadata(
  title: string,
  description: string,
  path: string,
  image = "/images/products/hero.webp",
): Metadata {
  const approved = pageSeo[path];
  title = approved?.title || title;
  description = approved?.description || description;
  return {
    title: approved ? { absolute: title } : title,
    description,
    alternates: { canonical: `${site.url}${path}` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title,
      description,
      url: `${site.url}${path}`,
      images: [
        { url: `${site.url}${image}`, width: 1600, height: 1100, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.url}${image}`],
    },
  };
}
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function PageSchema({
  name,
  path,
  type = "WebPage",
}: {
  name: string;
  path: string;
  type?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": type,
        "@id": `${site.url}${path}#page`,
        name,
        url: `${site.url}${path}`,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
      }}
    />
  );
}
