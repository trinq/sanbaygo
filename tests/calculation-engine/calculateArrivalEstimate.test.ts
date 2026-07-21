import { calculateArrivalEstimate } from '../../calculation-engine/calculateArrivalEstimate';

describe('calculateArrivalEstimate', () => {
  describe('normal hours (non-peak)', () => {
    it('calculates arrival estimate for normal hours', () => {
      const result = calculateArrivalEstimate('09:00', { min: 60, max: 90 }, false);
      expect(result.early).toBe('10:00'); // 09:00 + 60 min
      expect(result.late).toBe('10:30'); // 09:00 + 90 min
    });

    it('calculates arrival for short travel time', () => {
      const result = calculateArrivalEstimate('12:00', { min: 40, max: 60 }, false);
      expect(result.early).toBe('12:40');
      expect(result.late).toBe('13:00');
    });
  });

  describe('peak hours', () => {
    it('calculates arrival estimate for peak hours', () => {
      // Peak travel time should be longer
      const result = calculateArrivalEstimate('08:00', { min: 60, max: 90 }, true);
      // Peak adds 30 min to both min and max
      expect(result.early).toBe('09:30'); // 08:00 + 90 min (60 + 30)
      expect(result.late).toBe('10:00'); // 08:00 + 120 min (90 + 30)
    });

    it('calculates arrival for evening peak', () => {
      const result = calculateArrivalEstimate('17:30', { min: 50, max: 75 }, true);
      // Peak adds 30 min: 50+30=80, 75+30=105
      expect(result.early).toBe('18:50'); // 17:30 + 80 min
      expect(result.late).toBe('19:15'); // 17:30 + 105 min
    });
  });

  describe('time boundary handling', () => {
    it('wraps past midnight correctly', () => {
      const result = calculateArrivalEstimate('23:30', { min: 60, max: 90 }, false);
      expect(result.early).toBe('00:30'); // 23:30 + 60 min
      expect(result.late).toBe('01:00'); // 23:30 + 90 min
    });
  });

  describe('minute range in result', () => {
    it('includes adjusted minute range in result', () => {
      const result = calculateArrivalEstimate('09:00', { min: 60, max: 90 }, true);
      expect(result.minutesRange.min).toBe(90); // 60 + 30
      expect(result.minutesRange.max).toBe(120); // 90 + 30
    });

    it('returns original range for non-peak', () => {
      const result = calculateArrivalEstimate('09:00', { min: 60, max: 90 }, false);
      expect(result.minutesRange.min).toBe(60);
      expect(result.minutesRange.max).toBe(90);
    });
  });
});
