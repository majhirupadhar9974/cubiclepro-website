"use client";
import { useState } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "./ui";
const families = [
  "All systems",
  "Main / Aluminium Series",
  "Stainless Series",
  "Box-Up Series",
  "Suspended Systems",
  "More solutions",
];
export default function ProductFilter({ products }: { products: Product[] }) {
  const [family, setFamily] = useState("All systems");
  const visible = products.filter(
    (p) =>
      family === "All systems" ||
      p.family === family ||
      (family === "More solutions" && !families.includes(p.family)),
  );
  return (
    <>
      <div className="filter-bar" aria-label="Filter product systems">
        {families.map((f) => (
          <button
            key={f}
            aria-pressed={family === f}
            onClick={() => setFamily(f)}
          >
            {f === "Main / Aluminium Series" ? "Aluminium" : f}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {visible.length} systems to explore
      </p>
      <div className="product-grid">
        {visible.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </>
  );
}
