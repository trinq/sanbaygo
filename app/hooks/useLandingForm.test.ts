import { renderHook, act } from '@testing-library/react-native';
import { useLandingForm } from './useLandingForm';

describe('useLandingForm (RN)', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.departure).toBeNull();
    expect(result.current.destination).toBeNull();
  });

  it('clamps people and luggage', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => result.current.setPeople(99));
    expect(result.current.people).toBe(10);
    act(() => result.current.setLuggage(-3));
    expect(result.current.luggage).toBe(0);
  });

  it('buildArrivalFormData returns null when invalid', () => {
    const { result } = renderHook(() => useLandingForm());
    expect(result.current.buildArrivalFormData()).toBeNull();
  });

  it('buildArrivalFormData returns derived defaults when valid', () => {
    const { result } = renderHook(() => useLandingForm());
    act(() => {
      result.current.setDeparture('noi-bai');
      result.current.setDestination('OLD_QUARTER');
    });
    expect(result.current.buildArrivalFormData()).toEqual({
      arrivalTime: '12:00',
      terminal: 'T1',
      baggage: 'carry_on',
      destination: 'OLD_QUARTER',
      flightType: 'international',
    });
  });
});
