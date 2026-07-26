import { tokens } from '@design-system/tokens/tokens';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

function findTokensCss(): string | null {
  // jest runs from web/ — walk up looking for the repo-root design-system.
  const candidates = [
    resolve(process.cwd(), '../design-system/tokens/tokens.css'),
    resolve(process.cwd(), 'design-system/tokens/tokens.css'),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return null;
}

function loadTokensCss(): string {
  const cssPath = findTokensCss();
  if (!cssPath) throw new Error('tokens.css not found');
  return readFileSync(cssPath, 'utf8');
}

beforeEach(() => {
  if (!document.head.querySelector('style[data-tokens]')) {
    const css = loadTokensCss();
    const style = document.createElement('style');
    style.setAttribute('data-tokens', 'true');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }
});

function readCssVar(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
  if (!value) throw new Error(`CSS var --${name} not found`);
  return value;
}

describe('tokens parity (TS ↔ CSS)', () => {
  it('primary matches CSS var --color-primary', () => {
    expect(tokens.color.primary).toBe(readCssVar('color-primary'));
  });
  it('accent matches CSS var --color-accent', () => {
    expect(tokens.color.accent).toBe(readCssVar('color-accent'));
  });
  it('benefit matches CSS var --color-benefit', () => {
    expect(tokens.color.benefit).toBe(readCssVar('color-benefit'));
  });
  it('body font size is ≥ 16px', () => {
    expect(tokens.font.size.body).toBeGreaterThanOrEqual(16);
  });
});
