import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

export type ArticleSection = { heading: string; body: string };

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  relatedPhrases: string[];
  internalLinks: string[];
  summary: string;
  category: string;
  readTime: string;
  sections: ArticleSection[];
  related: string[];
};

export type PublicFaq = {
  q: string;
  a: string;
  category: string;
  tags: string[];
};

const contentRoot = join(process.cwd(), "content");

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

const field = (block: string, name: string) => {
  const match = block.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*([^\\n]+)`, "i"));
  return clean(match?.[1] || "");
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const productSlugs: Record<string, string> = {
  "Titan Black": "titan-black",
  Nova: "nova",
  Supernova: "supernova",
  "Supernova+": "supernova-plus",
  "Base Box": "base-box",
  "Base Box Pro": "base-box-pro",
  Float: "float",
  Flot: "float",
  "Sky Hung": "sky-hung",
  "Pro Doors": "pro-doors",
  "Junior Cubicles": "junior-series",
  "HPL Lockers": "hpl-lockers",
  "Urinal Modesty Panels": "modesty-panels",
  "Shower Cubicles": "shower-cubicles",
  "Changing Room Cubicles": "changing-room-cubicles",
};

function parseArticleLibrary(file: string): Article[] {
  const source = readFileSync(join(contentRoot, file), "utf8");
  return source
    .split(/(?=^##\s+\d+\.\s+)/m)
    .filter((block) => /^##\s+\d+\./m.test(block))
    .map((block) => {
      const heading = clean(block.match(/^##\s+\d+\.\s+(.+)$/m)?.[1] || "");
      const slug = field(block, "Slug");
      const seoTitle = field(block, "SEO title") || heading;
      const metaDescription = field(block, "Meta description");
      const h1 = field(block, "H1") || heading;
      const primaryKeyword = field(block, "Primary keyword");
      const relatedPhrases = field(block, "Related phrases")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const internalLinks = field(block, "Internal links")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const metadataEnd = block.lastIndexOf("**Internal links:**");
      const bodyStart = metadataEnd >= 0 ? block.indexOf("\n", metadataEnd) + 1 : 0;
      const body = block.slice(bodyStart).replace(/\n---\s*$/m, "").trim();
      const chunks = body.split(/(?=^###\s+)/m);
      const intro = clean(chunks.shift() || "");
      const sections = chunks
        .map((chunk) => {
          const sectionHeading = clean(chunk.match(/^###\s+(.+)$/m)?.[1] || "");
          const sectionBody = clean(chunk.replace(/^###\s+.+$/m, ""));
          return { heading: sectionHeading, body: sectionBody };
        })
        .filter((section) => section.heading && section.body);
      const wordCount = clean(body).split(/\s+/).filter(Boolean).length;
      const related = internalLinks
        .map((link) => productSlugs[link])
        .filter((value): value is string => Boolean(value));
      const category =
        primaryKeyword.toLowerCase().includes("locker") ? "Lockers" :
        primaryKeyword.toLowerCase().includes("junior") || primaryKeyword.toLowerCase().includes("school") ? "Junior Cubicles" :
        primaryKeyword.toLowerCase().includes("material") || primaryKeyword.toLowerCase().includes("hpl") ? "Materials" :
        primaryKeyword.toLowerCase().includes("hardware") || primaryKeyword.toLowerCase().includes("profile") ? "Profiles & hardware" :
        primaryKeyword.toLowerCase().includes("office") || primaryKeyword.toLowerCase().includes("hospital") || primaryKeyword.toLowerCase().includes("airport") || primaryKeyword.toLowerCase().includes("hospitality") ? "Applications" :
        "Specification guide";
      return {
        slug,
        title: heading,
        seoTitle,
        metaDescription,
        h1,
        primaryKeyword,
        relatedPhrases,
        internalLinks,
        summary: intro.split(/(?<=[.!?])\s+/).slice(0, 2).join(" "),
        category,
        readTime: `${Math.max(4, Math.ceil(wordCount / 190))} min read`,
        sections: intro ? [{ heading: "Overview", body: intro }, ...sections] : sections,
        related,
      };
    });
}

function parseFaqLibrary(): PublicFaq[] {
  const source = readFileSync(join(contentRoot, "FAQ_LIBRARY.md"), "utf8");
  const groups = source.split(/(?=^##\s+)/m).filter((group) => /^##\s+/m.test(group));
  const output: PublicFaq[] = [];
  for (const group of groups) {
    const category = clean(group.match(/^##\s+(.+)$/m)?.[1] || "General").replace(/^[A-Z]\.\s*/, "");
    const sections = group.split(/(?=^###\s+)/m).slice(1);
    for (const section of sections) {
      const sectionTitle = clean(section.match(/^###\s+(.+)$/m)?.[1] || "");
      const body = section.replace(/^###\s+.+$/m, "").trim();
      const boldQuestions = [...body.matchAll(/\*\*([^*]+\?)\*\*\s*\n+([\s\S]*?)(?=\n\*\*[^*]+\?\*\*|$)/g)];
      if (boldQuestions.length) {
        for (const match of boldQuestions) {
          output.push({ q: clean(match[1]), a: clean(match[2]), category, tags: [slugify(category), slugify(sectionTitle)] });
        }
      } else if (sectionTitle) {
        output.push({
          q: sectionTitle.replace(/^\d+\.\s*/, ""),
          a: clean(body),
          category,
          tags: [slugify(category)],
        });
      }
    }
  }
  return output.filter((item) => item.q && item.a);
}

export const articles = [
  ...parseArticleLibrary("BLOG_LIBRARY_PART_1.md"),
  ...parseArticleLibrary("BLOG_LIBRARY_PART_2.md"),
];

export const faqs = parseFaqLibrary().map((item) => {
  if (item.q === "What warranty does CubiclePro provide?") {
    return { ...item, a: "CubiclePro provides a 10-year warranty for the approved HPL board grade from the date of work completion, subject to standard usage conditions and documented warranty terms. Hardware, profiles and installation workmanship are covered for one year, subject to normal usage and CubiclePro warranty conditions." };
  }
  if (item.q === "What panel warranty is shown publicly?") {
    return { ...item, a: "A 10-year warranty is stated for the approved HPL board grade from the date of work completion, subject to standard usage conditions and documented warranty terms. Other panel or board warranties follow the approved material grade and applicable documented terms." };
  }
  return item;
});

const faqGroupByProduct: Record<string, string[]> = {
  "titan-black": ["titan-black-faqs", "restroom-cubicle-category-faqs"],
  nova: ["nova-faqs", "restroom-cubicle-category-faqs"],
  supernova: ["supernova-faqs", "restroom-cubicle-category-faqs"],
  "supernova-plus": ["supernova-faqs", "restroom-cubicle-category-faqs"],
  "base-box": ["base-box-faqs", "restroom-cubicle-category-faqs"],
  "base-box-pro": ["base-box-pro-faqs", "restroom-cubicle-category-faqs"],
  float: ["float-faqs", "restroom-cubicle-category-faqs"],
  "sky-hung": ["sky-hung-faqs", "restroom-cubicle-category-faqs"],
  "pro-doors": ["pro-doors-faqs"],
  "junior-series": ["junior-cubicle-category-faqs"],
  "modesty-panels": ["urinal-modesty-panel-faqs"],
  "hpl-lockers": ["hpl-locker-faqs"],
  "shower-cubicles": ["shower-cubicle-faqs"],
  "changing-room-cubicles": ["changing-room-cubicle-faqs"],
};

export function faqsForProduct(slug: string, limit = 8) {
  const groups = faqGroupByProduct[slug] || [];
  return faqs.filter((faq) => faq.tags.some((tag) => groups.includes(tag))).slice(0, limit);
}

