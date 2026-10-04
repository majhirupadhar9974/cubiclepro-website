import { mainCategories } from "@/data/site-content";
import { articles, faqs } from "@/data/content-library";
import { products } from "@/data/products";
import { site } from "@/config/site";
export const dynamic="force-static";
export function GET(){const text=[`# ${site.name}`,`Website: ${site.url}`,`Sales / WhatsApp: ${site.phone}`,`Technical / WhatsApp: ${site.technicalPhone}`,`Email: ${site.email}`,`Sales email: ${site.salesEmail}`,"","## Main categories",...mainCategories.map((x)=>`- ${x.name}: ${site.url}${x.href}`),"","## Restroom cubicle systems",...products.slice(0,9).map((x)=>`- ${x.name}: ${x.profile}; ${x.hardware}; ${site.url}/products/${x.slug}/`),"- Custom configurations: available subject to site conditions, technical feasibility and approved specification.","","## Resources",...articles.map((x)=>`- ${x.h1}: ${site.url}/blog/${x.slug}/`),"","## Common questions",...faqs.map((x)=>`- ${x.q} ${x.a}`),"","Final material grade, panel thickness, dimensions, hardware and configuration are confirmed against the approved project specification."].join("\n");return new Response(text,{headers:{"Content-Type":"text/plain; charset=utf-8"}});}
