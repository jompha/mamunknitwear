# Deployment

## Live URL

- **Production:** <https://mmknit.github.io/mamunknitwear>
- **Source repo:** `mmknit/mamunknitwear` (branch `main`)
- **Original site (being replaced):** <https://mamunknitwear.com>

## How it works

`astro.config.mjs` sets:

```js
site: 'https://mmknit.github.io',
base: '/mamunknitwear',
trailingSlash: 'always',
```

Every internal link goes through the `withBase()` helper in
`src/utils/paths.ts`, so the build needs no extra flags.

`.github/workflows/deploy.yml` deploys on every push to `main`:

1. `npm ci`
2. `node scripts/scan-source.mjs` (source hygiene)
3. `npm run build`
4. `npm run check:links` (broken links fail the deploy)
5. `actions/upload-pages-artifact` → `actions/deploy-pages`

## First-time setup (owner action required)

1. Create the GitHub repo `mmknit/mamunknitwear` (empty, `main` branch).
2. In **Settings → Pages**, set Source to **GitHub Actions**.
3. Authenticate the GitHub CLI locally so pushes work:
   `gh auth login`
4. Push `main`. The workflow publishes `dist/`.

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
| 404 on nested paths    | `base` mismatch in `astro.config.mjs`; should equal the repo name.     |
| Workflow doesn't run   | `deploy.yml` not on `main`, or Pages source not set to GitHub Actions. |
| `check:links` fails    | Stale `dist/` — run `npm run build` first.                             |
| Pages says "no source" | Enable Pages and select the GitHub Actions source.                     |
