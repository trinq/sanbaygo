import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lintWiki } from '../lint.mjs';

// Helper: create a temp directory tree with wiki pages, run lint, return report.
// Uses process.cwd() to point at a tmp dir, then runs lintWiki({ wikiDir, repoRoot }).
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function makeTmpFixture(files) {
  const dir = mkdtempSync(join(tmpdir(), 'wiki-lint-'));
  for (const [relPath, contents] of Object.entries(files)) {
    const full = join(dir, relPath);
    mkdirSync(join(full, '..'), { recursive: true });
    writeFileSync(full, contents);
  }
  return dir;
}

const VALID_FRONTMATTER = `---
last_verified: 2026-07-29
sources:
  - path: AGENTS.md
sources_note: test fixture
summary: Test fixture page.
---

# Body
Body content here.
`;

test('C5: flags pages missing frontmatter', async () => {
  const tmp = makeTmpFixture({
    'wiki/pages/bad.md': '# No frontmatter here\n',
  });
  try {
    const report = await lintWiki({ wikiDir: join(tmp, 'wiki'), repoRoot: tmp });
    const schemaIssues = report.issues.filter((i) => i.check === 'C5');
    assert.equal(schemaIssues.length, 1);
    assert.match(schemaIssues[0].message, /missing or invalid frontmatter/);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('C5: flags pages missing required frontmatter fields', async () => {
  const tmp = makeTmpFixture({
    'wiki/pages/bad.md': `---\nsummary: only summary\n---\n`,
  });
  try {
    const report = await lintWiki({ wikiDir: join(tmp, 'wiki'), repoRoot: tmp });
    const schemaIssues = report.issues.filter((i) => i.check === 'C5');
    assert.ok(schemaIssues.length >= 1, 'should report missing fields');
    assert.match(schemaIssues[0].message, /last_verified|sources/);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('C2: flags broken internal links', async () => {
  const tmp = makeTmpFixture({
    'wiki/pages/good.md': VALID_FRONTMATTER,
    'wiki/pages/has-broken-link.md': `---
last_verified: 2026-07-29
sources:
  - path: AGENTS.md
summary: Has broken link.
---

See [other](missing.md).
`,
  });
  try {
    const report = await lintWiki({ wikiDir: join(tmp, 'wiki'), repoRoot: tmp });
    const linkIssues = report.issues.filter((i) => i.check === 'C2');
    assert.equal(linkIssues.length, 1);
    assert.match(linkIssues[0].message, /missing\.md/);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('C2: passes when internal links resolve', async () => {
  const tmp = makeTmpFixture({
    'wiki/pages/good.md': VALID_FRONTMATTER,
    'wiki/pages/other.md': VALID_FRONTMATTER,
    'wiki/pages/links-to-other.md': `---
last_verified: 2026-07-29
sources:
  - path: AGENTS.md
summary: Links OK.
---

See [other](other.md).
`,
  });
  try {
    const report = await lintWiki({ wikiDir: join(tmp, 'wiki'), repoRoot: tmp });
    const linkIssues = report.issues.filter((i) => i.check === 'C2');
    assert.equal(linkIssues.length, 0);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('C1: flags pages whose source file changed after last_verified', async () => {
  // Source file mtime is "now"; last_verified is "yesterday".
  const tmp = makeTmpFixture({
    'AGENTS.md': 'old contents',
    'wiki/pages/stale.md': `---
last_verified: 2020-01-01
sources:
  - path: AGENTS.md
summary: Stale page.
---

Body.
`,
  });
  try {
    const report = await lintWiki({ wikiDir: join(tmp, 'wiki'), repoRoot: tmp });
    const stalenessIssues = report.issues.filter((i) => i.check === 'C1');
    assert.equal(stalenessIssues.length, 1);
    assert.match(stalenessIssues[0].message, /AGENTS\.md/);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('C1: passes when source is older than last_verified', async () => {
  const tmp = makeTmpFixture({
    'AGENTS.md': 'old contents',
    'wiki/pages/fresh.md': `---
last_verified: 2099-12-31
sources:
  - path: AGENTS.md
summary: Fresh page.
---

Body.
`,
  });
  try {
    const report = await lintWiki({ wikiDir: join(tmp, 'wiki'), repoRoot: tmp });
    const stalenessIssues = report.issues.filter((i) => i.check === 'C1');
    assert.equal(stalenessIssues.length, 0);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('clean baseline: valid page produces zero issues', async () => {
  const tmp = makeTmpFixture({
    'AGENTS.md': 'old contents',
    'wiki/pages/clean.md': `---
last_verified: 2099-12-31
sources:
  - path: AGENTS.md
summary: Clean page.
---

Body.
`,
  });
  try {
    const report = await lintWiki({ wikiDir: join(tmp, 'wiki'), repoRoot: tmp });
    assert.equal(report.issues.length, 0, `expected zero issues, got ${JSON.stringify(report.issues, null, 2)}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('exit code: clean returns 0, dirty returns 1', async () => {
  // Clean fixture: page exists, source exists, source mtime is "old", last_verified far future.
  const clean = makeTmpFixture({
    'AGENTS.md': 'old contents',
    'wiki/pages/clean.md': `---
last_verified: 2099-12-31
sources:
  - path: AGENTS.md
summary: Clean page.
---

Body.
`,
  });
  // Dirty fixture: page exists but no frontmatter → C5 fires → exit 1.
  const dirty = makeTmpFixture({
    'wiki/pages/dirty.md': '# no frontmatter\n',
  });
  try {
    const cleanReport = await lintWiki({ wikiDir: join(clean, 'wiki'), repoRoot: clean });
    const dirtyReport = await lintWiki({ wikiDir: join(dirty, 'wiki'), repoRoot: dirty });
    assert.equal(cleanReport.exitCode, 0, `clean: ${JSON.stringify(cleanReport.issues, null, 2)}`);
    assert.equal(dirtyReport.exitCode, 1);
  } finally {
    rmSync(clean, { recursive: true, force: true });
    rmSync(dirty, { recursive: true, force: true });
  }
});