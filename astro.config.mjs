// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
//
// GitHub Pages deployment:
// - site: root of the Pages host (https://jompha.github.io)
// - base: repository name so the site is served from /mamunknitwear/
//
// For a custom root domain (e.g. https://mamunknitwear.com):
//   set site to 'https://mamunknitwear.com' and base to '/' (remove this line),
//   then add a CNAME file in public/ and update the DNS (see DEPLOYMENT.md).
export default defineConfig({
  site: 'https://jompha.github.io',
  base: '/mamunknitwear',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => item,
    }),
  ],
});
