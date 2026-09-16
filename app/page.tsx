import Link from "next/link";
import {
  Arrow,
  Button,
  Eyebrow,
  SectionHeading,
  Visual,
  ProductCard,
  QuoteBand,
  WarrantyCard,
  FinishNote,
} from "@/components/ui";
import ChooseSystem from "@/components/choose-system";
import {
  products,
  scope,
  workflow,
  applications,
  imageFor,
  imageAltFor,
} from "@/data/products";
import { metadata, PageSchema } from "@/lib/seo";
import { specification, thickness, whatsapp } from "@/config/site";
export const generateMetadata = () =>
  metadata(
    "Toilet Cubicles & Washroom Solutions India",
    "Explore Cubiclepro toilet cubicles, partitions, modesty panels, HPL lockers and coordinated commercial washroom solutions.",
    "/",
  );
export default function Home() {
  return (
    <>
      <PageSchema name="Complete washroom solutions" path="/" />
      <section className="hero">
        <Visual
          src={imageFor("hero")}
          alt="Architectural blue washroom cubicles from the official Cubiclepro brochure"
          priority
          className="hero-image"
          label={false}
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <Eyebrow>Complete washroom solutions</Eyebrow>
          <h1>
            <span>Architectural washroom systems,</span>{" "}
            <em>specified for the project.</em>
          </h1>
          <p className="hero-slogan">Considered spaces. Solid solutions.</p>
          <p>
            Cubicles, partitions and coordinated washroom systems.
            <br className="desktop-only" /> Specified for the project. Detailed
            for the everyday.
          </p>
          <div className="hero-buttons">
            <Button href="/products/" light>
              Explore products
            </Button>
            <Link href="/contact/" className="hero-text-link">
              Request a quote <Arrow diagonal />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>SUPPLY · INSTALLATION · COORDINATION</span>
          <span className="hero-caption">Concept Visual</span>
          <a
            href="#solutions"
            aria-label="Scroll to complete washroom solutions"
          >
            Scroll to explore <span>↓</span>
          </a>
        </div>
      </section>
      <section id="solutions" className="section container">
        <SectionHeading
          eyebrow="01 / The complete scope"
          title="One partner. A broader possibility."
          text="From the first cubicle to the finishing details, a coordinated approach to commercial washroom spaces."
          href="/products/"
          link="Explore our scope"
        />
        <div className="scope-grid">
          {scope.map((s, i) => (
            <Link
              className="scope-item reveal"
              key={s}
              href={
                s === "Modesty Panels"
                  ? "/products/modesty-panels/"
                  : s === "HPL Lockers"
                    ? "/products/hpl-lockers/"
                    : s === "Pro Doors"
                      ? "/products/pro-doors/"
                      : s === "Accessories"
                        ? "/hardware/"
                        : s === "Customized Systems"
                          ? "/products/custom/"
                          : "/contact/"
              }
            >
              <span className="scope-number">0{i + 1}</span>
              <h3>{s}</h3>
              <Arrow diagonal />
            </Link>
          ))}
        </div>
      </section>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="02 / Product systems"
            title="A clear structural language."
            text="Distinct profiles. Thoughtful configurations. Find the system direction for your space."
            href="/products/"
            link="View all systems"
          />
          <div className="product-grid">
            {[
              products[0],
              products[1],
              products[3],
              products[5],
              products[6],
              products[7],
            ].map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="03 / Specification starts here"
          title="A system starts with the project."
          text="Four considerations shape the final configuration. Explore a direction, then discuss the detail."
        />
        <ChooseSystem />
      </section>
      <section className="materials-home section dark-section">
        <div className="container split">
          <div className="sticky-copy reveal">
            <Eyebrow>04 / Material technology</Eyebrow>
            <h2>
              Two material routes.
              <br />
              <em>One considered specification.</em>
            </h2>
            <p>
              Panel selection begins with application, environment and the
              approved project requirement.
            </p>
            <Button href="/materials/" light>
              Explore materials
            </Button>
          </div>
          <div className="material-stack">
            <article className="material-panel reveal">
              <div className="material-edge edge-hpl" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p className="micro">Material / 01</p>
              <h3>Compact HPL</h3>
              <p>
                A dense panel option for cubicles, privacy panels and
                coordinated commercial washroom applications.
              </p>
            </article>
            <article className="material-panel reveal">
              <div className="material-edge edge-board" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p className="micro">Material / 02</p>
              <h3>
                BWP-FR
                <br />
                High-Density Board
              </h3>
              <p>
                A board option for approved specifications calling for
                boiling-water-resistant and fire-retardant characteristics.
              </p>
            </article>
            <p className="fine-print">
              Typical thicknesses: 12 mm / 18 mm. {thickness} {specification}
            </p>
          </div>
        </div>
      </section>
      <section className="section container split feature-split">
        <Visual
          src={imageFor("nova")}
          alt="Anodised aluminium profiles and door fittings in the Nova brochure concept"
          className="feature-image reveal"
        />
        <div className="reveal">
          <Eyebrow>05 / Hardware & profiles</Eyebrow>
          <h2>
            The difference
            <br />
            is in the detail.
          </h2>
          <p className="lede">
            Profile, hardware and mounting work together. Aluminium, stainless
            steel and nylon options are coordinated to the selected system.
          </p>
          <div className="detail-list">
            <span>Profile / support</span>
            <span>Hardware configuration</span>
            <span>Mounting & site interfaces</span>
          </div>
          <Button href="/hardware/">Explore the details</Button>
        </div>
      </section>
      <section className="suspended-section section surface">
        <div className="container">
          <SectionHeading
            eyebrow="06 / Suspended systems"
            title="Lighter at floor level."
            text="Two architectural approaches. Each with its own support configuration."
          />
          <div className="suspended-grid">
            {products.slice(6, 8).map((p) => (
              <article key={p.slug} className="reveal">
                <Visual
                  src={imageFor(p.slug)}
                  alt={imageAltFor(p.slug)}
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
                <div className="suspended-copy">
                  <div>
                    <p className="micro">{p.mounting}</p>
                    <h3>{p.name}</h3>
                    <p>
                      {p.profile} · {p.hardware} hardware
                    </p>
                  </div>
                  <Link
                    href={`/products/${p.slug}/`}
                    className="circle-link"
                    aria-label={`Explore ${p.name}`}
                  >
                    <Arrow diagonal />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container split feature-split">
        <div className="reveal">
          <Eyebrow>07 / Modesty panels</Eyebrow>
          <h2>
            Privacy with
            <br />
            <em>a designed edge.</em>
          </h2>
          <p className="lede">
            Compact HPL, stainless-steel wall clamps and nine reference
            profiles. Custom shapes where the project calls for them.
          </p>
          <Button href="/products/modesty-panels/">
            Explore modesty panels
          </Button>
        </div>
        <Visual
          src={imageFor("modesty-panels")}
          alt="HPL modesty panels between urinals, shown in the Cubiclepro brochure"
          className="feature-image reveal"
        />
      </section>
      <section className="section surface">
        <div className="container twin-features">
          <article className="reveal">
            <Visual
              src={imageFor("junior-series")}
              alt="Child-height shaped blue Junior Series cubicle concept"
            />
            <Eyebrow>08 / Junior series</Eyebrow>
            <h2>
              For smaller users.
              <br />
              With equal care.
            </h2>
            <p>
              Thoughtful proportions and shaped profiles, confirmed for the
              intended age group and site.
            </p>
            <Link className="text-link" href="/products/junior-series/">
              Meet the Junior Series <Arrow />
            </Link>
          </article>
          <article className="reveal">
            <Visual
              src={imageFor("hpl-lockers")}
              alt="Single and multi-tier HPL locker bank concept"
            />
            <Eyebrow>09 / HPL lockers</Eyebrow>
            <h2>
              Storage that belongs
              <br />
              to the space.
            </h2>
            <p>
              Single-tier, multi-tier and custom banks, coordinated to room
              dimensions and user flow.
            </p>
            <Link className="text-link" href="/products/hpl-lockers/">
              Explore HPL lockers <Arrow />
            </Link>
          </article>
        </div>
      </section>
      <section className="section container" id="how-we-work">
        <SectionHeading
          eyebrow="10 / How we work"
          title="From requirement to handover."
          text="A practical workflow to keep the scope, detail and installation aligned."
        />
        <div className="workflow">
          {workflow.map(([n, t], i) => (
            <article className="reveal" key={n}>
              <span className="step-number">0{i + 1}</span>
              <h3>{n}</h3>
              <p>{t}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section applications-home">
        <div className="container split">
          <div className="reveal">
            <Eyebrow>11 / Application environments</Eyebrow>
            <h2>
              Configured for
              <br />
              the way spaces work.
            </h2>
            <p className="lede">
              Commercial washroom solutions shaped around the application and
              the people who use it.
            </p>
            <Button href="/applications/">View applications</Button>
          </div>
          <div className="application-links">
            {applications.map(([n], i) => (
              <Link href="/applications/" className="reveal" key={n}>
                <span className="micro">0{i + 1}</span>
                {n}
                <Arrow diagonal />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <Eyebrow>12 / Warranty & assurance</Eyebrow>
        <WarrantyCard />
        <FinishNote />
      </section>
      <QuoteBand />
    </>
  );
}
