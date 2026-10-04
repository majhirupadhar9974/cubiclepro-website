# CubiclePro Admin activation checklist

The public website must continue using the approved local content until every item below is complete.

## 1. Create and secure the content project

1. Create one Sanity project with a free `production` dataset containing public website content only.
2. Add only named CubiclePro administrators/editors.
3. Choose a single managed identity route:
   - preferred: SAML SSO backed by an identity provider that enforces MFA; or
   - limited-team fallback: Google/GitHub OAuth accounts with 2FA enabled and verified individually.
4. Do not activate `/admin` until MFA is mandatory for every invited user.
5. Store recovery codes outside the website repository.

## 2. Configure Vercel

Add these environment variables to Production and Preview:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `ADMIN_MFA_ENFORCED=1` only after step 1 is verified
- `SANITY_REVALIDATE_SECRET` (long random webhook secret)

Redeploy the existing Vercel project. Never create a replacement website project.

## 3. Sanity project settings

- Add `https://www.cubiclepro.in` and the approved Vercel preview origin to CORS.
- Keep customer enquiries, contact details and private drawings outside the public content dataset.
- Assign the minimum role required to each editor.
- Limit administrator role to the owner account.
- Add a webhook for `https://www.cubiclepro.in/api/cms/revalidate` and send
  `SANITY_REVALIDATE_SECRET` in the `x-sanity-secret` header.

## 4. Migration and publishing safety

1. Import the approved local catalogue as drafts.
2. Compare every migrated record with the public page and source specification.
3. Confirm images against `data/approved-assets.json`.
4. Publish one pilot product and verify the public fallback/merge behavior.
5. Migrate remaining products, homepage, locations, articles and FAQs in batches.
6. Do not change existing URLs during migration.

## 5. Recovery test

- Edit a draft, publish it, view revision history and restore the previous version.
- Remove an editor and verify access is revoked.
- Confirm `/admin` and `/studio` are `noindex` and blocked in `robots.txt`.

Google Search Console and GA4 are intentionally configured after the secure CMS activation and migration QA.
