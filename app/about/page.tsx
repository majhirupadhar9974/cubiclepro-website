import {
  PageHero,
  QuoteBand,
  Visual,
  Eyebrow,
  SectionHeading,
} from "@/components/ui";
import { imageFor, workflow } from "@/data/products";
import { metadata, PageSchema } from "@/lib/seo";
export const generateMetadata = () =>
  metadata(
    "About Cubiclepro Washroom Solutions",
    "A new firm built around clear specification, site-aware detailing, responsive coordination and practical installation understanding.",
    "/about/",
  );
export default function About() {
  return (
    <>
      <PageSchema name="About Cubiclepro" path="/about/" type="AboutPage" />
      <PageHero
        eyebrow="About Cubiclepro"
        title="New firm. Practical experience."
        text="Built around clear specification and careful execution. Focused on dependable washroom systems and responsive coordination."
        path="/about/"
      />
      <section className="section container split">
        <Visual
          src={imageFor("hero")}
          alt="Blue commercial cubicle concept from Cubiclepro brochure"
          className="feature-image"
        />
        <div>
          <Eyebrow>Our position</Eyebrow>
          <h2>
            Installation understanding.
            <br />
            From the start.
          </h2>
          <p className="lede">
            Cubiclepro Washroom Solutions is a new firm with hands-on fitting
            and installation understanding.
          </p>
          <p>
            Our team brings prior fitting exposure across established modular
            cubicle systems. Work completed before Cubiclepro was formed is not
            represented as the firm’s project portfolio.
          </p>
          <p>
            We coordinate cubicles, partitions, lockers, cladding, doors,
            accessories and customized systems from requirement review to
            installation and handover.
          </p>
        </div>
      </section>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="What guides us"
            title="Practical principles. Consistent care."
          />
          <div className="detail-grid">
            {[
              [
                "Clear specification",
                "The right profile, hardware and mounting method.",
              ],
              [
                "Site-aware detailing",
                "Layouts coordinated with actual site conditions.",
              ],
              [
                "Responsible execution",
                "Measured installation, alignment and handover.",
              ],
              [
                "Responsive coordination",
                "Practical communication at each project stage.",
              ],
              [
                "Installation understanding",
                "Attention to interfaces, fixing and the final fit.",
              ],
              [
                "Expandable scope",
                "Associated washroom products supported as requirements grow.",
              ],
            ].map(([n, t]) => (
              <article className="reveal" key={n}>
                <h3>{n}</h3>
                <p>{t}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="Our workflow"
          title="From requirement to handover."
        />
        <div className="workflow">
          {workflow.map(([n, t], i) => (
            <article key={n}>
              <span className="step-number">0{i + 1}</span>
              <h3>{n}</h3>
              <p>{t}</p>
            </article>
          ))}
        </div>
      </section>
      <QuoteBand />
    </>
  );
}
