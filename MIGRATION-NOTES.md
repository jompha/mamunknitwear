# Migration Notes

What changed when moving <https://mamunknitwear.com> from WordPress/PHP to a
static Astro build.

## Goal

Preserve the original content, branding, and public URLs while removing the
WordPress/PHP/database dependency entirely. Output is plain static files
served from GitHub Pages.

## What was preserved

- **All public page URLs** that were still live on the source site:
  `/`, `/about-us-2/`, `/services/`, `/knitting-section/`,
  `/digital-printing/`, `/sewing-section/`, `/news-2/`, `/jobs/`,
  `/contact-us/`.
- **News post URLs** match the WordPress title-slug scheme
  (e.g. `/chairman-of-mamun-knitwear-ltd-given-cip-status/`), not the old
  internal numeric IDs.
- **Team URLs**: `/team/mofizul-islam/` and `/team/mamunur-rashid-2/`
  (the file is deliberately named `mamunur-rashid-2.md` to keep that URL).
- **Visual identity**: Industrial-style layout, `#3498db` accent, `#171717`
  footer, Montserrat + PT Sans (self-hosted, SIL OFL).
- **Sister-concern list** (M.M. Knitwear, M.M. Label Accessories, M.M.
  Printing & Embroidery, M.M. Dyeing Unit 02) and the client logo strip
  (Pepe Jeans, La Halle, Sports World, Pierre Cardin, Slazenger).
- **Company profile PDF** and all section/equipment content and imagery.

## Intentional changes

- **Analytics removed.** The source site's Google Analytics property
  `UA-81405524-1` was intentionally not carried over. See
  `src/data/site.ts` (`analytics: null`).
- **Contact form is backend-less.** The WordPress contact plugin is gone. The
  new form is a JS-enhanced `mailto:` fallback addressed to
  `info@mamunknitwear.com`, includes a hidden honeypot field, and ships with
  the endpoint blank (`contactFormEndpoint: ''` in `src/data/site.ts`).
  Point that field at a real form endpoint to enable server-side submission —
  see `CONTACT.md`.
- **Sewing section placeholder.** The original WordPress sewing page used
  "Lorem ipsum" placeholder paragraphs. The rebuilt sewing section replaces
  those with real, factual copy written for the site. This is the one place
  where content was authored new rather than migrated.
- **Jobs page.** The source `/jobs/` route was a dead-end WordPress plugin
  page with no real postings. A minimal, honest "no open positions — email
  us" page replaces it, keeping the URL alive.
- **Dead footer/news links removed.** Old links pointing to
  `/about-us/`, `/news/`, and `/news/{id}/` now resolve to the migrated
  equivalents (`/about-us-2/`, `/news-2/`, and root-level post slugs).
- **Small copy normalisation** for consistency (email/phone formatting,
  consistent "Knitting/Printing/Sewing" section names).

## Asset migration

- **47 raw assets** were scraped from the source into `migration/raw-assets/`
  and reduced to **42 optimized images** committed under `src/assets/`.
- The source→optimized mapping is recorded in `migration/asset-manifest.json`.
- Reference screenshots of the original site (390/768/1440 px) are kept in
  `migration/reference-screenshots/` for visual comparison; they are **not**
  shipped.

## Known source-site issues (not fixed here)

- The original site's sewing section contained "Lorem ipsum" filler (see
  above).
- Social links on the source pointed to generic/placeholder URLs
  (`linkedin.com/`, `twitter.com/`) and are preserved as-is in
  `src/data/site.ts` until real profiles exist.

## Post-migration verification

- `npm run build` produces 17 pages and a sitemap.
- `npm run check:links` verifies every internal link resolves.
- `scripts/scan-source.mjs` confirms no `wp-*`, `localhost`, or placeholder
  leftovers ship.
- Unit tests (Vitest) cover the base-path helper and data integrity.
- E2E tests (Playwright) cover home, nav, 404, all migrated pages, news,
  team, contact form, and SEO tags.
