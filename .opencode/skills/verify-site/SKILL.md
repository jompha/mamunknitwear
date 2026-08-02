---
name: verify-site
description: Use when running the verification pipeline for the Mamun Knitwear site — unit tests (Vitest), end-to-end tests (Playwright), link checking, lint, typecheck, format, and the full validate script.
---

# Verifying the site

## Quick commands

| Task                                                                             | Command                                   |
| -------------------------------------------------------------------------------- | ----------------------------------------- |
| Full validation (format + lint + typecheck + unit + build + links + source scan) | `npm run validate`                        |
| Unit tests                                                                       | `npm run test`                            |
| Unit tests (watch)                                                               | `npm run test:watch`                      |
| E2E tests (needs built `dist/`)                                                  | `npm run build && npm run test:e2e`       |
| Internal link check (needs built `dist/`)                                        | `npm run build && npm run check:links`    |
| Leftover source scan                                                             | `node scripts/scan-source.mjs`            |
| Lint                                                                             | `npm run lint`                            |
| Typecheck                                                                        | `npm run typecheck`                       |
| Format check / write                                                             | `npm run format:check` / `npm run format` |

## Running order when touching code

1. `npm run typecheck` (fast, catches schema/import errors).
2. `npm run lint`.
3. `npm run test` (Vitest; base-path helper and data tests).
4. `npm run build`.
5. `npm run check:links` (broken internal links fail CI).
6. `node scripts/scan-source.mjs` (flags WordPress/localhost leftovers).
7. `npx playwright test` for anything touching markup/links/routes.

## E2E specifics

- `playwright.config.ts` builds and previews the site on `http://localhost:4321`.
- Test files: `tests/e2e/home.spec.ts` (home, nav, 404, migrated pages) and
  `tests/e2e/content.spec.ts` (news archive/detail, team, contact form,
  SEO/favicon, machine tables).
- Chromium only; 11 tests total.

## When something fails

- Prefer the specific command over `npm run validate` to iterate faster.
- For link failures, rebuild first — `dist/` may be stale.
- For scan-source findings, review whether the hit is a real leftover or a
  known-safe tooling file listed in the script's `SKIP_FILES`.
