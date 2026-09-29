import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/site-content";
import { JsonLd } from "@/lib/seo";
import { site } from "@/config/site";
export const dynamicParams = false;
export function generateStaticParams(){ return articles.map(({slug})=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{ const {slug}=await params; const article=articles.find((item)=>item.slug===slug); if(!article)return{}; return {title:article.title,description:article.summary,alternates:{canonical:`/blog/${slug}/`},openGraph:{title:article.title,description:article.summary,url:`/blog/${slug}/`,type:"article"}}; }
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const article=articles.find((item)=>item.slug===slug); if(!article)notFound(); return <><JsonLd data={{"@context":"https://schema.org","@type":"Article",headline:article.title,description:article.summary,author:{"@type":"Organization",name:site.name},publisher:{"@id":`${site.url}/#organization`},mainEntityOfPage:`${site.url}/blog/${slug}/`}}/><article className="cp-article-page"><header><div className="container"><p className="cp-kicker">{article.category} · {article.readTime}</p><h1>{article.title}</h1><p>{article.summary}</p></div></header><div className="container cp-article-body">{article.sections.map((section)=><section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<aside><h2>Continue the conversation</h2><p>Share your application, project city, approximate quantity and any available drawing.</p><Link className="cp-button cp-button-accent" href="/contact/">Request a quote ↗</Link></aside></div></article></>; }
