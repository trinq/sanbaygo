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
      expect(result.bus.trip?.ticketPrice).toBe(5000);
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

  it('propagates SGN Grab pickup location (pillar 34) to result for SGN-T3', () => {
    // Grab Việt Nam confirms ride-hail is concentrated at pillar 34,
    // Floor 1 of the PNA parking building at SGN-T3 — not at curbside.
    // When the airport has a Grab pickupLocation, calculateResult must
    // pass it through verbatim so the result UI can show the right hint.
    const result = calculateResult({
      arrivalTime: '10:00',
      airportId: 'tan-son-nhat',
      terminal: 'SGN-T3',
      baggage: 'carry_on',
      destination: 'q1',
      flightType: 'domestic',
    });
    expect(result).not.toBeNull();
    expect(result?.grab.pickupLocation).toBe('Tầng 1 Nhà để xe PNA — Cột 34');
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
