import { SGN_GRAB_ESTIMATE } from '../../../data/grabEstimates/sgn';

describe('SGN_GRAB_ESTIMATE', () => {
  it('has a price range', () => {
    expect(SGN_GRAB_ESTIMATE.priceRange.min).toBeGreaterThan(0);
    expect(SGN_GRAB_ESTIMATE.priceRange.max).toBeGreaterThan(
      SGN_GRAB_ESTIMATE.priceRange.min,
    );
  });

  it('has a travel time', () => {
    expect(SGN_GRAB_ESTIMATE.travelTime.normal.min).toBeGreaterThan(0);
    expect(SGN_GRAB_ESTIMATE.travelTime.normal.max).toBeGreaterThan(
      SGN_GRAB_ESTIMATE.travelTime.normal.min,
    );
  });

  it('specifies a pickup location at SGN-T3 parking PNA — pillar 34', () => {
    // Grab Việt Nam confirms ride-hail pickup is concentrated at pillar 34,
    // Floor 1 of the PNA parking building (not the curbside lanes outside).
    expect(SGN_GRAB_ESTIMATE.pickupLocation).toBe(
      'Tầng 1 Nhà để xe PNA — Cột 34',
    );
  });
});
