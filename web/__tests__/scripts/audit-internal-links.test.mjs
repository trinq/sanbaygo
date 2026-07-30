import { describe, it, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPT_PATH = resolve(__dirname, '../../scripts/audit-internal-links.mjs');

describe('audit-internal-links.mjs', () => {
  it('is a parseable ESM module that exports a function', async () => {
    const source = readFileSync(SCRIPT_PATH, 'utf8');
    expect(source).toMatch(/export\s+(function|const)\s+(countLinks|audit)/);
  });

  it('detects a <Link to="/foo"> as 1 internal link', async () => {
    const { countLinks } = await import(SCRIPT_PATH);
    const sample = `
      import { Link } from 'react-router-dom';
      export const X = () => (
        <article>
          <Link to="/bus-86-hanoi-airport">Bus 86</Link>
          <Link to="/grab-vs-bus-hanoi-airport">Grab vs Bus</Link>
        </article>
      );
    `;
    expect(countLinks(sample, ['/bus-86-hanoi-airport', '/grab-vs-bus-hanoi-airport'])).toBe(2);
  });

  it('detects raw <a href="/foo"> as 1 internal link when path is in registry', async () => {
    const { countLinks } = await import(SCRIPT_PATH);
    const sample = `
      <a href="/bus-86-hanoi-airport">Bus 86</a>
      <a href="/airport-scam-vietnam-taxi">Scam</a>
    `;
    expect(countLinks(sample, ['/bus-86-hanoi-airport', '/airport-scam-vietnam-taxi'])).toBe(2);
  });

  it('ignores external links, anchors, and paths not in registry', async () => {
    const { countLinks } = await import(SCRIPT_PATH);
    const sample = `
      <a href="https://grab.com">Grab</a>
      <a href="#section">Jump</a>
      <a href="/images/foo.png">Image</a>
      <Link to="/unknown-path">Unknown</Link>
    `;
    expect(countLinks(sample, ['/bus-86-hanoi-airport'])).toBe(0);
  });
});
