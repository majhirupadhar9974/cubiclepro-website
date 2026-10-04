import { PageHero, QuoteBand } from "@/components/ui";
import ProductFilter from "@/components/product-filter";
import { metadata, JsonLd, PageSchema } from "@/lib/seo";
import { getCatalog } from "@/lib/cms";
import { site } from "@/config/site";
export const generateMetadata = () =>
  metadata(
    "Toilet & Washroom Cubicle Systems",
    "Compare aluminium, stainless, box-up, floating and ceiling-hung restroom cubicle systems by profile, hardware and mounting.",
    "/products/",
  );
export default async function Products() {
  const products = await getCatalog();
  return (
    <>
      <PageSchema
        name="Product systems"
        path="/products/"
        type="CollectionPage"
      />
      <PageHero
        eyebrow="Products"
        title="A system for your space."
        text="Explore the collection through its profiles, hardware and support configurations. Every final selection is confirmed against the approved project specification."
        path="/products/"
      />
      <section className="container section">
        <ProductFilter products={products} />
        <article className="custom-catalog-card cp-soft-card">
          <div><span className="micro">PROJECT-SPECIFIC OPTION</span><h2>Custom Configuration</h2><p>Yes—custom dimensions, panels, profiles, hardware and support configurations can be reviewed for every applicable category, subject to site conditions, technical feasibility and the approved project specification.</p></div>
          <a className="button" href="/contact/?system=Custom%20configuration">Discuss a custom requirement ↗</a>
        </article>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.name,
            url: `${site.url}/products/${p.slug}/`,
          })),
        }}
      />
      <QuoteBand />
    </>
  );
}
