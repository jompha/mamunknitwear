/**
 * check-links.mjs
 *
 * Build-time link checker for the static site.
 *
 * Usage:  npm run build && npm run check:links
 * (Requires `npm run build` to have been run so `dist/` exists.)
 *
 * It crawls every HTML file in `dist/`, extracts internal `href`, `src`,
 * `srcset` and `poster` references, and verifies each one resolves to a
 * file that exists in the built output (accounting for the `base` prefix and
 * `index.html` directory pages). External URLs, `mailto:`, `tel:` and anchors
 * are ignored. Exits with a non-zero code when any internal link is broken.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, normalize, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('../dist', import.meta.url));
const BASE = process.env.ASTRO_BASE ?? '/mamunknitwear';
const basePrefix = BASE === '/' ? '' : BASE.replace(/\/$/, '');

/** Recursively list all files under `dir` (relative paths). */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(distDir);
const htmlFiles = files.filter((f) => extname(f) === '.html');

const exists = new Set(files.map((f) => normalize(f)));
// Also allow directory-style URLs: `/foo/` => dist/foo/index.html
const hasDirectoryIndex = (pathWithoutBase) => {
  const withIndex = join(distDir, pathWithoutBase, 'index.html');
  return existsSync(withIndex);
};

const LINK_RE = /(?:href|src|poster)="([^"]+)"|srcset="([^"]+)"/g;

let problems = 0;
const checked = new Set();

function checkReference(ref, originFile) {
  // Ignore data URIs, protocols, anchors and hashes.
  if (/^(data:|https?:|mailto:|tel:|javascript:|#|\/\/)/.test(ref)) return;
  if (ref.startsWith('#')) return;
  // Strip URL fragments.
  const path = ref.split('#')[0];
  if (!path) return;

  // Resolve relative to the origin file. Absolute references carry the base
  // prefix (e.g. /mamunknitwear/about-us/) which must be stripped before
  // mapping onto the built filesystem (dist/about-us/).
  const withoutBase =
    path.startsWith('/') && path.startsWith(basePrefix)
      ? path.slice(basePrefix.length) || '/'
      : path;
  const target = withoutBase.startsWith('/')
    ? join(distDir, withoutBase)
    : normalize(join(dirname(originFile), withoutBase));

  const ok =
    exists.has(normalize(target)) ||
    (extname(target) === '' &&
      (exists.has(normalize(target) + '.html') || hasDirectoryIndex(withoutBase)));

  if (!ok && !checked.has(path)) {
    problems += 1;
    checked.add(path);
    const relOrigin = originFile.replace(distDir, 'dist');
    console.error(`  [BROKEN] ${ref} (from ${relOrigin})`);
  }
}

console.log(`Scanning ${htmlFiles.length} HTML files in dist/ …\n`);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const baseHref = html.match(/<base href="([^"]+)"/i);
  // Note: internal links in the Astro output are absolute with the base prefix
  // (e.g. /mamunknitwear/about-us/), so no manual base handling is required.
  void baseHref;

  for (const match of html.matchAll(LINK_RE)) {
    const single = match[1];
    const srcset = match[2];
    if (single) checkReference(single, file);
    if (srcset) {
      for (const candidate of srcset.split(',')) {
        const url = candidate.trim().split(/\s+/)[0];
        if (url) checkReference(url, file);
      }
    }
  }
}

console.log('\nDone.');
if (problems > 0) {
  console.error(`\n✗ ${problems} broken internal reference(s) found.`);
  process.exit(1);
}
console.log('✓ All internal links resolve.');
