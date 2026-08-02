---
name: deploy-site
description: Use when deploying or preparing a deployment of the Mamun Knitwear site to GitHub Pages — building, previewing, committing, and pushing to trigger the Actions workflow.
---

# Deploying to GitHub Pages

## How deployment works

The repo is `jompha/mamunknitwear` and the site publishes to
`https://jompha.github.io/mamunknitwear`. Astro is configured in
`astro.config.mjs` with `site: 'https://jompha.github.io'` and
`base: '/mamunknitwear'`, so URLs are prefix-aware and no `--base` flag is
needed at build time.

`.github/workflows/deploy.yml` runs on pushes to `main`: installs
dependencies, builds, and publishes the `dist/` folder via
`actions/upload-pages-artifact` + `actions/deploy-pages`. Pages must be
enabled in the repo settings with **GitHub Actions** as the source.

## Local release checklist

1. `npm run validate` — must be fully green.
2. `npm run build` and `npm run preview` (or `npx playwright test`) to smoke
   test the built output locally.
3. Commit with a clear message (see `CHANGELOG.md` for versioning style).
4. `git push origin main` — the workflow deploys automatically.

## First-time setup (owner action required)

- The repo must exist at `jompha/mamunknitwear` (empty `main` branch).
- GitHub Pages: Settings → Pages → Source: **GitHub Actions**.
- GH CLI (`gh`) must be authenticated on the machine: `gh auth login`.

## Troubleshooting

- 404 on subpaths: confirm `base` in `astro.config.mjs` matches the repo name.
- Workflow not running: confirm the `.github/workflows/deploy.yml` is on
  `main` and Pages is set to GitHub Actions.
- `check:links` failures are usually stale `dist/`; rebuild first.
