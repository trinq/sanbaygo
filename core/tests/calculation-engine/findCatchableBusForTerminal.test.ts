import { findCatchableBusForTerminal } from '../../calculation-engine/findCatchableBusForTerminal';
import { BUS_86 } from '../../data/busSchedule';
import { BUS_109, BUS_152, TIA } from '../../data/busSchedules/sgn';

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
        [BUS_109, BUS_152, TIA],
        'SGN-T1',
        '10:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.ticketPrice).toBe(6000);
      }
    });

    it('returns Bus 152 for SGN-T2', () => {
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152, TIA],
        'SGN-T2',
        '10:00',
        { min: 10, max: 20 },
        false,
      );
      expect(result.available).toBe(true);
      if (result.trip) {
        expect(result.trip.ticketPrice).toBe(6000);
      }
    });

    it('returns Bus 109 for SGN-T3', () => {
      const result = findCatchableBusForTerminal(
        [BUS_109, BUS_152, TIA],
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
  });
});
