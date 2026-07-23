import tokens from '../tokens/tokens.json';
import { ds } from '../tokens';

describe('design-system tokens', () => {
  describe('warm palette constraints', () => {
    it('contains no neon cyan / electric blue (anti-pattern)', () => {
      const allHex = JSON.stringify(tokens.color).toLowerCase();
      expect(allHex).not.toMatch(/#0ff|#00ffff|#0af/);
    });

    it('contains no purple/pink AI-cliché gradient', () => {
      const allHex = JSON.stringify(tokens.color).toLowerCase();
      expect(allHex).not.toMatch(/#a020f0|#ff00ff|#d000ff|#7c3aed/i);
    });

    it('uses warm ivory/peach/amber as primary surface tones', () => {
      expect(tokens.color.peach['50']).toBe('#FFF6EE');
      expect(tokens.color.peach['100']).toBe('#FFE3CC');
      expect(tokens.color.amber['500']).toBe('#E08E45');
      expect(tokens.color.terracotta['500']).toBe('#C45A2C');
    });
  });

  describe('glass tiers', () => {
    it('defines exactly three tiers (1, 2, 3)', () => {
      expect(Object.keys(tokens.glass).sort()).toEqual(['1', '2', '3']);
    });

    it('tier 3 background is more opaque than tier 1', () => {
      const alpha1 = parseFloat(tokens.glass['1'].background.match(/[\d.]+\)$/)?.[0] ?? '0');
      const alpha3 = parseFloat(tokens.glass['3'].background.match(/[\d.]+\)$/)?.[0] ?? '0');
      expect(alpha3).toBeGreaterThan(alpha1);
    });

    it('tier 3 blur >= tier 1 blur', () => {
      const blur1 = parseInt(tokens.glass['1'].blur);
      const blur3 = parseInt(tokens.glass['3'].blur);
      expect(blur3).toBeGreaterThanOrEqual(blur1);
    });
  });

  describe('semantic roles', () => {
    it('accentRecommended is terracotta, not the AI cliché', () => {
      expect(tokens.semantic.accentRecommended).toBe('#C45A2C');
    });

    it('textPrimary has warm brown ink, not pure black', () => {
      expect(tokens.semantic.textPrimary).toBe('#3D2614');
    });

    it('surfaceBackground is in the warm gradient family', () => {
      expect(tokens.semantic.surfaceBackground).toBe('#FFF6EE');
    });
  });

  describe('typography constraints', () => {
    it('body font is a sans (Vietnamese-diacritic-friendly)', () => {
      expect(tokens.font.body).toBe('Inter');
    });

    it('font sizes follow the 16 px body minimum', () => {
      expect(tokens.fontSize.body).toBeGreaterThanOrEqual(16);
    });
  });

  describe('adapter parity (RN token adapter matches JSON)', () => {
    it('exposes the same color.amber.500 value', () => {
      expect(ds.color.amber['500']).toBe(tokens.color.amber['500']);
    });

    it('exposes the same accentRecommended', () => {
      expect(ds.semantic.accentRecommended).toBe(tokens.semantic.accentRecommended);
    });
  });

  describe('no motion encoded in tokens (motion lives in CSS modules)', () => {
    it('tokens.json does not encode animation durations', () => {
      const json = JSON.stringify(tokens).toLowerCase();
      expect(json).not.toMatch(/transition|animation|duration/);
    });
  });
});
