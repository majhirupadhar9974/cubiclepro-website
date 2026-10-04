import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";

import { juniorAgeBands, lockerTiers, modestyShapes, profiles, hardwareGroups, supportComponents } from "../data/approved-gallery";
import { products } from "../data/products";
import { industries, locations, mainCategories } from "../data/site-content";

const client = getCliClient({ apiVersion: "2026-09-28" });
const stamp = "Migrated from the approved CubiclePro website catalogue.";

const slugify = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const span = (text: string, key: string) => ({ _key: `${key}-span`, _type: "span", marks: [], text });
const block = (text: string, key: string, style = "normal") => ({
  _key: key,
  _type: "block",
  children: [span(text, key)],
  markDefs: [],
  style,
});

const clean = (value: string) =>
  value
    .replace(/\r/g, "")
    .replace(/ {2,}\n/g, "\n")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/^[-*] /gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const field = (source: string, name: string) => {
  const match = source.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*([^\\n]+)`, "i"));
  return clean(match?.[1] || "");
};

type SeedArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  category: string;
  sections: { heading: string; body: string }[];
};

function parseArticles(): SeedArticle[] {
  const files = ["BLOG_LIBRARY_PART_1.md", "BLOG_LIBRARY_PART_2.md"];
  return files.flatMap((file) => {
    const source = readFileSync(join(process.cwd(), "content", file), "utf8");
    return source
      .split(/(?=^##\s+\d+\.\s+)/m)
      .filter((entry) => /^##\s+\d+\./m.test(entry))
      .map((entry) => {
        const title = clean(entry.match(/^##\s+\d+\.\s+(.+)$/m)?.[1] || "");
        const slug = field(entry, "Slug") || slugify(title);
        const seoTitle = field(entry, "SEO title") || title;
        const metaDescription = field(entry, "Meta description");
        const primaryKeyword = field(entry, "Primary keyword").toLowerCase();
        const metadataEnd = entry.lastIndexOf("**Internal links:**");
        const bodyStart = metadataEnd >= 0 ? entry.indexOf("\n", metadataEnd) + 1 : 0;
        const body = entry.slice(bodyStart).replace(/\n---\s*$/m, "").trim();
        const chunks = body.split(/(?=^###\s+)/m);
        const intro = clean(chunks.shift() || "");
        const sections = chunks
          .map((chunk) => ({
            heading: clean(chunk.match(/^###\s+(.+)$/m)?.[1] || ""),
            body: clean(chunk.replace(/^###\s+.+$/m, "")),
          }))
          .filter((section) => section.heading && section.body);
        const category = primaryKeyword.includes("locker")
          ? "Lockers"
          : primaryKeyword.includes("junior") || primaryKeyword.includes("school")
            ? "Junior Cubicles"
            : primaryKeyword.includes("material") || primaryKeyword.includes("hpl")
              ? "Materials"
              : primaryKeyword.includes("office") || primaryKeyword.includes("hospital") || primaryKeyword.includes("airport")
                ? "Applications"
                : "Specification guide";
        return {
          slug,
          title,
          seoTitle,
          metaDescription,
          summary: intro.split(/(?<=[.!?])\s+/).slice(0, 2).join(" "),
          category,
          sections: intro ? [{ heading: "Overview", body: intro }, ...sections] : sections,
        };
      });
  });
}

function parseFaqs() {
  const source = readFileSync(join(process.cwd(), "content", "FAQ_LIBRARY.md"), "utf8");
  const output: { question: string; answer: string; category: string }[] = [];
  for (const group of source.split(/(?=^##\s+)/m).filter((entry) => /^##\s+/m.test(entry))) {
    const category = clean(group.match(/^##\s+(.+)$/m)?.[1] || "General").replace(/^[A-Z]\.\s*/, "");
    for (const section of group.split(/(?=^###\s+)/m).slice(1)) {
      const heading = clean(section.match(/^###\s+(.+)$/m)?.[1] || "").replace(/^\d+\.\s*/, "");
      const body = section.replace(/^###\s+.+$/m, "").trim();
      const questions = [...body.matchAll(/\*\*([^*]+\?)\*\*\s*\n+([\s\S]*?)(?=\n\*\*[^*]+\?\*\*|$)/g)];
      if (questions.length) {
        for (const match of questions) output.push({ question: clean(match[1]), answer: clean(match[2]), category });
      } else if (heading && body) {
        output.push({ question: heading, answer: clean(body), category });
      }
    }
  }
  return output.filter((item) => item.question && item.answer);
}

async function upsert(doc: Record<string, unknown>) {
  await client.createOrReplace(doc as never);
  process.stdout.write(`✓ ${doc._type}: ${doc._id}\n`);
}

async function main() {
  for (const [index, category] of mainCategories.entries()) {
    await upsert({
      _id: `category-${category.slug}`,
      _type: "category",
      name: category.name,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
      displayOrder: index + 1,
      visible: true,
      seoTitle: `${category.name} | CubiclePro`,
      metaDescription: category.description,
      canonicalPath: category.href,
      indexable: true,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  for (const [index, product] of products.entries()) {
    await upsert({
      _id: `product-${product.slug}`,
      _type: "product",
      name: product.name,
      slug: { _type: "slug", current: product.slug },
      family: product.family,
      character: product.character,
      description: product.description,
      displayOrder: index + 1,
      featured: index < 8,
      profileSupport: product.profile,
      hardware: product.hardware,
      configuration: product.mounting,
      approvedImagePath: product.image,
      imageAlt: product.imageAlt,
      applications: ["Corporate offices", "Education", "Healthcare", "Hospitality", "Public facilities"],
      seoTitle: `${product.name} | CubiclePro Washroom Solutions`,
      metaDescription: product.description,
      canonicalPath: `/products/${product.slug}/`,
      indexable: true,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  for (const ageBand of juniorAgeBands) {
    await upsert({
      _id: `subrecord-junior-${ageBand.age}`,
      _type: "subrecord",
      name: `${ageBand.name} — ${ageBand.ageLabel}`,
      parent: { _type: "reference", _ref: "product-junior-series" },
      recordType: "age-group",
      dimensions: ageBand.measurements.map(([label, value], index) => ({ _key: `d-${index + 1}`, _type: "object", label, value })),
      verificationStatus: "verified",
      approvedImagePath: ageBand.src,
      indexable: true,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  for (const locker of lockerTiers) {
    await upsert({
      _id: `subrecord-locker-${locker.slug}`,
      _type: "subrecord",
      name: locker.name,
      parent: { _type: "reference", _ref: "product-hpl-lockers" },
      recordType: locker.slug === "z-type" ? "custom-option" : "locker-tier",
      dimensions: locker.specifications.map(([label, value], index) => ({ _key: `d-${index + 1}`, _type: "object", label, value })),
      verificationStatus: "verified",
      approvedImagePath: locker.src,
      indexable: true,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  for (const shape of modestyShapes) {
    await upsert({
      _id: `subrecord-ump-${shape.slug}`,
      _type: "subrecord",
      name: shape.name,
      parent: { _type: "reference", _ref: "product-modesty-panels" },
      recordType: "ump-shape",
      dimensions: [
        { _key: "d-1", _type: "object", label: "Reference height", value: "Approx. 900 mm" },
        { _key: "d-2", _type: "object", label: "Reference width", value: "Approx. 450 mm" },
      ],
      verificationStatus: "verified",
      approvedImagePath: shape.src,
      indexable: true,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  for (const industry of industries) {
    await upsert({
      _id: `industry-${industry.slug}`,
      _type: "industry",
      name: industry.name,
      slug: { _type: "slug", current: industry.slug },
      summary: industry.description,
      approvedImagePath: industry.image,
      planningPoints: industry.considerations.map((item) => `${item.title}: ${item.body}`),
      seoTitle: `${industry.name} Washroom Solutions | CubiclePro`,
      metaDescription: industry.description,
      canonicalPath: `/industries/${industry.slug}/`,
      indexable: true,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  for (const [index, location] of locations.entries()) {
    const intro = `CubiclePro supports commercial washroom requirements in ${location.city}, ${location.region}. ${location.focus}`;
    await upsert({
      _id: `location-${location.slug}`,
      _type: "locationPage",
      city: location.city,
      slug: { _type: "slug", current: location.slug },
      uniqueContent: [
        block(intro, `intro-${index + 1}`),
        block("Typical project environments", `heading-${index + 1}`, "h2"),
        block(location.sectors.join(" · "), `sectors-${index + 1}`),
      ],
      seoTitle: `Washroom Cubicle Manufacturer in ${location.city} | CubiclePro`,
      metaDescription: `CubiclePro supplies restroom cubicles, toilet partitions and commercial washroom solutions for projects in ${location.city}.`,
      canonicalPath: `/locations/${location.slug}/`,
      indexable: true,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  const articles = parseArticles();
  for (const [index, article] of articles.entries()) {
    const body = article.sections.flatMap((section, sectionIndex) => [
      block(section.heading, `h-${sectionIndex + 1}`, "h2"),
      ...section.body
        .split(/\n\n+/)
        .filter(Boolean)
        .map((paragraph, paragraphIndex) => block(paragraph, `p-${sectionIndex + 1}-${paragraphIndex + 1}`)),
    ]);
    await upsert({
      _id: `article-${article.slug}`,
      _type: "article",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      category: article.category,
      summary: article.summary || article.metaDescription,
      body,
      seoTitle: article.seoTitle,
      metaDescription: article.metaDescription,
      canonicalPath: `/blog/${article.slug}/`,
      indexable: true,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  const faqs = parseFaqs();
  for (const [index, faq] of faqs.entries()) {
    await upsert({
      _id: `faq-${String(index + 1).padStart(3, "0")}`,
      _type: "faq",
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: index + 1,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  for (const [index, profile] of profiles.entries()) {
    await upsert({
      _id: `hardware-profile-${String(index + 1).padStart(2, "0")}`,
      _type: "hardwareProfile",
      name: `${profile.group} — ${profile.title}`,
      kind: "profile",
      finish: profile.group,
      description: profile.alt,
      approvedImagePath: profile.src,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  let hardwareIndex = 0;
  for (const group of hardwareGroups) {
    for (const [name, file] of group.items) {
      hardwareIndex += 1;
      await upsert({
        _id: `hardware-item-${String(hardwareIndex).padStart(2, "0")}`,
        _type: "hardwareProfile",
        name: `${group.name} — ${name}`,
        kind: "hardware",
        finish: group.name,
        description: `${name} in the approved ${group.name.toLowerCase()} family.`,
        approvedImagePath: `/images/approved/${group.folder}/${file}`,
        publicationStatus: "published",
        approvalRecord: stamp,
      });
    }
  }

  for (const [index, component] of supportComponents.entries()) {
    await upsert({
      _id: `component-${String(index + 1).padStart(2, "0")}`,
      _type: "hardwareProfile",
      name: component.title,
      kind: "component",
      description: component.alt,
      approvedImagePath: component.src,
      publicationStatus: "published",
      approvalRecord: stamp,
    });
  }

  await upsert({
    _id: "material-compact-hpl",
    _type: "material",
    name: "Compact HPL",
    slug: { _type: "slug", current: "compact-hpl" },
    description: [block("Compact high-pressure laminate for approved commercial washroom and locker applications. Final grade, thickness and finish remain project-specific.", "material-intro")],
    properties: ["Project-specific thickness", "Finish selected against approved samples", "Configured for the selected system"],
    seoTitle: "Compact HPL for Washroom Cubicles | CubiclePro",
    metaDescription: "Compact HPL material guidance for CubiclePro washroom cubicles, partitions and locker systems.",
    canonicalPath: "/materials/",
    indexable: true,
    publicationStatus: "published",
    approvalRecord: stamp,
  });

  await upsert({
    _id: "site-settings",
    _type: "siteSettings",
    title: "CubiclePro website",
    primaryPhone: "+91 84011 18340",
    technicalPhone: "+91 99247 31671",
    primaryEmail: "info@cubiclepro.in",
    salesEmail: "sales@cubiclepro.in",
  });

  await upsert({
    _id: "homepage",
    _type: "homepage",
    title: "Homepage",
    heroHeading: "Complete commercial washroom systems. India.",
    heroSummary: "CubiclePro washroom solutions",
    featuredProducts: products.slice(0, 8).map((product, index) => ({ _key: `product-${index + 1}`, _type: "reference", _ref: `product-${product.slug}` })),
    publicationStatus: "published",
    approvalRecord: stamp,
  });

  const counts = await client.fetch<Record<string, number>>(`{
    "products": count(*[_type == "product"]),
    "locations": count(*[_type == "locationPage"]),
    "articles": count(*[_type == "article"]),
    "faqs": count(*[_type == "faq"]),
    "subrecords": count(*[_type == "subrecord"])
  }`);
  console.log("CMS seed complete", counts);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
