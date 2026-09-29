import { articles, faqs, mainCategories } from "@/data/site-content";
import { products } from "@/data/products";
import { site } from "@/config/site";
export const dynamic="force-static";
export function GET(){const text=[`# ${site.name}`,`Website: ${site.url}`,`Sales / WhatsApp: ${site.phone}`,`Technical: ${site.technicalPhone}`,`Email: ${site.email}`,"","## Main categories",...mainCategories.map((x)=>`- ${x.name}: ${site.url}${x.href}`),"","## Restroom cubicle systems",...products.slice(0,8).map((x)=>`- ${x.name}: ${x.profile}; ${x.hardware}; ${site.url}/products/${x.slug}/`),"","## Resources",...articles.map((x)=>`- ${x.title}: ${site.url}/blog/${x.slug}/`),"","## Common questions",...faqs.map((x)=>`- ${x.q} ${x.a}`),"","Final material grade, panel thickness, hardware and configuration are confirmed against the approved project specification."].join("\n");return new Response(text,{headers:{"Content-Type":"text/plain; charset=utf-8"}});}
