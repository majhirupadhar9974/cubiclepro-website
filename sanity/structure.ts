import type { StructureResolver } from "sanity/structure";

export const websiteStructure: StructureResolver = (S) =>
  S.list()
    .title("CubiclePro website")
    .items([
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("subrecord").title("Product subrecords"),
      S.documentTypeListItem("category").title("Categories"),
      S.divider(),
      S.documentTypeListItem("homepage").title("Homepage"),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("industry").title("Applications"),
      S.documentTypeListItem("locationPage").title("Locations"),
      S.documentTypeListItem("article").title("Blog / Guides"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.divider(),
      S.documentTypeListItem("material").title("Materials"),
      S.documentTypeListItem("hardwareProfile").title("Hardware & Profiles"),
      S.documentTypeListItem("approvedAsset").title("Approved media"),
      S.divider(),
      S.documentTypeListItem("siteSettings").title("Website settings"),
      S.documentTypeListItem("redirect").title("Redirects"),
    ]);
