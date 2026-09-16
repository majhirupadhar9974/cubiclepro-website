import Link from "next/link";
import {
  PageHero,
  SectionHeading,
  Visual,
  QuoteBand,
  Eyebrow,
} from "@/components/ui";
import { metadata, PageSchema } from "@/lib/seo";
import { products, imageFor } from "@/data/products";
const details = [
  [
    "Indicator lock & door knob",
    "Privacy indication and the door grip are separate components, coordinated to the approved system.",
  ],
  [
    "Hinges & coat hooks",
    "Door movement and internal convenience fittings are specified with the system.",
  ],
  [
    "Door-stopper & U-channel profiles",
    "Door edges and wall/panel junctions are detailed with the applicable profiles.",
  ],
  [
    "Pedestals & legs",
    "Floor support components are used only in applicable configurations.",
  ],
  [
    "Headrails & support rails",
    "Top support forms part of the selected structural arrangement.",
  ],
  ["Shoe-box supports", "A defined base channel for the Box-Up Series."],
];
export const generateMetadata = () =>
  metadata(
    "Toilet Cubicle Hardware & Profiles",
    "Understand nylon and stainless hardware, aluminium profiles, stainless supports, shoe-box bases and suspended configurations.",
    "/hardware/",
  );
export default function Hardware() {
  return (
    <>
      <PageSchema name="Hardware & profiles" path="/hardware/" />
      <PageHero
        eyebrow="Hardware & profiles"
        title="The system is in the details."
        text="Profiles, hardware and mounting are selected together. Every component belongs to the approved configuration."
        path="/hardware/"
      />
      <section className="section container split">
        <Visual
          src={imageFor("nova")}
          alt="Nova brochure concept showing profile and hardware arrangement"
          className="feature-image"
        />
        <div>
          <Eyebrow>Coordinated components</Eyebrow>
          <h2>
            Precise interfaces.
            <br />
            Considered details.
          </h2>
          <p className="lede">
            Nylon hardware, stainless-steel hardware, aluminium profiles and
            stainless supports are mapped to specific product systems.
          </p>
          <p>
            Final geometry, fasteners and fixing details are confirmed through
            the project specification.
          </p>
        </div>
      </section>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="Component vocabulary"
            title="From the door grip to the support line."
          />
          <div className="detail-grid">
            {details.map(([n, t], i) => (
              <article key={n} className="reveal">
                <span className="micro">0{i + 1}</span>
                <h3>{n}</h3>
                <p>{t}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="System mapping"
          title="Every grade, clearly stated."
        />
        <div className="hardware-matrix">
          {products.map((p) => (
            <Link href={`/products/${p.slug}/`} key={p.slug}>
              <h3>{p.name}</h3>
              <div>
                <span className="micro">Profile / support</span>
                <p>{p.profile}</p>
              </div>
              <div>
                <span className="micro">Hardware</span>
                <p>{p.hardware}</p>
              </div>
              <span>↗</span>
            </Link>
          ))}
        </div>
      </section>
      <QuoteBand />
    </>
  );
}
