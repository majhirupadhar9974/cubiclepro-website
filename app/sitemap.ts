import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { industries, locations } from "@/data/site-content";
import { articles } from "@/data/content-library";
import { juniorAgeBands, lockerTiers, modestyShapes } from "@/data/approved-gallery";
import { solutions } from "@/data/solutions";
import { site } from "@/config/site";
export const dynamic="force-static";
export default function sitemap():MetadataRoute.Sitemap{
  const paths=["","products","materials","hardware","applications","about","warranty","contact","technical-enquiry","resources","faq","locations",...solutions.map((x)=>`solutions/${x.slug}`),...products.map((x)=>`products/${x.slug}`),...juniorAgeBands.map((x)=>`products/junior-series/${x.age}`),...lockerTiers.map((x)=>`products/hpl-lockers/${x.slug}`),...modestyShapes.map((x)=>`products/modesty-panels/${x.slug}`),...articles.map((x)=>`blog/${x.slug}`),...industries.map((x)=>`industries/${x.slug}`),...locations.map((x)=>`locations/${x.slug}`)];
  return paths.map((path)=>({url:`${site.url}/${path?`${path}/`:""}`,changeFrequency:path.startsWith("blog/")?"yearly":"monthly",priority:path===""?1:path==="products"?.9:.7}));
}
