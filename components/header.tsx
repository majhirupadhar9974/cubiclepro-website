"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { mainCategories } from "@/data/site-content";
import { products } from "@/data/products";
import { site, whatsapp } from "@/config/site";

const links = [["Solutions", "/products/"], ["Materials", "/materials/"], ["Applications", "/applications/"], ["Resources", "/resources/"], ["About", "/about/"]];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const path = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); setProductsOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", escape); };
  }, [open]);
  return <>
    <header className="cp-header">
      <div className="cp-header-inner container">
        <Link href="/" className="cp-wordmark" aria-label="CubiclePro home">CUBICLE<span>PRO</span><small>WASHROOM SOLUTIONS</small></Link>
        <nav className="cp-desktop-nav" aria-label="Main navigation">
          <button type="button" aria-expanded={productsOpen} onClick={() => setProductsOpen((value) => !value)}>Products <span>⌄</span></button>
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <Link href="/contact/" className="cp-header-quote">Request a quote <span aria-hidden="true">↗</span></Link>
        <button ref={trigger} className="cp-menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /><span /></button>
      </div>
    </header>
    {productsOpen && <div className="cp-mega-menu"><div className="container cp-mega-grid"><div><p className="cp-kicker">Main categories</p>{mainCategories.map((item) => <Link href={item.href} key={item.slug}>{item.name}<span>↗</span></Link>)}</div><div><p className="cp-kicker">Restroom systems</p>{products.slice(0, 8).map((item) => <Link href={`/products/${item.slug}/`} key={item.slug}>{item.name}<span>↗</span></Link>)}</div><div className="cp-mega-callout"><p className="cp-kicker">Project support</p><h2>Not sure where to begin?</h2><p>Share the application, city, quantity and drawing. We will help narrow the system direction.</p><Link className="cp-button cp-button-accent" href="/contact/">Send requirement ↗</Link></div></div></div>}
    {open && <div className="cp-mobile-menu" role="dialog" aria-modal="true" aria-label="Website navigation"><div className="cp-mobile-menu-inner"><button type="button" onClick={() => setOpen(false)}>Close ×</button><Link href="/products/">Products</Link>{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/technical-enquiry/">Technical enquiry</Link><Link href="/contact/">Request a Quote</Link><a href={whatsapp()} target="_blank" rel="noreferrer">WhatsApp Us</a><a href={`tel:${site.tel}`}>Call Now</a></div></div>}
  </>;
}
