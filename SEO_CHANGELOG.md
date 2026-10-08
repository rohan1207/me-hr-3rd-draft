# SEO Changelog (me-HR Next.js)

## Phase 1 — Foundation / Metadata (2026-04-08)

### Why
Establish a single source of truth for site entity facts and ship unique, keyword-aligned titles/descriptions, canonicals, OG/Twitter tags, and generated Open Graph images — without changing any visible page copy or design.

### Detected stack
- Next.js **15.5** App Router (`src/app/`)
- Project is JavaScript-first → SEO modules written as `.js` (same APIs as the plan’s `.ts`)

### Files added
- `src/lib/seo/site.js` — SITE constants + `abs()` (www.me-hr.com)
- `src/lib/seo/pages.js` — exact Phase 1 title/description table (`PAGE_SEO`)
- `src/lib/seo/metadata.js` — `buildMetadata` / `pageMetadata`
- `src/lib/seo/jsonld.js` — baseline Organization + WebSite JSON-LD (`@id`s)
- `src/lib/seo/index.js` — public exports
- `src/app/manifest.js` — PWA manifest route
- `src/app/opengraph-image.js` — root 1200×630 OG image
- `src/app/media/[slug]/opengraph-image.js`
- `src/app/case-studies/[slug]/opengraph-image.js`
- `scripts/check-meta.mjs` — title/description length checker
- `SEO_CHANGELOG.md` (this file)

### Files updated
- `src/app/layout.js` — `lang="en-IN"`, metadataBase www, title template, icons, OG defaults, escaped JSON-LD
- All static `src/app/**/page.js` routes — use `pageMetadata(PAGE_SEO.*)`
- `src/app/media/[slug]/page.js` + `case-studies/[slug]/page.js` — `generateMetadata` from visible title/excerpt (no new copy)
- `src/app/sitemap.js` / `robots.js` — host `https://www.me-hr.com`

### Explicitly deferred (later phases)
- URL renames (`/pagar` → payroll, `/hr-retainership` → resident-hr, `/media` → insights) — **Phase 2**
- Full LocalBusiness / Service / FAQ / JobPosting schema — **Phase 3–4**
- Careers `/careers/[slug]` — **Phase 4**
- Visible copy / H1 keyword changes — **client approval only (Phase 10)**

### TODO(client)
- Exact lat/long for geo schema
- Twitter/X handle
- Insight & case-study `datePublished` / `dateModified`
- Sonia Patra LinkedIn URL for Person `sameAs`
