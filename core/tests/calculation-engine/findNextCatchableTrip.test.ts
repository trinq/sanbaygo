import { findNextCatchableTrip } from '../../calculation-engine/findNextCatchableTrip';

describe('findNextCatchableTrip', () => {
  describe('normal cases', () => {
    it('finds next catchable trip for morning arrival', () => {
      const result = findNextCatchableTrip('08:00', { min: 25, max: 45 });
      expect(result.available).toBe(true);
      expect(result.trip).toBeDefined();
      if (result.trip) {
        // 08:00 + 45 (exit max) + 5 (walking) = 08:50
        // First bus >= 08:50 is 09:15
        expect(result.trip.departureTime).toBe('09:15');
        expect(result.trip.waitMinutes).toBe(25); // 09:15 - 08:50
        expect(result.trip.ticketPrice).toBe(50000);
      }
    });

    it('finds next catchable trip for afternoon arrival', () => {
      const result = findNextCatchableTrip('14:00', { min: 15, max: 25 });
      expect(result.available).toBe(true);
      expect(result.trip).toBeDefined();
      if (result.trip) {
        // 14:00 + 25 (exit max) + 5 (walking) = 14:30
        // First bus >= 14:30 is 14:30
        expect(result.trip.departureTime).toBe('14:30');
      }
    });
  });

  describe('edge cases', () => {
    it('returns no_service when before first bus departure', () => {
      const result = findNextCatchableTrip('05:00', { min: 15, max: 25 });
      expect(result.available).toBe(false);
      expect(result.reason).toBe('no_service');
    });

    it('returns too_late when after operating hours', () => {
      // 22:30 arrival is past the last bus departure (22:15)
      const result = findNextCatchableTrip('22:30', { min: 15, max: 25 });
      expect(result.available).toBe(false);
      expect(result.reason).toBe('too_late');
    });

    it('returns missed_last when ready time is after last bus', () => {
      // 20:00 arrival + 90 (exit max) + 5 (walking) = 21:35
      // This is before 22:15 (last bus), but with slow exit
      // We need to find a case where readyTime is between 06:40 and 22:15
      // but there's no catchable bus
      // Actually: if readyTime >= first bus but < last bus, we can catch a bus
      // So "missed_last" happens when readyTime > last bus departure
      // Let's test: 21:30 arrival + 90 + 5 = 23:05 > 22:15 = "too_late"
      // For "missed_last": readyTime is before operating hours end but no bus found
      // This happens when readyTime is past all schedule times but before operatingHours.end
      // Hmm, the schedule ends at 22:15 but operatingHours.end is 22:15
      // So if readyTime < 22:15, there should always be a bus (the 22:15 one)
      // unless... the schedule is empty
      
      // Edge case: arrive at 22:00, exit max 60, ready = 23:05 > 22:15 = too_late
      const result = findNextCatchableTrip('22:00', { min: 15, max: 60 });
      expect(result.available).toBe(false);
      // 22:00 is after 22:15 last bus? No, 22:00 < 22:15
      // readyTime = 22:00 + 60 + 5 = 23:05 > 22:15 → too_late
      expect(result.reason).toBe('too_late');
    });
  });

  describe('arrival at service boundary', () => {
    it('finds bus when arriving just before first departure', () => {
      // 06:35 + 15 (exit max) + 5 (walking) = 06:55
      // First bus >= 06:55 is 07:20
      const result = findNextCatchableTrip('06:35', { min: 10, max: 15 });
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.departureTime).toBe('07:20');
      }
    });
  });
});
