import { BUS_109, BUS_152 } from '../../../data/busSchedules/sgn';

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

    it('operates 05:30 → 22:00 (SGN-T3 ↔ Bến xe buýt Sài Gòn)', () => {
      expect(BUS_109.operatingHours).toEqual({ start: '05:30', end: '22:00' });
    });

    it('departures are evenly spaced (40-45 min headway, FUTA City Bus confirmed)', () => {
      if (BUS_109.scheduleSource.kind !== 'explicit') return;
      const toMin = (s: string) => {
        const [h, m] = s.split(':').map(Number);
        return h * 60 + m;
      };
      const departures = BUS_109.scheduleSource.departures.map(toMin);
      for (let i = 1; i < departures.length; i += 1) {
        const gap = departures[i] - departures[i - 1];
        expect(gap).toBeGreaterThanOrEqual(40);
        expect(gap).toBeLessThanOrEqual(45);
      }
    });

    it('first departure is 05:30 and last is 22:00 (FUTA City Bus confirmed)', () => {
      if (BUS_109.scheduleSource.kind !== 'explicit') return;
      const d = BUS_109.scheduleSource.departures;
      expect(d[0]).toBe('05:30');
      expect(d[d.length - 1]).toBe('22:00');
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

    it('operates 05:00–22:00 (FUTA City Bus confirmed)', () => {
      expect(BUS_152.operatingHours).toEqual({ start: '05:00', end: '22:00' });
    });

    it('last departure is 22:00', () => {
      if (BUS_152.scheduleSource.kind !== 'explicit') return;
      const departures = BUS_152.scheduleSource.departures;
      const last = departures[departures.length - 1];
      expect(last).toBe('22:00');
    });

    it('costs 5,000 VND (regular fare, FUTA City Bus confirmed)', () => {
      expect(BUS_152.ticketPrice).toBe(5000);
    });

    it('SGN-T2 pickup is at Làn B, opposite pillars 4 and 5 of international arrival', () => {
      // Source: SGN-T2 ground-floor research 2026-07-27.
      // All buses at SGN-T2 (including inter-terminal shuttles) stop at
      // Làn B — across the Làn A private-vehicle lane, opposite pillars 4
      // and 5 of the international arrival hall. Look for the yellow/blue
      // public-bus sign. The previous "Làn B gần sảnh đến quốc tế" string
      // was too vague — users did not know how to find the actual stop.
      const t2 = BUS_152.pickupPoints.find((p) => p.terminalId === 'SGN-T2');
      expect(t2?.location).toBe(
        'Làn B, đối diện Cột số 4 và Cột số 5 sảnh đến quốc tế',
      );
    });
  });
});