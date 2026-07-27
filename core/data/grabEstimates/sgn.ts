import { GrabEstimate } from '../../types';

export const SGN_GRAB_ESTIMATE: GrabEstimate = {
  priceRange: { min: 100000, max: 180000 },
  travelTime: {
    normal: { min: 20, max: 35 },
    peak: { min: 35, max: 55 },
  },
  // Grab Việt Nam confirms (2026-07-26): at SGN-T3 ride-hail (Grab/Be/Xanh SM)
  // is concentrated at pillar 34, Floor 1 of the PNA parking building — not
  // at the curbside lanes outside the terminal. Driver has 3-minute max stop,
  // so user should be inside PNA building before pressing "Book".
  pickupLocation: 'Tầng 1 Nhà để xe PNA — Cột 34',
};
