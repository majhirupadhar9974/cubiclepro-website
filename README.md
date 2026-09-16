# Cubiclepro website

Next.js 16.3.5 · React 19.3.0 · TypeScript · Tailwind CSS 4.3.3.

## Run

Requires Node.js 22.9+ (tested on Node 24). Use pnpm with the checked-in lockfile.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm build
pnpm start
pnpm qa
```

The site is in this `website` directory, which is its own Git repository. Do not deploy the parent project folder or its internal master specification.

## Content

- `data/products.ts`: single product catalogue, exact brochure profile/support and hardware mappings.
- `config/site.ts`: production domain, primary sales contacts, shared copy and WhatsApp messages.
- `app/`: public routes and metadata.
- `public/images/`: original brochure product assets extracted with owner's explicit permission. No generated drafts are shipped.
- `scripts/audit.mjs`: scans compiled public HTML, JS, schema, JSON, CSS, URLs/filenames and public assets for prohibited supplier names. A failed audit exits nonzero and blocks `pnpm build`.
- `scripts/qa.mjs`: route, metadata, schema, image, interaction, responsive, accessibility and intercepted form tests.
- `VISUAL_REVIEW.md`: records owner's asset choice and prior visual corrections.

Brochure product images are conceptual. The same stainless image serves Supernova and Supernova+ as in the brochure, and the same doors/custom image serves those pages. They do not establish visual proof of a steel grade. All specification labels come from the catalogue data.

## Free enquiry form — activation required

The form submits to https://formsubmit.co/sales@cubiclepro.in with its default anti-spam verification enabled. WhatsApp, phone and email remain available independently.

1. After deploying, submit one real test enquiry on `/contact/`.
2. Open the activation email sent to `sales@cubiclepro.in` and click its confirmation link.
3. Submit another test enquiry and confirm delivery. The first unactivated request is not proof of delivery.
4. Optional: replace `NEXT_PUBLIC_FORM_ENDPOINT` with the private-looking FormSubmit URL supplied after activation and rebuild. This is a public routing identifier, not a secret.

No CRM, database or paid form provider is used. Local QA intercepts the outbound form request; it does not send email and cannot activate the mailbox. FormSubmit processing/retention is explained in the contact-page enquiry notice. Official documentation: https://formsubmit.co/documentation.

The return notice requires a submission marker in the same browser tab, expires after 30 minutes and is consumed once. It records only a timestamp, never form entries. A `?sent=1` URL alone shows no confirmation. Even a valid return notice does not claim delivery; only the owner’s received inbox test confirms that. The `_url` field identifies `https://www.cubiclepro.in/contact/` to the form provider.

## Deployment

### GitHub

Create a repository in your GitHub account. This local repository is initialized on `main` but is not committed or pushed: no Git author identity or GitHub credentials were supplied. Configure your own Git author identity, stage and commit the website files, add the new repository remote and push `main`. Alternatively, upload the source-package contents to your repository through GitHub. Do not add credentials to source files. Keep `.env.local`, `.vercel`, `node_modules`, internal source images and QA captures ignored.

### Vercel

The requested Vercel configuration is supplied in `vercel.json`. Import the GitHub repository, framework `Next.js`, root directory `/` (or `website` if importing the parent manually), build command `pnpm build`. Add the optional form variable before building if using an activation token.

**Plan restriction:** Vercel Hobby is restricted to personal/non-commercial use. This business website is commercial and is not eligible for Hobby under the verified current rules. No paid plan has been purchased or activated. Official rule: https://vercel.com/docs/plans/hobby.

### Free static alternative

This site also supports static export for Cloudflare Pages, avoiding a paid hosting requirement:

```sh
pnpm build:static
```

Deploy the `out` directory, or connect the GitHub repository to Cloudflare Pages with build command `pnpm build:static` and output directory `out`. The form remains external and requires no server. Next Image is used throughout; in the static build its optimization service is disabled and the already-compressed local WebP files are served directly. Fonts remain self-hosted. Official deployment guide: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/.

Use Vercel only with an eligible plan, or select the free static alternative. No hosting account has been created or changed automatically.

The static build also normalizes Windows-exported Next router segment filenames to the dot-separated filenames requested by the browser. This is an output-only compatibility step; installed framework files are not modified, and already-correct Linux output is unchanged. Run `node scripts/static-smoke.mjs` after the main QA run to verify all static routes, assets and client navigation locally.

Build sequencing: stop any local production server before `pnpm build:static`. This Next.js export also refreshes intermediate `.next` assets. For production-server QA, complete the static build first, then run `pnpm build` and `pnpm start`. Do not run another static build while that server is serving its earlier manifest. The generated `out` directory is replaced on each successful static build to remove obsolete public chunks.

### Domain and HTTPS

1. Add `www.cubiclepro.in` and `cubiclepro.in` in the chosen host's dashboard.
2. Copy the exact DNS records supplied by that dashboard to your domain provider. Do not copy guessed IP addresses from old tutorials.
3. Set `www.cubiclepro.in` as primary; redirect apex to it permanently. Vercel host redirection is also included in `next.config.ts`.
4. On Cloudflare, configure the apex-to-www redirect in the domain redirect rules; Next's server redirects do not run in static mode. If using `www` as an external subdomain, use the Pages CNAME target shown by Cloudflare. Apex-domain support may require Cloudflare nameservers.
5. The host provisions free HTTPS automatically after DNS verification. No separate SSL certificate purchase is needed.
6. Verify both hosts, the form activation, sitemap and canonical tags after DNS settles.

## Quality checks

Run `pnpm qa` with the production server running on port 3000. The test script uses installed Microsoft Edge headlessly and saves screenshots/report into `qa-results` (ignored). If Edge is unavailable, install Playwright Chromium and change the launch channel accordingly. No test sends live email.

Field Core Web Vitals require real traffic. Local test results are laboratory checks and must not be represented as measured real-user performance or an accessibility certification.

## Assets and licenses

Brochure source: official owner-supplied Cubiclepro PDF. Usage explicitly authorized in this task. Raster images are compressed WebP; logo is PNG. Manrope and Inter are self-hosted under their bundled open font licenses in `licenses/`.

No supplier research, source brochure PDF, rejected image drafts, project portfolio, client list, reviews, prices, colour catalogue or technical downloads are exposed by the application.
