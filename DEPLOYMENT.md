# Deployment

## Live URL

- **Production:** <https://www.mamunknitwear.com> (served from the domain root)
- **Source repo:** `mmknit/mamunknitwear` (branch `main`)
- **Pages fallback:** <https://mmknit.github.io/mamunknitwear/>
- **Original site (being replaced):** <https://mamunknitwear.com>

## How it works

`astro.config.mjs` sets:

```js
site: 'https://www.mamunknitwear.com',
base: '/',
trailingSlash: 'always',
```

The `base` is `/` because the site is served from the domain root (custom
domain set in **Settings → Pages**). Every internal link goes through the
`withBase()` helper in `src/utils/paths.ts`, which is a no-op at `base = "/"`.

`.github/workflows/deploy.yml` deploys on every push to `main`:

1. `npm ci`
2. `node scripts/scan-source.mjs` (source hygiene)
3. `npm run build`
4. `npm run check:links` (broken links fail the deploy)
5. `actions/upload-pages-artifact` → `actions/deploy-pages`

## First-time setup (owner action required)

1. Create the GitHub repo `mmknit/mamunknitwear` (empty, `main` branch).
2. In **Settings → Pages**, set Source to **GitHub Actions**.
3. Set the **Custom domain** to `www.mamunknitwear.com` and tick **Enforce
   HTTPS** (this makes GitHub serve the site from the domain root).
4. Point Cloudflare DNS at GitHub Pages (grey-cloud/DNS-only so the TLS
   certificate can be issued):
   - A `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`
   - CNAME `www` → `mmknit.github.io`
   - Optional AAAA: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - The apex `mamunknitwear.com` redirects to `www` automatically.
5. Authenticate the GitHub CLI locally so pushes work: `gh auth login`
6. Push `main`. The workflow publishes `dist/`.

## Release checklist

```sh
npm run validate     # everything green
npm run build        # fresh dist/
npx playwright test  # smoke test the built output
git add -A && git commit -m "..." && git push origin main
```

See `CHANGELOG.md` for the commit/versioning style used in this repo.

## Troubleshooting

| Symptom                | Likely cause / fix                                                     |
| ---------------------- | ---------------------------------------------------------------------- |
| 404 on nested paths    | Custom domain not yet set in Settings → Pages, or DNS records missing. |
| Certificate not issued | Cloudflare record must be DNS-only (grey cloud), not proxied.          |
| Workflow doesn't run   | `deploy.yml` not on `main`, or Pages source not set to GitHub Actions. |
| `check:links` fails    | Stale `dist/` — run `npm run build` first.                             |
| Pages says "no source" | Enable Pages and select the GitHub Actions source.                     |
