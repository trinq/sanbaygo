// Single source of truth for SanBayGo design tokens.
// CSS-vars (tokens.css) MUST mirror these values — see tokens-parity.test.ts.

export const tokens = {
  color: {
    bgPage: '#FAFAFA',
    bgCard: '#FFFFFF',
    bgGrouped: '#F2F2F7',
    bgSidebar: '#F5F5F7',
    textPrimary: '#1C1C1E',
    textSecondary: '#8E8E93',
    textTertiary: '#C7C7CC',
    separator: 'rgba(60, 60, 67, 0.12)',
    separatorStrong: 'rgba(60, 60, 67, 0.20)',
    accent: '#007AFF',
    accentPressed: '#0051D5',
    accentTint: 'rgba(0, 122, 255, 0.08)',
    accentTintStrong: 'rgba(0, 122, 255, 0.14)',
    warn: '#FF9500',
    warnTint: 'rgba(255, 149, 0, 0.12)',
  },
  font: {
    family:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
    size: {
      caption: 11,
      secondary: 13,
      body: 17,
      section: 22,
      display: 28,
      hero: 34,
      page: 40,
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: {
      tight: -0.6,
      tighter: -1,
      eyebrow: 0.5,
    },
  },
  space: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 24,
    6: 32,
    7: 48,
    8: 64,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
  shadow: {
    card: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 0.5px rgba(0,0,0,0.06)',
    hero: '0 2px 12px rgba(0,0,0,0.04), 0 0 0 0.5px rgba(0,0,0,0.04)',
  },
  breakpoint: {
    tablet: 769,
    desktop: 1025,
  },
} as const;

export type Tokens = typeof tokens;
