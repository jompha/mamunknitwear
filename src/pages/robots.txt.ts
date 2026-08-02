import { site } from '../data/site';

export function GET() {
  const base = site.base.replace(/\/$/, '');
  const robots = `User-agent: *\nAllow: /\nDisallow: /404/\n\nSitemap: ${new URL(
    `${base}/sitemap-index.xml`,
    site.url,
  ).toString()}\n`;
  return new Response(robots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
