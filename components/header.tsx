"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { products } from "@/data/products";
import { site, whatsapp } from "@/config/site";
import { Arrow } from "./ui";
export default function Header() {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [mobile, setMobile] = useState(false);
  const path = usePathname(),
    trigger = useRef<HTMLButtonElement>(null),
    mobileTrigger = useRef<HTMLButtonElement>(null),
    panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(false);
    setMobile(false);
  }, [path]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const background = mobile
      ? Array.from(
          document.querySelectorAll<HTMLElement>(
            ".site-header, main, #site-footer, .mobile-actions, .skip-link",
          ),
        )
      : [];
    const previous = background.map((el) => ({
      el,
      inert: el.inert,
      hidden: el.getAttribute("aria-hidden"),
    }));
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        if (!mobile) trigger.current?.focus();
      }
      if (e.key === "Tab" && mobile) {
        const list = panel.current?.querySelectorAll<HTMLElement>("a,button");
        if (!list?.length) return;
        const first = list[0],
          last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", close);
    if (mobile) {
      document.body.style.overflow = "hidden";
      panel.current?.querySelector<HTMLElement>("button")?.focus();
      background.forEach((el) => {
        el.inert = true;
        el.setAttribute("aria-hidden", "true");
      });
    }
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = previousOverflow;
      previous.forEach(({ el, inert, hidden }) => {
        el.inert = inert;
        if (hidden === null) el.removeAttribute("aria-hidden");
        else el.setAttribute("aria-hidden", hidden);
      });
      if (mobile) mobileTrigger.current?.focus();
    };
  }, [open, mobile]);
  const groups = [
    ["Aluminium", products.slice(0, 2)],
    ["Stainless", products.slice(2, 4)],
    ["Architectural systems", products.slice(4, 8)],
    ["More solutions", products.slice(8)],
  ] as const;
  return (
    <>
      <header
        className={`site-header ${path === "/" && !scrolled && !open ? "on-hero" : ""}`}
      >
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="Cubiclepro home">
            <img
              src="/images/brand/logo.png"
              alt="Cubiclepro"
              width="174"
              height="72"
            />
            <span className="brand-fallback">
              CUBICLE<span>PRO</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <button
              ref={trigger}
              aria-expanded={open}
              aria-controls="main-menu"
              onClick={() => {
                setMobile(false);
                setOpen(!open);
              }}
            >
              Products <span className="plus">{open ? "−" : "+"}</span>
            </button>
            <Link href="/materials/">Materials</Link>
            <Link href="/hardware/">Hardware & Profiles</Link>
            <Link href="/applications/">Applications</Link>
            <Link href="/about/">About</Link>
          </nav>
          <a
            className="header-call"
            href={`tel:${site.tel}`}
            aria-label={`Call Cubiclepro on ${site.phone}`}
          >
            Call now
          </a>
          <Link className="header-quote" href="/contact/">
            Request a quote <Arrow diagonal />
          </Link>
          <button
            ref={mobileTrigger}
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => {
              setMobile(true);
              setOpen(!open);
            }}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      {open && (
        <>
          <button
            className="menu-scrim"
            onClick={() => setOpen(false)}
            aria-label="Dismiss navigation backdrop"
            tabIndex={-1}
          />
          <div
            id="main-menu"
            className={`mega-menu ${mobile ? "mobile-open" : ""}`}
            ref={panel}
            role={mobile ? "dialog" : undefined}
            aria-modal={mobile ? true : undefined}
            aria-label="Website navigation"
          >
            <div className="mobile-menu-head">
              <span>Explore Cubiclepro</span>
              <button
                onClick={() => {
                  setOpen(false);
                  if (!mobile) trigger.current?.focus();
                }}
                aria-label="Close menu"
              >
                Close ×
              </button>
            </div>
            <div className="mega-grid">
              {groups.map(([name, items]) => (
                <div key={name}>
                  <p className="micro">{name}</p>
                  {items.map((p) => (
                    <Link key={p.slug} href={`/products/${p.slug}/`}>
                      {p.name}
                      <Arrow diagonal />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="mega-footer">
              <Link href="/products/" className="text-link">
                Explore all systems <Arrow />
              </Link>
              <span>Application. Profile. Hardware. Mounting.</span>
            </div>
            <nav className="mobile-more" aria-label="More pages">
              {[
                ["Materials", "/materials/"],
                ["Hardware & Profiles", "/hardware/"],
                ["Applications", "/applications/"],
                ["About", "/about/"],
                ["Warranty", "/warranty/"],
                ["Request a Quote", "/contact/"],
              ].map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
              <a href={`tel:${site.tel}`}>Call Now</a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
