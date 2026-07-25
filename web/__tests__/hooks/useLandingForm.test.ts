import { renderHook, act } from '@testing-library/react';
import { useLandingForm } from '../../src/hooks/useLandingForm';

describe('useLandingForm', () => {
  it('starts with empty departure and destination', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.departure).toBeNull();
    expect(result.current.destination).toBeNull();
    expect(result.current.people).toBe(1);
    expect(result.current.luggage).toBe(1);
  });

  it('validate() returns false when departure or destination is missing', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.validate()).toBe(false);
    act(() => result.current.setDeparture('noi-bai'));
    expect(result.current.validate()).toBe(false);
    act(() => result.current.setDestination('OLD_QUARTER'));
    expect(result.current.validate()).toBe(true);
  });

  it('clamps people to [1..10]', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setPeople(15));
    expect(result.current.people).toBe(10);
    act(() => result.current.setPeople(0));
    expect(result.current.people).toBe(1);
  });

  it('clamps luggage to [0..10]', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setLuggage(-1));
    expect(result.current.luggage).toBe(0);
    act(() => result.current.setLuggage(99));
    expect(result.current.luggage).toBe(10);
  });

  it('buildArrivalFormData() returns derived defaults when valid', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setDeparture('noi-bai');
      result.current.setDestination('OLD_QUARTER');
    });
    const formData = result.current.buildArrivalFormData();
    expect(formData).toEqual({
      arrivalTime: '12:00',
      terminal: 'T1',
      baggage: 'carry_on',
      destination: 'OLD_QUARTER',
      flightType: 'international',
    });
  });

  it('buildArrivalFormData() returns null when invalid', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.buildArrivalFormData()).toBeNull();
  });

  it('reset() restores initial state', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setDeparture('noi-bai');
      result.current.setDestination('OLD_QUARTER');
      result.current.setPeople(5);
    });
    act(() => result.current.reset());
    expect(result.current.departure).toBeNull();
    expect(result.current.destination).toBeNull();
    expect(result.current.people).toBe(1);
  });
});
