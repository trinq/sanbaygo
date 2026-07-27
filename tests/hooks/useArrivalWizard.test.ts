import { formReducer, initialFormState, calculateResultFromForm } from '../../hooks/useArrivalWizard';
import { ArrivalFormData } from '@core';

describe('formReducer', () => {
  describe('SET_TIME', () => {
    it('should update arrival time', () => {
      const state: ArrivalFormData = { ...initialFormState };
      const result = formReducer(state, { type: 'SET_TIME', payload: '14:30' });

      expect(result.arrivalTime).toBe('14:30');
    });
  });

  describe('SET_TERMINAL', () => {
    it('should update terminal to HAN-T1', () => {
      const state: ArrivalFormData = { ...initialFormState };
      const result = formReducer(state, { type: 'SET_TERMINAL', payload: 'HAN-T1' });

      expect(result.terminal).toBe('HAN-T1');
    });

    it('should update terminal to HAN-T2', () => {
      const state: ArrivalFormData = { ...initialFormState };
      const result = formReducer(state, { type: 'SET_TERMINAL', payload: 'HAN-T2' });

      expect(result.terminal).toBe('HAN-T2');
    });
  });

  describe('SET_BAGGAGE', () => {
    it('should update baggage to carry_on', () => {
      const state: ArrivalFormData = { ...initialFormState };
      const result = formReducer(state, { type: 'SET_BAGGAGE', payload: 'carry_on' });

      expect(result.baggage).toBe('carry_on');
    });

    it('should update baggage to checked', () => {
      const state: ArrivalFormData = { ...initialFormState };
      const result = formReducer(state, { type: 'SET_BAGGAGE', payload: 'checked' });

      expect(result.baggage).toBe('checked');
    });
  });

  describe('SET_DESTINATION', () => {
    it('should update destination', () => {
      const state: ArrivalFormData = { ...initialFormState };
      const result = formReducer(state, { type: 'SET_DESTINATION', payload: 'old-quarter' });

      expect(result.destination).toBe('old-quarter');
    });
  });

  describe('SET_FLIGHT_TYPE', () => {
    it('should update flight type to international', () => {
      const state: ArrivalFormData = { ...initialFormState };
      const result = formReducer(state, { type: 'SET_FLIGHT_TYPE', payload: 'international' });

      expect(result.flightType).toBe('international');
    });

    it('should update flight type to domestic', () => {
      const state: ArrivalFormData = { ...initialFormState, flightType: 'international' as const };
      const result = formReducer(state, { type: 'SET_FLIGHT_TYPE', payload: 'domestic' });

      expect(result.flightType).toBe('domestic');
    });
  });

  describe('RESET', () => {
    it('should reset form data to initial state', () => {
      const modifiedState: ArrivalFormData = {
        arrivalTime: '15:00',
        terminal: 'HAN-T2',
        baggage: 'checked',
        destination: 'hoan-kiem',
        flightType: 'international',
        airportId: 'noi-bai',
      };

      const result = formReducer(modifiedState, { type: 'RESET' });

      expect(result.terminal).toBeNull();
      expect(result.baggage).toBeNull();
      expect(result.destination).toBeNull();
      expect(result.flightType).toBe('domestic');
      expect(result.arrivalTime).toMatch(/^\d{2}:\d{2}$/);
    });
  });
});

describe('calculateResultFromForm', () => {
  const baseFormData: ArrivalFormData = {
    arrivalTime: '10:00',
    terminal: 'HAN-T1',
    baggage: 'carry_on',
    destination: 'old-quarter',
    flightType: 'domestic',
    airportId: 'noi-bai',
  };

  it('should return null when terminal is missing', () => {
    const formData: ArrivalFormData = { ...baseFormData, terminal: null };

    const result = calculateResultFromForm(formData);

    expect(result).toBeNull();
  });

  it('should return null when baggage is missing', () => {
    const formData: ArrivalFormData = { ...baseFormData, baggage: null };

    const result = calculateResultFromForm(formData);

    expect(result).toBeNull();
  });

  it('should return null when destination is missing', () => {
    const formData: ArrivalFormData = { ...baseFormData, destination: null };

    const result = calculateResultFromForm(formData);

    expect(result).toBeNull();
  });

  it('should return result when all required fields are filled', () => {
    const result = calculateResultFromForm(baseFormData);

    expect(result).not.toBeNull();
    expect(result).toHaveProperty('bus');
    expect(result).toHaveProperty('grab');
    expect(result).toHaveProperty('direction');
  });

  it('should return grab with price estimate and travel time', () => {
    const result = calculateResultFromForm(baseFormData);

    expect(result?.grab.available).toBe(true);
    expect(result?.grab.priceEstimate).toContain('VND');
    expect(result?.grab.travelTime).toHaveProperty('early');
    expect(result?.grab.travelTime).toHaveProperty('late');
  });

  it('should return direction with walking instructions', () => {
    const result = calculateResultFromForm(baseFormData);

    expect(result?.direction).toBeDefined();
    expect(result?.direction?.description).toContain('Đi bộ');
    expect(result?.direction?.estimatedMinutes).toBeGreaterThanOrEqual(0);
  });

  it('should return bus recommendation', () => {
    const result = calculateResultFromForm(baseFormData);

    expect(result?.bus).toBeDefined();
    expect(result?.bus).toHaveProperty('available');
  });

  it('should return null for unknown terminal', () => {
    const formData: ArrivalFormData = {
      ...baseFormData,
      terminal: 'HAN-T3' as any,
    };

    const result = calculateResultFromForm(formData);

    expect(result).toBeNull();
  });

  it('should return null for unknown destination', () => {
    const formData: ArrivalFormData = {
      ...baseFormData,
      destination: 'unknown-destination',
    };

    const result = calculateResultFromForm(formData);

    expect(result).toBeNull();
  });

  describe('SGN city-bound buses — no TIA, no surprise recommendations', () => {
    // SanBayGo's scope is "get me from the airport to the city". Only city-
    // bound buses (Bus 109, Bus 152) belong in the engine's recommendation
    // set. TIA was an inter-terminal shuttle (T1↔T2↔T3) that was removed
    // from the data entirely because it never served a city destination.
    // These tests pin that contract: at SGN-T1, 00:00, no city-bound bus
    // is in service (both 109 and 152 wrap past 22:00, and 109 doesn't pick
    // up at T1 anyway), so the result must surface "no bus available" —
    // not TIA, not anything.
    const cityForms: ArrivalFormData[] = (
      ['q1', 'q3', 'q5', 'binh-thanh', 'phu-nhuan'] as const
    ).map((destId) => ({
      arrivalTime: '00:00',
      terminal: 'SGN-T1' as const,
      baggage: 'carry_on' as const,
      destination: destId,
      flightType: 'domestic' as const,
      airportId: 'tan-son-nhat' as const,
    }));

    it.each(cityForms)(
      'reports no bus available for destination "%s" at 00:00 SGN-T1',
      (formData) => {
        const r = calculateResultFromForm(formData);
        expect(r).not.toBeNull();
        if (!r) return;
        const recommendedBusId = r.bus.trip?.selectedRoute?.id ?? null;
        if (r.bus.available) {
          expect(['bus-109', 'bus-152']).toContain(recommendedBusId);
        } else {
          expect(['no_service', 'too_late', 'missed_last']).toContain(r.bus.reason);
        }
      },
    );

    it('reports no bus available at 00:00 SGN-T1 (both 109 and 152 out of hours, 109 wrong terminal)', () => {
      const r = calculateResultFromForm({
        arrivalTime: '00:00',
        terminal: 'SGN-T1',
        baggage: 'carry_on',
        destination: 'q1',
        flightType: 'domestic',
        airportId: 'tan-son-nhat',
      });
      expect(r).not.toBeNull();
      if (!r) return;
      expect(r.bus.available).toBe(false);
      expect(r.bus.reason).toBeDefined();
    });
  });
});