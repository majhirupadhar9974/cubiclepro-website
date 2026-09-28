import { createClient } from "next-sanity";
import approvedAssets from "@/data/approved-assets.json";
import { products, type Product } from "@/data/products";
type CmsProduct = { name?: string; slug?: string | { current?: string }; family?: string; character?: string; description?: string; approvedImagePath?: string; imageAlt?: string; profileSupport?: string; hardware?: string; configuration?: string; publicationStatus?: string };
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const client = projectId && dataset ? createClient({ projectId, dataset, apiVersion: "2026-09-28", useCdn: true }) : null;
function approvedPath(path?: string) { return path ? approvedAssets.find((asset) => asset.status === "APPROVED_PUBLIC" && asset.publicPath === path)?.publicPath : undefined; }
function mergeProduct(raw: CmsProduct, base?: Product): Product | undefined {
  const slug = typeof raw.slug === "string" ? raw.slug : raw.slug?.current;
  if (!slug || !base || slug !== base.slug || raw.publicationStatus !== "published") return undefined;
  return { ...base, name: raw.name || base.name, family: raw.family || base.family, character: raw.character || base.character, description: raw.description || base.description, profile: raw.profileSupport || base.profile, hardware: raw.hardware || base.hardware, mounting: raw.configuration || base.mounting, image: approvedPath(raw.approvedImagePath) || base.image, imageAlt: raw.imageAlt || base.imageAlt };
}
export async function getCatalog(): Promise<Product[]> {
  if (!client) return products;
  try {
    const records = await client.fetch<CmsProduct[]>('*[_type == "product" && publicationStatus == "published"]{name, slug, family, character, description, profileSupport, hardware, configuration, approvedImagePath, imageAlt, publicationStatus}', {}, { next: { revalidate: 300, tags: ["catalog"] } });
    const bySlug = new Map(records.map((record) => [typeof record.slug === "string" ? record.slug : record.slug?.current || "", record] as const));
    return products.map((base) => mergeProduct(bySlug.get(base.slug) || {}, base) || base);
  } catch { return products; }
}
export async function getCatalogProduct(slug: string): Promise<Product | undefined> {
  const base = products.find((product) => product.slug === slug);
  if (!base || !client) return base;
  try {
    const record = await client.fetch<CmsProduct | null>('*[_type == "product" && slug.current == $slug && publicationStatus == "published"][0]{name, slug, family, character, description, profileSupport, hardware, configuration, approvedImagePath, imageAlt, publicationStatus}', { slug }, { next: { revalidate: 300, tags: [`product:${slug}`] } });
    return record ? mergeProduct(record, base) : base;
  } catch { return base; }
}
export async function getPublishedLocation(slug: string) {
  if (!client) return null;
  try { return await client.fetch('*[_type == "locationPage" && slug.current == $slug && publicationStatus == "published" && indexable == true && count(uniqueContent[_type == "block"]) > 1][0]{city, uniqueContent, seoTitle, metaDescription, canonicalPath}', { slug }, { next: { revalidate: 300, tags: [`location:${slug}`] } }); }
  catch { return null; }
}
export async function getPublishedPage(slug: string) {
  if (!client) return null;
  try { return await client.fetch('*[_type == "page" && slug.current == $slug && publicationStatus == "published"][0]{title, slug, summary, body, seoTitle, metaDescription, canonicalPath, indexable}', { slug }, { next: { revalidate: 300, tags: [`page:${slug}`] } }); }
  catch { return null; }
}
export async function listIndexableLocations() {
  if (!client) return [];
  try { return await client.fetch<{ slug: { current: string }; canonicalPath?: string }[]>('*[_type == "locationPage" && publicationStatus == "published" && indexable == true && count(uniqueContent[_type == "block"]) > 1]{slug, canonicalPath}', {}, { next: { revalidate: 300, tags: ["location-sitemap"] } }); }
  catch { return []; }
}
export async function listIndexablePages() {
  if (!client) return [];
  try { return await client.fetch<{ slug: { current: string }; canonicalPath?: string }[]>('*[_type == "page" && publicationStatus == "published" && indexable == true]{slug, canonicalPath}', {}, { next: { revalidate: 300, tags: ["page-sitemap"] } }); }
  catch { return []; }
}
