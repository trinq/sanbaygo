import { BUS_152_MAP } from '../../../data/route-maps/bus152';

describe('BUS_152_MAP', () => {
  it('has correct route number', () => {
    expect(BUS_152_MAP.routeNumber).toBe('152');
  });

  it('has outbound and return stops', () => {
    expect(BUS_152_MAP.outboundStops.length).toBeGreaterThan(0);
    expect(BUS_152_MAP.returnStops.length).toBeGreaterThan(0);
  });

  it('maps q3 to le-lai', () => {
    expect(BUS_152_MAP.destinationToStopId['q3']).toBe('le-lai');
  });

  it('maps q5 to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['q5']).toBe('tran-hung-dao');
  });

  it('maps binh-thanh to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['binh-thanh']).toBe('tran-hung-dao');
  });

  it('maps phu-nhuan to tran-hung-dao', () => {
    expect(BUS_152_MAP.destinationToStopId['phu-nhuan']).toBe('tran-hung-dao');
  });

  it('maps q1 to ben-thanh', () => {
    expect(BUS_152_MAP.destinationToStopId['q1']).toBe('ben-thanh');
  });
});
