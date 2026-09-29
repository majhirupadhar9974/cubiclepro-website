import type { NextConfig } from "next";
const isStatic = process.env.STATIC_EXPORT === "1";
const config: NextConfig = {
  distDir: isStatic ? ".next-static" : ".next",
  output: isStatic ? "export" : undefined,
  trailingSlash: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], unoptimized: isStatic },
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
