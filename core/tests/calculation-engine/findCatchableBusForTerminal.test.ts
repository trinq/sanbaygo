import { findCatchableBusForTerminal } from '../../calculation-engine/findCatchableBusForTerminal';
import { BUS_86 } from '../../data/busSchedule';
import { BUS_109, BUS_152 } from '../../data/busSchedules/sgn';

describe('findCatchableBusForTerminal', () => {
  describe('HAN', () => {
    it('returns Bus 86 for HAN-T1', () => {
      const result = findCatchableBusForTerminal(
        [BUS_86],
        'HAN-T1',
        '08:00',
        { min: 25, max: 45 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.ticketPrice).toBe(50000);
      }
    });

    it('returns Bus 86 for HAN-T2', () => {
      const result = findCatchableBusForTerminal(
        [BUS_86],
        'HAN-T2',
        '08:00',
        { min: 25, max: 45 },
        false,
      );
      expect(result.available).toBe(true);
    });
  });

  describe('SGN', () => {
    it('returns Bus 152 for SGN-T1', () => {
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152],
        'SGN-T1',
        '10:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.ticketPrice).toBe(5000);
      }
    });

    it('returns Bus 152 for SGN-T2', () => {
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152],
        'SGN-T2',
        '10:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.ticketPrice).toBe(5000);
      }
    });

    it('returns Bus 109 for SGN-T3', () => {
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152],
        'SGN-T3',
        '10:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.ticketPrice).toBe(15000);
      }
    });

    it('returns no_service when no bus matches the terminal', () => {
      const result = findCatchableBusForTerminal(
        [BUS_86],
        'SGN-T3',
        '10:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(false);
      expect(result.reason).toBe('no_service');
    });

    it('returns too_late when all candidate buses have ended for the day', () => {
      // Bus 86 operates 06:40–22:15. A 23:00 arrival is after the last bus.
      const result = findCatchableBusForTerminal(
        [BUS_86],
        'HAN-T2',
        '23:00',
        { min: 25, max: 45 },
        false,
      );
      expect(result).toEqual({ available: false, reason: 'too_late' });
    });

    it('returns no_service when arriving before any bus starts operating', () => {
      // Bus 86 starts at 06:40; 04:00 is well before any service.
      const result = findCatchableBusForTerminal(
        [BUS_86],
        'HAN-T2',
        '04:00',
        { min: 25, max: 45 },
        false,
      );
      expect(result).toEqual({ available: false, reason: 'no_service' });
    });

    it('returns no_service for late-night SGN-T3 (00:50) — both 109 and 152 are out of hours', () => {
      // 00:50 is past Bus 109 end (22:00) and past Bus 152 end (22:00).
      // No city-bound bus is in service; user must call a ride-hail.
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152],
        'SGN-T3',
        '00:50',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(false);
      expect(result.reason).toBe('no_service');
    });

    it('catches Bus 152 at 19:30 SGN-T1 (still in service until 22:00)', () => {
      // Bus 152's operating hours are now 05:00 → 22:00 (was previously 05:00 → 19:00).
      // A 19:30 arrival at SGN-T1 should still be catchable on the next 152 departure.
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152],
        'SGN-T1',
        '19:30',
        { min: 5, max: 15 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.selectedRoute?.id).toBe('bus-152');
      }
    });

    it('returns no_service when SGN-T1 arrives before any bus starts (04:00)', () => {
      // Bus 152 starts at 05:00; 04:00 is before any SGN city-bound service.
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152],
        'SGN-T1',
        '04:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(false);
      expect(result.reason).toBe('no_service');
    });
  });
});
