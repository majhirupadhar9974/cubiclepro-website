"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const slides = [
  { title: "Sky Hung", copy: "A ceiling-hung system. A leg-free floor.", image: "/images/approved/cubicle-systems/sky-hung/sky-hung-main.jpg", href: "/products/sky-hung/", alt: "Sky Hung ceiling-hung cubicle system product visual" },
  { title: "Nova", copy: "Anodised aluminium profiles. SS 316 hardware.", image: "/images/approved/cubicle-systems/nova/nova-main.jpg", href: "/products/nova/", alt: "Nova commercial cubicle system product visual" },
  { title: "Base Box", copy: "Shoe-box support. No legs. No top rail.", image: "/images/approved/cubicle-systems/base-box/base-box-main.jpg", href: "/products/base-box/", alt: "Base Box cubicle system product visual" },
  { title: "Modesty Panels", copy: "Nine reference shapes. Project-specific dimensions.", image: "/images/approved/urinal-modesty-panels/urinal-modesty-panels-main.jpg", href: "/products/modesty-panels/", alt: "Compact HPL urinal modesty panel product visual" },
];
export default function HeroCarousel() {
  const [active, setActive] = useState(0), [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = () => { if (document.visibilityState === "visible") timer = setInterval(() => setActive(i => (i + 1) % slides.length), 5600); };
    const stop = () => { if (timer) clearInterval(timer); };
    start(); document.addEventListener("visibilitychange", stop); document.addEventListener("visibilitychange", start);
    return () => { stop(); document.removeEventListener("visibilitychange", stop); document.removeEventListener("visibilitychange", start); };
  }, [paused]);
  const select = (index: number) => { setPaused(true); setActive(index); };
  return <section className="hero" aria-label="Featured Cubiclepro systems" onPointerDown={() => setPaused(true)} onKeyDown={() => setPaused(true)}>
    {slides.map((slide, index) => <div key={slide.title} className={`hero-slide ${active === index ? "is-active" : ""}`} aria-hidden={active !== index}>
      <Image src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" />
    </div>)}
    <div className="hero-shade" />
    <div className="container hero-content"><p className="eyebrow"><span />Complete washroom solutions</p>
      <h1><span>Architectural washroom systems,</span> <em>specified for the project.</em></h1>
      <p className="hero-slogan">{slides[active].title}</p><p>{slides[active].copy}</p>
      <div className="hero-buttons"><Link href={slides[active].href} className="button button-light">Explore {slides[active].title}<span aria-hidden="true">↗</span></Link><Link href="/contact/" className="hero-text-link">Request a quote <span aria-hidden="true">↗</span></Link></div>
    </div>
    <div className="hero-bottom"><span>SUPPLY · INSTALLATION · COORDINATION</span><span className="hero-caption">Product Visual</span><a href="#solutions">Scroll to explore <span aria-hidden="true">↓</span></a></div>
    <div className="hero-controls" aria-label="Featured systems">{slides.map((slide,index)=><button key={slide.title} type="button" aria-label={`Show ${slide.title}`} aria-pressed={active===index} onClick={()=>select(index)}><span>{String(index+1).padStart(2,"0")}</span>{slide.title}</button>)}</div>
  </section>;
}
