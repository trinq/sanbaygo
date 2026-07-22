import { isPeakHour } from '../../calculation-engine/isPeakHour';

describe('isPeakHour', () => {
  describe('morning peak', () => {
    it('returns true at 07:00', () => {
      expect(isPeakHour('07:00')).toBe(true);
    });

    it('returns true at 08:00', () => {
      expect(isPeakHour('08:00')).toBe(true);
    });

    it('returns true at 08:59', () => {
      expect(isPeakHour('08:59')).toBe(true);
    });

    it('returns false at 06:59', () => {
      expect(isPeakHour('06:59')).toBe(false);
    });

    it('returns false at 09:01', () => {
      expect(isPeakHour('09:01')).toBe(false);
    });
  });

  describe('evening peak', () => {
    it('returns true at 17:00', () => {
      expect(isPeakHour('17:00')).toBe(true);
    });

    it('returns true at 18:00', () => {
      expect(isPeakHour('18:00')).toBe(true);
    });

    it('returns true at 18:59', () => {
      expect(isPeakHour('18:59')).toBe(true);
    });

    it('returns false at 16:59', () => {
      expect(isPeakHour('16:59')).toBe(false);
    });

    it('returns false at 19:01', () => {
      expect(isPeakHour('19:01')).toBe(false);
    });
  });

  describe('off-peak hours', () => {
    it('returns false at 10:00', () => {
      expect(isPeakHour('10:00')).toBe(false);
    });

    it('returns false at 12:00', () => {
      expect(isPeakHour('12:00')).toBe(false);
    });

    it('returns false at 15:00', () => {
      expect(isPeakHour('15:00')).toBe(false);
    });

    it('returns false at 20:00', () => {
      expect(isPeakHour('20:00')).toBe(false);
    });

    it('returns false at 22:00', () => {
      expect(isPeakHour('22:00')).toBe(false);
    });
  });
});
