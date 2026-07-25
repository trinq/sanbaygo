import { render, screen } from '@testing-library/react';
import { ResultDisplay } from '../../../src/components/ResultDisplay';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { useViewport } from '../../../src/hooks/useViewport';
import type { ArrivalResult, ArrivalFormData } from '@core';

jest.mock('../../../src/hooks/useViewport');

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

function setup(viewport: 'mobile' | 'tablet' | 'desktop') {
  (useViewport as jest.Mock).mockReturnValue(viewport);
  render(
    <LanguageProvider>
      <ResultDisplay result={result} formData={formData} onRecalculate={jest.fn()} />
    </LanguageProvider>,
  );
}

describe('ResultDisplay', () => {
  it('renders at desktop as a single-column table', () => {
    setup('desktop');
    expect(screen.getByText(/Xe buýt 86|Bus 86/i)).toBeTruthy();
    expect(screen.getByText(/Taxi/i)).toBeTruthy();
    expect(screen.getAllByText(/Grab/i).length).toBeGreaterThan(0);
  });

  it('renders at mobile as stacked cards', () => {
    setup('mobile');
    expect(screen.getByText(/Xe buýt 86|Bus 86/i)).toBeTruthy();
  });
});
