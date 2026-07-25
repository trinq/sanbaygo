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
  destination: 'OLD_QUARTER',
  flightType: 'international',
};

function renderWithLang(ui: React.ReactNode) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
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
});
