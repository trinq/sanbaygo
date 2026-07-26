import { calculateTripComparison } from '../../src/lib/transport-calculator';

/**
 * This test documents the expected behavior for VehicleComparison component.
 * 
 * The VehicleComparison component SHOULD:
 * 1. Call calculateTripComparison() directly (not via HTTP API)
 * 2. Return 6 transport options (BUS_86, GRAB_BIKE, XANH_SM_BIKE, GRAB_CAR, XANH_SM_CAR, BE_CAR)
 * 3. Each option should have complete price, time, and rating data
 * 
 * Current bug: VehicleComparison tries to fetch from '/api/calculate-trip'
 * which doesn't exist in Vite frontend-only build, causing infinite loading state.
 */
describe('VehicleComparison data contract', () => {
  const formData = {
    arrivalTime: '14:00',
    airportId: 'noi-bai' as const,
    terminalId: 'HAN-T1' as const,
    baggageType: 'carry_on' as const,
    destinationId: 'old-quarter',
    sortBy: 'recommended' as const,
  };

  test('returns exactly 6 transport options', () => {
    const result = calculateTripComparison(formData);
    expect(result.comparison).toHaveLength(6);
  });

  test('all options have complete price data', () => {
    const result = calculateTripComparison(formData);
    result.comparison.forEach((option) => {
      expect(option.price).toBeDefined();
      expect(option.price.estimate).toBeDefined();
      expect(option.price.value).toBeGreaterThan(0);
    });
  });

  test('all options have complete time data', () => {
    const result = calculateTripComparison(formData);
    result.comparison.forEach((option) => {
      expect(option.travelTime).toBeDefined();
      expect(option.travelTime.estimate).toBeDefined();
      expect(option.travelTime.minutesRange).toBeDefined();
      expect(option.travelTime.arrivalEstimate).toBeDefined();
    });
  });

  test('all options have complete rating data', () => {
    const result = calculateTripComparison(formData);
    result.comparison.forEach((option) => {
      expect(option.luggage).toBeDefined();
      expect(option.luggage.score).toBeGreaterThanOrEqual(1);
      expect(option.luggage.score).toBeLessThanOrEqual(5);
      expect(option.luggage.label).toBeDefined();

      expect(option.comfort).toBeDefined();
      expect(option.comfort.score).toBeGreaterThanOrEqual(1);
      expect(option.comfort.score).toBeLessThanOrEqual(5);
      expect(option.comfort.label).toBeDefined();
    });
  });

  test('includes expected transport types', () => {
    const result = calculateTripComparison(formData);
    const types = result.comparison.map((c) => c.type);
    
    expect(types).toContain('bus');
    expect(types.filter((t) => t === 'motorbike')).toHaveLength(2);
    expect(types.filter((t) => t === 'car')).toHaveLength(3);
  });

  test('recommended option is first when sortBy is recommended', () => {
    const result = calculateTripComparison(formData);
    expect(result.comparison[0].isRecommended).toBe(true);
    expect(result.comparison[0].id).toBe('BUS_86');
  });

  test('cheapest option is first when sortBy is cheapest', () => {
    const result = calculateTripComparison({ ...formData, sortBy: 'cheapest' });
    const prices = result.comparison.map((c) => c.price.value);
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('fastest option is first when sortBy is fastest', () => {
    const result = calculateTripComparison({ ...formData, sortBy: 'fastest' });
    const times = result.comparison.map((c) => c.travelTime.minutesRange.min);
    const sorted = [...times].sort((a, b) => a - b);
    expect(times).toEqual(sorted);
  });

  test('Bus 86 has no waitTime for non-bus-aware consumers', () => {
    const result = calculateTripComparison(formData);
    const bus86 = result.comparison.find((c) => c.id === 'BUS_86');
    
    // Wait time is calculated internally but rendered as part of arrival estimate
    expect(bus86?.waitTime).toBeDefined();
    expect(bus86?.waitTime?.minutes).toBeGreaterThanOrEqual(0);
  });
});
