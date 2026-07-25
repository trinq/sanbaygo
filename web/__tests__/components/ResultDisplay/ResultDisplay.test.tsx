import { render, screen } from '@testing-library/react';
import { ResultDisplay } from '../../../src/components/ResultDisplay';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import type { ArrivalResult, ArrivalFormData } from '@core';

const result: ArrivalResult = {
  bus: {
    available: true,
    trip: {
      departureTime: '10:30',
      waitMinutes: 5,
      ticketPrice: 50000,
      arrivalEstimate: { early: '11:30', late: '11:40', minutesRange: { min: 60, max: 70 } },
    },
  },
  grab: {
    available: true,
    priceEstimate: '250 – 350.000 ₫',
    travelTime: { early: '11:00', late: '11:10', minutesRange: { min: 50, max: 60 } },
  },
};

const formData: ArrivalFormData = {
  arrivalTime: '10:00',
  terminal: 'T1',
  baggage: 'carry_on',
  destination: 'old-quarter',
  flightType: 'international',
};

function renderWithLang(ui: React.ReactNode) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe('ResultDisplay — editorial paper', () => {
  it('renders the catchable departure time as the headline', () => {
    renderWithLang(
      <ResultDisplay result={result} formData={formData} onRecalculate={jest.fn()} />,
    );
    // Headline contains the recommended departure
    expect(screen.getAllByText('10:30').length).toBeGreaterThan(0);
  });

  it('renders the 26-departure spine', () => {
    const { container } = renderWithLang(
      <ResultDisplay result={result} formData={formData} onRecalculate={jest.fn()} />,
    );
    const list = container.querySelector('ol');
    expect(list).not.toBeNull();
    expect(list?.querySelectorAll('li').length).toBe(26);
  });

  it('marks departed buses as missed (struck through)', () => {
    const { container } = renderWithLang(
      <ResultDisplay result={result} formData={formData} onRecalculate={jest.fn()} />,
    );
    // 06:40 is the first departure; user arrived at 10:00 => it should be missed
    const items = container.querySelectorAll('li');
    const first = items[0];
    expect(first.className).toMatch(/status_missed/);
    expect(first.querySelector('time, .time, span:nth-child(2)')?.textContent).toBe('06:40');
  });

  it('shows the ride-hail footnote', () => {
    renderWithLang(
      <ResultDisplay result={result} formData={formData} onRecalculate={jest.fn()} />,
    );
    expect(screen.getByText(/Grab/i)).toBeTruthy();
  });

  it('renders a missed-bus headline when no bus is available', () => {
    const missed: ArrivalResult = {
      bus: { available: false, reason: 'too_late' },
      grab: result.grab,
    };
    renderWithLang(
      <ResultDisplay result={missed} formData={formData} onRecalculate={jest.fn()} />,
    );
    expect(screen.getByText(/Đã lỡ chuyến cuối|Last bus/i)).toBeTruthy();
  });
});
