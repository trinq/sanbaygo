// Wiki linter — checks C1 (staleness), C2 (broken links), C5 (schema).
// Exported as lintWiki({ wikiDir, repoRoot }) for tests; CLI mode reads from CLI args.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, resolve, isAbsolute } from 'node:path';

const REQUIRED_FRONTMATTER_FIELDS = ['last_verified', 'sources', 'summary'];

/**
 * Parse YAML-ish frontmatter. We do not depend on a YAML lib; the wiki schema
 * is small and stable, so a hand-rolled parser is enough and keeps zero deps.
 *
 * Supported subset:
 *   key: value
 *   key:
 *     - path: foo
 *     - path: bar
 *
 * Anything more complex belongs in a real YAML lib.
 */
export function parseFrontmatter(text) {
  if (!text.startsWith('---')) return { ok: false, data: null, body: text, error: 'no frontmatter' };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { ok: false, data: null, body: text, error: 'unterminated frontmatter' };
  const block = text.slice(3, end).replace(/^\n/, '');
  const body = text.slice(end + 4).replace(/^\n/, '');
  try {
    const data = parseYamlBlock(block);
    return { ok: true, data, body, error: null };
  } catch (e) {
    return { ok: false, data: null, body, error: e.message };
  }
}

function parseYamlBlock(block) {
  const lines = block.split('\n');
  const result = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) { i++; continue; }
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_-]*):\s*(.*)$/);
    if (!m) throw new Error(`unparseable line: ${line}`);
    const [, key, inlineVal] = m;
    if (inlineVal === '' || inlineVal === undefined) {
      // Block or list follows.
      const child = [];
      i++;
      while (i < lines.length && /^\s+/.test(lines[i])) {
        const childLine = lines[i].trim();
        if (childLine.startsWith('- ')) {
          const item = {};
          // Allow `- key: value` form (multi-key per item)
          const itemBody = childLine.slice(2);
          if (itemBody.includes(':')) {
            const km = itemBody.match(/^([a-zA-Z_][a-zA-Z0-9_-]*):\s*(.*)$/);
            if (km) item[km[1]] = km[2];
            else item['_'] = itemBody;
          } else {
            item['_'] = itemBody;
          }
          child.push(item);
        }
        i++;
      }
      result[key] = child;
    } else {
      result[key] = inlineVal.replace(/^["']|["']$/g, '');
      i++;
    }
  }
  return result;
}

/**
 * Extract markdown links [text](target) from body. Skips images (prefixed with !).
 */
export function extractLinks(body) {
  const re = /(?<!\!)\[([^\]]*)\]\(([^)]+)\)/g;
  const links = [];
  let m;
  while ((m = re.exec(body)) !== null) {
    links.push({ text: m[1], target: m[2] });
  }
  return links;
}

/**
 * C5 — schema conformance. Frontmatter must exist and have required fields.
 */
function checkC5(pageRelPath, fm) {
  const issues = [];
  if (!fm.ok) {
    issues.push({
      check: 'C5',
      page: pageRelPath,
      severity: 'error',
      message: `missing or invalid frontmatter: ${fm.error}`,
    });
    return issues;
  }
  for (const field of REQUIRED_FRONTMATTER_FIELDS) {
    if (!(field in fm.data)) {
      issues.push({
        check: 'C5',
        page: pageRelPath,
        severity: 'error',
        message: `frontmatter missing required field: ${field}`,
      });
    }
  }
  if (fm.data.last_verified && !/^\d{4}-\d{2}-\d{2}$/.test(fm.data.last_verified)) {
    issues.push({
      check: 'C5',
      page: pageRelPath,
      severity: 'error',
      message: `last_verified must be YYYY-MM-DD, got: ${fm.data.last_verified}`,
    });
  }
  return issues;
}

/**
 * C2 — broken internal links.
 *   - Links without a scheme and not starting with "/" are wiki-relative.
 *   - Absolute paths are repo-relative.
 *   - External links (http/https) are skipped.
 */
function checkC2(pageRelPath, body, pageAbsPath, wikiDir, repoRoot) {
  const issues = [];
  const links = extractLinks(body);
  for (const { target } of links) {
    if (/^[a-z]+:\/\//i.test(target)) continue; // external
    if (target.startsWith('#')) continue; // same-page anchor
    const [pathPart] = target.split('#');
    let resolved;
    if (pathPart.startsWith('/')) {
      resolved = resolve(repoRoot, pathPart.replace(/^\//, ''));
    } else {
      resolved = resolve(dirname(pageAbsPath), pathPart);
    }
    if (!existsSync(resolved)) {
      issues.push({
        check: 'C2',
        page: pageRelPath,
        severity: 'error',
        message: `broken link to ${target} (resolved to ${relative(repoRoot, resolved)})`,
      });
    }
  }
  return issues;
}

/**
 * C1 — staleness. For each `sources: [{path: ...}]`, if the source file's
 * mtime is newer than the page's last_verified date, the page is stale.
 *
 * last_verified is a date (YYYY-MM-DD); we compare against the start of the
 * following day so that "verified today" still covers files touched today.
 */
function checkC1(pageRelPath, fm, pageAbsPath, repoRoot) {
  if (!fm.ok) return [];
  const issues = [];
  const lastVerified = fm.data.last_verified;
  const sources = Array.isArray(fm.data.sources) ? fm.data.sources : [];
  for (const src of sources) {
    if (!src || typeof src !== 'object' || !src.path) {
      issues.push({
        check: 'C1',
        page: pageRelPath,
        severity: 'error',
        message: `sources entry missing "path" field: ${JSON.stringify(src)}`,
      });
      continue;
    }
    const srcAbs = isAbsolute(src.path) ? src.path : resolve(repoRoot, src.path);
    if (!existsSync(srcAbs)) {
      issues.push({
        check: 'C1',
        page: pageRelPath,
        severity: 'error',
        message: `source path does not exist: ${src.path}`,
      });
      continue;
    }
    const srcMtime = statSync(srcAbs).mtime;
    const cutoff = new Date(`${lastVerified}T23:59:59`);
    if (srcMtime > cutoff) {
      issues.push({
        check: 'C1',
        page: pageRelPath,
        severity: 'warn',
        message: `source ${src.path} modified ${srcMtime.toISOString().slice(0, 10)} after last_verified ${lastVerified}`,
      });
    }
  }
  return issues;
}

function walkPages(wikiDir) {
  const pagesDir = join(wikiDir, 'pages');
  if (!existsSync(pagesDir)) return [];
  const out = [];
  for (const name of readdirSync(pagesDir)) {
    if (name.endsWith('.md')) {
      out.push(join(pagesDir, name));
    }
  }
  return out;
}

export async function lintWiki({ wikiDir, repoRoot }) {
  const pagePaths = walkPages(wikiDir);
  const issues = [];
  for (const absPath of pagePaths) {
    const text = readFileSync(absPath, 'utf8');
    const fm = parseFrontmatter(text);
    const relPath = relative(repoRoot, absPath);
    issues.push(...checkC5(relPath, fm));
    if (fm.ok) {
      issues.push(...checkC1(relPath, fm, absPath, repoRoot));
      issues.push(...checkC2(relPath, fm.body, absPath, wikiDir, repoRoot));
    }
  }
  const errors = issues.filter((i) => i.severity === 'error').length;
  const warns = issues.filter((i) => i.severity === 'warn').length;
  return {
    issues,
    errors,
    warns,
    pagesScanned: pagePaths.length,
    exitCode: errors > 0 ? 1 : 0,
  };
}

// ---- CLI mode ----
if (import.meta.url === `file://${process.argv[1]}`) {
  const repoRoot = process.cwd();
  const wikiDir = join(repoRoot, 'wiki');
  const report = await lintWiki({ wikiDir, repoRoot });
  console.log(`Scanned ${report.pagesScanned} wiki page(s).`);
  if (report.issues.length === 0) {
    console.log('No issues. Wiki is clean.');
  } else {
    for (const issue of report.issues) {
      console.log(`  [${issue.severity.toUpperCase()}] ${issue.check} ${issue.page}: ${issue.message}`);
    }
    console.log(`\n${report.errors} error(s), ${report.warns} warning(s).`);
  }
  process.exit(report.exitCode);
}