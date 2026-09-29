import Link from "next/link";
import { notFound } from "next/navigation";
import { juniorAgeBands, lockerTiers, modestyShapes } from "@/data/approved-gallery";
import { Breadcrumbs, Eyebrow, QuoteBand, SectionHeading } from "@/components/ui";
import ImageLightbox from "@/components/image-lightbox";
import { site } from "@/config/site";
import { metadata, JsonLd, PageSchema } from "@/lib/seo";

export function generateStaticParams() {
  return [
    ...juniorAgeBands.map((band) => ({ slug: "junior-series", variant: band.age })),
    ...lockerTiers.map((item) => ({ slug: "hpl-lockers", variant: item.slug })),
    ...modestyShapes.map((item) => ({ slug: "modesty-panels", variant: item.slug })),
  ];
}

function findRecord(slug: string, variant: string) {
  const junior = slug === "junior-series" ? juniorAgeBands.find((item) => item.age === variant) : undefined;
  const locker = slug === "hpl-lockers" ? lockerTiers.find((item) => item.slug === variant) : undefined;
  const ump = slug === "modesty-panels" ? modestyShapes.find((item) => item.slug === variant) : undefined;
  return { junior, locker, ump, item: junior || locker || ump };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; variant: string }> }) {
  const { slug, variant } = await params;
  const { junior, locker, ump, item } = findRecord(slug, variant);
  if (!item) return {};
  const name = junior ? `Junior Cubicles — ${junior.name}` : locker ? `HPL Lockers — ${locker.name}` : `${ump!.name} Urinal Modesty Panel`;
  const description = junior
    ? `${junior.summary} Review the approved visual, dimensions and enquiry guidance.`
    : locker
      ? `${locker.module}: ${locker.arrangement}. Review useful applications and measurement-enquiry guidance.`
      : `${ump!.name} Compact HPL urinal privacy-panel shape. Reference size approximately 900 mm high by 450 mm wide.`;
  return metadata(name, description, `/products/${slug}/${variant}/`);
}

export default async function VariantPage({ params }: { params: Promise<{ slug: string; variant: string }> }) {
  const { slug, variant } = await params;
  const { junior, locker, ump, item } = findRecord(slug, variant);
  if (!item) notFound();

  const name = junior ? `Junior Cubicles — ${junior.name}` : locker ? `HPL Lockers — ${locker.name}` : `${ump!.name} Urinal Modesty Panel`;
  const family = junior ? "Junior Cubicles" : locker ? "HPL Lockers" : "Urinal Modesty Panels";
  const parentPath = `/products/${slug}/`;
  const path = `${parentPath}${variant}/`;
  const description = junior
    ? junior.summary
    : locker
      ? `${locker.module}. ${locker.arrangement}. ${locker.usefulFor}`
      : `${ump!.name} is one of nine Compact HPL Urinal Modesty Panel reference shapes. The final profile and dimensions are confirmed project-wise.`;
  const src = item.src;
  const alt = junior ? `${junior.name} Junior Cubicle product visual` : locker ? locker.alt : ump!.alt;
  const faqs = [
    {
      q: junior ? `Who is the ${junior.name} Junior Cubicle intended for?` : locker ? `What does ${locker.name} mean?` : `What is the ${ump!.name} shape?`,
      a: junior ? `${junior.suitableFor}. The final arrangement is coordinated to the intended users and approved project specification.` : locker ? `${locker.name} is the ${locker.module.toLowerCase()}: ${locker.arrangement.toLowerCase()}.` : `${ump!.name} is an approved reference outline for a wall-mounted Compact HPL urinal privacy panel.`,
    },
    {
      q: junior ? `Are the ${junior.name} dimensions fixed for every project?` : locker ? `Where is ${locker.name} useful?` : `What is the reference size for ${ump!.name}?`,
      a: junior ? "The displayed measurements belong only to this approved age-group record. Final dimensions and interfaces are still checked against the site and approved project specification." : locker ? locker.usefulFor : "The reference size is approximately 900 mm height by 450 mm width. Final dimensions are project-specific.",
    },
    {
      q: junior ? "Can the profile, hardware or layout be customised?" : locker ? "How are final locker measurements confirmed?" : "Can this UMP shape be customised?",
      a: junior ? "Custom dimensions, hardware and layout can be reviewed subject to the intended age group, site conditions, technical feasibility and approval." : locker ? locker.planning : "Custom shapes and dimensions can be reviewed. The final panel profile, wall clamps and fixing detail are confirmed in the approved project specification.",
    },
  ];

  return <>
    <PageSchema name={name} path={path} />
    <header className="variant-page-header"><div className="container"><Breadcrumbs items={[{ name: family, href: parentPath }, { name: item.name }]} /><Eyebrow>{family}</Eyebrow><h1>{name}</h1><p>{description}</p></div></header>
    <section className="section container variant-detail-layout">
      <ImageLightbox src={src} alt={alt} className={`variant-hero-image ${ump ? "variant-shape-image" : ""}`} sizes="(max-width:760px) 100vw, 58vw" caption={ump ? "Shape Reference" : "Product Visual"} />
      <div className="variant-detail-copy"><Eyebrow>{junior ? "Age-group record" : locker ? locker.module : "Shape record"}</Eyebrow><h2>{junior ? "Dimensions and use" : locker ? locker.arrangement : "Compact HPL privacy profile"}</h2>
        {junior && junior.measurements ? <dl className="variant-measurements">{junior.measurements.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl> : null}
        {junior && !junior.measurements ? <p>Exact dimensions are confirmed during enquiry against the approved project schedule.</p> : null}
        {locker ? <><p>{locker.usefulFor}</p><h3>Measurement enquiry</h3><p>{locker.planning}</p></> : null}
        {ump ? <><dl className="variant-measurements"><div><dt>Reference height</dt><dd>Approx. 900 mm</dd></div><div><dt>Reference width</dt><dd>Approx. 450 mm</dd></div><div><dt>Panel</dt><dd>Compact HPL</dd></div><div><dt>Mounting</dt><dd>SS wall clamps</dd></div></dl><p>Final dimensions and fixing details are project-specific.</p></> : null}
        <p className="fine-print">Final material grade, panel thickness, hardware and configuration are confirmed against the approved project specification.</p>
        <Link className="button" href={`/contact/?system=${encodeURIComponent(name)}`}>Enquire about this item →</Link>
      </div>
    </section>
    <section className="section surface"><div className="container product-faqs"><SectionHeading eyebrow="Questions & answers" title={`About ${item.name}.`} text="Useful item-specific guidance before measurement and quotation."/><div className="cp-accordion">{faqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.q}<b aria-hidden="true">+</b></summary><p>{faq.a}</p></details>)}</div></div></section>
    <section className="section container"><Link className="text-link" href={parentPath}>← Back to {family}</Link></section>
    <JsonLd data={{"@context":"https://schema.org","@type":"Product","name":name,"description":description,"url":`${site.url}${path}`,"image":`${site.url}${src}`,"brand":{"@type":"Brand","name":"Cubiclepro"},"category":family}} />
    <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqs.map((faq)=>({"@type":"Question","name":faq.q,"acceptedAnswer":{"@type":"Answer","text":faq.a}}))}} />
    <QuoteBand product={name} />
  </>;
}
