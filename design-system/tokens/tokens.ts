// Single source of truth for SanBayGo design tokens — Editorial Paper direction.
// A warm-paper timetable aesthetic: one ink, one accent, one rule.
// CSS-vars (tokens.css) MUST mirror these values — see tokens-parity.test.ts.

export const tokens = {
  color: {
    // Surfaces — the back of a printed bus timetable.
    paper: '#F4F1EA',          // primary background
    paperDeep: '#EBE6DA',      // secondary grouped / inset surface
    paperEdge: '#E0DACE',      // ruled/edge tone

    // Ink — high-contrast text & primary strokes.
    ink: '#1A1A1A',            // primary text
    inkSoft: '#57534E',        // secondary text
    inkQuiet: '#9A958D',       // tertiary / muted (timed-out markers)

    // Rule — printed column hairlines.
    rule: '#D6D3CE',           // 1px hairline
    ruleStrong: '#BFB9AC',     // slightly heavier rule

    // Accent — the only saturated color. Signal red.
    accent: '#D4321C',         // "you can catch this one"
    accentSoft: '#FCE7E3',     // tint for selected fill
    accentInk: '#FFFFFF',      // text on accent

    // "Missed" state — softly desaturated red, not alarming.
    missed: '#A6635C',
    missedSoft: '#F1E6E2',

    // Peak-hour badge — a different saturated hue, used sparingly.
    peak: '#8B5A2B',           // earthy amber
    peakSoft: '#F2EAD9',

    // System
    warn: '#8B5A2B',
    warnTint: '#F2EAD9',
  },
  font: {
    // Three roles: a characterful display serif, a utility body, a real monospace for times.
    // We rely on system fallbacks for the body and mono; the display face is a self-hosted
    // Fraunces variant loaded in web/index.html so the page can render without a network.
    family:
      '"Fraunces", "Iowan Old Style", "Charter", Georgia, "Times New Roman", serif',
    bodyFamily:
      '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", "Segoe UI", system-ui, sans-serif',
    monoFamily:
      '"JetBrains Mono", "SF Mono", ui-monospace, "Menlo", "Consolas", monospace',
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
    // Most things are square — this is a printed timetable, not a card UI.
    // Radius is only used for the small form chips and the single CTA pill.
    sm: 4,
    md: 8,
    lg: 12,
    pill: 999,
  },
  shadow: {
    // A printed page has no shadow. Suppress everything.
    card: 'none',
    hero: 'none',
  },
  breakpoint: {
    tablet: 769,
    desktop: 1025,
  },
} as const;

export type Tokens = typeof tokens;
