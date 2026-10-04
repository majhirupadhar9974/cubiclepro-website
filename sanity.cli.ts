import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "916o9vvx",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
