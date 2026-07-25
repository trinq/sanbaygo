import { tokens } from '@design-system';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('design-system token parity', () => {
  const cssPath = resolve(__dirname, '../../../design-system/tokens/tokens.css');
  const css = readFileSync(cssPath, 'utf8');

  const expected: Array<[string, string]> = [
    ['color.bgPage', '--color-bg-page'],
    ['color.bgCard', '--color-bg-card'],
    ['color.bgGrouped', '--color-bg-grouped'],
    ['color.bgSidebar', '--color-bg-sidebar'],
    ['color.textPrimary', '--color-text-primary'],
    ['color.textSecondary', '--color-text-secondary'],
    ['color.textTertiary', '--color-text-tertiary'],
    ['color.separator', '--color-separator'],
    ['color.separatorStrong', '--color-separator-strong'],
    ['color.accent', '--color-accent'],
    ['color.accentPressed', '--color-accent-pressed'],
    ['color.accentTint', '--color-accent-tint'],
    ['color.accentTintStrong', '--color-accent-tint-strong'],
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

  it('accent is #007AFF', () => {
    expect(tokens.color.accent).toBe('#007AFF');
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
});
