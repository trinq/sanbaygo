import {
  parseTime,
  formatTime,
  addMinutes,
  timeToMinutes,
  minutesToTime,
  compareTimes,
  isAfterOrEqual,
  isWithinRange,
} from '../../utils/time';

describe('Time Utilities', () => {
  describe('parseTime', () => {
    it('parses HH:mm format correctly', () => {
      const result = parseTime('14:30');
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
    });

    it('parses midnight correctly', () => {
      const result = parseTime('00:00');
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
    });

    it('parses 23:59 correctly', () => {
      const result = parseTime('23:59');
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
    });

    it('parses single-digit hours and minutes', () => {
      const result = parseTime('7:05');
      expect(result.getHours()).toBe(7);
      expect(result.getMinutes()).toBe(5);
    });
  });

  describe('formatTime', () => {
    it('formats time correctly with zero padding', () => {
      const date = new Date();
      date.setHours(9, 5, 0, 0);
      expect(formatTime(date)).toBe('09:05');
    });

    it('formats afternoon time correctly', () => {
      const date = new Date();
      date.setHours(14, 30, 0, 0);
      expect(formatTime(date)).toBe('14:30');
    });

    it('formats midnight correctly', () => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      expect(formatTime(date)).toBe('00:00');
    });
  });

  describe('addMinutes', () => {
    it('adds minutes correctly within the hour', () => {
      expect(addMinutes('10:30', 15)).toBe('10:45');
    });

    it('wraps to next hour correctly', () => {
      expect(addMinutes('10:50', 20)).toBe('11:10');
    });

    it('wraps past midnight correctly', () => {
      expect(addMinutes('23:45', 30)).toBe('00:15');
    });

    it('handles large minute additions', () => {
      expect(addMinutes('08:00', 120)).toBe('10:00');
    });

    it('returns original time when adding 0 minutes', () => {
      expect(addMinutes('12:00', 0)).toBe('12:00');
    });
  });

  describe('timeToMinutes', () => {
    it('converts midnight to 0 minutes', () => {
      expect(timeToMinutes('00:00')).toBe(0);
    });

    it('converts 1 hour correctly', () => {
      expect(timeToMinutes('01:00')).toBe(60);
    });

    it('converts mixed hours and minutes correctly', () => {
      expect(timeToMinutes('10:30')).toBe(630);
    });

    it('converts full day correctly', () => {
      expect(timeToMinutes('23:59')).toBe(1439);
    });
  });

  describe('minutesToTime', () => {
    it('converts 0 minutes to midnight', () => {
      expect(minutesToTime(0)).toBe('00:00');
    });

    it('converts minutes correctly', () => {
      expect(minutesToTime(90)).toBe('01:30');
    });

    it('converts full hours correctly', () => {
      expect(minutesToTime(120)).toBe('02:00');
    });

    it('handles 24-hour wraparound', () => {
      expect(minutesToTime(1500)).toBe('01:00');
    });

    it('converts 1439 minutes correctly', () => {
      expect(minutesToTime(1439)).toBe('23:59');
    });
  });

  describe('compareTimes', () => {
    it('returns negative when a < b', () => {
      expect(compareTimes('09:00', '12:00')).toBeLessThan(0);
    });

    it('returns positive when a > b', () => {
      expect(compareTimes('15:00', '10:00')).toBeGreaterThan(0);
    });

    it('returns 0 when times are equal', () => {
      expect(compareTimes('12:00', '12:00')).toBe(0);
    });
  });

  describe('isAfterOrEqual', () => {
    it('returns true when time is after', () => {
      expect(isAfterOrEqual('14:00', '10:00')).toBe(true);
    });

    it('returns true when times are equal', () => {
      expect(isAfterOrEqual('10:00', '10:00')).toBe(true);
    });

    it('returns false when time is before', () => {
      expect(isAfterOrEqual('09:00', '12:00')).toBe(false);
    });
  });

  describe('isWithinRange', () => {
    it('returns true when time is at start', () => {
      expect(isWithinRange('10:00', '10:00', '12:00')).toBe(true);
    });

    it('returns true when time is at end', () => {
      expect(isWithinRange('12:00', '10:00', '12:00')).toBe(true);
    });

    it('returns true when time is within range', () => {
      expect(isWithinRange('11:00', '10:00', '12:00')).toBe(true);
    });

    it('returns false when time is before range', () => {
      expect(isWithinRange('09:00', '10:00', '12:00')).toBe(false);
    });

    it('returns false when time is after range', () => {
      expect(isWithinRange('13:00', '10:00', '12:00')).toBe(false);
    });
  });
});
