import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { juniorAgeBands, lockerTiers } from "@/data/approved-gallery";
import { Eyebrow, PageHero, QuoteBand } from "@/components/ui";
import { site } from "@/config/site";
import { metadata, JsonLd, PageSchema } from "@/lib/seo";
const juniorMeasurements: Record<string, string[][]> = Object.fromEntries(juniorAgeBands.map((band) => [band.age, band.measurements || []]));
export function generateStaticParams() { return [
  ...juniorAgeBands.map((band) => ({ slug: "junior-series", variant: band.age })),
  ...lockerTiers.map((item, index) => ({ slug: "hpl-lockers", variant: index === 5 ? "z-type" : `tier-${index + 1}` })),
]; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string; variant: string }> }) {
  const { slug, variant } = await params;
  const junior = slug === "junior-series" ? juniorAgeBands.find((item) => item.age === variant) : undefined;
  const locker = slug === "hpl-lockers" ? lockerTiers.find((item, index) => (index === 5 ? "z-type" : `tier-${index + 1}`) === variant) : undefined;
  const item = junior || locker; if (!item) return {};
  const name = junior ? `Junior Series — ${junior.name}` : `HPL Lockers — ${locker!.name}`;
  const description = junior ? `Age-specific Junior Series cubicle system reference for ${junior.name}. Dimensions are shown only where verified against the approved Cubiclepro specification.` : `HPL locker ${locker!.name} configuration reference. Dimensions and construction are confirmed against the approved locker schedule.`;
  return { ...metadata(name, description, `/products/${slug}/${variant}/`), robots: { index: false, follow: true } };
}
export default async function VariantPage({ params }: { params: Promise<{ slug: string; variant: string }> }) {
  const { slug, variant } = await params;
  const junior = slug === "junior-series" ? juniorAgeBands.find((item) => item.age === variant) : undefined;
  const locker = slug === "hpl-lockers" ? lockerTiers.find((item, index) => (index === 5 ? "z-type" : `tier-${index + 1}`) === variant) : undefined;
  const item = junior || locker; if (!item) notFound();
  const name = junior ? `Junior Series — ${junior.name}` : `HPL Lockers — ${locker!.name}`;
  const description = junior ? `Age-specific Junior Series cubicle system reference for ${junior.name}. Dimensions are shown only where verified against the approved Cubiclepro specification.` : `HPL locker ${locker!.name} configuration reference. Dimensions and construction are confirmed against the approved locker schedule.`;
  const path = `/products/${slug}/${variant}/`;
  return <><PageSchema name={name} path={path}/><PageHero eyebrow={junior ? "Junior Series" : "HPL Lockers"} title={name} text={description} path={path}/>
    <section className="section container split"><figure className="variant-hero-image"><Image src={item.src} alt={junior ? `${junior.name} Junior Series product visual` : locker!.alt} fill sizes="(max-width:760px) 100vw, 50vw"/><figcaption>Product Visual</figcaption></figure>
      <div><Eyebrow>Variant record</Eyebrow><h2>{junior ? "Age-group dimensions" : "Locker configuration"}</h2>
        {junior && junior.measurements ? <dl className="variant-visual-copy"><div className="variant-visual-copy"><dl>{junior.measurements.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></dl> : <p className="lede">{junior ? "Dimensions: NOT VERIFIED — confirm from approved source before publishing." : "Dimensions, panel thickness, locking, internal layout and construction are subject to the approved locker schedule; none are assumed here."}</p>}
        <p className="fine-print">Final material grade, panel thickness, hardware and configuration are confirmed against the approved project specification.</p>
        <Link className="button" href={`/contact/?system=${encodeURIComponent(name)}`}>Request a quote ↗</Link>
      </div></section>
    <section className="section container"><Link className="text-link" href={`/products/${slug}/`}>← Back to {junior ? "Junior Series" : "HPL Lockers"}</Link></section>
    <JsonLd data={{"@context":"https://schema.org","@type":"Product","name":name,"description":description,"url":`${site.url}${path}`,"image":`${site.url}${item.src}`,"brand":{"@type":"Brand","name":"Cubiclepro"},"category":junior?"Junior toilet cubicles":"HPL lockers"}}/><QuoteBand product={name}/></>;
}
