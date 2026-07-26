import { fireEvent, render, screen } from '@testing-library/react';
import { ResultDisplay } from '../../../src/components/ResultDisplay';
import { LanguageProvider, useLanguage } from '../../../src/contexts/LanguageContext';
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
  destination: 'OLD_QUARTER',
  flightType: 'international',
};

function renderWithLang(ui: React.ReactNode) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

function EnglishResultDisplay({ resultData = result }: { resultData?: ArrivalResult }) {
  const { setLanguage } = useLanguage();

  return (
    <>
      <button type="button" onClick={() => setLanguage('en')}>Switch to English</button>
      <ResultDisplay result={resultData} formData={formData} onRecalculate={jest.fn()} />
    </>
  );
}

describe('ResultDisplay', () => {
  it('renders the catchable departure time as the headline', () => {
    renderWithLang(<ResultDisplay result={result} formData={formData} onRecalculate={jest.fn()} />);
    expect(screen.getAllByText('10:30').length).toBeGreaterThan(0);
  });

  it('shows the ride-hail footnote', () => {
    renderWithLang(<ResultDisplay result={result} formData={formData} onRecalculate={jest.fn()} />);
    expect(screen.getByText(/Grab/i)).toBeTruthy();
  });

  it('renders a missed-bus headline when no bus is available', () => {
    const missed: ArrivalResult = { bus: { available: false, reason: 'too_late' }, grab: result.grab };
    renderWithLang(<ResultDisplay result={missed} formData={formData} onRecalculate={jest.fn()} />);
    expect(screen.getByText(/Đã lỡ chuyến cuối|Last bus/i)).toBeTruthy();
  });

  it('localizes the reviewed trip and ride-hail copy in English', () => {
    renderWithLang(<EnglishResultDisplay />);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to English' }));

    expect(screen.getByText('Issue 02 — Trip')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1, name: /Next bus: 10:30/ })).toBeTruthy();
    expect(screen.getByText('Grab · Taxi')).toBeTruthy();
    expect(screen.getByText('~VND 250–350k')).toBeTruthy();
    expect(screen.getByText('Pillar 4 · Arrivals level 1')).toBeTruthy();
  });

  it('localizes the missed-last-bus headline in English', () => {
    const missed: ArrivalResult = { bus: { available: false, reason: 'too_late' }, grab: result.grab };
    renderWithLang(<EnglishResultDisplay resultData={missed} />);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to English' }));

    expect(screen.getByRole('heading', { level: 1, name: 'You missed the last bus. Call a ride.' })).toBeTruthy();
  });
});
