import { createClient } from "next-sanity";

import approvedAssets from "@/data/approved-assets.json";
import { products, type Product } from "@/data/products";

export type PortableBlock = {
  _key?: string;
  _type: string;
  style?: string;
  children?: { _key?: string; _type?: string; text?: string; marks?: string[] }[];
};

export type CmsArticle = {
  title: string;
  slug: { current: string };
  category?: string;
  summary?: string;
  body?: PortableBlock[];
  seoTitle?: string;
  metaDescription?: string;
  canonicalPath?: string;
  indexable?: boolean;
};
export type CmsFaq = { question: string; answer: string; category?: string; order?: number };
export type CmsIndustry = {
  name: string;
  slug: { current: string };
  summary?: string;
  approvedImagePath?: string;
  planningPoints?: string[];
  seoTitle?: string;
  metaDescription?: string;
  canonicalPath?: string;
  indexable?: boolean;
};
export type CmsLocation = {
  city: string;
  slug: { current: string };
  uniqueContent?: PortableBlock[];
  seoTitle?: string;
  metaDescription?: string;
  canonicalPath?: string;
  indexable?: boolean;
};
export type CmsHomepage = { heroHeading?: string; heroSummary?: string; featuredProductSlugs?: string[] };
export type CmsSiteSettings = { primaryPhone?: string; technicalPhone?: string; primaryEmail?: string; salesEmail?: string; announcement?: string };

type CmsProduct = {
  name?: string;
  slug?: string | { current?: string };
  family?: string;
  character?: string;
  description?: string;
  approvedImagePath?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  imageAlt?: string;
  profileSupport?: string;
  hardware?: string;
  configuration?: string;
  publicationStatus?: string;
  displayOrder?: number;
  featured?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  canonicalPath?: string;
  indexable?: boolean;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const client = projectId && dataset
  ? createClient({ projectId: projectId.trim(), dataset: dataset.trim(), apiVersion: "2026-09-28", useCdn: true })
  : null;

function approvedPath(path?: string) {
  return path ? approvedAssets.find((asset) => asset.status === "APPROVED_PUBLIC" && asset.publicPath === path)?.publicPath : undefined;
}

function mergeProduct(raw: CmsProduct, base?: Product): Product | undefined {
  const slug = typeof raw.slug === "string" ? raw.slug : raw.slug?.current;
  if (!slug || raw.publicationStatus !== "published") return undefined;
  const fallbackImage = base?.image || "/images/approved/cubicle-systems/supernova-plus/supernova-plus-main.jpg";
  return {
    slug,
    name: raw.name || base?.name || slug.replace(/-/g, " "),
    family: raw.family || base?.family || "Washroom Solutions",
    profile: raw.profileSupport || base?.profile || "Project-specific",
    hardware: raw.hardware || base?.hardware || "Project-specific",
    character: raw.character || base?.character || "Configured for the project requirement.",
    description: raw.description || base?.description || "Final material, dimensions and configuration are confirmed against the approved project specification.",
    mounting: raw.configuration || base?.mounting || "Project-specific",
    detail: base?.detail || raw.description || "Final details are confirmed against the approved project specification.",
    related: base?.related || [],
    variants: base?.variants,
    image: approvedPath(raw.approvedImagePath) || raw.heroImageUrl || fallbackImage,
    imageAlt: raw.heroImageAlt || raw.imageAlt || base?.imageAlt || `${raw.name || slug} product visual`,
    displayOrder: raw.displayOrder,
    featured: raw.featured,
    seoTitle: raw.seoTitle,
    metaDescription: raw.metaDescription,
    canonicalPath: raw.canonicalPath,
    indexable: raw.indexable,
  };
}

const productProjection = `{name, slug, family, character, description, profileSupport, hardware, configuration, approvedImagePath, "heroImageUrl": heroImage.asset->url, "heroImageAlt": heroImage.alt, imageAlt, publicationStatus, displayOrder, featured, seoTitle, metaDescription, canonicalPath, indexable}`;

export async function getCatalog(): Promise<Product[]> {
  if (!client) return products;
  try {
    const records = await client.fetch<CmsProduct[]>(`*[_type == "product" && publicationStatus == "published"] | order(displayOrder asc, name asc) ${productProjection}`, {}, { next: { revalidate: 300, tags: ["catalog"] } });
    const bySlug = new Map(products.map((base) => [base.slug, base]));
    return records.map((record) => {
      const slug = typeof record.slug === "string" ? record.slug : record.slug?.current;
      return mergeProduct(record, slug ? bySlug.get(slug) : undefined);
    }).filter((item): item is Product => Boolean(item));
  } catch { return products; }
}

export async function getCatalogProduct(slug: string): Promise<Product | undefined> {
  const base = products.find((product) => product.slug === slug);
  if (!client) return base;
  try {
    const record = await client.fetch<CmsProduct | null>(`*[_type == "product" && slug.current == $slug][0] ${productProjection}`, { slug }, { next: { revalidate: 300, tags: [`product:${slug}`] } });
    return record ? mergeProduct(record, base) : undefined;
  } catch { return base; }
}

export async function getHomepage(): Promise<CmsHomepage | null> {
  if (!client) return null;
  try { return await client.fetch('*[_type == "homepage" && publicationStatus == "published"][0]{heroHeading, heroSummary, "featuredProductSlugs": featuredProducts[]->slug.current}', {}, { next: { revalidate: 300, tags: ["homepage"] } }); }
  catch { return null; }
}

export async function getPublishedArticles(): Promise<CmsArticle[]> {
  if (!client) return [];
  try { return await client.fetch('*[_type == "article" && publicationStatus == "published"] | order(_updatedAt desc){title, slug, category, summary, body, seoTitle, metaDescription, canonicalPath, indexable}', {}, { next: { revalidate: 300, tags: ["articles"] } }); }
  catch { return []; }
}
export async function getPublishedArticle(slug: string): Promise<CmsArticle | null> {
  if (!client) return null;
  try { return await client.fetch('*[_type == "article" && slug.current == $slug && publicationStatus == "published"][0]{title, slug, category, summary, body, seoTitle, metaDescription, canonicalPath, indexable}', { slug }, { next: { revalidate: 300, tags: [`article:${slug}`] } }); }
  catch { return null; }
}
export async function getPublishedFaqs(): Promise<CmsFaq[]> {
  if (!client) return [];
  try { return await client.fetch('*[_type == "faq" && publicationStatus == "published"] | order(order asc){question, answer, category, order}', {}, { next: { revalidate: 300, tags: ["faqs"] } }); }
  catch { return []; }
}
export async function getPublishedIndustries(): Promise<CmsIndustry[]> {
  if (!client) return [];
  try { return await client.fetch('*[_type == "industry" && publicationStatus == "published"] | order(name asc){name, slug, summary, approvedImagePath, planningPoints, seoTitle, metaDescription, canonicalPath, indexable}', {}, { next: { revalidate: 300, tags: ["industries"] } }); }
  catch { return []; }
}
export async function getPublishedIndustry(slug: string): Promise<CmsIndustry | null> {
  if (!client) return null;
  try { return await client.fetch('*[_type == "industry" && slug.current == $slug && publicationStatus == "published"][0]{name, slug, summary, approvedImagePath, planningPoints, seoTitle, metaDescription, canonicalPath, indexable}', { slug }, { next: { revalidate: 300, tags: [`industry:${slug}`] } }); }
  catch { return null; }
}
export async function getPublishedLocations(): Promise<CmsLocation[]> {
  if (!client) return [];
  try { return await client.fetch('*[_type == "locationPage" && publicationStatus == "published" && indexable == true] | order(city asc){city, slug, uniqueContent, seoTitle, metaDescription, canonicalPath, indexable}', {}, { next: { revalidate: 300, tags: ["locations"] } }); }
  catch { return []; }
}
export async function getPublishedLocation(slug: string): Promise<CmsLocation | null> {
  if (!client) return null;
  try { return await client.fetch('*[_type == "locationPage" && slug.current == $slug && publicationStatus == "published" && indexable == true && count(uniqueContent[_type == "block"]) > 1][0]{city, slug, uniqueContent, seoTitle, metaDescription, canonicalPath, indexable}', { slug }, { next: { revalidate: 300, tags: [`location:${slug}`] } }); }
  catch { return null; }
}
export async function getPublishedPage(slug: string) {
  if (!client) return null;
  try { return await client.fetch('*[_type == "page" && slug.current == $slug && publicationStatus == "published"][0]{title, slug, summary, body, seoTitle, metaDescription, canonicalPath, indexable}', { slug }, { next: { revalidate: 300, tags: [`page:${slug}`] } }); }
  catch { return null; }
}
export async function getSiteSettings(): Promise<CmsSiteSettings | null> {
  if (!client) return null;
  try { return await client.fetch('*[_type == "siteSettings"][0]{primaryPhone, technicalPhone, primaryEmail, salesEmail, announcement}', {}, { next: { revalidate: 300, tags: ["site-settings"] } }); }
  catch { return null; }
}

export async function listIndexableProducts() {
  if (!client) return [];
  try { return await client.fetch<{ slug: { current: string }; canonicalPath?: string }[]>('*[_type == "product" && publicationStatus == "published" && indexable == true]{slug, canonicalPath}', {}, { next: { revalidate: 300, tags: ["product-sitemap"] } }); }
  catch { return []; }
}
export async function listIndexableLocations() {
  if (!client) return [];
  try { return await client.fetch<{ slug: { current: string }; canonicalPath?: string }[]>('*[_type == "locationPage" && publicationStatus == "published" && indexable == true && count(uniqueContent[_type == "block"]) > 1]{slug, canonicalPath}', {}, { next: { revalidate: 300, tags: ["location-sitemap"] } }); }
  catch { return []; }
}
export async function listIndexableArticles() {
  if (!client) return [];
  try { return await client.fetch<{ slug: { current: string }; canonicalPath?: string }[]>('*[_type == "article" && publicationStatus == "published" && indexable == true]{slug, canonicalPath}', {}, { next: { revalidate: 300, tags: ["article-sitemap"] } }); }
  catch { return []; }
}
export async function listIndexableIndustries() {
  if (!client) return [];
  try { return await client.fetch<{ slug: { current: string }; canonicalPath?: string }[]>('*[_type == "industry" && publicationStatus == "published" && indexable == true]{slug, canonicalPath}', {}, { next: { revalidate: 300, tags: ["industry-sitemap"] } }); }
  catch { return []; }
}
export async function listIndexablePages() {
  if (!client) return [];
  try { return await client.fetch<{ slug: { current: string }; canonicalPath?: string }[]>('*[_type == "page" && publicationStatus == "published" && indexable == true]{slug, canonicalPath}', {}, { next: { revalidate: 300, tags: ["page-sitemap"] } }); }
  catch { return []; }
}

export function approvedCmsImage(path?: string) { return approvedPath(path); }
