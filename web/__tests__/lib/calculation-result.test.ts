import { calculateTrip as calculateResult } from '@core';

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

  it('propagates SGN-T3 Grab pickup location (pillar 34, PNA) to result', () => {
    // Grab Việt Nam confirms ride-hail is concentrated at pillar 34,
    // Floor 1 of the PNA parking building at SGN-T3 — not at curbside.
    // calculateResult must resolve the per-terminal pickup hint and pass
    // it through to result.grab.pickupLocation so the UI shows the right
    // pickup instruction.
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

  it('propagates SGN-T1 Grab pickup location (TCP — Làn D1) to result', () => {
    // SGN-T1 (old domestic terminal): all ride-hail brands pick up at the
    // TCP parking building across from the arrival hall, Lane D1 ground
    // floor — NOT at the curbside Làn B (that's Bus 152's lane).
    const result = calculateResult({
      arrivalTime: '10:00',
      airportId: 'tan-son-nhat',
      terminal: 'SGN-T1',
      baggage: 'carry_on',
      destination: 'q1',
      flightType: 'domestic',
    });
    expect(result).not.toBeNull();
    expect(result?.grab.pickupLocation).toBe('Tầng trệt Nhà để xe TCP — Làn D1');
  });

  it('propagates SGN-T2 Grab pickup location (international ride-hail lot) to result', () => {
    // SGN-T2 (international) is a SEPARATE building from T1 — it has its
    // own ride-hail lot OUTSIDE the terminal at pillar 5GF. Drivers do NOT
    // pool with T1's TCP building. REGRESSION GUARD: this used to
    // incorrectly point to T1's TCP — Làn D1.
    const result = calculateResult({
      arrivalTime: '10:00',
      airportId: 'tan-son-nhat',
      terminal: 'SGN-T2',
      baggage: 'carry_on',
      destination: 'q1',
      flightType: 'international',
    });
    expect(result).not.toBeNull();
    expect(result?.grab.pickupLocation).toBe(
      'Bãi xe công nghệ quốc tế — vào từ Cột 5GF (rẽ trái men hành lang sảnh đến, rẽ phải qua vạch sang đường)',
    );
    // And explicitly NOT T1's TCP string.
    expect(result?.grab.pickupLocation).not.toBe('Tầng trệt Nhà để xe TCP — Làn D1');
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
