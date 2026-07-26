import { BUS_109, BUS_152, TIA } from '../../../data/busSchedules/sgn';

describe('SGN bus routes', () => {
  describe('BUS_109', () => {
    it('runs only at SGN-T3', () => {
      expect(BUS_109.pickupPoints.map((p) => p.terminalId)).toEqual(['SGN-T3']);
    });

    it('uses explicit schedule', () => {
      expect(BUS_109.scheduleSource.kind).toBe('explicit');
      if (BUS_109.scheduleSource.kind === 'explicit') {
        expect(BUS_109.scheduleSource.departures[0]).toBe('05:30');
        expect(BUS_109.scheduleSource.departures).toContain('22:00');
      }
    });

    it('costs 15,000 VND', () => {
      expect(BUS_109.ticketPrice).toBe(15000);
    });
  });

  describe('BUS_152', () => {
    it('runs at SGN-T1 and SGN-T2', () => {
      const ids = BUS_152.pickupPoints.map((p) => p.terminalId).sort();
      expect(ids).toEqual(['SGN-T1', 'SGN-T2']);
    });

    it('uses explicit schedule', () => {
      expect(BUS_152.scheduleSource.kind).toBe('explicit');
    });

    it('costs 6,000 VND (median of 5,000-7,000)', () => {
      expect(BUS_152.ticketPrice).toBe(6000);
    });
  });

  describe('TIA', () => {
    it('runs at all three SGN terminals', () => {
      const ids = TIA.pickupPoints.map((p) => p.terminalId).sort();
      expect(ids).toEqual(['SGN-T1', 'SGN-T2', 'SGN-T3']);
    });

    it('uses frequency schedule', () => {
      expect(TIA.scheduleSource.kind).toBe('frequency');
      if (TIA.scheduleSource.kind === 'frequency') {
        expect(TIA.scheduleSource.headwayMinutes).toEqual({ peak: 15, normal: 20 });
      }
    });

    it('costs 0 VND (free shuttle)', () => {
      expect(TIA.ticketPrice).toBe(0);
    });
  });
});