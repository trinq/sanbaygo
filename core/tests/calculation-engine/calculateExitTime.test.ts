import { calculateExitTime } from '../../calculation-engine/calculateExitTime';

describe('calculateExitTime', () => {
  describe('T1 domestic flights', () => {
    it('returns exit time for T1 domestic with carry-on', () => {
      const result = calculateExitTime('domestic', 'carry_on', 'domestic');
      expect(result.minMinutes).toBe(15);
      expect(result.maxMinutes).toBe(25);
    });

    it('returns exit time for T1 domestic with checked baggage', () => {
      const result = calculateExitTime('domestic', 'checked', 'domestic');
      expect(result.minMinutes).toBe(25);
      expect(result.maxMinutes).toBe(45);
    });
  });

  describe('T2 international flights', () => {
    it('returns exit time for T2 international with carry-on', () => {
      const result = calculateExitTime('international', 'carry_on', 'international');
      expect(result.minMinutes).toBe(45);
      expect(result.maxMinutes).toBe(75);
    });

    it('returns exit time for T2 international with checked baggage', () => {
      const result = calculateExitTime('international', 'checked', 'international');
      expect(result.minMinutes).toBe(60);
      expect(result.maxMinutes).toBe(90);
    });
  });

  describe('cross-terminal flight types', () => {
    it('handles international flight at domestic terminal (T1)', () => {
      // T1 can have international departures
      const result = calculateExitTime('domestic', 'carry_on', 'international');
      expect(result.minMinutes).toBe(15);
      expect(result.maxMinutes).toBe(25);
    });

    it('handles international flight at T2 with carry-on', () => {
      const result = calculateExitTime('international', 'carry_on', 'international');
      expect(result.minMinutes).toBe(45);
      expect(result.maxMinutes).toBe(75);
    });
  });

  describe('default flight type', () => {
    it('defaults to domestic when flight type not specified', () => {
      const result = calculateExitTime('domestic', 'carry_on');
      expect(result.minMinutes).toBe(15);
      expect(result.maxMinutes).toBe(25);
    });
  });
});
