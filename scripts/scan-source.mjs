/**
 * scan-source.mjs
 *
 * Safety scanner for the rebuilt static site.
 *
 * Usage:  npm run scan (or as part of `npm run audit` / `npm run validate`)
 *
 * Greps the source tree for leftovers that must not ship:
 *   - references to the old WordPress installation (wp-admin, wp-content, etc.)
 *   - local development hosts (localhost, 127.0.0.1, :3000/:4321)
 *   - hard-coded absolute URLs that bypass the base-path helper
 *   - placeholder TODO/FIXME markers
 *
 * Exits with a non-zero code when anything is found.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  '.astro',
  'migration',
  'playwright-report',
  'test-results',
  // Agent skill directories legitimately describe the WordPress→Astro
  // migration and local dev/preview workflow.
  '.claude',
  '.opencode',
]);
const SKIP_FILES = new Set([
  // Tooling and docs whose literal content intentionally mentions these terms.
  'package.json',
  'package-lock.json',
  'scan-source.mjs',
  'check-links.mjs',
  'playwright.config.ts',
  'README.md',
  'CHANGELOG.md',
  'CONTACT.md',
  'DEPLOYMENT.md',
  'MIGRATION-NOTES.md',
]);

const PATTERNS = [
  { label: 'WordPress admin/content', regex: /wp-admin|wp-content|wp-login|wp-includes/gi },
  { label: 'WordPress mentions', regex: /\bWordPress\b/gi },
  { label: 'Local dev hosts', regex: /localhost|127\.0\.0\.1|0\.0\.0\.0|:\d{4,5}\//g },
  { label: 'Placeholder markers', regex: /TODO|FIXME|XXX\b/g },
];

// Absolute links that must go through withBase() when a base path is used.
// Intentionally only flags links to the site's own paths, not mailto/tel/https.
const INTERNAL_LINK_RE = /(?:href|src)="\/(?!mamunknitwear\/|\.\.\/|\/\/|files\/|favicon-)/g;

let findings = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name) || SKIP_FILES.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(astro|ts|mjs|js|json|css|md|html)$/.test(name)) continue;
    const text = readFileSync(full, 'utf8');
    const rel = full.replace(root, '');

    for (const { label, regex } of PATTERNS) {
      for (const match of text.matchAll(regex)) {
        findings += 1;
        const line = text.slice(0, match.index).split('\n').length;
        console.error(`  [${label}] ${rel}:${line} → "${match[0]}"`);
      }
    }

    for (const match of text.matchAll(INTERNAL_LINK_RE)) {
      findings += 1;
      const line = text.slice(0, match.index).split('\n').length;
      console.error(`  [Unprefixed internal link] ${rel}:${line} → "${match[0]}"`);
    }
  }
}

console.log('Scanning source for leftovers …\n');
walk(root);

if (findings > 0) {
  console.error(`\n✗ ${findings} finding(s). Review and fix before shipping.`);
  process.exit(1);
}
console.log('✓ Source is clean.');
