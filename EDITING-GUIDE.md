# Editing Guide — Mamun Knitwear site

Quick reference: where the content lives and how to change it. After editing, run
`npm run validate` and commit + push to `main` — the site redeploys automatically.

## Editing texts

| What you want to change                                                     | File                    | Where to look                                                                                     |
| --------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------- |
| Hero banner title, tagline, button labels                                   | `src/pages/index.astro` | The `<Hero ...>` block (`title`, `text`, `ctaLabel`, `secondaryCtaLabel`)                         |
| Menu labels (Home, About us, Services, …)                                   | `src/data/site.ts`      | The `navigation` array                                                                            |
| "Services" dropdown items                                                   | `src/data/site.ts`      | `navigation` → the `children` under `Services`                                                    |
| Service cards (title, description, link)                                    | `src/data/services.ts`  | The `services` array                                                                              |
| Knitting / Sewing / Digital Printing page text, units, machine table, stats | `src/data/sections.ts`  | `knitting`, `sewing`, `digitalPrinting` objects                                                   |
| Home "Why choose us" cards, company stats, milestones/timeline              | `src/data/home.ts`      | `homeFeatures`, `historyMilestones`                                                               |
| About page paragraphs ("Who we are")                                        | `src/data/sections.ts`  | `aboutText.intro`                                                                                 |
| Phone, email, address, social links, tagline                                | `src/data/site.ts`      | The `site` object                                                                                 |
| Page headings & section headers                                             | `src/pages/*.astro`     | `PageHeader` / `SectionHeading` props (`title`, `lead`, `eyebrow`)                                |
| News posts                                                                  | `src/content/news/*.md` | One file per post — frontmatter `title`, `excerpt`, `category`, `pubDate`, then normal text below |
| Team members                                                                | `src/content/team/*.md` | Frontmatter `name`, `role`, plus bio text                                                         |

**Don't remove quotes or commas** around the text you change in `.ts` files — just edit the words between them.

## Replacing images

All images live in `src/assets/images/`. Key ones:

| Image                                   | File                                                                                      |
| --------------------------------------- | ----------------------------------------------------------------------------------------- |
| Home hero banner                        | `hero-factory.jpg`                                                                        |
| About factory photo (home + About page) | `about-building.jpg`                                                                      |
| Service cards                           | named in `src/data/services.ts` (`svc-*` and gallery photos)                              |
| Knitting gallery                        | `knitting-01.jpg` … `knitting-04.jpg` (list at top of `src/pages/knitting-section.astro`) |
| Digital printing gallery                | `printing-01.jpg` … `printing-04.jpg` (`src/pages/digital-printing.astro`)                |
| Sewing gallery                          | `sewing-01.jpg` … `sewing-04.jpg` (`src/pages/sewing-section.astro`)                      |
| Team photos                             | `team-*.jpg`                                                                              |
| News images                             | `news-*.jpg`                                                                              |
| Client / certification logos            | `client-*.png`, `cert-*.png` (referenced in `src/data/logos.ts`)                          |
| Site logo (header)                      | `logo.png`                                                                                |

Two ways to swap:

1. **Easiest — overwrite:** save your new photo with the **same filename** (e.g. replace `hero-factory.jpg` in `src/assets/images/`). Nothing else to change.
2. **New filename:** copy the file into `src/assets/images/`, then update the matching `import` / `imageAlt` in the file listed in the table above.

Tips: JPG for photos, PNG for logos; keep photos under ~200 KB and around 1600px wide so pages stay fast. Also update the `imageAlt` text to describe the new photo (it's read by screen readers and search engines).

## Preview & publish

- Preview locally: `npm run dev` then open the local URL that Astro prints in the terminal
- Before publishing: `npm run validate` (must end without errors)
- Publish: commit and push to `main` — GitHub Actions rebuilds and deploys the site automatically
