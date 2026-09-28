import {
  PageHero,
  QuoteBand,
  WarrantyCard,
  SectionHeading,
} from "@/components/ui";
import { metadata, PageSchema } from "@/lib/seo";
export const generateMetadata = () =>
  metadata(
    "Warranty & Assurance",
    "Review Cubiclepro’s one-year cover for hardware, profiles and installation workmanship, plus grade-specific panel warranty terms.",
    "/warranty/",
  );
export default function Warranty() {
  return (
    <>
      <PageSchema name="Warranty & assurance" path="/warranty/" />
      <PageHero
        eyebrow="Warranty & assurance"
        title="Clear cover. Clear conditions."
        text="The Cubiclepro warranty and panel material warranty are stated separately, so the scope is easy to understand."
        path="/warranty/"
      />
      <section className="section container">
        <WarrantyCard />
        <div className="detail-grid warranty-details">
          <article>
            <h2>Hardware</h2>
            <p>
              1 year warranty, subject to normal usage and Cubiclepro warranty
              conditions.
            </p>
          </article>
          <article>
            <h2>Profiles</h2>
            <p>
              1 year warranty, subject to normal usage and Cubiclepro warranty
              conditions.
            </p>
          </article>
          <article>
            <h2>Installation workmanship</h2>
            <p>
              1 year warranty on installation workmanship / craftsmanship,
              subject to normal usage and Cubiclepro warranty conditions.
            </p>
          </article>
        </div>
      </section>
      <section className="section surface">
        <div className="container narrow">
          <SectionHeading
            eyebrow="Panel material"
            title="The warranty follows the grade."
          />
          <p className="lede">
            10-year manufacturer warranty from the date of work completion,
            subject to standard usage conditions and the approved material
            grade.
          </p>
          <p>
            The panel warranty applies to the specified panel material and its
            stated usage conditions. The approved material grade and warranty
            documentation form part of the project record.
          </p>
          <h3>Before handover</h3>
          <p>
            The agreed installation scope is aligned, fixed, inspected and
            handed over. Contact Cubiclepro to discuss the applicable warranty
            conditions or a support requirement.
          </p>
        </div>
      </section>
      <QuoteBand />
    </>
  );
}
