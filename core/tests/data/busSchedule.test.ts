import { BUS_86 } from '../../data/busSchedule';

describe('BUS_86', () => {
  it('declares pickupPoints for both HAN terminals', () => {
    expect(BUS_86.pickupPoints).toHaveLength(2);
    const ids = BUS_86.pickupPoints.map((p) => p.terminalId).sort();
    expect(ids).toEqual(['HAN-T1', 'HAN-T2']);
  });

  it('uses explicit scheduleSource', () => {
    expect(BUS_86.scheduleSource.kind).toBe('explicit');
    if (BUS_86.scheduleSource.kind === 'explicit') {
      expect(BUS_86.scheduleSource.departures).toContain('06:40');
      expect(BUS_86.scheduleSource.departures).toContain('22:15');
    }
  });

  it('preserves existing ticket price and operating hours', () => {
    expect(BUS_86.ticketPrice).toBe(50000);
    expect(BUS_86.operatingHours).toEqual({ start: '06:40', end: '22:15' });
  });
});
