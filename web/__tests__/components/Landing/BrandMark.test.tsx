import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { BrandMark } from '../../../src/components/Landing/BrandMark';

// Brief asserts `getByText('Frylane')` — the brand is no longer split into
// so future visual variations don't need a component rewrite.
describe('BrandMark', () => {
  it('renders the Frylane wordmark', () => {
    render(
      <LanguageProvider>
        <BrandMark />
      </LanguageProvider>,
    );
    expect(screen.getByText(/^Frylane/)).toBeTruthy();
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