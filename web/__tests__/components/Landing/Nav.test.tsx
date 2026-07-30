import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { Nav } from '../../../src/components/Landing/Nav';

describe('Nav (subpage home link)', () => {
  it('exposes a link to the homepage from subpages where the language toggle is replaced by a language-switch link', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Nav languageSwitchPath="/vi/tuyen-86-noi-bai" />
        </LanguageProvider>
      </MemoryRouter>,
    );
    const home = screen.getByRole('link', { name: /Frylane/ });
    expect(home.getAttribute('href')).toBe('/');
  });

  it('keeps the language-switch link alongside the home link on subpages', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Nav languageSwitchPath="/vi/tuyen-86-noi-bai" />
        </LanguageProvider>
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: /Frylane/ })).toBeTruthy();
    expect(screen.getByRole('link', { name: /English|Tiếng Việt/ })).toBeTruthy();
  });
});