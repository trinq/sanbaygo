import { BusRoute } from '../../types';

export const BUS_109: BusRoute = {
  id: 'bus-109',
  routeNumber: '109',
  ticketPrice: 15000,
  // Operating hours 05:30 → 22:00 from SGN-T3 ↔ Bến xe buýt Sài Gòn.
  // Confirmed by FUTA City Bus (Phương Trang) press release, Tiền Phong,
  // and SGGP (2026-07-26). Headway 40–45 min, deliberately reduced from
  // prior density since 20/10/2025 per Trung tâm Quản lý Giao thông Công
  // cộng TP.HCM. Last departure 22:00 (city end of route operates 05:45 →
  // 22:15, but SanBayGo only cares about the airport-bound end since users
  // start at SGN).
  operatingHours: { start: '05:30', end: '22:00' },
  travelTime: {
    normal: { min: 30, max: 45 },
    peak: { min: 50, max: 70 },
  },
  pickupPoints: [
    { terminalId: 'SGN-T3', location: 'Ngay tại T3 — cột A17–A20' },
  ],
  scheduleSource: {
    kind: 'explicit',
    // 23 departures, evenly spaced 45 min apart:
    // 05:30, 06:15, 07:00, 07:45, 08:30, 09:15, 10:00, 10:45,
    // 11:30, 12:15, 13:00, 13:45, 14:30, 15:15, 16:00, 16:45,
    // 17:30, 18:15, 19:00, 19:45, 20:30, 21:15, 22:00
    departures: [
      '05:30', '06:15', '07:00', '07:45', '08:30', '09:15', '10:00', '10:45',
      '11:30', '12:15', '13:00', '13:45', '14:30', '15:15', '16:00', '16:45',
      '17:30', '18:15', '19:00', '19:45', '20:30', '21:15', '22:00',
    ],
  },
};

export const BUS_152: BusRoute = {
  id: 'bus-152',
  routeNumber: '152',
  ticketPrice: 5000,
  // Operating hours 05:00 → 22:00 — confirmed by FUTA City Bus (Phương Trang)
  // and Vexere blog (2026-07-26). Fare 5,000 VND regular / 3,000 VND student.
  // Headway 12-20 min; we approximate with ~15 min daytime, ~20 min early/late.
  // Last departure 22:00.
  operatingHours: { start: '05:00', end: '22:00' },
  travelTime: {
    normal: { min: 25, max: 35 },
    peak: { min: 40, max: 55 },
  },
  // Pickup points per terminal (research 2026-07-27):
  //
  // SGN-T1 (domestic, old terminal): Làn B curbside at cột B06–B09.
  //   Exit the domestic arrival hall and walk straight to Làn B (the
  //   second curbside lane after Làn A private vehicles).
  //
  // SGN-T2 (international): Làn B, opposite pillars 4 and 5 of the
  //   international arrival hall. Exit the international arrival hall,
  //   walk straight across Làn A (private-vehicle lane) into Làn B.
  //   Look for the yellow/blue public-bus sign. This is the same area
  //   where the FREE inter-terminal shuttle (T1 ↔ T2 ↔ T3) picks up —
  //   all buses at SGN-T2 stop in this Làn B area. Inter-terminal shuttle
  //   routes are not yet modelled (out of scope).
  pickupPoints: [
    { terminalId: 'SGN-T1', location: 'Làn B ga quốc nội, cột B06–B09' },
    { terminalId: 'SGN-T2', location: 'Làn B, đối diện Cột số 4 và Cột số 5 sảnh đến quốc tế' },
  ],
  scheduleSource: {
    kind: 'explicit',
    departures: [
      // Daytime (05:00 → 18:51): ~15-min headway
      '05:00', '05:18', '05:36', '05:51', '06:06', '06:21', '06:36', '06:51',
      '07:06', '07:21', '07:36', '07:51', '08:06', '08:21', '08:36', '08:51',
      '09:06', '09:21', '09:36', '09:51', '10:06', '10:21', '10:36', '10:51',
      '11:06', '11:21', '11:36', '11:51', '12:06', '12:21', '12:36', '12:51',
      '13:06', '13:21', '13:36', '13:51', '14:06', '14:21', '14:36', '14:51',
      '15:06', '15:21', '15:36', '15:51', '16:06', '16:21', '16:36', '16:51',
      '17:06', '17:21', '17:36', '17:51', '18:06', '18:21', '18:36', '18:51',
      // Evening (19:00 → 22:00): ~20-min headway, last departure 22:00
      '19:00', '19:20', '19:40', '20:00', '20:20', '20:40', '21:00', '21:20', '21:40', '22:00',
    ],
  },
};