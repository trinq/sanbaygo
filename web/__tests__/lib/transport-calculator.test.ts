import { sortComparisons, calculateTripComparison } from '../../src/lib/transport-calculator';
import { TransportComparison } from '@core';

describe('sortComparisons', () => {
  const mockComparisons: TransportComparison[] = [
    {
      id: 'BUS_86',
      name: 'Bus 86',
      nameVi: 'Xe buýt 86',
      type: 'bus',
      price: { estimate: '50,000 VND', value: 50000, isEstimate: false },
      travelTime: {
        estimate: '50-70 phút',
        minutesRange: { min: 50, max: 70 },
        arrivalEstimate: '14:50-15:10',
      },
      luggage: { score: 5, label: 'Tốt' },
      comfort: { score: 2, label: 'Trung bình' },
      ecoFriendly: false,
      notes: 'Bus notes',
      isRecommended: true,
    },
    {
      id: 'GRAB_BIKE',
      name: 'Grab Bike',
      nameVi: 'Grab Bike',
      type: 'motorbike',
      price: { estimate: '100,000 VND', value: 100000, isEstimate: true },
      travelTime: {
        estimate: '40-50 phút',
        minutesRange: { min: 40, max: 50 },
        arrivalEstimate: '14:40-14:50',
      },
      luggage: { score: 1, label: 'Kém' },
      comfort: { score: 2, label: 'Trung bình' },
      ecoFriendly: false,
      notes: 'Bike notes',
      isRecommended: false,
    },
  ];

  test('sorts by recommended first', () => {
    const sorted = sortComparisons(mockComparisons, 'recommended');
    expect(sorted[0].id).toBe('BUS_86');
  });

  test('sorts by cheapest first', () => {
    const sorted = sortComparisons(mockComparisons, 'cheapest');
    expect(sorted[0].id).toBe('BUS_86');
    expect(sorted[1].id).toBe('GRAB_BIKE');
  });

  test('sorts by fastest first', () => {
    const sorted = sortComparisons(mockComparisons, 'fastest');
    expect(sorted[0].id).toBe('GRAB_BIKE');
    expect(sorted[1].id).toBe('BUS_86');
  });

  test('does not mutate original array', () => {
    const original = [...mockComparisons];
    sortComparisons(mockComparisons, 'cheapest');
    expect(mockComparisons[0].id).toBe(original[0].id);
  });
});

describe('calculateTripComparison', () => {
  test('returns comparison for valid request', () => {
    const result = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    expect(result.comparison).toHaveLength(6);
    expect(result.metadata.arrivalTime).toBe('14:00');
    expect(result.comparison[0].isRecommended).toBe(true);
  });

  test('sets isPeakHour correctly for morning peak', () => {
    const result = calculateTripComparison({
      arrivalTime: '08:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    expect(result.metadata.isPeakHour).toBe(true);
  });

  test('sets isPeakHour correctly for evening peak', () => {
    const result = calculateTripComparison({
      arrivalTime: '18:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    expect(result.metadata.isPeakHour).toBe(true);
  });

  test('sets isPeakHour correctly for non-peak hours', () => {
    const result = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    expect(result.metadata.isPeakHour).toBe(false);
  });

  test('Bus 86 has fixed price of 50000', () => {
    const result = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    const bus86 = result.comparison.find((c) => c.id === 'BUS_86');
    expect(bus86?.price.value).toBe(50000);
    expect(bus86?.price.isEstimate).toBe(false);
  });

  test('Grab Car has estimate price with airport toll', () => {
    const result = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    const grabCar = result.comparison.find((c) => c.id === 'GRAB_CAR');
    expect(grabCar?.price.isEstimate).toBe(true);
    // Base 250000 + 15000 airport toll = 265000
    expect(grabCar?.price.value).toBe(265000);
  });

  test('Grab Car has peak surge during peak hours', () => {
    const normalResult = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    const peakResult = calculateTripComparison({
      arrivalTime: '08:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    const normalGrabCar = normalResult.comparison.find((c) => c.id === 'GRAB_CAR');
    const peakGrabCar = peakResult.comparison.find((c) => c.id === 'GRAB_CAR');

    // Peak surge is 1.25x
    expect(peakGrabCar?.price.value).toBe(Math.round(265000 * 1.25));
    expect(normalGrabCar?.price.value).toBe(265000);
  });

  test('Bus 86 includes wait time calculation', () => {
    const result = calculateTripComparison({
      arrivalTime: '08:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    const bus86 = result.comparison.find((c) => c.id === 'BUS_86');
    expect(bus86?.waitTime).toBeDefined();
    expect(bus86?.waitTime?.minutes).toBeGreaterThanOrEqual(0);
    expect(bus86?.waitTime?.nextDeparture).toMatch(/^\d{2}:\d{2}$/);
  });

  test('Non-bus options do not have wait time', () => {
    const result = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    const grabBike = result.comparison.find((c) => c.id === 'GRAB_BIKE');
    expect(grabBike?.waitTime).toBeUndefined();
  });

  test('readyAt is calculated correctly', () => {
    const result = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'recommended',
    });

    // T1 carry_on: 15-25 min exit + 5 min walking = 20-30 min
    // 14:00 + 25 + 5 = 14:30
    expect(result.metadata.readyAt).toBe('14:30');
  });

  test('sorts correctly with different sort options', () => {
    const cheapestResult = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'cheapest',
    });

    const fastestResult = calculateTripComparison({
      arrivalTime: '14:00',
      terminalId: 'T1',
      baggageType: 'carry_on',
      destinationId: 'old-quarter',
      sortBy: 'fastest',
    });

    // Cheapest should have Bus 86 first (50000)
    expect(cheapestResult.comparison[0].id).toBe('BUS_86');

    // Fastest should have motorbikes first (40-50 min vs 50-55 min for bus)
    expect(fastestResult.comparison[0].travelTime.minutesRange.min).toBeLessThanOrEqual(40);
  });
});
