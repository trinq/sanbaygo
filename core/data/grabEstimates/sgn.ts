import { GrabEstimate } from '../../types';

export const SGN_GRAB_ESTIMATE: GrabEstimate = {
  priceRange: { min: 100000, max: 180000 },
  travelTime: {
    normal: { min: 20, max: 35 },
    peak: { min: 35, max: 55 },
  },
};
