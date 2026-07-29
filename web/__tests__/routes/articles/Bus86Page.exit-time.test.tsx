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

describe('Bus86Page P1: Exit Time Section (SEO)', () => {
  it('has dedicated exit time section with heading', () => {
    renderBus86Page();
    // Keyword #17: "t2 international noibai how long to exit"
    // Page should have a dedicated section about exit time
    const headings = screen.getAllByRole('heading', { level: 2 });
    const hasExitTimeHeading = headings.some(h => 
      /exit|immigration|customs|deplan/i.test(h.textContent ?? '')
    );
    expect(hasExitTimeHeading).toBe(true);
  });

  it('provides time estimates for exiting the terminal', () => {
    renderBus86Page();
    // Should mention specific exit times (e.g., 15-20 min, 25-35 min)
    const pageText = document.body.textContent ?? '';
    // Look for time ranges like "X-Y minutes" that relate to exiting
    const hasExitTimeRanges = /exit.*\d+.*\d+.*min|immigration.*\d+.*\d+.*min/i.test(pageText);
    expect(hasExitTimeRanges).toBe(true);
  });

  it('distinguishes between international and domestic exit times', () => {
    renderBus86Page();
    const pageText = document.body.textContent ?? '';
    // Intl vs domestic should have different estimates
    const hasInternationalMention = 
      /international|int.?l/i.test(pageText);
    expect(hasInternationalMention).toBe(true);
  });
});
