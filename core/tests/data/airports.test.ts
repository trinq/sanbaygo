import { AIRPORTS, AIRPORT_LIST, NOI_BAI_AIRPORT } from '../../data/airport';
import { SGN_AIRPORT } from '../../data/airports/sgn';

describe('Airports registry', () => {
  it('NOI_BAI_AIRPORT still exported (back-compat)', () => {
    expect(NOI_BAI_AIRPORT.id).toBe('noi-bai');
  });

  it('SGN_AIRPORT has 3 terminals, 3 bus routes', () => {
    expect(SGN_AIRPORT.id).toBe('tan-son-nhat');
    expect(SGN_AIRPORT.terminals).toHaveLength(3);
    expect(SGN_AIRPORT.busRoutes).toHaveLength(3);
  });

  it('AIRPORTS map has both airports', () => {
    expect(AIRPORTS['noi-bai']).toBe(NOI_BAI_AIRPORT);
    expect(AIRPORTS['tan-son-nhat']).toBe(SGN_AIRPORT);
  });

  it('AIRPORT_LIST contains both airports', () => {
    const ids = AIRPORT_LIST.map((a) => a.id).sort();
    expect(ids).toEqual(['noi-bai', 'tan-son-nhat']);
  });
});
