import Link from "next/link";
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
  const p = productBySlug(slug);
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
  const p = productBySlug(slug);
  if (!p) notFound();
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
        <Visual
          src={imageFor(slug)}
          alt={imageAltFor(slug)}
          priority
          className="product-hero-image"
          sizes="100vw"
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
                src={imageFor("shape-library")}
                alt="Nine modesty panel reference outlines: Aero, Taper, Wave, Slant, Soft, Lean, Flow, Sweep and Dome"
                className="shape-library"
                label={false}
                sizes="100vw"
              />
            )}
            <div className="variant-list">
              {p.variants.map((v) => (
                <Link
                  href={`/contact/?system=${encodeURIComponent(v)}`}
                  key={v}
                >
                  {v}
                  <span>↗</span>
                </Link>
              ))}
            </div>
            <p className="fine-print">
              {slug === "modesty-panels"
                ? "Reference size: approx. 1200 mm height × 450 mm width. Final dimensions are project-specific."
                : slug === "junior-series"
                  ? "Final panel height and profile arrangement are confirmed for the intended age group and site."
                  : "Layouts, locking options and internal arrangements are confirmed against the approved locker schedule."}
            </p>
          </div>
        </section>
      )}
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
          <div className="detail-list">
            {(slug === "junior-series"
              ? ["Education", "Public Facilities"]
              : slug === "hpl-lockers"
                ? [
                    "Education",
                    "Corporate Offices",
                    "Hospitality",
                    "Industrial",
                  ]
                : applications.map(([name]) => name)
            ).map((name) => (
              <span key={name}>{name}</span>
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
      <QuoteBand product={p.name} />
    </>
  );
}
