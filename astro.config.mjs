// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
//
// GitHub Pages deployment under a custom root domain (www.mamunknitwear.com):
// - site: the primary host, also set as the Pages custom domain in
//   Settings -> Pages (the apex mamunknitwear.com redirects to it)
// - base: '/' because the site is served from the domain root
//   (DNS records for GitHub Pages are listed in DEPLOYMENT.md)
export default defineConfig({
  site: 'https://www.mamunknitwear.com',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => item,
    }),
  ],
});
