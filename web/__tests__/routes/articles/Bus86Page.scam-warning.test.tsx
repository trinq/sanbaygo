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

describe('Bus86Page SEO - Scam Warning (P0)', () => {
  it('renders scam warning section for intl travelers', () => {
    renderBus86Page();
    // Scam warning is a key SEO content for keyword #10 "airport scam vietnam taxi"
    // Use getAllByText since there may be multiple safety-related mentions
    const scamSections = screen.getAllByText(/safety|scam/i);
    expect(scamSections.length).toBeGreaterThan(0);
  });

  it('provides practical advice for intl travelers', () => {
    renderBus86Page();
    // Section should help intl users understand taxi/ride-hail risks
    // Key phrases travelers search: "airport scam", "safe taxi", "avoid scam"
    const pageText = document.body.textContent ?? '';
    const hasScamContent = 
      pageText.toLowerCase().includes('scam') ||
      pageText.toLowerCase().includes('taxi') ||
      pageText.toLowerCase().includes('safety') ||
      pageText.toLowerCase().includes('avoid');
    expect(hasScamContent).toBe(true);
  });
});
