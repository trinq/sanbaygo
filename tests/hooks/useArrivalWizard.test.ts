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
    it('should update terminal to T1', () => {
      const state: ArrivalFormData = { ...initialFormState };
      const result = formReducer(state, { type: 'SET_TERMINAL', payload: 'T1' });
      
      expect(result.terminal).toBe('T1');
    });

    it('should update terminal to T2', () => {
      const state: ArrivalFormData = { ...initialFormState };
      const result = formReducer(state, { type: 'SET_TERMINAL', payload: 'T2' });
      
      expect(result.terminal).toBe('T2');
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
        terminal: 'T2',
        baggage: 'checked',
        destination: 'hoan-kiem',
        flightType: 'international',
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
  it('should return null when terminal is missing', () => {
    const formData: ArrivalFormData = {
      arrivalTime: '10:00',
      terminal: null,
      baggage: 'carry_on',
      destination: 'old-quarter',
      flightType: 'domestic',
    };
    
    const result = calculateResultFromForm(formData);
    
    expect(result).toBeNull();
  });

  it('should return null when baggage is missing', () => {
    const formData: ArrivalFormData = {
      arrivalTime: '10:00',
      terminal: 'T1',
      baggage: null,
      destination: 'old-quarter',
      flightType: 'domestic',
    };
    
    const result = calculateResultFromForm(formData);
    
    expect(result).toBeNull();
  });

  it('should return null when destination is missing', () => {
    const formData: ArrivalFormData = {
      arrivalTime: '10:00',
      terminal: 'T1',
      baggage: 'carry_on',
      destination: null,
      flightType: 'domestic',
    };
    
    const result = calculateResultFromForm(formData);
    
    expect(result).toBeNull();
  });

  it('should return result when all required fields are filled', () => {
    const formData: ArrivalFormData = {
      arrivalTime: '10:00',
      terminal: 'T1',
      baggage: 'carry_on',
      destination: 'old-quarter',
      flightType: 'domestic',
    };
    
    const result = calculateResultFromForm(formData);
    
    expect(result).not.toBeNull();
    expect(result).toHaveProperty('bus');
    expect(result).toHaveProperty('grab');
    expect(result).toHaveProperty('direction');
  });

  it('should return grab with price estimate and travel time', () => {
    const formData: ArrivalFormData = {
      arrivalTime: '10:00',
      terminal: 'T1',
      baggage: 'carry_on',
      destination: 'old-quarter',
      flightType: 'domestic',
    };
    
    const result = calculateResultFromForm(formData);
    
    expect(result?.grab.available).toBe(true);
    expect(result?.grab.priceEstimate).toContain('VND');
    expect(result?.grab.travelTime).toHaveProperty('early');
    expect(result?.grab.travelTime).toHaveProperty('late');
  });

  it('should return direction with walking instructions', () => {
    const formData: ArrivalFormData = {
      arrivalTime: '10:00',
      terminal: 'T1',
      baggage: 'carry_on',
      destination: 'old-quarter',
      flightType: 'domestic',
    };
    
    const result = calculateResultFromForm(formData);
    
    expect(result?.direction).toBeDefined();
    expect(result?.direction?.description).toContain('Đi bộ');
    expect(result?.direction?.estimatedMinutes).toBeGreaterThanOrEqual(0);
  });

  it('should return bus recommendation', () => {
    const formData: ArrivalFormData = {
      arrivalTime: '10:00',
      terminal: 'T1',
      baggage: 'carry_on',
      destination: 'old-quarter',
      flightType: 'domestic',
    };
    
    const result = calculateResultFromForm(formData);
    
    expect(result?.bus).toBeDefined();
    expect(result?.bus).toHaveProperty('available');
  });

  it('should return null for unknown terminal', () => {
    const formData: ArrivalFormData = {
      arrivalTime: '10:00',
      terminal: 'T3' as any,
      baggage: 'carry_on',
      destination: 'old-quarter',
      flightType: 'domestic',
    };
    
    const result = calculateResultFromForm(formData);
    
    expect(result).toBeNull();
  });

  it('should return null for unknown destination', () => {
    const formData: ArrivalFormData = {
      arrivalTime: '10:00',
      terminal: 'T1',
      baggage: 'carry_on',
      destination: 'unknown-destination',
      flightType: 'domestic',
    };
    
    const result = calculateResultFromForm(formData);
    
    expect(result).toBeNull();
  });
});
