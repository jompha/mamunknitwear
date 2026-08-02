---
name: add-content
description: Use when adding, editing, or removing a news post or team member on the Mamun Knitwear site. Covers the Astro content-collection schema, slug conventions, cover images, and the archive page ordering.
---

# Adding content (news + team)

Site content lives in Markdown posts under `src/content/news/` and
`src/content/team/`. They are validated against the schema in
`src/content.config.ts` and rendered by `src/pages/[...newsSlug].astro` and
`src/pages/team/[slug].astro`.

## News posts

1. Create `src/content/news/<slug>.md` where `<slug>` matches the original
   WordPress URL slug. Existing examples preserve the public URL, e.g.
   `chairman-of-mamun-knitwear-ltd-given-cip-status.md`.
2. Frontmatter fields (all required):

   ```yaml
   ---
   title: Post title
   pubDate: 2016-07-05
   category: News
   excerpt: One or two sentence summary shown on cards.
   coverImage:
     src: /images/news/chairman-cip.jpg
     alt: Descriptive alt text
   coverAlt: Descriptive alt text
   ---
   ```

   `coverAlt` is deprecated/optional if `coverImage.alt` is set; keep both in
   sync if present.

3. Body is Markdown. Existing posts contain no internal links; if a post
   needs one, use a relative path (e.g. `/about-us/`) — the base-path
   helper in the layout handles the `/mamunknitwear` prefix at build time.
   Verify with `npm run check:links` after building.

## Team members

1. Create `src/content/team/<slug>.md`. The team page route uses the `id`
   (filename) as the URL slug, so keep it stable (e.g. `mofizul-islam.md`,
   `mamunur-rashid-2.md`).
2. Frontmatter: `title` (name), `role`, `bio`, `photo` (path under
   `src/assets/` or `public/`), `photoAlt`.
3. Photos should be optimized (see the `optimize-images` skill).

## Archive order

`src/pages/news-2/index.astro` sorts posts by `pubDate` descending. A new
post with an older date will not appear at the top — that is expected and
matches the WordPress archive behaviour.

## After editing

- Run `npm run typecheck` and `npm run build`.
- Run `npm run check:links` to make sure no links broke.
- Run `npx playwright test` for the e2e suite if you touched pages.
