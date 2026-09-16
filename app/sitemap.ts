import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/config/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "products",
    "materials",
    "hardware",
    "applications",
    "about",
    "warranty",
    "contact",
    ...products.map((p) => `products/${p.slug}`),
  ].map((p) => ({
    url: `${site.url}/${p ? p + "/" : ""}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p === "products" ? 0.9 : 0.7,
  }));
}
