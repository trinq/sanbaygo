import { tokens } from '../tokens/tokens';

describe('design tokens — Figma Make direction', () => {
  it('uses sky-blue primary, not neon cyan', () => {
    // Reject neon cyan (#00FFFF area); sky-600 is allowed
    expect(tokens.color.primary).not.toMatch(/^#00[A-F0-9]/i);
    expect(tokens.color.primary).toBe('#0284C7');
  });

  it('avoid AI-cliché purple/pink', () => {
    const hex = (s: string) => s.toLowerCase();
    expect(hex(tokens.color.primary)).not.toMatch(/^#[89a-f][0-9a-f]?[0-9a-f]?$/i);
    expect(hex(tokens.color.accent)).not.toMatch(/^(#a855f7|#ec4899)/i);
  });

  it('body font size is ≥ 16px', () => {
    expect(tokens.font.size.body).toBeGreaterThanOrEqual(16);
  });

  it('all numeric sizes are positive', () => {
    Object.values(tokens.font.size).forEach((s) => expect(s).toBeGreaterThan(0));
    Object.values(tokens.space).forEach((s) => expect(s).toBeGreaterThan(0));
  });
});
