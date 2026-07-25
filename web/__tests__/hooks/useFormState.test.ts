import { renderHook, act } from '@testing-library/react';
import { useFormState } from '../../src/hooks/useFormState';

describe('useFormState', () => {
  describe('default values', () => {
    it('pre-fills terminal to T1', () => {
      const { result } = renderHook(() => useFormState());
      expect(result.current.formData.terminal).toBe('T1');
    });

    it('pre-fills baggage to carry_on', () => {
      const { result } = renderHook(() => useFormState());
      expect(result.current.formData.baggage).toBe('carry_on');
    });

    it('sets flightType to international when terminal is T1', () => {
      const { result } = renderHook(() => useFormState());
      expect(result.current.formData.flightType).toBe('international');
    });

    it('leaves destination null so user must pick one', () => {
      const { result } = renderHook(() => useFormState());
      expect(result.current.formData.destination).toBeNull();
    });

    it('pre-fills arrivalTime to current HH:MM', () => {
      const { result } = renderHook(() => useFormState());
      expect(result.current.formData.arrivalTime).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  describe('updateFormData', () => {
    it('patches formData and preserves pre-filled defaults', () => {
      const { result } = renderHook(() => useFormState());
      act(() => {
        result.current.updateFormData({ destination: 'old-quarter' });
      });
      expect(result.current.formData).toEqual({
        arrivalTime: expect.stringMatching(/^\d{2}:\d{2}$/),
        terminal: 'T1',
        baggage: 'carry_on',
        flightType: 'international',
        destination: 'old-quarter',
      });
    });
  });

  describe('reset', () => {
    it('returns to pre-filled defaults (T1, carry_on, no destination)', () => {
      const { result } = renderHook(() => useFormState());
      act(() => {
        result.current.updateFormData({ destination: 'ba-dinh', terminal: 'T2', baggage: 'checked' });
      });
      act(() => {
        result.current.reset();
      });
      expect(result.current.formData.terminal).toBe('T1');
      expect(result.current.formData.baggage).toBe('carry_on');
      expect(result.current.formData.destination).toBeNull();
      expect(result.current.formData.flightType).toBe('international');
    });
  });

  describe('canSubmit replacement', () => {
    it('with defaults + destination picked, the only required remaining field is destination', () => {
      const { result } = renderHook(() => useFormState());
      act(() => {
        result.current.updateFormData({ destination: 'old-quarter' });
      });
      const { destination, terminal, baggage } = result.current.formData;
      const canSubmit = Boolean(destination && terminal && baggage);
      expect(canSubmit).toBe(true);
    });
  });
});
