import { findNextCatchableTrip } from '../../calculation-engine/findNextCatchableTrip';
import { BUS_86 } from '../../data/busSchedule';
import type { BusRoute } from '../../types';

const makeFrequencyBus = (headway: { peak: number; normal: number }): BusRoute => ({
  id: 'tia',
  routeNumber: 'TIA',
  ticketPrice: 0,
  operatingHours: { start: '04:30', end: '00:30' },
  travelTime: { normal: { min: 15, max: 20 }, peak: { min: 15, max: 20 } },
  pickupPoints: [
    { terminalId: 'SGN-T1', location: 'Làn B' },
    { terminalId: 'SGN-T2', location: 'Làn B' },
    { terminalId: 'SGN-T3', location: 'Cột A' },
  ],
  scheduleSource: { kind: 'frequency', headwayMinutes: headway },
});

describe('findNextCatchableTrip', () => {
  describe('explicit schedule (Bus 86)', () => {
    it('finds next catchable trip for morning arrival', () => {
      const result = findNextCatchableTrip(BUS_86, '08:00', { min: 25, max: 45 });
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.departureTime).toBe('09:15');
        expect(result.trip.waitMinutes).toBe(25);
        expect(result.trip.ticketPrice).toBe(50000);
      }
    });

    it('finds next catchable trip for afternoon arrival', () => {
      const result = findNextCatchableTrip(BUS_86, '14:00', { min: 15, max: 25 });
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.departureTime).toBe('14:30');
      }
    });

    it('returns no_service when before first bus departure', () => {
      const result = findNextCatchableTrip(BUS_86, '05:00', { min: 15, max: 25 });
      expect(result.available).toBe(false);
      expect(result.reason).toBe('no_service');
    });

    it('returns too_late when after operating hours', () => {
      const result = findNextCatchableTrip(BUS_86, '22:30', { min: 15, max: 25 });
      expect(result.available).toBe(false);
      expect(result.reason).toBe('too_late');
    });

    it('finds bus when arriving just before first departure', () => {
      const result = findNextCatchableTrip(BUS_86, '06:35', { min: 10, max: 15 });
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.departureTime).toBe('07:20');
      }
    });
  });

  describe('frequency schedule (TIA)', () => {
    it('returns next departure within headway', () => {
      const tia = makeFrequencyBus({ peak: 15, normal: 20 });
      const result = findNextCatchableTrip(tia, '14:00', { min: 5, max: 10 });
      // 14:00 + 10 + 5 = 14:15. Headway 20-min, next departure 14:20.
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.departureTime).toBe('14:20');
        expect(result.trip.waitMinutes).toBe(5);
        expect(result.trip.ticketPrice).toBe(0);
      }
    });

    it('returns no_service when readyTime is before operating hours start', () => {
      const tia = makeFrequencyBus({ peak: 15, normal: 20 });
      const result = findNextCatchableTrip(tia, '02:00', { min: 5, max: 10 });
      expect(result.available).toBe(false);
      expect(result.reason).toBe('no_service');
    });

    it('returns too_late when readyTime is after operating hours end', () => {
      const tia = makeFrequencyBus({ peak: 15, normal: 20 });
      // 23:30 + 60 + 5 = 00:35, after 00:30
      const result = findNextCatchableTrip(tia, '23:30', { min: 5, max: 60 });
      expect(result.available).toBe(false);
      expect(result.reason).toBe('too_late');
    });
  });
});
