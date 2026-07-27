import { GrabEstimate } from '../../types';

export const SGN_GRAB_ESTIMATE: GrabEstimate = {
  priceRange: { min: 100000, max: 180000 },
  travelTime: {
    normal: { min: 20, max: 35 },
    peak: { min: 35, max: 55 },
  },
  // Ride-hail pickup is NOT curbside at any SGN terminal. Each terminal
  // has its own dedicated ride-hail infrastructure.
  //
  // Sources (2026-07-27):
  //   - mia.vn cam-nang-du-lich (SGN-T1)
  //   - vnexpress.net/xe-cong-nghe-co-lan-rieng-don-khach-o-tan-son-nhat
  //   - dienmaycholon.com/so-do-san-bay-tan-son-nhat-chi-tiet
  //   - be.com.vn/be-airport/huong-dan-diem-don-becar-lan-b-ga-quoc-noi-san-bay-tan-son-nhat (SGN-T2)
  //   - grab.com/vn/blog/driver/car/sanbaytansonnhat (SGN-T2)
  //   - facebook.com/groups/Grouptinhte
  //
  // ─────────────────────────────────────────────────────────────────
  // SGN-T1 (old domestic terminal, ga cũ quốc nội)
  // ─────────────────────────────────────────────────────────────────
  // All ride-hail brands (Grab, Xanh SM, Be) pick up at the TCP parking
  // building across from the arrival hall, Lane D1 ground floor. Lane D2
  // is overflow. Lanes A/B/C in front of the terminal are for private
  // vehicles + Bus 152 (NOT ride-hail).
  //
  // ─────────────────────────────────────────────────────────────────
  // SGN-T2 (international terminal, ga quốc tế)
  // ─────────────────────────────────────────────────────────────────
  // T2 is a SEPARATE building from T1 with its own dedicated ride-hail
  // lot OUTDOORS, accessible via the arrival corridor. Drivers do NOT
  // pool with T1's TCP building.
  //
  // Walking directions:
  //   1. Exit international arrival hall, turn LEFT
  //   2. Walk along the arrival corridor (past pillars 8GF, 9GF, ...)
  //   3. At pillar 5GF (end of corridor), turn RIGHT at the crosswalk
  //   4. Enter the outdoor international ride-hail lot
  //
  // The app shows the exact lane (Làn B or Làn D) per trip — there is
  // NO fixed lane like T1's Làn D1. User must exit to the lot before
  // pressing "Book" (driver max stop = 3 minutes).
  //
  // ─────────────────────────────────────────────────────────────────
  // SGN-T3 (new domestic terminal, opened April 2025)
  // ─────────────────────────────────────────────────────────────────
  // Separate PNA parking building. Pillar 34, Floor 1. Grab VN confirmed.
  // Driver has 3-minute max stop, so user must be inside PNA before
  // pressing "Book".
  //
  // ─────────────────────────────────────────────────────────────────
  // MOTORBIKE pickup (GrabBike, BeBike, Xanh SM Bike)
  // ─────────────────────────────────────────────────────────────────
  // Motorbikes do NOT pick up at any of the ride-hail lanes. They meet
  // at the gate OUTSIDE the parking buildings, heading toward đường
  // Trường Sơn. Out of scope for this field (vehicle-type split not
  // modelled yet).
  //
  // ─────────────────────────────────────────────────────────────────
  // AIRPORT FEE
  // ─────────────────────────────────────────────────────────────────
  // App prices usually exclude 10,000–15,000 VND airport access fee —
  // user pays this directly to the driver in cash.
  pickupLocations: {
    'SGN-T1': 'Tầng trệt Nhà để xe TCP — Làn D1',
    'SGN-T2':
      'Bãi xe công nghệ quốc tế — vào từ Cột 5GF (rẽ trái men hành lang sảnh đến, rẽ phải qua vạch sang đường)',
    'SGN-T3': 'Tầng 1 Nhà để xe PNA — Cột 34',
  },
};