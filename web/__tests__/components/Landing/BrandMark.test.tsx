import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { BrandMark } from '../../../src/components/Landing/BrandMark';

// Brief asserts `getByText('Frylane')` — the brand is no longer split into
// so future visual variations don't need a component rewrite.
describe('BrandMark', () => {
  it('renders the Frylane wordmark', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <BrandMark />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText(/^Frylane/)).toBeTruthy();
  });

  it('renders an SVG logo glyph', () => {
    const { container } = render(
      <MemoryRouter>
        <LanguageProvider>
          <BrandMark />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('is a link to the homepage so subpages can navigate back home from the nav', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <BrandMark />
        </LanguageProvider>
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: /Frylane/ });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/');
  });
});