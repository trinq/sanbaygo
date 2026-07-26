import { DESTINATIONS, DESTINATIONS_BY_AIRPORT } from '../../data/destinations';
import { HAN_DESTINATIONS } from '../../data/destinations/han';
import { SGN_DESTINATIONS } from '../../data/destinations/sgn';

describe('Destinations', () => {
  it('HAN_DESTINATIONS has 6 entries (5 quận + other)', () => {
    expect(HAN_DESTINATIONS).toHaveLength(6);
  });

  it('SGN_DESTINATIONS has 5 quận', () => {
    expect(SGN_DESTINATIONS).toHaveLength(5);
  });

  it('all SGN destinations have bus coverage', () => {
    expect(SGN_DESTINATIONS.every((d) => d.hasBusCoverage)).toBe(true);
  });

  it('DESTINATIONS_BY_AIRPORT maps both airports', () => {
    expect(DESTINATIONS_BY_AIRPORT['noi-bai']).toBe(HAN_DESTINATIONS);
    expect(DESTINATIONS_BY_AIRPORT['tan-son-nhat']).toBe(SGN_DESTINATIONS);
  });

  it('DESTINATIONS flat list is a union (back-compat)', () => {
    expect(DESTINATIONS).toHaveLength(HAN_DESTINATIONS.length + SGN_DESTINATIONS.length);
  });
});
