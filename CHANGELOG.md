# Changelog

All notable changes to this project are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/) loosely; the project uses
calendar-ish minor versions (`1.0.0`, `1.1.0`, …).

## [Unreleased]

### Added

- Initial static rebuild of the Mamun Knitwear Ltd. website with Astro 7:
  - 10 static pages (including the custom 404) + 7 content pages
    (news × 5, team × 2) = 17 pages.
  - Content collections (`src/content.config.ts`, `astro/zod`) for news and
    team, rendered from `src/content/news` and `src/content/team`.
  - Design tokens + global styles (`src/styles/`), self-hosted Montserrat and
    PT Sans fonts (SIL OFL).
  - SEO layer: `@astrojs/sitemap`, per-page meta/OG/JSON-LD in `Seo.astro`,
    `robots.txt`, favicons, and a social default image.
  - Components: Header (with mobile nav), Footer, Breadcrumbs, PageHeader,
    SectionHeading, Hero, FeaturesGrid, CtaSection, LogoStrip, RecentNews,
    NewsCard, TeamCard, StatCards, ContactForm.
  - Data layer (`src/data/*.ts`) and the base-path helper
    (`src/utils/paths.ts`) for the `/mamunknitwear` GitHub Pages prefix.
  - Contact form: JS-enhanced `mailto:` fallback + honeypot; no backend.
  - 47 raw assets scraped and 42 optimized images migrated with an asset
    manifest (`migration/asset-manifest.json`).

### Changed

- **Migrated** from the WordPress/PHP site `mamunknitwear.com` to a static
  build; preserved original public URLs (see `MIGRATION-NOTES.md`).
- **Removed** the source site's Google Analytics property `UA-81405524-1`.
- **Replaced** the sewing section's original "Lorem ipsum" placeholder text
  with real copy.
- **Replaced** the dead-end WordPress jobs plugin page with a minimal
  "no open positions" page at the same URL.

### Tooling

- Vitest unit tests (13 passing) and Playwright E2E tests (11 passing).
- ESLint 10 flat config + eslint-plugin-astro + jsx-a11y; Prettier with the
  Astro plugin; strict `astro check`.
- `scripts/check-links.mjs` (internal link verification) and
  `scripts/scan-source.mjs` (WordPress/localhost leftover scan).
- GitHub Actions deploy workflow (`.github/workflows/deploy.yml`).
- Skills for Claude Code and opencode (`add-content`, `optimize-images`,
  `verify-site`, `deploy-site`).

## [1.0.0] — planned initial release

Placeholder for the first tagged release once the site is published at
<https://jompha.github.io/mamunknitwear>.
