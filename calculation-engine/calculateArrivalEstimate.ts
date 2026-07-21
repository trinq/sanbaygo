import { TimeRange } from '../types';
import { addMinutes } from '../utils/time';

// Peak hours add 30 minutes to travel time
const PEAK_SURCHARGE_MIN = 30;

export function calculateArrivalEstimate(
  departureTime: string,
  travelTime: { min: number; max: number },
  isPeak: boolean
): TimeRange {
  let adjustedTravelTime: { min: number; max: number };
  
  if (isPeak) {
    adjustedTravelTime = {
      min: travelTime.min + PEAK_SURCHARGE_MIN,
      max: travelTime.max + PEAK_SURCHARGE_MIN,
    };
  } else {
    adjustedTravelTime = travelTime;
  }
  
  return {
    early: addMinutes(departureTime, adjustedTravelTime.min),
    late: addMinutes(departureTime, adjustedTravelTime.max),
    minutesRange: adjustedTravelTime,
  };
}
