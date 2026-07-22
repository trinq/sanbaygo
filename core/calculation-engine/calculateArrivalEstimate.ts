import { TimeRange } from '../types';
import { addMinutes } from '../utils/time';

// Peak hours are already reflected in travelTime.peak values
// We don't add additional peak surcharge here

export function calculateArrivalEstimate(
  departureTime: string,
  travelTime: { min: number; max: number },
  _isPeak: boolean
): TimeRange {
  return {
    early: addMinutes(departureTime, travelTime.min),
    late: addMinutes(departureTime, travelTime.max),
    minutesRange: travelTime,
  };
}
