import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { ResultDisplay } from '../../../src/components/ResultDisplay';
import { ArrivalResult, ArrivalFormData } from '@core';

const baseResult = {
  bus: {
    available: true,
    trip: {
      departureTime: '11:00',
      waitMinutes: 35,
      ticketPrice: 50000,
      arrivalEstimate: { early: '12:00', late: '12:30', minutesRange: { min: 60, max: 90 } },
    },
  },
  grab: { available: true, priceEstimate: '250.000 - 350.000 VND', travelTime: { early: '11:00', late: '11:30', minutesRange: { min: 40, max: 60 } } },
  direction: { description: 'Đi bộ 5 phút đến điểm đón xe buýt Nhà ga T1', estimatedMinutes: 5 },
} as unknown as ArrivalResult;

const baseForm: ArrivalFormData = {
  arrivalTime: '10:00',
  terminal: 'T1',
  baggage: 'carry_on',
  destination: 'old-quarter',
  flightType: 'domestic',
};

describe('<ResultDisplay /> (web)', () => {
  it('renders Vietnamese heading by default', () => {
    render(
      <LanguageProvider>
        <ResultDisplay result={baseResult} formData={baseForm} onRecalculate={() => {}} />
      </LanguageProvider>
    );
    expect(screen.getByRole('heading', { name: /kết quả/i })).toBeTruthy();
  });

  it('includes the comparison heading', () => {
    render(
      <LanguageProvider>
        <ResultDisplay result={baseResult} formData={baseForm} onRecalculate={() => {}} />
      </LanguageProvider>
    );
    expect(screen.getByRole('heading', { name: /so sánh phương tiện/i })).toBeTruthy();
  });
});
