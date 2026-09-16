import Link from "next/link";
import { site, whatsapp } from "@/config/site";
import { products } from "@/data/products";
import { Arrow } from "./ui";
export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="wordmark">
              CUBICLE<span>PRO</span>
              <small>WASHROOM SOLUTIONS</small>
            </Link>
            <p>
              Complete washroom solutions.
              <br />
              Clear specification. Careful execution.
            </p>
            <p className="micro">{site.tagline}</p>
          </div>
          <div>
            <h2 className="micro">Systems</h2>
            <div className="footer-products">
              {products.map((p) => (
                <Link href={`/products/${p.slug}/`} key={p.slug}>
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="micro">Explore</h2>
            {[
              "Materials",
              "Hardware",
              "Applications",
              "About",
              "Warranty",
              "Contact",
            ].map((n) => (
              <Link key={n} href={`/${n.toLowerCase()}/`}>
                {n === "Contact"
                  ? "Request a quote"
                  : n === "Warranty"
                    ? "Warranty & assurance"
                    : n === "Hardware"
                      ? "Hardware & Profiles"
                      : n}
              </Link>
            ))}
          </div>
          <div className="footer-contact">
            <h2 className="micro">Let’s talk</h2>
            <a className="footer-phone" href={`tel:${site.tel}`}>
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a
              href={whatsapp()}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us <Arrow diagonal />
            </a>
            <address>{site.address}</address>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Colours and finishes are finalized project-wise.</span>
          <Link href="/contact/#privacy">Enquiry privacy</Link>
          <span>{site.domain}</span>
        </div>
      </div>
    </footer>
  );
}
