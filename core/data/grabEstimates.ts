import { GrabEstimate } from '../types';

export const GRAB_ESTIMATE: GrabEstimate = {
  priceRange: { min: 250000, max: 350000 },
  travelTime: {
    normal: { min: 40, max: 60 },
    peak: { min: 60, max: 90 },
  },
};
