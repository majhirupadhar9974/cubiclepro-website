import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import AdminDashboard from "./components/admin-dashboard";
import { websiteStructure } from "./sanity/structure";

export default defineConfig({
  name: "cubiclepro",
  title: "Cubiclepro Website CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "configure-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/admin",
  plugins: [structureTool({ structure: websiteStructure })],
  tools: (previous) => [
    {
      name: "dashboard",
      title: "Dashboard",
      component: AdminDashboard,
      controlsDocumentTitle: true,
    },
    ...previous,
  ],
  schema: { types: schemaTypes },
});
