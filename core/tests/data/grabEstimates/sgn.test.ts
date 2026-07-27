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

  it('specifies Grab pickup at TCP — Làn D1 for SGN-T1', () => {
    // SGN-T1 is the old domestic terminal. All ride-hail brands (Grab,
    // Xanh SM, Be) pick up at the TCP parking building across the street,
    // Lane D1 ground floor — not at Làn B (which is the Bus 152 lane).
    expect(SGN_GRAB_ESTIMATE.pickupLocations?.['SGN-T1']).toBe(
      'Tầng trệt Nhà để xe TCP — Làn D1',
    );
  });

  it('specifies Grab pickup at international ride-hail lot for SGN-T2', () => {
    // SGN-T2 (international) is a SEPARATE building from T1 — it has its own
    // ride-hail lot OUTSIDE the terminal (not the TCP building shared with T1).
    //
    // Walking directions (be.com.vn 2026-07-27):
    //   1. Exit international arrival hall, turn LEFT
    //   2. Walk along the arrival corridor (past pillars 8GF, 9GF, ...)
    //   3. At pillar 5GF (end of corridor), turn RIGHT at the crosswalk
    //   4. Enter the outdoor international ride-hail lot
    //
    // The app shows the exact lane (Làn B or Làn D) per trip — drivers do
    // NOT pool at a fixed lane like T1's Làn D1. User must be at the lot
    // before pressing "Book" (driver max stop = 3 minutes).
    //
    // REGRESSION GUARD: this used to incorrectly point to T1's TCP building.
    // Drivers from T1's TCP would arrive at T2's lot and find no user, and
    // vice versa.
    expect(SGN_GRAB_ESTIMATE.pickupLocations?.['SGN-T2']).toBe(
      'Bãi xe công nghệ quốc tế — vào từ Cột 5GF (rẽ trái men hành lang sảnh đến, rẽ phải qua vạch sang đường)',
    );
  });

  it('SGN-T1 and SGN-T2 have DIFFERENT pickup locations (no shared string)', () => {
    // Each terminal has its own ride-hail infrastructure. Sharing strings
    // is a bug — drivers from different lots cannot serve both terminals.
    expect(SGN_GRAB_ESTIMATE.pickupLocations?.['SGN-T1']).not.toBe(
      SGN_GRAB_ESTIMATE.pickupLocations?.['SGN-T2'],
    );
  });

  it('specifies Grab pickup at PNA — pillar 34 for SGN-T3', () => {
    // SGN-T3 (new, opened April 2025). Grab Việt Nam confirms ride-hail is
    // concentrated at pillar 34, Floor 1 of the PNA parking building — not
    // at curbside lanes. Max driver stop = 3 minutes.
    expect(SGN_GRAB_ESTIMATE.pickupLocations?.['SGN-T3']).toBe(
      'Tầng 1 Nhà để xe PNA — Cột 34',
    );
  });
});