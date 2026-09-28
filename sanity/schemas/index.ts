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
      defineField({ name: "primaryEmail", title: "Primary sales email", type: "string", initialValue: "sales@cubiclepro.in" }),
      defineField({ name: "announcement", title: "Announcement", type: "string", validation: (r) => r.custom(safePublicCopy) }),
    ],
  }),
];
