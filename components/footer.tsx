import Link from "next/link";
import { site, whatsapp } from "@/config/site";

export default function Footer() {
  return <footer className="cp-footer" id="site-footer"><div className="container">
    <div className="cp-footer-grid">
      <div><Link href="/" className="cp-wordmark">CUBICLE<span>PRO</span><small>WASHROOM SOLUTIONS</small></Link><p>Commercial washroom systems with clear specification, site-aware detailing and responsible execution.</p></div>
      <div><h2>Explore</h2>{[["Products","/products/"],["Materials","/materials/"],["Hardware & Profiles","/hardware/"],["Applications","/applications/"],["Resources","/resources/"],["Warranty","/warranty/"]].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      <div><h2>Enquiries</h2><a href={`tel:${site.tel}`}>{site.phone} · Sales / WhatsApp</a><a href={`tel:${site.technicalTel}`}>{site.technicalPhone} · Technical</a><a href={`mailto:${site.email}`}>{site.email}</a><a href={`mailto:${site.salesEmail}`}>{site.salesEmail}</a><a href={whatsapp()} target="_blank" rel="noreferrer">WhatsApp us ↗</a></div>
      <div><h2>Visit</h2><address>{site.address}</address><Link href="/locations/">Service locations ↗</Link><Link href="/contact/">Request a quote ↗</Link></div>
    </div>
    <div className="cp-footer-bottom"><span>© {new Date().getFullYear()} CubiclePro Washroom Solutions</span><span>Colours and finishes are finalized project-wise.</span><span>www.cubiclepro.in</span></div>
  </div></footer>;
}
