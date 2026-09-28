# Cubiclepro redesign — QA and release status

Updated: 28 September 2026

## Completed verification

- Next.js production build and TypeScript check pass.
- Public output audit passes: zero prohibited supplier/manufacturer strings across 1,133 generated output files.
- Full local production-browser suite passes on 38 routes with no reported issues. It covers 1440px desktop, 768px tablet, 390px mobile, 360px small mobile, route metadata and canonical tags, internal navigation, menu behavior, product WhatsApp-prefill URLs, form validation/payload, no-JavaScript content, reduced motion, data-saving motion, sitemap, robots, redirects, and 404 handling.
- The suite checks all 38 routes at 360px. Homepage, catalogue, Sky Hung and contact layouts were checked at desktop, tablet, mobile and small-mobile widths; WCAG A/AA automated checks reported zero violations on the tested homepage, catalogue, Sky Hung and contact samples. This is not a complete accessibility certification.
- Approved visual masters remain unchanged and are served through responsive Next.js image optimization. Old product/hero artwork has been removed. Product and category visuals follow the supplied asset mappings and text-led exceptions.
- 390px local mobile lab result (Edge headless; DPR 2; 4× CPU throttle; 1.6Mbps, 100ms latency): LCP estimate 1,640ms, CLS 0, observed blocking time 127ms, total transfer 451,383 bytes, JavaScript transfer 157,055 bytes. Laboratory measurements are not field Core Web Vitals.
- Vercel built a preview successfully in the existing linked project: https://website-i29fxw4vm-rupadhar.vercel.app. Its build ran the same 1,133-file public-content audit successfully. An authenticated Vercel CLI request to the preview homepage returned HTTP 200.
- The preview's anonymous browser pass was stopped by the project's existing Vercel Authentication protection, which returns a Vercel login page instead of site HTML. No protection settings were changed. The preview can be inspected after signing in with an account authorized for this project.
- Local quote-form tests verify field validation, payload and the success UI only with an intercepted test response. No email was sent. The deployed RFQ endpoint has not been tested with a real multipart submission; a GET correctly returns 405.

## Release gates still open

- Add and verify the Sanity project ID/dataset and authorize the intended CMS editors before enabling the CMS dashboard.
- Configure the existing Vercel project's private Blob store, verified email sender/API key and persistent rate-limit service for both Preview and Production. Then test one owner-approved end-to-end RFQ, including the private drawing upload and email delivery.
- Document the approved retention/access policy for uploaded drawings and BOQs.
- Have the owner review the protected preview. Production domain, DNS, and production deployment have not been changed.

Do not declare the site launch-ready until those release gates are satisfied. Current preview remains separate from the production domain.
