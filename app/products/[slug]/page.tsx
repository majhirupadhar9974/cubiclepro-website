import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  products,
  productBySlug,
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
  TechnicalWhatsAppAction,
  WarrantyCard,
  FinishNote,
} from "@/components/ui";
import { metadata, JsonLd } from "@/lib/seo";
import { specification, thickness, site, whatsapp } from "@/config/site";
import { juniorAgeBands, lockerTiers, modestyShapeImage, systemComponents } from "@/data/approved-gallery";
import { productDetails } from "@/data/product-details";
import { getCatalogProduct } from "@/lib/cms";
import ImageLightbox from "@/components/image-lightbox";
import { industries } from "@/data/site-content";
import { articles, faqsForProduct } from "@/data/content-library";
export const dynamicParams = true;
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
  if (!p) return {};
  const path = p.canonicalPath || `/products/${slug}/`;
  const title = p.seoTitle || `${p.name} ${slug === "hpl-lockers" ? "Commercial Storage" : slug === "modesty-panels" ? "Urinal Privacy Panels" : "Washroom Cubicle System"}`;
  const description = p.metaDescription || p.description;
  const base = metadata(title, description, path, p.image.startsWith("http") ? undefined : p.image);
  return { ...base, title: p.seoTitle ? { absolute: p.seoTitle } : base.title, description, robots: { index: p.indexable !== false, follow: true }, alternates: { canonical: `${site.url}${path}` } };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getCatalogProduct(slug);
  if (!p) notFound();
  const detail = productDetails[slug];
  const generatedFaqs = [
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
  const productFaqs = [...faqsForProduct(slug, 8), ...generatedFaqs]
    .filter((item, index, all) => all.findIndex((candidate) => candidate.q === item.q) === index)
    .slice(0, 10);
  const relatedArticles = articles.filter((article) => article.related.includes(slug));
  const fitIndustries = slug === "junior-series"
    ? industries.filter((industry) => ["education", "retail-public-spaces", "sports-wellness"].includes(industry.slug))
    : industries;
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
              <h1>{pageSeo[`/products/${slug}/`]?.h1 || p.name}</h1>
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
                <TechnicalWhatsAppAction subject={`${p.name} technical details`} className="text-link technical-inline-link" />
              </div>
            </div>
          </div>
        </div>
        <ImageLightbox
          src={p.image}
          alt={p.imageAlt}
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
            <dt>Dimensions</dt>
            <dd>Project-specific</dd>
          </div>
          <div>
            <dt>Custom option</dt>
            <dd>Yes - subject to technical approval</dd>
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
      {detail && (
        <section className="section container product-document-content" aria-labelledby="approved-product-description">
          <div className="product-document-intro">
            <div>
              <Eyebrow>Approved product description</Eyebrow>
              <h2 id="approved-product-description">Designed around the complete system.</h2>
            </div>
            <div>{detail.introduction.map((paragraph) => <p className="lede" key={paragraph}>{paragraph}</p>)}</div>
          </div>
          <div className="product-feature-grid" aria-label={`${p.name} key features`}>
            {detail.features.map((feature, index) => <article className="cp-soft-card" key={feature}><span>{String(index + 1).padStart(2, "0")}</span><p>{feature}</p></article>)}
          </div>
          <div className="product-dimension-panel">
            <div><Eyebrow>Dimensions</Eyebrow><h3>Reference dimensions for planning.</h3><p>Dimensions marked with an asterisk may vary with site conditions, layout and the approved project requirement.</p></div>
            <dl>{detail.dimensions.map(([label, standard, accessible]) => <div key={label}><dt>{label}</dt><dd>{standard}</dd><dd>{accessible}</dd></div>)}</dl>
          </div>
          <div className="product-construction-grid">
            {detail.sections.map((section) => <article className="cp-soft-card" key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p>{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</article>)}
          </div>
          {detail.prerequisites && <div className="product-prerequisites"><Eyebrow>Site prerequisites</Eyebrow><h3>Confirm support conditions before approval.</h3><ul>{detail.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul></div>}
          <div className="product-application-panel"><div><Eyebrow>Applications</Eyebrow><h3>Typical project environments.</h3></div><div className="cp-compact-card-grid">{detail.applications.map((application, index) => <article className="cp-compact-card" key={application}><span>{String(index + 1).padStart(2, "0")}</span><strong>{application}</strong></article>)}</div></div>
          <div className="product-detail-cta"><p>{detail.cta}</p><div className="cp-enquiry-actions"><Link className="button" href={`/contact/?system=${encodeURIComponent(p.name)}`}>Get a customised quote →</Link><TechnicalWhatsAppAction subject={`${p.name} technical details`} className="button button-outline" /></div></div>
        </section>
      )}
      {systemComponents[slug] && (
        <section className="section surface"><div className="container">
          <SectionHeading eyebrow="Approved component views" title={`${p.name}: profile and hardware.`} text="The system image and component detail are shown separately. The final configuration is confirmed in the approved project specification." />
          <div className="component-grid two-columns">
            <figure className="component-card"><div className="component-image"><Image src={`/images/approved/${systemComponents[slug].profile}`} alt={`${p.name} profile and support overview`} fill sizes="(max-width: 640px) 100vw, 50vw" /></div><figcaption>Profile / support <span>Product Visual</span></figcaption></figure>
            <figure className="component-card"><div className="component-image"><Image src={`/images/approved/${systemComponents[slug].hardware}`} alt={`${p.name} hardware overview`} fill sizes="(max-width: 640px) 100vw, 50vw" /></div><figcaption>Hardware <span>Product Visual</span></figcaption></figure>
          </div>
        </div></section>
      )}
      {systemComponents[slug] && (
        <section className="section container technical-reference-section">
          <SectionHeading eyebrow="Planning references" title="Layout and component coordination." text="These drawings are reference guides. Final dimensions, support conditions, door handing and component selection follow the approved project drawing." />
          <div className="technical-reference-grid">
            <ImageLightbox src="/images/approved/technical-guides/accessible-standard-cubicle-layout.jpg" alt="Reference plan showing an accessible cubicle and two standard cubicles with door clearances and dimensions" sizes="(max-width:760px) 100vw, 50vw" caption="Planning Reference" />
            <ImageLightbox src="/images/approved/technical-guides/cubicle-components-reference.jpg" alt="Reference visual identifying cubicle door, divider, pilaster, top rail, leg, knob, occupancy indicator and internally mounted hinge and coat hook" sizes="(max-width:760px) 100vw, 50vw" caption="Component Reference" />
          </div>
        </section>
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
            {slug === "modesty-panels" && <div className="variant-list">
              {p.variants.map((v) => (
                <Link
                  href={`/products/modesty-panels/${v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}/`}
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
      {slug === "junior-series" && <section className="section surface"><div className="container"><SectionHeading eyebrow="Junior Cubicle records" title="Named and scaled for the intended age band." text="Open LittleSteps, Explorer, Horizon or Youth to see the complete product visual, approved dimensions, application guidance and enquiry route."/><div className="variant-visual-grid">{juniorAgeBands.map((band) => <Link className="variant-visual" href={`/products/junior-series/${band.age}/`} key={band.age}><div className="component-image"><Image src={band.src} alt={`${band.name} Junior Cubicle product visual`} fill sizes="(max-width: 640px) 100vw, 50vw" /></div><div className="variant-visual-copy"><span className="variant-label">{band.ageLabel}</span><h3>{band.name}</h3><p>{band.summary}</p><dl>{band.measurements.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><b>Open full record →</b></div></Link>)}</div><div className="custom-option-card"><div><span>Custom option</span><h3>Custom Junior Cubicle configuration</h3><p>Yes. Dimensions, colours, privacy, panel shape, compatible hardware and layout can be reviewed for the project, subject to technical approval.</p></div><Link className="button" href="/contact/?system=Custom%20Junior%20Cubicle%20configuration">Discuss custom requirement →</Link></div></div></section>}
      {slug === "hpl-lockers" && <><section className="section surface"><div className="container"><SectionHeading eyebrow="Locker configurations" title="One to five doors, plus Z-Type." text="Every card opens a complete configuration page with its use case, construction, custom-dimension guidance and enquiry route."/><div className="variant-visual-grid">{lockerTiers.map(item => <Link className="variant-visual" href={`/products/hpl-lockers/${item.slug}/`} key={item.name}><div className="component-image"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 50vw" /></div><div className="variant-visual-copy"><span className="variant-label">{item.module}</span><h3>{item.name}</h3><p className="variant-arrangement">{item.arrangement}</p><p>{item.usefulFor}</p><b>Open configuration →</b></div></Link>)}</div><div className="custom-option-card"><div><span>Custom locker category</span><h3>Tier 6 and Z-Type Tier 2</h3><p>These layouts are treated as custom configurations. Share the user count, stored items, available dimensions and required internal arrangement for technical review.</p></div><Link className="button" href="/contact/?system=Custom%20HPL%20Locker%20configuration">Discuss custom configuration →</Link></div></div></section><section className="section container technical-reference-section"><SectionHeading eyebrow="Configuration reference" title="Tier and interlocking arrangements." text="The supplied reference is shown without altering its labels. Tier 6 and Z-Type Tier 2 are handled as custom configurations for enquiry."/><ImageLightbox src="/images/approved/technical-guides/locker-configuration-reference.jpg" alt="Reference drawing showing Tier 1 to Tier 6 and Z-Type locker arrangements with indicative overall dimensions" sizes="100vw" caption="Configuration Reference" /></section><section className="section container locker-system-details"><SectionHeading eyebrow="Locker system" title="Construction choices, clearly coordinated." text="Every standard record uses custom-built dimensions based on the site and client requirement."/><div className="locker-detail-grid"><article><h3>Doors, walls & partitions</h3><p>Approved construction uses 9 mm HPL compact doors, 3 mm HPL compact side and back panels, and 9 mm HPL compact top, bottom and base components.</p></article><article><h3>Base</h3><p>The bottom/base is coordinated in 9 mm HPL compact board. The public configuration does not describe separate locker legs.</p></article><article><h3>Locking mechanism</h3><p>Options may include a customer padlock provision, inbuilt key lock or keyless numeric lock, subject to the selected hardware and project requirement.</p></article><article><h3>Channels & construction</h3><p>An aluminium interlocking supporting frame, coordinated connectors and screw-fixed assembly support the modular locker bank. Internal arrangement follows the selected tier.</p></article><article><h3>Hinges</h3><p>Stainless-steel hinges and individual locksets are coordinated with the approved door construction. Final opening and fixing details follow the selected configuration.</p></article></div></section></>}
      <section
        className="section container"
        aria-labelledby="configuration-heading"
      >
        <Eyebrow>System detail</Eyebrow>
        <h2 id="configuration-heading">Configuration</h2>
        <dl className="spec-strip cp-configuration-cards">
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
            <dt>Dimensions</dt>
            <dd>Project-specific and confirmed in the approved detail</dd>
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
          <div className="cp-application-card-grid">
            {fitIndustries.map((industry, index) => (
              <Link className="cp-application-card" href={`/industries/${industry.slug}/`} key={industry.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{industry.name}</strong>
                <small>{industry.kicker}</small>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
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
          image: p.image.startsWith("http") ? p.image : `${site.url}${p.image}`,
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
