#!/usr/bin/env node
/**
 * audit-internal-links.mjs
 *
 * Enforces the rule: every article page in web/src/routes/articles/
 * must include at least 2 frylane.com internal links.
 *
 * A "frylane.com internal link" is any of:
 *   - <Link to="/path">…</Link>  (react-router-dom)
 *   - <a href="/path">…</a>      where /path is in PAGE_REGISTRY
 *
 * Excluded: external https:// links, anchor jumps (#foo), mailto/tel,
 * paths not in the registry (e.g. /images/foo.png).
 *
 * Exits 1 if any article has fewer than 2 internal links.
 *
 * Run: node scripts/audit-internal-links.mjs
 * Test: jest __tests__/scripts/audit-internal-links.test.mjs
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = resolve(__dirname, '../src/routes/articles');
const REGISTRY_PATH = resolve(__dirname, '../src/seo/pageRegistry.ts');
const MIN_LINKS = 2;

/**
 * Count frylane.com internal links in a source string.
 * @param {string} source - raw file content
 * @param {string[]} registryPaths - paths from PAGE_REGISTRY (must be exact-prefix-matched)
 * @returns {number} count of unique internal link paths
 */
export function countLinks(source, registryPaths) {
  const registrySet = new Set(registryPaths);

  // Match <Link to="/path">  OR  <a href="/path">
  const linkRegex = /<(?:Link|a)[^>]*?(?:to|href)\s*=\s*["'](\/[^"']*)["']/g;
  const found = new Set();
  let match;
  while ((match = linkRegex.exec(source)) !== null) {
    const path = match[1];
    if (path.startsWith('/#')) continue;
    const normalized = path.replace(/\/$/, '');
    if (registrySet.has(normalized) || registrySet.has(path)) {
      found.add(path);
    }
  }
  return found.size;
}

/**
 * Extract paths from PAGE_REGISTRY source (regex on `path: '/foo'`).
 * @param {string} registrySource - raw file content of pageRegistry.ts
 * @returns {string[]} paths
 */
export function extractRegistryPaths(registrySource) {
  const pathRegex = /path:\s*['"`](\/[^'"` ]*)['"`]/g;
  const paths = [];
  let m;
  while ((m = pathRegex.exec(registrySource)) !== null) {
    paths.push(m[1]);
  }
  return paths;
}

/**
 * Run the audit. Returns a list of {file, linkCount} records.
 * @param {string} articlesDir
 * @param {string[]} registryPaths
 */
export function audit(articlesDir, registryPaths) {
  const files = readdirSync(articlesDir).filter(
    (f) => f.endsWith('Page.tsx') || f.endsWith('PageVI.tsx'),
  );
  return files.map((f) => {
    const source = readFileSync(join(articlesDir, f), 'utf8');
    return { file: f, linkCount: countLinks(source, registryPaths) };
  });
}

// ── CLI entry point ─────────────────────────────────────────────────────
const isCli = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isCli) {
  const registrySource = readFileSync(REGISTRY_PATH, 'utf8');
  const paths = extractRegistryPaths(registrySource);
  const results = audit(ARTICLES_DIR, paths);
  const violations = results.filter((r) => r.linkCount < MIN_LINKS);

  console.log(`Internal-link audit — ${results.length} articles, ${paths.length} registry paths`);
  console.log(`Minimum required: ${MIN_LINKS} per article`);
  console.log('');
  const sorted = [...results].sort((a, b) => a.linkCount - b.linkCount);
  for (const r of sorted) {
    const marker = r.linkCount < MIN_LINKS ? 'X' : 'OK';
    console.log(`  [${marker}] ${r.file.padEnd(40)} ${r.linkCount} links`);
  }
  console.log('');
  if (violations.length > 0) {
    console.error(`FAIL: ${violations.length} article(s) have fewer than ${MIN_LINKS} internal links:`);
    for (const v of violations) console.error(`  - ${v.file} (${v.linkCount})`);
    process.exit(1);
  }
  console.log(`PASS: all ${results.length} articles have >= ${MIN_LINKS} internal links.`);
}
