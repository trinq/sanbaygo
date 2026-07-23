import React from 'react';
import { render } from '@testing-library/react-native';
import { ArrivalResult, BusRecommendation, TimeRange } from '@core';
import { BusRecommendationCard } from '../../../components/ResultDisplay/BusRecommendation';
import { GrabFallbackCard } from '../../../components/ResultDisplay/GrabFallback';

const baseBus: BusRecommendation = {
  available: true,
  trip: {
    departureTime: '11:00',
    waitMinutes: 35,
    arrivalEstimate: { early: '12:00', late: '12:30', minutesRange: { min: 60, max: 90 } } as TimeRange,
    ticketPrice: 50000,
  },
};

const baseGrab: TimeRange = { early: '11:00', late: '11:30', minutesRange: { min: 40, max: 60 } };

describe('<BusRecommendationCard /> (RN, after redesign)', () => {
  it('renders ĐỀ XUẤT badge when bus is available', () => {
    const { getByText } = render(<BusRecommendationCard recommendation={baseBus} />);
    expect(getByText(/ĐỀ XUẤT/)).toBeTruthy();
  });

  it('renders ticket price as 50.000 VND', () => {
    const { getByText } = render(<BusRecommendationCard recommendation={baseBus} />);
    expect(getByText(/50\.000 VND/)).toBeTruthy();
  });

  it('renders the unavailable copy when reason is too_late', () => {
    const { getByText } = render(
      <BusRecommendationCard recommendation={{ available: false, reason: 'too_late' }} />
    );
    expect(getByText(/đã kết thúc chuyến cuối/)).toBeTruthy();
  });

  it('does NOT render badge when bus is unavailable', () => {
    const { queryByText } = render(
      <BusRecommendationCard recommendation={{ available: false, reason: 'too_late' }} />
    );
    expect(queryByText(/ĐỀ XUẤT/)).toBeNull();
  });
});

describe('<GrabFallbackCard /> (RN, after redesign)', () => {
  it('renders price estimate verbatim', () => {
    const { getByText } = render(
      <GrabFallbackCard priceEstimate="250.000 - 350.000 VND" travelTime={baseGrab} isPeak={false} />
    );
    expect(getByText(/250\.000 - 350\.000 VND/)).toBeTruthy();
  });

  it('renders peak warning when isPeak=true', () => {
    const { getAllByText } = render(
      <GrabFallbackCard priceEstimate="250.000 - 350.000 VND" travelTime={baseGrab} isPeak={true} />
    );
    expect(getAllByText(/giờ cao điểm/i).length).toBeGreaterThan(0);
  });

  it('does NOT render peak warning when isPeak=false', () => {
    const { queryByText } = render(
      <GrabFallbackCard priceEstimate="250.000 - 350.000 VND" travelTime={baseGrab} isPeak={false} />
    );
    expect(queryByText(/giờ cao điểm/i)).toBeNull();
  });
});
