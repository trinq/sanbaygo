import { tokens } from '@design-system';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

describe('design-system token parity', () => {
  const cssPath = resolve(dirname(fileURLToPath(import.meta.url)), '../../../design-system/tokens/tokens.css');
  const css = readFileSync(cssPath, 'utf8');

  const expected: Array<[string, string]> = [
    ['color.paper', '--color-paper'],
    ['color.paperDeep', '--color-paper-deep'],
    ['color.paperEdge', '--color-paper-edge'],
    ['color.ink', '--color-ink'],
    ['color.inkSoft', '--color-ink-soft'],
    ['color.inkQuiet', '--color-ink-quiet'],
    ['color.rule', '--color-rule'],
    ['color.ruleStrong', '--color-rule-strong'],
    ['color.accent', '--color-accent'],
    ['color.accentSoft', '--color-accent-soft'],
    ['color.accentInk', '--color-accent-ink'],
    ['color.missed', '--color-missed'],
    ['color.missedSoft', '--color-missed-soft'],
    ['color.peak', '--color-peak'],
    ['color.peakSoft', '--color-peak-soft'],
    ['color.warn', '--color-warn'],
    ['color.warnTint', '--color-warn-tint'],
  ];

  function normalize(cssValue: string, tsValue: unknown): string {
    const c = cssValue.trim();
    if (typeof tsValue === 'number') return c.replace(/(\d+)px$/, '$1');
    if (typeof tsValue === 'string' && tsValue.includes('rgba(')) return c.replace(/\s+/g, ' ');
    return c;
  }

  it.each(expected)('TS %s ↔ CSS %s', (tokenPath, cssVar) => {
    const path = tokenPath.split('.');
    let value: any = tokens;
    for (const seg of path) value = value[seg];
    const cssMatch = css.match(new RegExp(`${cssVar.replace(/[-]/g, '\\-')}\\s*:\\s*([^;]+);`));
    expect(cssMatch).not.toBeNull();
    expect(normalize(cssMatch![1], value)).toBe(value);
  });

  it('accent is signal red', () => {
    expect(tokens.color.accent).toBe('#D4321C');
  });

  it('contains no banned hues', () => {
    const banned = ['magenta', 'cyan', 'neon', '#FF00FF', '#0FF', '#00FFFF', 'purple'];
    const serialized = JSON.stringify(tokens).toLowerCase() + css.toLowerCase();
    for (const hue of banned) {
      expect(serialized).not.toContain(hue.toLowerCase());
    }
  });

  it('body font size is at least 17', () => {
    expect(tokens.font.size.body).toBeGreaterThanOrEqual(17);
  });

  it('CSS contains no gradient keyword', () => {
    expect(css).not.toMatch(/gradient/i);
  });

  it('CSS contains no backdrop-filter / blur keyword', () => {
    expect(css).not.toMatch(/backdrop-filter|filter:\s*blur/i);
  });

  it('CSS contains no drop-shadow / box-shadow (printed page has no shadow)', () => {
    expect(css).not.toMatch(/drop-shadow|box-shadow/i);
  });

  it('tokens define both paper palette and legacy aliases', () => {
    expect(css).toMatch(/--color-bg-page:\s*var\(--color-paper\)/);
    expect(css).toMatch(/--color-text-primary:\s*var\(--color-ink\)/);
  });

  it('display font is a serif (Fraunces or system serif fallback)', () => {
    expect(tokens.font.family).toMatch(/Fraunces|serif/i);
  });

  it('mono font is defined for tabular times', () => {
    expect(css).toMatch(/--font-mono-family/);
    expect(tokens.font.monoFamily).toMatch(/mono/i);
  });
});
