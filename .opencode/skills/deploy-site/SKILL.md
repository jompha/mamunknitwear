---
name: deploy-site
description: Use when deploying or preparing a deployment of the Mamun Knitwear site to GitHub Pages — building, previewing, committing, and pushing to trigger the Actions workflow.
---

# Deploying to GitHub Pages

## How deployment works

The repo is `mmknit/mamunknitwear` and the site is served from the custom
domain root at `https://www.mamunknitwear.com` (Pages fallback:
`https://mmknit.github.io/mamunknitwear`). Astro is configured in
`astro.config.mjs` with `site: 'https://www.mamunknitwear.com'` and
`base: '/'`, so URLs need no prefix and no `--base` flag at build time.

The custom domain is set in **Settings → Pages** (`www.mamunknitwear.com`,
Enforce HTTPS); the apex `mamunknitwear.com` redirects to it. Cloudflare DNS
must be DNS-only (grey cloud): A `@` → the four GitHub Pages `185.199.10x.153`
records, CNAME `www` → `mmknit.github.io`.

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

- The repo must exist at `mmknit/mamunknitwear` (empty `main` branch).
- GitHub Pages: Settings → Pages → Source: **GitHub Actions**, then set the
  **Custom domain** to `www.mamunknitwear.com` and enable Enforce HTTPS.
- Point the Cloudflare records at GitHub Pages (DNS-only — see DEPLOYMENT.md).
- GH CLI (`gh`) must be authenticated on the machine: `gh auth login`.

## Troubleshooting

- 404 on subpaths: custom domain not yet set in Settings → Pages, or DNS
  records missing (records must be DNS-only, not proxied).
- Workflow not running: confirm the `.github/workflows/deploy.yml` is on
  `main` and Pages is set to GitHub Actions.
- `check:links` failures are usually stale `dist/`; rebuild first.
