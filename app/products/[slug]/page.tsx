import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  products,
  productBySlug,
  imageFor,
  imageAltFor,
  applications,
} from "@/data/products";
import { pageSeo } from "@/data/seo";
import {
  Breadcrumbs,
  Button,
  Eyebrow,
  Visual,
  SectionHeading,
  ProductCard,
  QuoteBand,
  WarrantyCard,
  FinishNote,
} from "@/components/ui";
import { metadata, JsonLd } from "@/lib/seo";
import { specification, thickness, site, whatsapp } from "@/config/site";
import { juniorAgeBands, lockerTiers, modestyShapeImage, systemComponents } from "@/data/approved-gallery";
import { getCatalogProduct } from "@/lib/cms";
import ImageLightbox from "@/components/image-lightbox";
import { articles, industries } from "@/data/site-content";
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getCatalogProduct(slug);
  return p
    ? metadata(
        `${p.name} ${slug === "hpl-lockers" ? "Commercial Storage" : slug === "modesty-panels" ? "Urinal Privacy Panels" : "Washroom Cubicle System"}`,
        p.description,
        `/products/${slug}/`,
        imageFor(slug),
      )
    : {};
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getCatalogProduct(slug);
  if (!p) notFound();
  const productFaqs = [
    {
      q: `Where is ${p.name} most useful?`,
      a: `${p.name} is considered where its ${p.mounting.toLowerCase()} configuration and ${p.character.toLowerCase()} direction suit the intended users, cleaning plan and site interfaces. Final suitability is confirmed against the project requirement.`,
    },
    {
      q: `Which profile and hardware are used for ${p.name}?`,
      a: `${p.name} uses ${p.profile} with ${p.hardware}. Components are not transferred from another system unless they are included in the approved project specification.`,
    },
    {
      q: `Can ${p.name} be customised?`,
      a: `Yes. Custom dimensions and configuration can be reviewed for ${p.name}, subject to site conditions, technical feasibility and the approved project specification. Colours and finishes are finalized project-wise.`,
    },
    {
      q: `What should I share for a ${p.name} quotation?`,
      a: `Share the project city, application, approximate quantity, available layout or BOQ, preferred material and any known mounting constraints. Final material grade, thickness, hardware and configuration are then confirmed against the approved specification.`,
    },
  ];
  const relatedArticles = articles.filter((article) => article.related.includes(slug));
  return (
    <>
      <header className="product-hero">
        <div className="container">
          <Breadcrumbs
            items={[{ name: "Products", href: "/products/" }, { name: p.name }]}
          />
          <div className="product-intro">
            <div>
              <Eyebrow>{p.family}</Eyebrow>
              <h1>{pageSeo[`/products/${slug}/`].h1}</h1>
              <p className="product-character">{p.character}</p>
            </div>
            <div>
              <p className="lede">{p.description}</p>
              <div className="product-ctas">
                <Button href={`/contact/?system=${encodeURIComponent(p.name)}`}>
                  Request a quote
                </Button>
                <a
                  className="text-link"
                  href={whatsapp(p.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us ↗
                </a>
              </div>
            </div>
          </div>
        </div>
        <ImageLightbox
          src={imageFor(slug)}
          alt={imageAltFor(slug)}
          priority
          className="product-hero-image"
          sizes="100vw"
          caption={`${p.name} · Product Visual`}
        />
      </header>
      <section className="container">
        <dl className="spec-strip">
          <div>
            <dt>Profile / support</dt>
            <dd>{p.profile}</dd>
          </div>
          <div>
            <dt>Hardware</dt>
            <dd>{p.hardware}</dd>
          </div>
          <div>
            <dt>Configuration</dt>
            <dd>{p.mounting}</dd>
          </div>
          <div>
            <dt>Final details</dt>
            <dd>Project-specific</dd>
          </div>
        </dl>
      </section>
      <section className="section container split">
        <div className="reveal">
          <Eyebrow>The system expression</Eyebrow>
          <h2>{p.character}</h2>
        </div>
        <div className="body-copy reveal">
          <p className="lede">{p.detail}</p>
          <p>{specification}</p>
          <FinishNote />
          <Link href="/hardware/" className="text-link">
            Understand hardware & profiles ↗
          </Link>
        </div>
      </section>
      {systemComponents[slug] && (
        <section className="section surface"><div className="container">
          <SectionHeading eyebrow="Approved component views" title={`${p.name}: profile and hardware.`} text="The system image and component detail are shown separately. The final configuration is confirmed in the approved project specification." />
          <div className="component-grid two-columns">
            <figure className="component-card"><div className="component-image"><Image src={`/images/approved/${systemComponents[slug].profile}`} alt={`${p.name} profile and support overview`} fill sizes="(max-width: 640px) 100vw, 50vw" /></div><figcaption>Profile / support <span>Product Visual</span></figcaption></figure>
            <figure className="component-card"><div className="component-image"><Image src={`/images/approved/${systemComponents[slug].hardware}`} alt={`${p.name} hardware overview`} fill sizes="(max-width: 640px) 100vw, 50vw" /></div><figcaption>Hardware <span>Product Visual</span></figcaption></figure>
          </div>
        </div></section>
      )}
      {p.variants && (
        <section className="section surface">
          <div className="container">
            <SectionHeading
              eyebrow="Explore the range"
              title={
                slug === "modesty-panels"
                  ? "Nine shapes. One clean system."
                  : slug === "hpl-lockers"
                    ? "Storage, coordinated."
                    : "Child-friendly privacy, carefully shaped."
              }
            />
            {slug === "modesty-panels" && (
              <Visual
                src={modestyShapeImage}
                alt="Nine modesty panel reference outlines: Aero, Taper, Wave, Slant, Soft, Lean, Flow, Sweep and Dome"
                className="shape-library"
                label={false}
                sizes="100vw"
              />
            )}
            {slug !== "hpl-lockers" && <div className="variant-list">
              {p.variants.map((v) => (
                <Link
                  href={slug === "junior-series"
                    ? v.toLowerCase().startsWith("custom")
                      ? `/contact/?system=${encodeURIComponent("Custom Junior Cubicle configuration")}`
                      : `/products/junior-series/${v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}/`
                    : slug === "modesty-panels"
                      ? `/products/modesty-panels/${v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}/`
                      : `/contact/?system=${encodeURIComponent(v)}`}
                  key={v}
                >
                  {v}
                  <span>↗</span>
                </Link>
              ))}
            </div>}
            <p className="fine-print">
              {slug === "modesty-panels"
                ? "Reference size: approx. 900 mm height × 450 mm width. Final dimensions are project-specific."
                : slug === "junior-series"
                  ? "Final panel height and profile arrangement are confirmed for the intended age group and site."
                  : "Layouts, locking options and internal arrangements are confirmed against the approved locker schedule."}
            </p>
          </div>
        </section>
      )}
      {slug === "junior-series" && <section className="section surface"><div className="container"><SectionHeading eyebrow="Junior Cubicle records" title="Scaled for the intended age band." text="Open an age-group record to see the full product visual, approved dimensions, application guidance and enquiry route."/><div className="variant-visual-grid">{juniorAgeBands.map((band) => <Link className="variant-visual" href={`/products/junior-series/${band.age}/`} key={band.age}><div className="component-image"><Image src={band.src} alt={`${band.name} Junior Cubicle product visual`} fill sizes="(max-width: 640px) 100vw, 50vw" /></div><div className="variant-visual-copy"><span className="variant-label">Age-group record</span><h3>{band.name}</h3><p>{band.summary}</p>{band.measurements ? <dl>{band.measurements.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl> : <p className="fine-print">Dimensions are confirmed during enquiry against the approved project schedule.</p>}<b>Open full record →</b></div></Link>)}</div><p className="fine-print">Junior Cubicles are organised by age group, not by adult product-series names. Custom dimensions and configurations may be reviewed subject to the approved project specification.</p></div></section>}
      {slug === "hpl-lockers" && <><section className="section surface"><div className="container"><SectionHeading eyebrow="Locker configurations" title="One to five doors, plus Z-Type." text="Open a configuration to understand its module arrangement, useful applications and the information needed for final measurement."/><div className="variant-visual-grid">{lockerTiers.map(item => <Link className="variant-visual" href={`/products/hpl-lockers/${item.slug}/`} key={item.name}><div className="component-image"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 50vw" /></div><div className="variant-visual-copy"><span className="variant-label">{item.module}</span><h3>{item.name}</h3><p className="variant-arrangement">{item.arrangement}</p><p>{item.usefulFor}</p><b>Open configuration →</b></div></Link>)}</div></div></section><section className="section container locker-system-details"><SectionHeading eyebrow="Locker system" title="Construction choices, clearly coordinated." text="The final panel grade, thickness, dimensions and component selection remain subject to the approved locker schedule."/><div className="locker-detail-grid"><article><h3>Doors, walls & partitions</h3><p>Solid phenolic HPL can be used for locker doors, walls and partitions. Shelf thickness, partition build-up and moisture suitability are confirmed for the selected specification.</p></article><article><h3>Base</h3><p>Compact-laminate skirting or a coordinated concrete base may be considered according to the room and approved locker schedule.</p></article><article><h3>Locking mechanism</h3><p>Options can include customer padlock provision, an inbuilt key lock or a keyless numeric lock, subject to the selected hardware and project requirement.</p></article><article><h3>Channels & construct</h3><p>Integrated frames, connectors and screw-fixed assembly support a modular installation approach. Internal shelves and outer channels are coordinated for the selected module.</p></article><article><h3>Hinges</h3><p>Locker hinges are selected for the approved door construction and intended use. Opening angle, closing action and fixing detail follow the selected hardware specification.</p></article></div></section></>}
      <section
        className="section container"
        aria-labelledby="configuration-heading"
      >
        <Eyebrow>System detail</Eyebrow>
        <h2 id="configuration-heading">Configuration</h2>
        <dl className="spec-strip">
          <div>
            <dt>Profile / support</dt>
            <dd>{p.profile}</dd>
          </div>
          <div>
            <dt>Hardware</dt>
            <dd>{p.hardware}</dd>
          </div>
          <div>
            <dt>Mounting</dt>
            <dd>{p.mounting}</dd>
          </div>
          <div>
            <dt>Coordination</dt>
            <dd>Approved project detail</dd>
          </div>
          <div>
            <dt>Custom option</dt>
            <dd>Available subject to requirement and technical approval</dd>
          </div>
        </dl>
        <p className="fine-print">{p.detail}</p>
      </section>
      <section
        className="section surface"
        aria-labelledby="applications-heading"
      >
        <div className="container split">
          <div>
            <Eyebrow>Application guidance</Eyebrow>
            <h2 id="applications-heading">Where it fits</h2>
            <p className="lede">
              These are starting points for discussion. Suitability, access and
              the final system are confirmed for the intended use and site.
            </p>
            <Link href="/applications/" className="text-link">
              Explore applications ↗
            </Link>
          </div>
          {slug === "hpl-lockers" ? <div className="locker-application-grid">{industries.map((industry) => <Link href={`/industries/${industry.slug}/`} key={industry.slug}><span className="locker-application-image"><Image src={industry.image} alt={`${industry.name} locker application context`} fill sizes="(max-width:640px) 45vw, 16vw" /></span><strong>{industry.name}</strong><small>{industry.kicker}</small></Link>)}</div> : <div className="detail-list">
            {(slug === "junior-series"
              ? ["Education", "Public Facilities"]
              : applications.map(([name]) => name)
            ).map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>}
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="Material selection"
          title="The panel follows the specification."
          text="Compact HPL and BWP-FR High-Density Board options are considered against the application and approved system."
          href="/materials/"
          link="Explore materials"
        />
        <div className="thickness-row">
          <span>
            12<small>mm</small>
          </span>
          <span>
            18<small>mm</small>
          </span>
          <div>
            <h3>Typical panel thicknesses</h3>
            <p>{thickness}</p>
          </div>
        </div>
        <p className="fine-print">{specification}</p>
      </section>
      <section className="container section-top-none">
        <div className="project-confirmation body-copy">
          <Eyebrow>Before supply</Eyebrow>
          <h2>Project confirmation</h2>
          <p>
            Site dimensions, openings and support interfaces are reviewed before
            the system detail is approved.
          </p>
          <p>{specification}</p>
          <FinishNote />
          {slug === "sky-hung" && (
            <p>
              Ceiling support feasibility and fixing details are subject to site
              and structural coordination.
            </p>
          )}
        </div>
        <WarrantyCard />
      </section>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="Related systems"
            title="Continue exploring."
            href="/products/"
            link="All products"
          />
          <div className="product-grid two-columns">
            {p.related
              .map((s) => productBySlug(s))
              .filter((x) => !!x)
              .map((x, i) => (
                <ProductCard product={x} key={x.slug} index={i} />
              ))}
          </div>
        </div>
      </section>
      <section className="section container product-faqs">
        <SectionHeading eyebrow={`${p.name} questions`} title="Answers before you enquire." text="Product-specific guidance for selection, customisation and quotation preparation." />
        <div className="cp-accordion">{productFaqs.map((item, index) => <details key={item.q} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.q}<b aria-hidden="true">+</b></summary><p>{item.a}</p></details>)}</div>
      </section>
      <section className="section surface"><div className="container"><SectionHeading eyebrow="Related reading" title="Practical specification guidance." href="/resources/" link="All guides"/><div className="product-guide-grid">{(relatedArticles.length ? relatedArticles : articles.slice(0, 2)).slice(0, 2).map((article) => <Link href={`/blog/${article.slug}/`} key={article.slug}><span>{article.category} · {article.readTime}</span><h3>{article.title}</h3><p>{article.summary}</p><b>Read guide →</b></Link>)}</div></div></section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type":
            slug === "custom"
              ? "Service"
              : slug === "junior-series"
                ? "ProductGroup"
                : "Product",
          name: p.name,
          description: p.description,
          url: `${site.url}/products/${slug}/`,
          image: `${site.url}${imageFor(slug)}`,
          ...(slug === "custom"
            ? { provider: { "@id": `${site.url}/#organization` } }
            : {
                brand: { "@type": "Brand", name: "Cubiclepro" },
                category: p.family,
                additionalProperty: [
                  {
                    "@type": "PropertyValue",
                    name: "Profile / support",
                    value: p.profile,
                  },
                  {
                    "@type": "PropertyValue",
                    name: "Hardware",
                    value: p.hardware,
                  },
                  {
                    "@type": "PropertyValue",
                    name: "Configuration",
                    value: p.mounting,
                  },
                ],
              }),
        }}
      />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage",mainEntity:productFaqs.map((item)=>({"@type":"Question",name:item.q,acceptedAnswer:{"@type":"Answer",text:item.a}}))}} />
      <QuoteBand product={p.name} />
    </>
  );
}
