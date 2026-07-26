import { renderHook, act } from '@testing-library/react';
import { useLandingForm } from '../../src/hooks/useLandingForm';

describe('useLandingForm', () => {
  it('starts with empty airport, terminal, destination', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.airport).toBeNull();
    expect(result.current.terminal).toBeNull();
    expect(result.current.destination).toBeNull();
    expect(result.current.people).toBe(1);
    expect(result.current.carryOn).toBe(false);
    expect(result.current.checked).toBe(false);
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

  it('buildArrivalFormData() returns full shape when valid', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setAirport('tan-son-nhat');
      result.current.setTerminal('SGN-T1');
      result.current.setDestination('q1');
    });
    const formData = result.current.buildArrivalFormData();
    expect(formData).toEqual({
      arrivalTime: '12:00',
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
});