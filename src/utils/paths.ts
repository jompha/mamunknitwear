/**
 * Returns a site-relative URL with the configured base path prepended.
 *
 * Astro does not automatically prefix internal links with `base`, so every
 * internal href must go through this helper. When the site is deployed to a
 * custom root domain (base = "/") the helper becomes a no-op.
 *
 * @example
 *   withBase('/about-us/') // => '/about-us/' (custom domain, base = "/")
 *                          // => '/mamunknitwear/about-us/' (sub-path base)
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Removes the base prefix from a URL if present (used for comparisons). */
export function stripBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return path.startsWith(base) ? path.slice(base.length) || '/' : path;
}
