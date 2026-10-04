import Link from "next/link";
import { site, technicalWhatsapp, whatsapp } from "@/config/site";
import { getSiteSettings } from "@/lib/cms";

export default async function Footer() {
  const settings=await getSiteSettings();
  const salesPhone=settings?.primaryPhone||site.phone;
  const technicalPhone=settings?.technicalPhone||site.technicalPhone;
  const salesTel=`+${salesPhone.replace(/\D/g,"")}`;
  const technicalTel=`+${technicalPhone.replace(/\D/g,"")}`;
  const salesWhatsApp=settings?.primaryPhone?`https://wa.me/${salesPhone.replace(/\D/g,"")}?text=${encodeURIComponent("Hello Cubiclepro, I would like to discuss a commercial washroom requirement.")}`:whatsapp();
  const technicalWhatsApp=settings?.technicalPhone?`https://wa.me/${technicalPhone.replace(/\D/g,"")}?text=${encodeURIComponent("Hello Cubiclepro technical team, I would like to discuss drawings, profiles, hardware or a site-interface requirement.")}`:technicalWhatsapp("a technical washroom requirement");
  return <footer className="cp-footer" id="site-footer"><div className="container">
    <div className="cp-footer-grid">
      <div><Link href="/" className="cp-wordmark">CUBICLE<span>PRO</span><small>WASHROOM SOLUTIONS</small></Link><p>Commercial washroom systems with clear specification, site-aware detailing and responsible execution.</p></div>
      <div><h2>Explore</h2>{[["Products","/products/"],["Materials","/materials/"],["Hardware & Profiles","/hardware/"],["Applications","/applications/"],["Resources","/resources/"],["Warranty","/warranty/"]].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      <div><h2>Enquiries</h2><a href={`tel:${salesTel}`}>{salesPhone} · Sales / WhatsApp</a><a href={`tel:${technicalTel}`}>{technicalPhone} · Technical</a><a href={`mailto:${settings?.primaryEmail||site.email}`}>{settings?.primaryEmail||site.email}</a><a href={`mailto:${settings?.salesEmail||site.salesEmail}`}>{settings?.salesEmail||site.salesEmail}</a><a href={salesWhatsApp} target="_blank" rel="noreferrer">Sales WhatsApp ↗</a><a href={technicalWhatsApp} target="_blank" rel="noreferrer">Technical WhatsApp ↗</a></div>
      <div><h2>Visit</h2><address>{site.address}</address><Link href="/locations/">Service locations ↗</Link><Link href="/contact/">Request a quote ↗</Link></div>
    </div>
    <div className="cp-footer-bottom"><span>© {new Date().getFullYear()} CubiclePro Washroom Solutions</span><span>Colours and finishes are finalized project-wise.</span><span>www.cubiclepro.in</span></div>
  </div></footer>;
}
