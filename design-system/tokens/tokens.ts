// Single source of truth for SanBayGo design tokens — Figma Make landing direction.
// Sky-blue primary with glass surfaces, Plus Jakarta Sans typography, amber accent.
// CSS-vars (tokens.css) MUST mirror these values — see tokens-parity.test.ts.

export const tokens = {
  color: {
    // Primary — sky-blue scale (Figma's bg-primary)
    primary: '#0284C7',         // sky-600
    primaryHover: '#0369A1',    // sky-700
    primarySoft: '#E0F2FE',     // sky-100
    primary50: '#F0F9FF',       // sky-50, badge bg tint
    primary100: '#E0F2FE',      // sky-100, stronger tint

    // Accent — amber underline highlight ("nhanh nhất")
    accent: '#FCD34D',          // amber-300
    accentInk: '#92400E',       // amber-800 text on accent

    // Benefit chip icon — emerald + ride-hail accent
    benefit: '#059669',         // emerald-600
    benefitSoft: '#D1FAE5',     // emerald-100
    benefit50: '#ECFDF5',       // emerald-50, hover tint
    benefit100: '#D1FAE5',      // emerald-100, icon bg

    // Neutrals — slate
    ink: '#0F172A',             // slate-900 primary text
    inkSoft: '#475569',         // slate-600 secondary
    inkQuiet: '#94A3B8',        // slate-400 muted
    surface: '#FFFFFF',         // white
    surfaceMuted: '#F8FAFC',    // slate-50
    surfaceBorder: '#E2E8F0',   // slate-200
    background: '#F1F5F9',      // slate-100 page background

    // Editorial rules — hairlines used in ResultDisplay
    rule: '#E2E8F0',            // slate-200, hairline between rows
    ruleStrong: '#94A3B8',      // slate-400, byline/button underline
    missed: '#D97706',          // amber-600, "missed bus" title

    // Glass — translucent white overlays
    glass: 'rgba(255, 255, 255, 0.30)',
    glassStrong: 'rgba(255, 255, 255, 0.80)',

    // System
    warn: '#D97706',            // amber-600
    warnTint: '#FEF3C7',
    warn50: '#FFFBEB',          // amber-50, callout bg
    warn100: '#FEF3C7',         // amber-100, callout border
    warn500: '#F59E0B',         // amber-500, icon stroke
    warn900: '#78350F',         // amber-900, callout heading
  },
  font: {
    family: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    bodyFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    monoFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
    size: {
      caption: 12,
      secondary: 14,
      body: 16,
      section: 22,
      display: 28,
      hero: 36,
      page: 44,
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    letterSpacing: {
      tight: -0.5,
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
    xl: 24,                     // Figma 'rounded-xl'
    pill: 999,
  },
  shadow: {
    card: '0 8px 24px rgba(2, 132, 199, 0.12)',
    hero: '0 20px 60px rgba(2, 132, 199, 0.18)',
  },
  breakpoint: {
    tablet: 769,
    desktop: 1025,
  },
} as const;

export type Tokens = typeof tokens;
