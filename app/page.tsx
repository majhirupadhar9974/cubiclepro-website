import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "@/components/hero-carousel";
import { products, workflow } from "@/data/products";
import { articles, faqs, industries, locations, mainCategories } from "@/data/site-content";
import { metadata, PageSchema } from "@/lib/seo";
import { specification, thickness } from "@/config/site";

export const generateMetadata = () => metadata("Toilet Cubicles & Commercial Washroom Solutions India", "Explore CubiclePro restroom cubicles, urinal modesty panels, Junior Cubicles, HPL lockers, shower and changing-room solutions for commercial projects in India.", "/");

const choices = [
  ["Application", "Begin with users, usage, cleaning and privacy needs.", "/applications/", "/images/approved/cubicle-systems/supernova/supernova-main.jpg"],
  ["Profile", "Compare aluminium and stainless-steel profile directions.", "/hardware/", "/images/approved/accessories/profiles/anodised-aluminium/anodised-aluminium-u-channel-profile.jpg"],
  ["Hardware", "Match the hardware family to the approved system.", "/hardware/", "/images/approved/accessories/hardware/stainless-steel/ss-lock-set-with-indicator-side-1.jpg"],
  ["Mounting", "Review floor, wall, top-rail and ceiling interfaces.", "/products/", "/images/approved/accessories/components/floor-anchor.png"],
];

export default function Home() {
  return <>
    <PageSchema name="Commercial washroom solutions" path="/" />
    <HeroCarousel />

    <section className="cp-intro-strip"><div className="container"><p>Solutions shaped around the requirement.</p><span>Restroom cubicles · UMP · Junior · Lockers · Shower · Changing room · Accessories</span></div></section>

    <section className="cp-section" id="solutions"><div className="container">
      <header className="cp-section-head"><div><p className="cp-kicker">Complete solution scope</p><h2>One category at a time.<br /><span>One coordinated system.</span></h2></div><p>Explore the exact public portfolio. Categories with approved visuals use only the supplied image bundle; cladding and washbasin storage remains intentionally text-led.</p></header>
      <div className="cp-card-rail cp-category-rail" role="region" aria-label="Main solution categories" tabIndex={0}>{mainCategories.map((category, index) => <Link className={`cp-tilt-card ${!category.image ? "is-text-card" : ""}`} href={category.href} key={category.slug}>
        {category.image ? <div className="cp-card-media"><Image src={category.image} alt={category.alt || ""} fill sizes="(max-width: 700px) 82vw, 32vw" /></div> : <div className="cp-line-art" aria-hidden="true"><i /><i /><i /><i /></div>}
        <div className="cp-card-copy"><span>0{index + 1}</span><h3>{category.name}</h3><p>{category.description}</p><b aria-hidden="true">↗</b></div>
      </Link>)}</div>
    </div></section>

    <section className="cp-section cp-section-dark"><div className="container">
      <header className="cp-section-head"><div><p className="cp-kicker">Restroom cubicle systems</p><h2>Eight system directions.<br /><span>Clearly separated.</span></h2></div><Link href="/products/">Compare all systems ↗</Link></header>
      <div className="cp-card-rail cp-product-rail" role="region" aria-label="Restroom cubicle systems" tabIndex={0}>{products.slice(0, 8).map((product, index) => <Link className="cp-tilt-card" href={`/products/${product.slug}/`} key={product.slug}><div className="cp-card-media"><Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 700px) 82vw, 34vw" /></div><div className="cp-card-copy"><span>{String(index + 1).padStart(2, "0")} · {product.family}</span><h3>{product.name}</h3><p>{product.character}</p><b aria-hidden="true">↗</b></div></Link>)}</div>
    </div></section>

    <section className="cp-section"><div className="container">
      <header className="cp-section-head"><div><p className="cp-kicker">Selection guide</p><h2>Choose by what matters.</h2></div><p>These four decisions keep the conversation practical before the final specification is approved.</p></header>
      <div className="cp-choice-grid">{choices.map(([name, copy, href, image]) => <Link href={href} className="cp-choice-card" key={name}><Image src={image} alt="" fill sizes="(max-width: 700px) 50vw, 25vw" /><span /><div><small>Decision point</small><h3>{name}</h3><p>{copy}</p><b>↗</b></div></Link>)}</div>
    </div></section>

    <section className="cp-section cp-material-section"><div className="container cp-two-col"><div className="cp-sticky-copy"><p className="cp-kicker">Material technology</p><h2>Material claims need context.</h2><p>Panel selection follows the application and approved project specification—never a generic one-size-fits-all claim.</p><Link className="cp-button cp-button-accent" href="/materials/">Explore materials ↗</Link></div><div className="cp-feature-stack">
      <article><span>01</span><h3>Compact HPL</h3><div className="cp-chip-grid">{["Wet-area suitability", "Impact resistance", "Scratch resistance", "Stain resistance", "Hygienic surface", "Project-led grade"].map((item) => <i key={item}>{item}</i>)}</div><p>Typical panel thicknesses: 12 mm and 18 mm. {thickness}</p></article>
      <article><span>02</span><h3>BWP-FR High-Density Board</h3><div className="cp-chip-grid">{["BWP characteristics", "Fire-retardant grade", "Termite resistance", "Borer resistance", "Dimensional stability", "Screw holding"].map((item) => <i key={item}>{item}</i>)}</div><p>{specification}</p></article>
    </div></div></section>

    <section className="cp-section cp-section-dark"><div className="container"><header className="cp-section-head"><div><p className="cp-kicker">Built around the space</p><h2>From offices to airports.<br /><span>From schools to healthcare.</span></h2></div><Link href="/applications/">Explore applications ↗</Link></header>
      <div className="cp-industry-grid">{industries.map((industry) => <Link className="cp-industry-card" href={`/industries/${industry.slug}/`} key={industry.slug}><div><Image src={industry.image} alt={`${industry.name} washroom application visual`} fill sizes="(max-width: 700px) 88vw, 32vw" /></div><span>{industry.kicker}</span><h3>{industry.name}</h3><p>{industry.description}</p><b>Explore application ↗</b></Link>)}</div>
    </div></section>

    <section className="cp-section"><div className="container"><header className="cp-section-head"><div><p className="cp-kicker">Process</p><h2>Clear steps. Fewer assumptions.</h2></div></header><div className="cp-process" role="region" aria-label="CubiclePro project process" tabIndex={0}>{workflow.map(([name, copy], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true">{["◎","⌁","▤","▣","◇"][index]}</i><h3>{name}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="cp-section cp-faq-section"><div className="container cp-two-col"><div className="cp-sticky-copy"><p className="cp-kicker">Questions & answers</p><h2>Useful answers before a quotation.</h2><p>Original, specification-controlled guidance for product selection, custom requirements, warranty and enquiry preparation.</p><Link href="/faq/">View all questions ↗</Link></div><div className="cp-accordion">{faqs.slice(0, 7).map((item, index) => <details key={item.q} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.q}<b aria-hidden="true">+</b></summary><p>{item.a}</p></details>)}</div></div></section>

    <section className="cp-section cp-section-dark"><div className="container"><header className="cp-section-head"><div><p className="cp-kicker">Knowledge centre</p><h2>Practical project guides.</h2></div><Link href="/resources/">View all resources ↗</Link></header><div className="cp-article-grid">{articles.slice(0, 3).map((article, index) => <Link href={`/blog/${article.slug}/`} key={article.slug}><span>{article.category} · {article.readTime}</span><h3>{article.title}</h3><p>{article.summary}</p><b>{String(index + 1).padStart(2, "0")} ↗</b></Link>)}</div></div></section>

    <section className="cp-section"><div className="container cp-location-panel"><div><p className="cp-kicker">India enquiry network</p><h2>Project conversations across key cities.</h2><p>City pages are published only when they contain useful, differentiated guidance. Thin location pages remain outside search indexing.</p></div><div>{locations.filter((item) => item.indexable).map((item) => <Link href={`/locations/${item.slug}/`} key={item.slug}>{item.city}<span>↗</span></Link>)}</div></div></section>

    <section className="cp-final-cta"><div className="container"><div><p className="cp-kicker">Start with the requirement</p><h2>Let’s discuss your project.</h2><p>Share the application, project city, approximate quantity and any available drawing or BOQ.</p></div><div><Link className="cp-button cp-button-accent" href="/contact/">Request a quote ↗</Link><Link className="cp-button cp-button-ghost" href="/technical-enquiry/">Technical enquiry ↗</Link></div></div></section>
  </>;
}
