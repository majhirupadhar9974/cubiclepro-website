# Cubiclepro release verification

Date: 16 September 2026. Status: repair pass completed; prepared for deployment, not published.

## Consolidated repairs

- Corrected the locked Modesty Panels and HPL Lockers family names and related-product relationships.
- Centralized the approved Section 18 titles, descriptions and H1s; verified the copy against the master specification. Product taglines are separate from the semantic H1.
- Completed Configuration, Where it fits and Project confirmation sections with existing catalogue facts and project-specific qualifications.
- Centralized accurate product alt text. Preserved brochure imagery and Concept Visual labelling, including the mobile hero.
- Added same-tab, expiring, single-use submission-return handling. URL-only confirmation is rejected; the notice makes no claim of inbox delivery. Added the production `_url`, retained verification/honeypot, and preserved system/variant and WhatsApp prefill.
- Made the mobile menu background inert and hidden from assistive navigation, with restoration, focus trapping and Escape handling. Added clear sales actions and Hardware & Profiles navigation labels.
- Added masked media reveals, staggered typography, controlled card/detail transitions and limited desktop image depth. Enhanced movement is disabled on mobile, reduced-motion, data-saving and low-core devices. Text remains at full contrast during entrances.
- Kept the same local fonts while adding preload and adjusted fallback metrics to remove the measured font-swap layout shift.
- Static export now replaces only its generated output folder, preventing obsolete public chunks from surviving rebuilds. Documented static-before-production build sequencing.

## Verified production build

- Next.js production build and separate TypeScript check: PASS.
- All 21 content routes: HTTP 200, one approved H1, approved titles/descriptions, correct canonical, Open Graph/Twitter descriptions and parseable structured data.
- All 13 product pages use the centralized brochure catalogue. No completed-project portfolio or invented clients, ratings or company history.
- Primary phone, email and WhatsApp destinations: PASS. Product enquiry prefill: PASS.
- Desktop navigation, mobile modal background inertness, focus trap/restoration, Escape handling, suspended-system filter and Choose Your System enquiry flow: PASS.
- Desktop 1440px, tablet 768px, mobile 390px and small mobile 360px: no horizontal overflow on homepage, catalogue, Sky Hung and contact pages. All 21 routes also checked at 360px. Final desktop/tablet/mobile screenshots inspected; the mobile concept label remains clear of the fixed action bar.
- Automated accessibility checks on homepage, catalogue, Sky Hung and contact at desktop/mobile widths: zero violations for the tested WCAG A/AA rules. This is not a complete accessibility certification.
- Image loading, reduced-motion and data-saving behavior, no-JavaScript content visibility, sitemap, robots, route-alias redirects and custom 404: PASS.
- Quote form required-field validation, product/Junior variant prefill, intercepted POST payload, URL-only false-confirmation prevention and same-session return: PASS. No real enquiry was sent during testing. Mailbox activation and real delivery remain unverified until the owner completes the deployment test.
- Public supplier-name audit: zero occurrences across 702 scanned public output files. Includes public filenames, compiled text, binary asset text and image metadata. The internal audit rule is not bundled into the website. Obsolete family labels are also absent from the generated outputs.

## Assets

The separate static export also passed all 21 route/asset checks, hydrated filtering, query-based product prefill and real client-side product navigation without falling back to a full page reload. A Windows-only exported segment filename mismatch was corrected by the repeatable output normalization step.

Product/brand raster assets come directly from the owner's brochure, compressed for the web. No rejected generated drafts are shipped. Existing hardware appearance in brochure images is retained; see VISUAL_REVIEW.md for the change in art direction and archived correction requests. Shared brochure images do not prove a material grade. Public captions identify concept visuals, not completed projects.

## Local mobile performance

Production homepage; Edge headless; 390px viewport, DPR 2, touch/mobile emulation; 4x CPU slowdown, 1.6Mbps downlink and 100ms latency:

- Largest Contentful Paint: 1,700ms on the final repeat measurement; 2,176ms on the first measurement after the final rebuild.
- Cumulative Layout Shift during measurement: 0.
- Cumulative Layout Shift was zero in both final measurements.
- Observed long-task blocking time: 167ms on the repeat measurement; 620ms on the first measurement after rebuild.
- Resource transfer: 378,081 bytes; JavaScript transfer: 153,506 bytes, below the 180 KB limit.

These are local laboratory observations, not real-device or field Core Web Vitals, INP results or a Lighthouse score. The independently compressed static-hosting build may have different performance.

## Deployment handoff

Source includes the lockfile, environment example, hosting configuration, repeatable QA scripts and a separate free-hosting static export. The local Git repository is initialized but not committed/pushed because no author identity or GitHub credentials were supplied.

Vercel Hobby does not permit this commercial website. Use the prepared Cloudflare Pages static alternative for free hosting, or an eligible Vercel plan; no paid service was activated.

Owner-only steps: hosting/GitHub login, domain DNS and primary-host redirect configuration, sales-mailbox form activation and a real delivery test. See README.md for exact steps. No domain DNS, public deployment or mailbox activation has been performed.

Machine-readable evidence and screenshots are retained locally in qa-results/. These are excluded from the public website and source release package.
