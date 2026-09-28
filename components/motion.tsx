"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { site, whatsapp } from "@/config/site";
export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const preferences = matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 900px)",
    );
    const connection = (
      navigator as Navigator & {
        connection?: {
          saveData?: boolean;
          addEventListener?: (type: string, callback: () => void) => void;
          removeEventListener?: (type: string, callback: () => void) => void;
        };
      }
    ).connection;
    let dispose = () => {};
    const configure = () => {
      dispose();
      const limited =
        preferences.matches ||
        !!connection?.saveData ||
        (navigator.hardwareConcurrency > 0 &&
          navigator.hardwareConcurrency <= 4);
      document.documentElement.classList.toggle("motion-lite", limited);
      if (limited) return;
      const elements = document.querySelectorAll<HTMLElement>(
        ".reveal, .visual:not(.hero-image):not(.product-hero-image)",
      );
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.08 },
      );
      elements.forEach((el, index) => {
        // Keep content already in view visible, including the largest painted element.
        if (el.getBoundingClientRect().top < innerHeight) return;
        el.style.setProperty("--reveal-delay", `${(index % 3) * 65}ms`);
        el.classList.add(
          el.matches(".visual") ? "media-reveal" : "will-reveal",
        );
        observer.observe(el);
      });
      const hero = document.querySelector<HTMLElement>(
        ".hero-slide.is-active img",
      );
      let frame = 0;
      const scroll = () => {
        if (!hero || frame) return;
        frame = requestAnimationFrame(() => {
          hero.style.setProperty(
            "--hero-depth",
            `${Math.min(Math.max(scrollY, 0) * 0.045, 28)}px`,
          );
          frame = 0;
        });
      };
      if (hero) window.addEventListener("scroll", scroll, { passive: true });
      dispose = () => {
        observer.disconnect();
        window.removeEventListener("scroll", scroll);
        cancelAnimationFrame(frame);
        document
          .querySelectorAll<HTMLElement>(".hero-slide img")
          .forEach((image) => image.style.removeProperty("--hero-depth"));
        elements.forEach((el) => {
          el.classList.remove("will-reveal", "media-reveal", "is-visible");
          el.style.removeProperty("--reveal-delay");
        });
      };
    };
    configure();
    preferences.addEventListener("change", configure);
    connection?.addEventListener?.("change", configure);
    return () => {
      dispose();
      preferences.removeEventListener("change", configure);
      connection?.removeEventListener?.("change", configure);
      document.documentElement.classList.remove("motion-lite");
    };
  }, [pathname]);
  return null;
}
export function MobileActions() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) =>
        e.isIntersecting ? visible.add(e.target) : visible.delete(e.target),
      );
      setHidden(visible.size > 0);
    });
    document
      .querySelectorAll("#site-footer,.form-actions")
      .forEach((e) => observer.observe(e));
    const focus = () =>
      setHidden(
        document.activeElement?.matches("input,textarea,select") ||
          visible.size > 0,
      );
    document.addEventListener("focusin", focus);
    document.addEventListener("focusout", focus);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", focus);
      document.removeEventListener("focusout", focus);
    };
  }, [pathname]);
  return (
    <div
      className="mobile-actions"
      style={hidden ? { display: "none" } : undefined}
    >
      <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
        WhatsApp ↗
      </a>
      <a href={`tel:${site.tel}`}>Call now ↗</a>
      {pathname !== "/contact/" && (
        <Link href="/contact/">Request quote ↗</Link>
      )}
    </div>
  );
}
