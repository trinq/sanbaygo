import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { Bus86Page } from '../../../src/routes/articles/Bus86Page';

function renderBus86Page() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/bus-86-hanoi-airport']}>
        <LanguageProvider>
          <Bus86Page />
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('Bus86Page SEO', () => {
  describe('P0: H1 should be in English', () => {
    it('renders H1 matching SEO title format (English)', () => {
      renderBus86Page();
      const h1 = screen.getByRole('heading', { level: 1 });
      // SEO title: "Bus 86 Hanoi Airport — Schedule, VND 50,000 Fare & How to Catch It (2026)"
      expect(h1.textContent).toMatch(/Bus 86/i);
      expect(h1.textContent).toMatch(/Hanoi Airport/i);
    });

    it('H1 does not contain Vietnamese characters as primary text', () => {
      renderBus86Page();
      const h1 = screen.getByRole('heading', { level: 1 });
      // H1 should start with English, not Vietnamese
      expect(h1.textContent).not.toMatch(/^Xe buýt/);
      expect(h1.textContent).not.toMatch(/^Sân bay/);
    });
  });

  describe('P0: Grab link opens real URL', () => {
    it('renders Grab alternative section with working link', () => {
      renderBus86Page();
      const grabLink = screen.getByRole('link', { name: /Grab/i });
      expect(grabLink).toBeTruthy();
    });

    it('Grab link does NOT point to hash (#)', () => {
      renderBus86Page();
      const grabLink = screen.getByRole('link', { name: /Grab/i });
      expect(grabLink).not.toHaveAttribute('href', '#');
      expect(grabLink).not.toHaveAttribute('href', '/');
    });

    it('Grab link points to grab.com', () => {
      renderBus86Page();
      const grabLink = screen.getByRole('link', { name: /Grab/i });
      const href = grabLink.getAttribute('href') ?? '';
      expect(href).toMatch(/grab\.com/);
    });
  });

});
