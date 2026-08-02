# Mamun Knitwear Ltd. — Static Site

A fast, dependency-light static rebuild of <https://mamunknitwear.com> — the
website of **Mamun Knitwear Ltd.**, a 100% export-oriented knit garments
manufacturer in Gazipur, Bangladesh. The original WordPress/PHP site has been
migrated to [Astro](https://astro.build) and is published on GitHub Pages at
<https://jompha.github.io/mamunknitwear>.

## Highlights

- **No WordPress, PHP, or database** — plain HTML/CSS/JS output.
- **17 static pages** generated at build time from Astro components and
  Markdown content collections (news + team).
- **Design**: an "Industrial" theme with the `#3498db` accent and `#171717`
  footer, self-hosted Montserrat + PT Sans (WOFF2, SIL OFL).
- **SEO**: `@astrojs/sitemap`, per-page meta/Open Graph, JSON-LD, `robots.txt`.
- **Accessible, responsive** layout (tested at 390 / 768 / 1440 px).
- **Contact form** without a backend: a JS-enhanced `mailto:` fallback plus a
  honeypot field, ready to point at a real form endpoint later.

## Stack

| Concern       | Choice                                                   |
| ------------- | -------------------------------------------------------- |
| Framework     | Astro 7 (content layer, `astro/zod`)                     |
| Styling       | Plain CSS design tokens (`src/styles/`)                  |
| SEO           | `@astrojs/sitemap`                                       |
| Type checking | `astro check` (strict)                                   |
| Linting       | ESLint 10 flat config + `eslint-plugin-astro` + jsx-a11y |
| Formatting    | Prettier + `prettier-plugin-astro`                       |
| Unit tests    | Vitest 4                                                 |
| E2E tests     | Playwright (chromium)                                    |
| CI/CD         | GitHub Actions → GitHub Pages                            |

## Getting started

```sh
npm ci
npm run dev        # or `astro dev --background` for background mode
```

| Script                         | Purpose                                                     |
| ------------------------------ | ----------------------------------------------------------- |
| `npm run build`                | Static build to `dist/` (17 pages + sitemap)                |
| `npm run preview`              | Serve the built site locally                                |
| `npm run validate`             | Format + lint + typecheck + unit + build + link/scan checks |
| `npm run lint`                 | ESLint                                                      |
| `npm run typecheck`            | `astro check`                                               |
| `npm run test`                 | Vitest unit tests                                           |
| `npm run test:e2e`             | Playwright end-to-end tests (builds + previews first)       |
| `npm run check:links`          | Crawls `dist/` for broken internal links                    |
| `node scripts/scan-source.mjs` | Flags WordPress/localhost leftovers in source               |

## Project structure

```
src/
  components/       Astro components (layout, common, sections, portfolio, contact)
  content/          Markdown collections: news/ (5 posts) and team/ (2 members)
  content.config.ts Collection schemas + glob loaders
  data/             site, home, sections, services, logos (typed)
  pages/            Route pages incl. [...newsSlug] and team/[slug]
  styles/           tokens.css, fonts.css, global.css
  utils/            paths.ts (withBase / stripBase for the base prefix)
scripts/            check-links.mjs, scan-source.mjs
tests/              unit stubs + e2e specs
migration/          raw-assets/, reference-screenshots/, asset-manifest.json
public/             favicons, logo.png, files/Company-Profile-MKL.pdf, social/
```

## Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) — GitHub Pages setup and release process.
- [MIGRATION-NOTES.md](MIGRATION-NOTES.md) — what changed from the original
  WordPress site, including intentional content changes.
- [CHANGELOG.md](CHANGELOG.md) — version history.
- [CONTACT.md](CONTACT.md) — contact details and the static contact form.

## Skills

This repo ships reusable skills for Claude Code (`.claude/skills/`) and
opencode (`.opencode/skills/`): `add-content`, `optimize-images`,
`verify-site`, and `deploy-site`.

## License & credits

All site content and images are © Mamun Knitwear Ltd. Fonts are SIL OFL
licensed. Rebuild authored for the company's IT team.
