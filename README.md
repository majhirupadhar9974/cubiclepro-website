# Cubiclepro website

This is the existing Next.js project connected to the production Cubiclepro Vercel project and domain. Keep work in this repository; do not create a replacement site or Vercel project.

## Local checks

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm start
pnpm qa
```

## Public content and approved images

- `data/products.ts` is the public seed catalogue; product names and configuration must match the approved Master Specification.
- `public/images/approved/` contains the image masters from the approved asset bundle. Keep the files byte-identical; Next.js serves responsive optimized variants. The current Cubiclepro logo is preserved separately under `public/images/brand/`.
- `data/approved-assets.json` records source mapping, intended use, dimensions and SHA-256 for the approved public assets.
- `MISSING_OR_TEXT_LED_AREAS.md` from the supplied bundle governs areas without an approved photo; these use text/icon-led sections rather than substitute imagery.
- `scripts/audit.mjs` audits public assets and production output for prohibited names. `pnpm build` runs it as a release gate.
- No project portfolio, reviews, clients or city-specific claims are seeded.

## CMS

Sanity Studio is mounted at `/studio`. The schemas cover systems, content pages, approved-asset records, location pages and site settings. The Studio remains inactive until a Sanity project and dataset are configured on the existing Vercel project. The approved local seed catalogue remains the fallback until CMS content is connected and reviewed. Do not make an unreviewed item indexable.

## RFQ activation — required before accepting launch enquiries

The API endpoint at `/api/rfq/` is implemented for validated form data, private drawing storage and persistent rate limiting. Add these production and preview variables to the existing Vercel project (never commit their values):

- Sanity: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- Private Vercel Blob: `BLOB_READ_WRITE_TOKEN` connected to a **private** store
- Email delivery: `RESEND_API_KEY`, `RFQ_FROM_EMAIL` (verified sender)
- Persistent request limiting: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

Until these are configured and tested, the endpoint deliberately returns a service-unavailable response; users retain working phone, WhatsApp and email alternatives. Do not report form delivery as live based on an intercepted local test.

## Deploying a preview

Use the existing `.vercel/project.json` link and deploy a preview from this repository after build and QA pass. Verify the preview against the production domain’s existing project configuration. Do not create a second Vercel project or change domain/DNS settings as part of this redesign.
