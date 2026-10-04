"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroCategories } from "@/data/site-content";
import { technicalWhatsapp } from "@/config/site";

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const move = useCallback((direction: number) => {
    setActive((current) => (current + direction + heroCategories.length) % heroCategories.length);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((current) => (current + 1) % heroCategories.length);
    }, 5800);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section className="cp-hero" aria-roledescription="carousel" aria-label="CubiclePro washroom solution categories"
      onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current; if (Math.abs(delta) > 50) move(delta > 0 ? -1 : 1); touchStart.current = null; }}>
      <div className="cp-hero-media">
        {heroCategories.map((slide, index) => <div className={`cp-hero-slide ${active === index ? "is-active" : ""}`} key={slide.slug} aria-hidden={active !== index}><Image src={slide.image!} alt={slide.alt || ""} fill priority={index === 0} sizes="100vw" /></div>)}
        <div className="cp-hero-overlay" />
      </div>
      <div className="cp-hero-copy container">
        <p className="cp-kicker">Complete commercial washroom systems · India</p>
        <h1>CubiclePro<br /><span>washroom solutions.</span></h1>
        <p>Specified clearly. Detailed responsibly. Built for real spaces.</p>
        <div className="cp-actions"><Link className="cp-button cp-button-accent" href="/products/">Explore systems <span aria-hidden="true">↗</span></Link><Link className="cp-button cp-button-ghost" href="/contact/">Request a quote <span aria-hidden="true">↗</span></Link><a className="cp-button cp-button-ghost cp-hero-technical" href={technicalWhatsapp("a technical washroom requirement")} target="_blank" rel="noopener noreferrer">Technical WhatsApp <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="cp-hero-rail container" aria-label="Choose a category">
        <div className="cp-hero-progress" aria-hidden="true"><i style={{ width: `${((active + 1) / heroCategories.length) * 100}%` }} /></div>
        <div className="cp-hero-tabs" role="tablist">{heroCategories.map((slide, index) => <button key={slide.slug} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{slide.shortName}</button>)}</div>
      </div>
    </section>
  );
}
