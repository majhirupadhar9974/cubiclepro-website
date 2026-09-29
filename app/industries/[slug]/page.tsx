import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries } from "@/data/site-content";
import { JsonLd } from "@/lib/seo";
import { site } from "@/config/site";
export const dynamicParams=false;
export function generateStaticParams(){return industries.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;const item=industries.find((x)=>x.slug===slug);if(!item)return{};return{title:`Washroom Solutions for ${item.name}`,description:item.description,alternates:{canonical:`/industries/${slug}/`}};}
export default async function IndustryPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const item=industries.find((x)=>x.slug===slug);if(!item)notFound();return <><JsonLd data={{"@context":"https://schema.org","@type":"Service",name:`Commercial washroom solutions for ${item.name}`,provider:{"@id":`${site.url}/#organization`},areaServed:"India"}}/><header className="cp-industry-hero"><Image src={item.image} alt={`${item.name} washroom application visual`} fill priority sizes="100vw"/><div/><section className="container"><p className="cp-kicker">{item.kicker}</p><h1>Washroom solutions for {item.name}.</h1><p>{item.description}</p></section></header><section className="cp-section"><div className="container cp-two-col"><div><p className="cp-kicker">Planning focus</p><h2>Begin with the real operating context.</h2></div><div className="cp-feature-stack">{item.considerations.map((point,index)=><article key={point}><span>0{index+1}</span><h3>{point}</h3><p>Confirm this point against the site, intended users, maintenance plan and approved project specification.</p></article>)}</div></div></section><section className="cp-final-cta"><div className="container"><div><h2>Discuss this application.</h2><p>Share your project city, quantity and drawings.</p></div><Link className="cp-button cp-button-accent" href="/contact/">Request a quote ↗</Link></div></section></>;}
