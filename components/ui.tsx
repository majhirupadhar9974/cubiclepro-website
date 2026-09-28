import Image from "next/image";
import Link from "next/link";
import { finishes, site, whatsapp } from "@/config/site";
import { imageFor, imageAltFor, type Product } from "@/data/products";
import { pageSeo } from "@/data/seo";
import { JsonLd } from "@/lib/seo";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function Button({
  href,
  children,
  secondary = false,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-outline" : ""} ${light ? "button-light" : ""}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  href,
  link = "Explore more",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading reveal">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {text && <p className="lede">{text}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link}
          <Arrow />
        </Link>
      )}
    </div>
  );
}
export function Visual({
  src,
  alt,
  priority = false,
  className = "",
  label = true,
  sizes = "(max-width: 767px) 100vw, 60vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  label?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={`visual ${className}`}>
      <Image
        src={src}
        alt={
          alt
        }
        fill
        sizes={sizes}
        priority={priority}
      />
      {label && <figcaption>Product Visual</figcaption>}
    </figure>
  );
}
export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <article className="product-card reveal">
      <Link
        href={`/products/${product.slug}/`}
        aria-label={`Explore ${product.name}`}
      >
        <div className="card-image">
          <Image
            src={imageFor(product.slug)}
            alt={imageAltFor(product.slug)}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"
          />
          <span className="card-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="card-image-label">Product Visual</span>
          <span className="card-arrow">
            <Arrow diagonal />
          </span>
        </div>
        <div className="card-body">
          <p className="micro">{product.family}</p>
          <h3>{product.name}</h3>
          <p>{product.character}</p>
          <div className="card-spec">
            <span>{product.profile}</span>
            <span>{product.hardware}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {all.map((x, i) => (
            <li key={i}>
              {x.href ? (
                <Link href={x.href}>{x.name}</Link>
              ) : (
                <span aria-current="page">{x.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((x, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: x.name,
            ...(x.href ? { item: `${site.url}${x.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
export function PageHero({
  eyebrow,
  title,
  text,
  path,
}: {
  eyebrow: string;
  title: string;
  text: string;
  path: string;
}) {
  return (
    <header className="page-hero">
      <div className="container">
        <Breadcrumbs items={[{ name: eyebrow, href: undefined }]} />
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{pageSeo[path]?.h1 || title}</h1>
        <p className="lede">{text}</p>
      </div>
    </header>
  );
}
export function QuoteBand({ product }: { product?: string }) {
  return (
    <section className="quote-band">
      <div className="container quote-inner">
        <div>
          <Eyebrow>Start a conversation</Eyebrow>
          <h2>
            Better washrooms
            <br />
            <em>begin with a brief.</em>
          </h2>
          <p>Tell us about your space. We’ll help define the next step.</p>
        </div>
        <div className="quote-actions">
          <Button
            href={`/contact/${product ? `?system=${encodeURIComponent(product)}` : ""}`}
            light
          >
            Request a quote
          </Button>
          <a
            className="text-link"
            href={whatsapp(product)}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us <Arrow />
          </a>
          <a href={`tel:${site.tel}`}>{site.phone}</a>
        </div>
      </div>
    </section>
  );
}
export function WarrantyCard() {
  return (
    <div className="warranty-card reveal">
      <div className="warranty-number">
        1<span>YEAR WARRANTY</span>
      </div>
      <div>
        <h3>Clear cover. Clear conditions.</h3>
        <p>
          On hardware, profiles and installation workmanship / craftsmanship,
          subject to normal usage and Cubiclepro warranty conditions.
        </p>
        <Link href="/warranty/" className="text-link">
          Warranty & assurance <Arrow />
        </Link>
      </div>
    </div>
  );
}
export function FinishNote() {
  return <p className="fine-print">{finishes}</p>;
}
