import type { NextConfig } from "next";
const isStatic = process.env.STATIC_EXPORT === "1";
const distDir = process.env.NEXT_DIST_DIR?.trim() || (isStatic ? ".next-static" : ".next");
const config: NextConfig = {
  distDir,
  output: isStatic ? "export" : undefined,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isStatic,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  ...(isStatic
    ? {}
    : {
        async redirects() {
          return [
            {
              source: "/:path*",
              has: [{ type: "host" as const, value: "cubiclepro.in" }],
              destination: "https://www.cubiclepro.in/:path*",
              permanent: true,
            },
            {
              source: "/hardware-profiles",
              destination: "/hardware/",
              permanent: true,
            },
            {
              source: "/warranty-assurance",
              destination: "/warranty/",
              permanent: true,
            },
            {
              source: "/request-a-quote",
              destination: "/contact/",
              permanent: true,
            },
            {
              source: "/products/custom",
              destination: "/contact/?system=Custom%20configuration",
              permanent: true,
            },
            { source: "/products/modesty-panels/cp-aero", destination: "/products/modesty-panels/type-a/", permanent: true },
            { source: "/products/modesty-panels/cp-taper", destination: "/products/modesty-panels/type-b/", permanent: true },
            { source: "/products/modesty-panels/cp-wave", destination: "/products/modesty-panels/type-c/", permanent: true },
            { source: "/products/modesty-panels/cp-slant", destination: "/products/modesty-panels/type-d/", permanent: true },
            { source: "/products/modesty-panels/cp-soft", destination: "/products/modesty-panels/type-e/", permanent: true },
            { source: "/products/modesty-panels/cp-lean", destination: "/products/modesty-panels/type-f/", permanent: true },
            { source: "/products/modesty-panels/cp-flow", destination: "/products/modesty-panels/type-g/", permanent: true },
            { source: "/products/modesty-panels/cp-sweep", destination: "/products/modesty-panels/type-h/", permanent: true },
            { source: "/products/modesty-panels/cp-dome", destination: "/products/modesty-panels/type-i/", permanent: true },
          ];
        },
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
                { key: "X-Frame-Options", value: "DENY" },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=()",
                },
              ],
            },
          ];
        },
      }),
};
export default config;
