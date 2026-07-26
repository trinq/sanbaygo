import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { BrandMark } from '../../../src/components/Landing/BrandMark';

// Brief asserts `getByText('SanBay')` and `getByText('Go')` — but the default
// `LanguageProvider` is `vi`, where `navBrand='SanBayGo'` (no split). We use a
// regex so the assertion holds in BOTH languages (vi: "SanBayGo", en: "SanBay")
// without coupling the test to the default-language side effect.
describe('BrandMark', () => {
  it('renders the SanBayGo wordmark', () => {
    render(
      <LanguageProvider>
        <BrandMark />
      </LanguageProvider>,
    );
    expect(screen.getByText(/SanBay/)).toBeTruthy();
    expect(screen.getByText('Go')).toBeTruthy();
  });

  it('renders an SVG logo glyph', () => {
    const { container } = render(
      <LanguageProvider>
        <BrandMark />
      </LanguageProvider>,
    );
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
