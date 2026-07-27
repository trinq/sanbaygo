import type {
  AirportId,
  TerminalId,
  PickupPoint,
  BusRoute,
} from '../../types';

describe('multi-airport type shape', () => {
  it('AirportId is a discriminated union of two airports', () => {
    const a: AirportId = 'noi-bai';
    const b: AirportId = 'tan-son-nhat';
    expect([a, b]).toHaveLength(2);
  });

  it('TerminalId is airport-scoped (5 literals)', () => {
    const literals: TerminalId[] = ['HAN-T1', 'HAN-T2', 'SGN-T1', 'SGN-T2', 'SGN-T3'];
    expect(literals).toHaveLength(5);
  });

  it('PickupPoint requires terminalId and location', () => {
    const p: PickupPoint = { terminalId: 'HAN-T1', location: 'Tầng 1 sảnh đến' };
    expect(p.terminalId).toBe('HAN-T1');
    expect(p.location).toBe('Tầng 1 sảnh đến');
  });

  it('BusRoute uses scheduleSource discriminated union — explicit kind', () => {
    const r: BusRoute = {
      id: 'bus-86',
      routeNumber: '86',
      ticketPrice: 50000,
      operatingHours: { start: '06:40', end: '22:15' },
      travelTime: { normal: { min: 50, max: 55 }, peak: { min: 65, max: 75 } },
      pickupPoints: [{ terminalId: 'HAN-T1', location: 'Tầng 1' }],
      scheduleSource: { kind: 'explicit', departures: ['06:40', '22:15'] },
    };
    expect(r.scheduleSource.kind).toBe('explicit');
  });
});