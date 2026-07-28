import { renderHook, act } from '@testing-library/react';
import { useLandingForm } from '../../src/hooks/useLandingForm';

describe('useLandingForm', () => {
  it('starts with empty airport, terminal, destination, and default arrivalTime rounded to nearest 5', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.airport).toBeNull();
    expect(result.current.terminal).toBeNull();
    expect(result.current.destination).toBeNull();
    // Default arrivalTime is rounded to nearest 5 minutes from current time.
    // Verify it's a valid HH:mm format.
    expect(result.current.arrivalTime).toMatch(/^\d{2}:\d{2}$/);
    const [h, m] = result.current.arrivalTime.split(':').map(Number);
    expect(m % 5).toBe(0);
    expect(result.current.people).toBe(1);
    expect(result.current.carryOn).toBe(false);
    expect(result.current.checked).toBe(false);
  });

  it('setArrivalTime updates arrivalTime in HH:mm format', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setArrivalTime('08:30'));
    expect(result.current.arrivalTime).toBe('08:30');
    act(() => result.current.setArrivalTime('22:15'));
    expect(result.current.arrivalTime).toBe('22:15');
  });

  it('setArrivalTime rejects invalid format (non-HH:mm)', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setArrivalTime('08:30'));
    act(() => result.current.setArrivalTime('not-a-time'));
    expect(result.current.arrivalTime).toBe('08:30');
    act(() => result.current.setArrivalTime('25:99'));
    expect(result.current.arrivalTime).toBe('08:30');
    act(() => result.current.setArrivalTime(''));
    expect(result.current.arrivalTime).toBe('08:30');
  });

  it('validate() returns false when airport, terminal, or destination is missing', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.validate()).toBe(false);
    act(() => result.current.setAirport('noi-bai'));
    expect(result.current.validate()).toBe(false);
    act(() => result.current.setTerminal('HAN-T1'));
    expect(result.current.validate()).toBe(false);
    act(() => result.current.setDestination('old-quarter'));
    expect(result.current.validate()).toBe(true);
  });

  it('clamps people to [1..10]', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setPeople(15));
    expect(result.current.people).toBe(10);
    act(() => result.current.setPeople(0));
    expect(result.current.people).toBe(1);
  });

  it('terminal options filter by selected airport', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setAirport('tan-son-nhat'));
    expect(result.current.terminalOptions.map((t) => t.id)).toEqual([
      'SGN-T1',
      'SGN-T2',
      'SGN-T3',
    ]);
  });

  it('destination options filter by selected airport', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setAirport('tan-son-nhat'));
    expect(result.current.destinationOptions.map((d) => d.id)).toEqual([
      'q1',
      'q3',
      'q5',
      'binh-thanh',
      'phu-nhuan',
    ]);
  });

  it('switching airport clears terminal and destination', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('noi-bai');
      result.current.setTerminal('HAN-T1');
      result.current.setDestination('old-quarter');
    });
    expect(result.current.terminal).toBe('HAN-T1');
    act(() => result.current.setAirport('tan-son-nhat'));
    expect(result.current.terminal).toBeNull();
    expect(result.current.destination).toBeNull();
  });

  it('buildArrivalFormData() returns full shape when valid, using current arrivalTime', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('tan-son-nhat');
      result.current.setTerminal('SGN-T1');
      result.current.setDestination('q1');
      result.current.setArrivalTime('18:45');
    });
    const formData = result.current.buildArrivalFormData();
    expect(formData).toEqual({
      arrivalTime: '18:45',
      airportId: 'tan-son-nhat',
      terminal: 'SGN-T1',
      baggage: 'carry_on',
      destination: 'q1',
      flightType: 'domestic',
    });
  });

  it('buildArrivalFormData() returns null when invalid', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.buildArrivalFormData()).toBeNull();
  });

  it('reset() restores initial state', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('noi-bai');
      result.current.setTerminal('HAN-T1');
      result.current.setDestination('old-quarter');
      result.current.setPeople(5);
    });
    act(() => result.current.reset());
    expect(result.current.airport).toBeNull();
    expect(result.current.terminal).toBeNull();
    expect(result.current.destination).toBeNull();
    expect(result.current.people).toBe(1);
  });

  describe('flightType state', () => {
    it('defaults to domestic', () => {
      const { result } = renderHook(() => useLandingForm());
      expect(result.current.flightType).toBe('domestic');
    });

    it('shows selector when terminal has both domestic and international', () => {
      const { result } = renderHook(() => useLandingForm());
      act(() => {
        result.current.setAirport('tan-son-nhat');
      });
      act(() => {
        result.current.setTerminal('SGN-T3');
      });
      expect(result.current.showFlightTypeSelector).toBe(true);
      expect(result.current.flightTypeOptions).toEqual(['domestic', 'international']);
    });

    it('hides selector when terminal has only one flight type', () => {
      const { result } = renderHook(() => useLandingForm());
      act(() => {
        result.current.setAirport('tan-son-nhat');
      });
      act(() => {
        result.current.setTerminal('SGN-T1');
      });
      expect(result.current.showFlightTypeSelector).toBe(false);
      expect(result.current.flightTypeOptions).toEqual(['domestic']);
    });

    it('buildArrivalFormData uses flightType state when selector shown', () => {
      const { result } = renderHook(() => useLandingForm());
      act(() => {
        result.current.setAirport('tan-son-nhat');
      });
      act(() => {
        result.current.setTerminal('SGN-T3');
      });
      act(() => {
        result.current.setDestination('q1');
      });
      act(() => {
        result.current.setFlightType('international');
      });
      const formData = result.current.buildArrivalFormData();
      expect(formData?.flightType).toBe('international');
    });

    it('buildArrivalFormData uses terminal.type when selector hidden (SGN-T1)', () => {
      const { result } = renderHook(() => useLandingForm());
      act(() => {
        result.current.setAirport('tan-son-nhat');
      });
      act(() => {
        result.current.setTerminal('SGN-T1');
      });
      act(() => {
        result.current.setDestination('q1');
      });
      const formData = result.current.buildArrivalFormData();
      expect(formData?.flightType).toBe('domestic');
    });

    it('buildArrivalFormData uses terminal.type when selector hidden (SGN-T2)', () => {
      const { result } = renderHook(() => useLandingForm());
      act(() => {
        result.current.setAirport('tan-son-nhat');
      });
      act(() => {
        result.current.setTerminal('SGN-T2');
      });
      act(() => {
        result.current.setDestination('q1');
      });
      const formData = result.current.buildArrivalFormData();
      expect(formData?.flightType).toBe('international');
    });

    it('changing terminal resets flightType to terminal default', () => {
      const { result } = renderHook(() => useLandingForm());
      act(() => {
        result.current.setAirport('tan-son-nhat');
      });
      act(() => {
        result.current.setTerminal('SGN-T3');
      });
      act(() => {
        result.current.setFlightType('international');
      });
      expect(result.current.flightType).toBe('international');
      act(() => {
        result.current.setTerminal('SGN-T1');
      });
      expect(result.current.flightType).toBe('domestic');
    });
  });
});