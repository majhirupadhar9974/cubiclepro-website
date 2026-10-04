import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";

import { TechnicalWhatsAppAction } from "@/components/ui";
import { site } from "@/config/site";
import { articles } from "@/data/content-library";
import { getPublishedArticle } from "@/lib/cms";
import { JsonLd } from "@/lib/seo";

export const dynamicParams = true;
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getPublishedArticle(slug);
  const fallback = articles.find((item) => item.slug === slug);
  if (!cms && !fallback) return {};
  const title = cms?.seoTitle || fallback?.seoTitle || cms?.title || "CubiclePro guide";
  const description = cms?.metaDescription || fallback?.metaDescription || cms?.summary || "";
  const canonical = cms?.canonicalPath || `/blog/${slug}/`;
  return { title, description, robots: cms ? { index: cms.indexable !== false, follow: true } : undefined, alternates: { canonical }, openGraph: { title, description, url: canonical, type: "article" } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cms = await getPublishedArticle(slug);
  const fallback = articles.find((item) => item.slug === slug);
  if (!cms && !fallback) notFound();
  const title = cms?.title || fallback!.title;
  const summary = cms?.summary || fallback!.summary;
  const category = cms?.category || fallback!.category;
  const description = cms?.metaDescription || fallback!.metaDescription;
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: title, description, author: { "@type": "Organization", name: site.name }, publisher: { "@id": `${site.url}/#organization` }, mainEntityOfPage: `${site.url}/blog/${slug}/` }} /><article className="cp-article-page"><header><div className="container"><p className="cp-kicker">{category} · {fallback?.readTime || "Guide"}</p><h1>{title}</h1><p>{summary}</p></div></header><div className="container cp-article-body">{cms?.body?.length ? <PortableText value={cms.body as never} /> : fallback!.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<aside><h2>Continue the conversation</h2><p>Share your application, project city, approximate quantity and any available drawing.</p><div className="cp-enquiry-actions"><Link className="cp-button cp-button-accent" href="/contact/">Request a quote ↗</Link><TechnicalWhatsAppAction subject={`${title} technical question`} /></div></aside></div></article></>;
}
