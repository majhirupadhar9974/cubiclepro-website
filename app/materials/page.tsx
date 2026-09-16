import {
  PageHero,
  Eyebrow,
  QuoteBand,
  SectionHeading,
  FinishNote,
} from "@/components/ui";
import { metadata, PageSchema } from "@/lib/seo";
import { specification, thickness } from "@/config/site";
export const generateMetadata = () =>
  metadata(
    "Compact HPL & BWP-FR High-Density Board",
    "Explore material options for commercial washrooms, with grade, thickness and suitability confirmed against the approved project specification.",
    "/materials/",
  );
export default function Materials() {
  return (
    <>
      <PageSchema name="Materials" path="/materials/" />
      <PageHero
        eyebrow="Materials"
        title="Material matters. Specification first."
        text="Selection begins with the application, environment, support system and approved requirement. Every material grade has its own documented performance."
        path="/materials/"
      />
      <section className="section container">
        <div className="material-detail">
          <div className="material-art">
            <div className="material-edge edge-hpl">
              <span />
              <span />
              <span />
            </div>
            <span className="micro">Material illustration</span>
          </div>
          <div>
            <Eyebrow>01 / Compact laminate</Eyebrow>
            <h2>COMPACT HPL</h2>
            <p className="lede">
              A dense, self-supporting high-pressure laminate panel used for
              cubicles, partitions, modesty panels and coordinated washroom
              applications.
            </p>
            <p>
              Depending on the selected grade and finish, documented properties
              can include moisture, impact, scratch and stain resistance,
              durability and an easy-care surface.
            </p>
            <p className="fine-print">
              Exact performance, fire classification, boiling-water test results
              and applicable standards depend on the approved grade, thickness
              and current technical documentation.
            </p>
          </div>
        </div>
        <div className="material-detail">
          <div className="material-art">
            <div className="material-edge edge-board">
              <span />
              <span />
              <span />
            </div>
            <span className="micro">Material illustration</span>
          </div>
          <div>
            <Eyebrow>02 / High-density board</Eyebrow>
            <h2>
              BWP-FR
              <br />
              HIGH-DENSITY BOARD
            </h2>
            <p className="lede">
              A board option for projects whose approved specification calls for
              boiling-water-resistant and fire-retardant characteristics.
            </p>
            <p>
              Depending on the approved, documented grade, relevant properties
              may include termite and borer resistance, strength, bonding,
              screw-holding performance and dimensional stability.
            </p>
            <p className="fine-print">
              These properties apply only to the approved board grade and its
              current documentation. Suitability for the intended washroom
              condition is confirmed project-wise.
            </p>
          </div>
        </div>
      </section>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="Panel specification"
            title="The right thickness for the detail."
          />
          <div className="thickness-row">
            <span>
              12<small>mm</small>
            </span>
            <span>
              18<small>mm</small>
            </span>
            <div>
              <h3>Typical thicknesses offered</h3>
              <p>{thickness}</p>
            </div>
          </div>
          <p>{specification}</p>
          <FinishNote />
        </div>
      </section>
      <QuoteBand />
    </>
  );
}
