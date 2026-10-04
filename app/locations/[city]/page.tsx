import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations, locationBySlug } from "@/data/site-content";
import { site } from "@/config/site";
import { JsonLd } from "@/lib/seo";
import { TechnicalWhatsAppAction } from "@/components/ui";
import { getPublishedLocation, type PortableBlock } from "@/lib/cms";

export const dynamicParams = true;

const blockText = (block?: PortableBlock) => block?.children?.map((child) => child.text || "").join("").trim() || "";

export function generateStaticParams() {
  return locations.map(({ slug }) => ({ city: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cms = await getPublishedLocation(city);
  const item = locationBySlug(city);
  if (!cms && !item) return {};

  const cityName = cms?.city || item!.city;
  const title = cms?.seoTitle || `Toilet Partitions & Restroom Cubicles in ${cityName}`;
  const description = cms?.metaDescription || `Looking for toilet partitions or restroom cubicles in ${cityName}? Discuss CubiclePro washroom cubicles, UMPs, HPL lockers and project-specific solutions.`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: cms?.canonicalPath || `/locations/${city}/` },
    openGraph: {
      title,
      description,
      url: `/locations/${city}/`,
      type: "website",
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cms = await getPublishedLocation(city);
  const fallback = locationBySlug(city);
  if (!cms && !fallback) notFound();
  const cmsFocus = blockText(cms?.uniqueContent?.find((entry) => entry.style !== "h2"));
  const cmsSectors = blockText(cms?.uniqueContent?.find((entry, index) => index > 0 && entry.style !== "h2")).split("·").map((entry) => entry.trim()).filter(Boolean);
  const item = {
    city: cms?.city || fallback!.city,
    slug: cms?.slug.current || fallback!.slug,
    region: fallback?.region || "India",
    focus: cmsFocus || fallback?.focus || "Commercial washroom requirements can be reviewed against the project scope and approved specification.",
    sectors: cmsSectors.length ? cmsSectors : fallback?.sectors || ["Commercial projects", "Institutional facilities", "Public washrooms"],
  };

  const faqs = [
    {
      q: `Do you provide toilet partitions in ${item.city}?`,
      a: `CubiclePro accepts project enquiries for commercial toilet partitions, restroom cubicles and washroom partition systems in ${item.city}. Share the exact site location, application, approximate quantity and drawings where available.`,
    },
    {
      q: `Can I enquire for a toilet partition near ${item.city}?`,
      a: `Yes. For a project in or near ${item.city}, share the exact location so the supply, installation and coordination scope can be confirmed in the quotation.`,
    },
    {
      q: `Which restroom cubicle systems can be discussed for ${item.city}?`,
      a: "The range includes Titan Black, Nova, Supernova, Supernova+, Base Box, Base Box Pro, Float and Sky Hung, together with custom project configurations where technically suitable.",
    },
    {
      q: "Can restroom partitions and washroom cubicles be customised?",
      a: "Yes. Dimensions, layout, privacy, compatible profiles, hardware and mounting configuration can be reviewed against the site conditions and approved project specification.",
    },
    {
      q: `Can HPL lockers and urinal privacy panels be included in a ${item.city} enquiry?`,
      a: "Yes. HPL locker modules and urinal modesty panels can be included as separate, coordinated scope items along with the cubicle requirement.",
    },
    {
      q: `How do I request a washroom-partition quotation in ${item.city}?`,
      a: `Use Request a Quote, call or WhatsApp sales on ${site.phone}, or email ${site.salesEmail}. Include the city, site location, product category, quantity and available drawings.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Toilet partitions and restroom cubicles in ${item.city}`,
          description: item.focus,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "City", name: item.city },
          url: `${site.url}/locations/${item.slug}/`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />

      <header className="page-hero">
        <div className="container">
          <p className="cp-kicker">{item.region} · Project enquiries</p>
          <h1>Toilet Partitions and Restroom Cubicles in {item.city}</h1>
          <p className="lede">{item.focus}</p>
        </div>
      </header>

      <section className="cp-section">
        <div className="container cp-two-col">
          <div>
            <p className="cp-kicker">Local project scope</p>
            <h2>Toilet-partition systems for {item.city} projects.</h2>
            <p>
              CubiclePro accepts enquiries for toilet cubicles, restroom
              partitions and washroom cubicles in {item.city}. Select the
              system by application, expected use, panel requirement, profile,
              hardware, mounting condition and verified site interfaces.
            </p>
            <p>
              Final material grade, panel thickness, hardware and configuration
              are confirmed against the approved project specification.
            </p>
          </div>
          <div className="cp-feature-stack">
            {item.sectors.map((sector, index) => (
              <article key={sector}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{sector}</h3>
                <p>
                  Review user flow, privacy, cleaning access, material,
                  mounting and installation interfaces for this application.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-section cp-section-dark">
        <div className="container cp-two-col">
          <div>
            <p className="cp-kicker">Coordinated solutions</p>
            <h2>Restroom cubicles and washroom partitions.</h2>
            <p>
              The project can combine commercial toilet partitions, urinal
              privacy panels, Junior Cubicles, HPL lockers, shower cubicles,
              changing-room cubicles, Pro Doors, cladding, storage, profiles
              and hardware as clearly separated scope items.
            </p>
          </div>
          <div className="cp-feature-stack">
            <article>
              <span>Systems</span>
              <h3>Compare the restroom range.</h3>
              <p>
                Review aluminium, stainless-steel, box-up, floating and
                ceiling-hung system directions before selecting a product.
              </p>
              <Link className="cp-button cp-button-accent" href="/products/">
                Explore cubicle systems ↗
              </Link>
            </article>
            <article>
              <span>Privacy & storage</span>
              <h3>Add UMPs and lockers.</h3>
              <p>
                Coordinate urinal privacy and locker capacity with the users,
                room layout and approved product schedules.
              </p>
              <div className="cp-chip-grid">
                <Link href="/products/modesty-panels/">Urinal privacy panels ↗</Link>
                <Link href="/products/hpl-lockers/">HPL lockers ↗</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="cp-section cp-faq-section">
        <div className="container cp-two-col">
          <div>
            <p className="cp-kicker">{item.city} questions</p>
            <h2>Useful answers before a quotation.</h2>
            <p>
              City pages confirm the enquiry route, not an invented delivery
              time, local office or completed-project claim.
            </p>
          </div>
          <div className="cp-accordion">
            {faqs.map((faq, index) => (
              <details key={faq.q} open={index === 0}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {faq.q}
                  <b aria-hidden="true">+</b>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-final-cta">
        <div className="container">
          <div>
            <p className="cp-kicker">Project enquiry · {item.city}</p>
            <h2>Discuss your washroom requirement.</h2>
            <p>
              Share the location, application, approximate quantity and any
              available drawing.
            </p>
          </div>
          <div className="cp-enquiry-actions">
            <Link
              className="cp-button cp-button-accent"
              href={`/contact/?city=${encodeURIComponent(item.city)}`}
            >
              Request a quote for {item.city} ↗
            </Link>
            <TechnicalWhatsAppAction subject={`${item.city} project technical details`} />
          </div>
        </div>
      </section>
    </>
  );
}
