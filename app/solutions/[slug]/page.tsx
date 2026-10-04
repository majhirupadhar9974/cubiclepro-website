import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, PageHero, QuoteBand, SectionHeading, TechnicalWhatsAppAction } from "@/components/ui";
import { solutions } from "@/data/solutions";
import { JsonLd, metadata, PageSchema } from "@/lib/seo";
import { site } from "@/config/site";
import ImageLightbox from "@/components/image-lightbox";
export const dynamicParams = false;
export function generateStaticParams() { return solutions.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = solutions.find((solution) => solution.slug === slug);
  return item ? metadata(item.title, item.description, `/solutions/${slug}/`) : {};
}
export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = solutions.find((solution) => solution.slug === slug); if (!item) notFound();
  const path = `/solutions/${slug}/`;
  return <>
    <PageSchema name={item.name} path={path} />
    <PageHero eyebrow="Washroom solutions" title={item.title} text={item.description} path={path} />
    {"image" in item && item.image ? <section className="section container solution-reference-visual"><ImageLightbox src={item.image} alt={item.imageAlt || "Washroom solution reference visual"} className="solution-reference-image" sizes="(max-width:760px) 100vw, 70vw" caption="Reference Visual" /></section> : null}
    <section className="section container split">
      <div><Eyebrow>Scope coordination</Eyebrow><h2>Details that begin with the site.</h2><p className="lede">Final material grade, panel thickness, hardware and configuration are confirmed against the approved project specification.</p><p>Colours and finishes are finalized project-wise. Any technical performance statement is limited to the approved material grade and its current documentation.</p></div>
      <div className="solution-points">{item.points.map((point, index) => <div className="cp-soft-card" key={point}><span>{String(index + 1).padStart(2, "0")}</span><h3>{point}</h3></div>)}</div>
    </section>
    <section className="section surface"><div className="container"><SectionHeading eyebrow="Explore the scope" title="Related Cubiclepro systems."/><div className="solution-links">{item.links.map(([label, href]) => <Link href={href} key={href + label}>{label}<span aria-hidden="true">↗</span></Link>)}</div></div></section>
    <section className="section container"><div className="notice"><h2>Start with a project brief.</h2><p>Share your city, site conditions, quantity and any relevant drawing so the right system can be discussed.</p><div className="cp-enquiry-actions"><Link className="button" href={`/contact/?system=${encodeURIComponent(item.name)}`}>Request a quote <span aria-hidden="true">↗</span></Link><TechnicalWhatsAppAction subject={`${item.name} technical details`} className="button button-outline" /></div></div></section>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: item.name, description: item.description, url: `${site.url}${path}`, provider: { "@id": `${site.url}/#organization` } }} />
    <QuoteBand product={item.name} />
  </>;
}
