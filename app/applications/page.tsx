import Link from "next/link";
import { PageHero, QuoteBand, Eyebrow } from "@/components/ui";
import { applications } from "@/data/products";
import { metadata, PageSchema } from "@/lib/seo";
export const generateMetadata = () =>
  metadata(
    "Commercial Washroom Application Environments",
    "Explore washroom system applications for offices, education, healthcare, hospitality, retail, public facilities, industry and fit-outs.",
    "/applications/",
  );
export default function Applications() {
  return (
    <>
      <PageSchema
        name="Application environments"
        path="/applications/"
        type="CollectionPage"
      />
      <PageHero
        eyebrow="Applications"
        title="Spaces work differently. So do their requirements."
        text="Application, user needs, site interfaces and mounting inform the final system. Explore environments for which Cubiclepro solutions can be specified."
        path="/applications/"
      />
      <section className="section container">
        <div className="application-grid">
          {applications.map(([n, t], i) => (
            <article className="application-card reveal" key={n}>
              <span className="application-number">0{i + 1}</span>
              <Eyebrow>Application environment</Eyebrow>
              <h2>{n}</h2>
              <p>{t}</p>
              <Link
                className="text-link"
                href={`/contact/?brief=${encodeURIComponent(`Application: ${n}`)}`}
              >
                Discuss this requirement ↗
              </Link>
            </article>
          ))}
        </div>
        <div className="notice">
          <h3>Access and inclusion</h3>
          <p>
            Accessible configurations can be discussed against the applicable
            project requirements. Final dimensions, door clearances and support
            details follow the approved layout.
          </p>
        </div>
      </section>
      <QuoteBand />
    </>
  );
}
