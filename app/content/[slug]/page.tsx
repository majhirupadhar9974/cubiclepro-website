import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { PageHero, QuoteBand } from "@/components/ui";
import { getPublishedPage } from "@/lib/cms";
import { JsonLd, metadata } from "@/lib/seo";
import { site } from "@/config/site";
type CmsPage = { title: string; slug: { current: string }; summary?: string; body?: unknown[]; seoTitle?: string; metaDescription?: string; canonicalPath?: string; indexable?: boolean };
const safePath = (path: string | undefined, slug: string) => path && path.startsWith("/") && !path.startsWith("//") ? path : `/content/${slug}/`;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const page = await getPublishedPage(slug) as CmsPage | null; if (!page) return {};
  const path = safePath(page.canonicalPath, slug);
  return { ...metadata(page.seoTitle || page.title, page.metaDescription || page.summary || page.title, path), robots: { index: page.indexable === true, follow: true } };
}
export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const page = await getPublishedPage(slug) as CmsPage | null; if (!page) notFound();
  const path = safePath(page.canonicalPath, slug);
  return <><PageHero eyebrow="Cubiclepro" title={page.title} text={page.summary || ""} path={path}/><article className="section container cms-body">{page.body?.length ? <PortableText value={page.body as never} /> : null}</article><JsonLd data={{"@context":"https://schema.org","@type":"WebPage","name":page.title,"url":`${site.url}${path}`,"isPartOf":{"@id":`${site.url}/#website`}}}/><QuoteBand/></>;
}
