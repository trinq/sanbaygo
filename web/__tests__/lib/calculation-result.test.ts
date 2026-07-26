import { calculateResult } from '../../src/lib/calculation-result';

describe('calculateResult', () => {
  it('returns Bus 86 for HAN', () => {
    const result = calculateResult({
      arrivalTime: '08:00',
      airportId: 'noi-bai',
      terminal: 'HAN-T1',
      baggage: 'carry_on',
      destination: 'old-quarter',
      flightType: 'international',
    });
    expect(result).not.toBeNull();
    if (result && result.bus.available) {
      expect(result.bus.trip?.ticketPrice).toBe(50000);
    }
  });

  it('returns Bus 152 for SGN-T1', () => {
    const result = calculateResult({
      arrivalTime: '10:00',
      airportId: 'tan-son-nhat',
      terminal: 'SGN-T1',
      baggage: 'carry_on',
      destination: 'q1',
      flightType: 'domestic',
    });
    expect(result).not.toBeNull();
    if (result && result.bus.available) {
      expect(result.bus.trip?.ticketPrice).toBe(6000);
    }
  });

  it('returns Bus 109 for SGN-T3', () => {
    const result = calculateResult({
      arrivalTime: '10:00',
      airportId: 'tan-son-nhat',
      terminal: 'SGN-T3',
      baggage: 'carry_on',
      destination: 'q1',
      flightType: 'domestic',
    });
    expect(result).not.toBeNull();
    if (result && result.bus.available) {
      expect(result.bus.trip?.ticketPrice).toBe(15000);
    }
  });

  it('returns null when formData is incomplete', () => {
    const result = calculateResult({
      arrivalTime: '08:00',
      airportId: 'noi-bai',
      terminal: null,
      baggage: null,
      destination: null,
      flightType: 'international',
    });
    expect(result).toBeNull();
  });
});
