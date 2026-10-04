import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TechnicalWhatsAppAction } from "@/components/ui";
import { site } from "@/config/site";
import { industries } from "@/data/site-content";
import { approvedCmsImage, getPublishedIndustry } from "@/lib/cms";
import { JsonLd } from "@/lib/seo";

export const dynamicParams = true;
export function generateStaticParams() { return industries.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getPublishedIndustry(slug);
  const fallback = industries.find((item) => item.slug === slug);
  if (!cms && !fallback) return {};
  const name = cms?.name || fallback!.name;
  const description = cms?.metaDescription || cms?.summary || fallback!.description;
  return { title: cms?.seoTitle || `Washroom Solutions for ${name}`, description, robots: cms ? { index: cms.indexable !== false, follow: true } : undefined, alternates: { canonical: cms?.canonicalPath || `/industries/${slug}/` } };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cms = await getPublishedIndustry(slug);
  const fallback = industries.find((item) => item.slug === slug);
  if (!cms && !fallback) notFound();
  const name = cms?.name || fallback!.name;
  const description = cms?.summary || fallback!.description;
  const kicker = fallback?.kicker || "Application planning";
  const image = approvedCmsImage(cms?.approvedImagePath) || fallback?.image || industries[0].image;
  const considerations = cms?.planningPoints?.length ? cms.planningPoints.map((entry) => { const [title, ...body] = entry.split(":"); return { title: title.trim(), body: body.join(":").trim() || entry }; }) : fallback!.considerations;
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `Commercial washroom solutions for ${name}`, provider: { "@id": `${site.url}/#organization` }, areaServed: "India" }} /><header className="cp-industry-hero"><Image src={image} alt={`${name} washroom application visual`} fill priority sizes="100vw" /><div /><section className="container"><p className="cp-kicker">{kicker}</p><h1>Washroom solutions for {name}.</h1><p>{description}</p></section></header><section className="cp-section"><div className="container cp-two-col"><div><p className="cp-kicker">Planning focus</p><h2>Begin with the real operating context.</h2></div><div className="cp-feature-stack">{considerations.map((point, index) => <article key={point.title}><span>0{index + 1}</span><h3>{point.title}</h3><p>{point.body}</p></article>)}</div></div></section><section className="cp-final-cta"><div className="container"><div><h2>Discuss this application.</h2><p>Share your project city, quantity and drawings.</p></div><div className="cp-enquiry-actions"><Link className="cp-button cp-button-accent" href="/contact/">Request a quote ↗</Link><TechnicalWhatsAppAction subject={`${name} application technical details`} /></div></div></section></>;
}
