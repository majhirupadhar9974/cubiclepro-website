"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

export default function HorizontalRail({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.max(320, rail.clientWidth * 0.78), behavior: "smooth" });
  };
  return <div className="cp-rail-shell">
    <button type="button" className="cp-rail-arrow cp-rail-arrow-left" onClick={() => move(-1)} aria-label={`View previous ${label}`}>←</button>
    <div ref={railRef} className={className} role="region" aria-label={label} tabIndex={0}>{children}</div>
    <button type="button" className="cp-rail-arrow cp-rail-arrow-right" onClick={() => move(1)} aria-label={`View next ${label}`}>→</button>
  </div>;
}
