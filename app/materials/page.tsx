import Image from "next/image";
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
          <figure className="material-approved-visual">
            <Image src="/images/approved/materials/hpl/hpl-approved-infographic.png" alt="Compact HPL approved material and composition infographic" fill sizes="(max-width: 760px) 100vw, 45vw" />
            <figcaption>Approved material visual</figcaption>
          </figure>
          <div>
            <Eyebrow>01 / Compact laminate</Eyebrow>
            <h2>COMPACT HPL</h2>
            <p className="lede">
              A compact high-pressure laminate panel used for
              cubicles, partitions, modesty panels and coordinated washroom
              applications.
            </p>
            <p>
              Wet-area suitability, moisture resistance, impact, scratch,
              stain and hygiene properties are reviewed against the selected
              panel grade and current technical documentation.
            </p>
            <p className="fine-print">
              Exact performance, fire classification, boiling-water test results
              and applicable standards depend on the approved grade, thickness
              and current technical documentation.
            </p>
          </div>
        </div>
        <div className="material-detail">
          <div className="material-text-panel" aria-label="BWP-FR High-Density Board text-led information panel">
            <span className="micro">Material option</span><strong>BWP-FR</strong>
            <span>High-Density Board</span><p>Grade-specific documentation reviewed project-wise.</p>
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
      <section className="section container material-care" aria-labelledby="material-care-title">
        <Eyebrow>Care & documentation</Eyebrow>
        <h2 id="material-care-title">Use the approved grade documentation.</h2>
        <p className="lede">Follow the care instructions issued for the selected material grade. Avoid unapproved abrasive cleaners, solvents or maintenance methods.</p>
        <p>Current grade-specific technical documentation can be requested with a project enquiry. No generic test value, fire classification or standard is substituted for the approved product documentation.</p>
      </section>
      <QuoteBand />
    </>
  );
}
