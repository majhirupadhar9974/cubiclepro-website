import Link from "next/link";
import QuoteForm from "@/components/quote-form";
import { site } from "@/config/site";
import { metadata } from "@/lib/seo";
export const generateMetadata=()=>metadata("Technical Enquiry | Washroom Cubicle Systems",`Discuss drawings, profiles, hardware and site interfaces with CubiclePro technical support at ${site.technicalPhone}.`,"/technical-enquiry/");
export default function TechnicalEnquiry(){return <><header className="page-hero"><div className="container"><p className="cp-kicker">Technical support</p><h1>Discuss a technical washroom requirement.</h1><p className="lede">For drawings, compatibility, profiles, hardware, mounting or site-interface questions.</p><div className="cp-actions"><a className="cp-button cp-button-accent" href={`tel:${site.technicalTel}`}>Call {site.technicalPhone}</a><Link className="cp-button cp-button-ghost" href={`mailto:${site.email}`}>{site.email}</Link></div></div></header><section className="section container"><QuoteForm /></section></>;}
