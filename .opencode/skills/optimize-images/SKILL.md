---
name: optimize-images
description: Use when adding, replacing, or resizing images for the Mamun Knitwear site. Covers the required formats, dimensions, and how images flow from migration/raw-assets through asset-manifest.json to src/assets.
---

# Optimizing images

## Source of truth

Original site images live in `migration/raw-assets/` and are tracked in
`migration/asset-manifest.json`. Optimized copies are committed under
`src/assets/` and imported by data files (`src/data/*.ts`) and Astro pages so
Astro's image pipeline emits responsive, hashed assets.

## Rules

- Convert to modern formats. Photos → WebP or JPEG (keep JPEG if a browser
  still needs it); logos/certs/UI → PNG (or SVG when vector source exists).
- Never commit raw WordPress-scraped files (often 1–3 MB JPEGs) directly into
  `src/assets`. Compress first; target < 200 KB for hero images, < 100 KB for
  cards, < 50 KB for logos/certs.
- Keep sensible intrinsic sizes: hero ~1920px wide, section images
  ~900px, cards ~600px, certs ~400px. Astro resizes further at build time.
- Preserve aspect ratios; do not upscale.
- Alt text is required on every meaningful image (`alt` on `<img>`, or
  `alt`/`coverAlt` in frontmatter). Decorative images get `alt=""`.

## Workflow

1. Drop the new source file into `migration/raw-assets/`.
2. Add it to `migration/asset-manifest.json` with source/optimized mapping.
3. Optimize and save under `src/assets/`.
4. Update the importing data file or content frontmatter.
5. Run `npm run build`, then `npm run check:links` to confirm assets resolve.

## Verification

- Check built sizes under `dist/_astro/` (Astro hashes and optimizes).
- Run `npx playwright test tests/e2e/content.spec.ts` to confirm images
  render on the pages that use them.
