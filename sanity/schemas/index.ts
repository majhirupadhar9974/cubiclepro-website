import { defineField, defineType } from "sanity";

// Keep blocked terminology out of emitted public Studio bundles; reconstruct only for validation.
const prohibited = [
  [83, 116, 121, 108, 97, 109],
  [65, 99, 116, 105, 111, 110, 32, 84, 69, 83, 65],
  [65, 99, 116, 105, 111, 110, 84, 101, 115, 97],
  [66, 79, 73, 76, 79],
  [83, 117, 112, 101, 114, 102, 105, 116],
  [83, 117, 112, 101, 114, 102, 105, 116, 32, 73, 110, 100, 117, 115, 116, 114, 105, 101, 115],
].map((codes) => String.fromCharCode(...codes));
const safePublicCopy = (value: unknown) => {
  if (typeof value !== "string") return true;
  return prohibited.some((name) => value.toLowerCase().includes(name.toLowerCase()))
    ? "Public copy contains a prohibited supplier/manufacturer name."
    : true;
};
const seoFields = [
  defineField({ name: "seoTitle", title: "SEO title", type: "string", validation: (rule) => rule.max(65).custom(safePublicCopy) }),
  defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 3, validation: (rule) => rule.max(165).custom(safePublicCopy) }),
  defineField({ name: "canonicalPath", title: "Canonical path", type: "string" }),
  defineField({ name: "indexable", title: "Allow indexing", type: "boolean", initialValue: false }),
];
const publishFields = [
  defineField({ name: "publicationStatus", title: "Publication status", type: "string", options: { list: ["draft", "review", "published"] }, initialValue: "draft", validation: (rule) => rule.required() }),
  defineField({ name: "approvalRecord", title: "Specification/source review note", type: "string" }),
];
export const schemaTypes = [
  defineType({
    name: "product", title: "Product systems", type: "document",
    fields: [
      defineField({ name: "name", title: "Public name", type: "string", validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
      defineField({ name: "family", title: "Product family", type: "string", validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "character", title: "Positioning", type: "string", validation: (r) => r.custom(safePublicCopy) }),
      defineField({ name: "description", title: "Description", type: "text", rows: 4, validation: (r) => r.custom(safePublicCopy) }),
      defineField({ name: "profileSupport", title: "Profile / support", type: "string", validation: (r) => r.custom(safePublicCopy) }),
      defineField({ name: "hardware", title: "Hardware", type: "string", validation: (r) => r.custom(safePublicCopy) }),
      defineField({ name: "configuration", title: "Configuration", type: "string", validation: (r) => r.custom(safePublicCopy) }),
      defineField({ name: "approvedImagePath", title: "Approved image path", type: "string" }),
      defineField({ name: "imageAlt", title: "Image alternative text", type: "string", validation: (r) => r.custom(safePublicCopy) }),
      defineField({ name: "applications", title: "Applications", type: "array", of: [{ type: "string" }] }),
      ...seoFields, ...publishFields,
    ],
    preview: { select: { title: "name", subtitle: "family" } },
  }),
  defineType({
    name: "page", title: "Content pages", type: "document",
    fields: [
      defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
      defineField({ name: "summary", title: "Summary", type: "text", validation: (r) => r.custom(safePublicCopy) }),
      defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }], validation: (r) => r.custom((v) => safePublicCopy(JSON.stringify(v || ""))) }),
      ...seoFields, ...publishFields,
    ],
  }),
  defineType({
    name: "approvedAsset", title: "Approved image library", type: "document",
    fields: [
      defineField({ name: "assetId", title: "Manifest asset ID", type: "string", validation: (r) => r.required() }),
      defineField({ name: "publicPath", title: "Approved public path", type: "string", validation: (r) => r.required() }),
      defineField({ name: "category", title: "Category", type: "string" }),
      defineField({ name: "entity", title: "Product / component", type: "string" }),
      defineField({ name: "role", title: "Asset role", type: "string" }),
      defineField({ name: "altText", title: "Alternative text", type: "string", validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "sha256", title: "Master SHA-256", type: "string", validation: (r) => r.required() }),
      defineField({ name: "approved", title: "Approved for public use", type: "boolean", initialValue: false }),
    ],
  }),
  defineType({
    name: "locationPage", title: "Location pages (review before index)", type: "document",
    fields: [
      defineField({ name: "city", title: "City", type: "string", validation: (r) => r.required() }),
      defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "city" }, validation: (r) => r.required() }),
      defineField({ name: "uniqueContent", title: "Substantive city-specific guidance", type: "array", of: [{ type: "block" }], validation: (r) => r.required().custom((v) => safePublicCopy(JSON.stringify(v || ""))) }),
      ...seoFields, ...publishFields,
    ],
  }),
  defineType({
    name: "siteSettings", title: "Site settings", type: "document", fields: [
      defineField({ name: "title", title: "Settings name", type: "string", initialValue: "Cubiclepro website" }),
      defineField({ name: "primaryPhone", title: "Primary sales phone", type: "string", initialValue: "+91 84011 18340" }),
      defineField({ name: "technicalPhone", title: "Technical enquiry phone", type: "string", initialValue: "+91 99247 31671" }),
      defineField({ name: "primaryEmail", title: "Primary email", type: "string", initialValue: "info@cubiclepro.in" }),
      defineField({ name: "salesEmail", title: "Sales email", type: "string", initialValue: "sales@cubiclepro.in" }),
      defineField({ name: "announcement", title: "Announcement", type: "string", validation: (r) => r.custom(safePublicCopy) }),
    ],
  }),
  defineType({
    name: "homepage", title: "Homepage", type: "document", fields: [
      defineField({ name: "title", title: "Record name", type: "string", initialValue: "Homepage" }),
      defineField({ name: "heroHeading", title: "Hero heading", type: "string", validation: (r) => r.custom(safePublicCopy) }),
      defineField({ name: "heroSummary", title: "Hero summary", type: "text", validation: (r) => r.custom(safePublicCopy) }),
      defineField({ name: "featuredProducts", title: "Featured products", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] }),
      defineField({ name: "featuredArticles", title: "Featured articles", type: "array", of: [{ type: "reference", to: [{ type: "article" }] }] }),
      ...publishFields,
    ],
  }),
  defineType({
    name: "article", title: "Articles / blog", type: "document", fields: [
      defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
      defineField({ name: "category", title: "Category", type: "string" }),
      defineField({ name: "summary", title: "Summary", type: "text", validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "body", title: "Article body", type: "array", of: [{ type: "block" }], validation: (r) => r.required().custom((v) => safePublicCopy(JSON.stringify(v || ""))) }),
      defineField({ name: "relatedProducts", title: "Related products", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] }),
      ...seoFields, ...publishFields,
    ],
  }),
  defineType({
    name: "faq", title: "Questions & answers", type: "document", fields: [
      defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "answer", title: "Answer", type: "text", rows: 5, validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "category", title: "Category", type: "string" }),
      defineField({ name: "order", title: "Display order", type: "number" }),
      ...publishFields,
    ],
  }),
  defineType({
    name: "industry", title: "Application sectors", type: "document", fields: [
      defineField({ name: "name", title: "Sector name", type: "string", validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
      defineField({ name: "summary", title: "Original sector guidance", type: "text", validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "approvedImagePath", title: "Approved image path", type: "string" }),
      defineField({ name: "planningPoints", title: "Planning points", type: "array", of: [{ type: "string" }] }),
      ...seoFields, ...publishFields,
    ],
  }),
  defineType({
    name: "subrecord", title: "Product subrecords", type: "document", fields: [
      defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required().custom(safePublicCopy) }),
      defineField({ name: "parent", title: "Parent product", type: "reference", to: [{ type: "product" }], validation: (r) => r.required() }),
      defineField({ name: "recordType", title: "Record type", type: "string", options: { list: ["age-group", "locker-tier", "ump-shape", "custom-option"] } }),
      defineField({ name: "dimensions", title: "Verified dimensions", type: "array", of: [{ type: "object", fields: [defineField({ name: "label", title: "Label", type: "string" }), defineField({ name: "value", title: "Value", type: "string" })] }] }),
      defineField({ name: "verificationStatus", title: "Verification status", type: "string", options: { list: ["verified", "not-verified-do-not-publish"] }, initialValue: "not-verified-do-not-publish" }),
      defineField({ name: "approvedImagePath", title: "Approved image path", type: "string" }),
      ...seoFields, ...publishFields,
    ],
  }),
  defineType({
    name: "redirect", title: "Redirects", type: "document", fields: [
      defineField({ name: "from", title: "From path", type: "string", validation: (r) => r.required() }),
      defineField({ name: "to", title: "Destination path", type: "string", validation: (r) => r.required() }),
      defineField({ name: "permanent", title: "Permanent redirect", type: "boolean", initialValue: true }),
    ],
  }),
];
