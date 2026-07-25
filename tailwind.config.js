/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0284C7', hover: '#0369A1', soft: '#E0F2FE' },
        accent: { DEFAULT: '#FCD34D', ink: '#92400E' },
        benefit: { DEFAULT: '#059669', soft: '#D1FAE5' },
        ink: { DEFAULT: '#0F172A', soft: '#475569', quiet: '#94A3B8' },
        surface: { DEFAULT: '#FFFFFF', muted: '#F8FAFC', border: '#E2E8F0' },
      },
    },
  },
  plugins: [],
};
