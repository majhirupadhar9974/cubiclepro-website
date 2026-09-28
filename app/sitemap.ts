import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { listIndexableLocations, listIndexablePages } from "@/lib/cms";
import { site } from "@/config/site";
export const dynamic = "force-static";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [locations, pages] = await Promise.all([listIndexableLocations(), listIndexablePages()]);
  return [
    "",
    "products",
    "materials",
    "hardware",
    "applications",
    "about",
    "warranty",
    "contact",
    "locations",
    ...solutions.map((solution) => `solutions/${solution.slug}`),
    ...locations.map((item) => `locations/${item.slug.current}`),
    ...pages.map((item) => `content/${item.slug.current}`),
    ...products.map((p) => `products/${p.slug}`),
  ].map((p) => ({
    url: `${site.url}/${p ? p + "/" : ""}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p === "products" ? 0.9 : 0.7,
  }));
}
