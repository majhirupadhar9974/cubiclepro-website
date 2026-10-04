import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { industries, locations } from "@/data/site-content";
import { articles } from "@/data/content-library";
import { juniorAgeBands, lockerTiers, modestyShapes } from "@/data/approved-gallery";
import { solutions } from "@/data/solutions";
import { site } from "@/config/site";
import { listIndexableArticles, listIndexableIndustries, listIndexableLocations, listIndexablePages, listIndexableProducts } from "@/lib/cms";
export const dynamic="force-static";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const [cmsProducts,cmsArticles,cmsIndustries,cmsLocations,cmsPages]=await Promise.all([listIndexableProducts(),listIndexableArticles(),listIndexableIndustries(),listIndexableLocations(),listIndexablePages()]);
  const productPaths=cmsProducts.length?cmsProducts.map((x)=>`products/${x.slug.current}`):products.map((x)=>`products/${x.slug}`);
  const articlePaths=cmsArticles.length?cmsArticles.map((x)=>`blog/${x.slug.current}`):articles.map((x)=>`blog/${x.slug}`);
  const industryPaths=cmsIndustries.length?cmsIndustries.map((x)=>`industries/${x.slug.current}`):industries.map((x)=>`industries/${x.slug}`);
  const locationPaths=cmsLocations.length?cmsLocations.map((x)=>`locations/${x.slug.current}`):locations.map((x)=>`locations/${x.slug}`);
  const paths=["","products","materials","hardware","applications","about","warranty","contact","technical-enquiry","resources","faq","locations",...solutions.map((x)=>`solutions/${x.slug}`),...productPaths,...juniorAgeBands.map((x)=>`products/junior-series/${x.age}`),...lockerTiers.map((x)=>`products/hpl-lockers/${x.slug}`),...modestyShapes.map((x)=>`products/modesty-panels/${x.slug}`),...articlePaths,...industryPaths,...locationPaths,...cmsPages.map((x)=>`content/${x.slug.current}`)];
  return paths.map((path)=>({url:`${site.url}/${path?`${path}/`:""}`,changeFrequency:path.startsWith("blog/")?"yearly":"monthly",priority:path===""?1:path==="products"?.9:.7}));
}
