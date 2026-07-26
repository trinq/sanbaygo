import { BusRoute, TimeRange } from '../types';
import { addMinutes } from '../utils/time';

export function calculateArrivalEstimate(
  departureTime: string,
  travelTime: { min: number; max: number },
  _isPeak: boolean,
): TimeRange {
  return {
    early: addMinutes(departureTime, travelTime.min),
    late: addMinutes(departureTime, travelTime.max),
    minutesRange: travelTime,
  };
}

export function calculateArrivalEstimateForBus(
  bus: BusRoute,
  departureTime: string,
  isPeak: boolean,
): TimeRange {
  return calculateArrivalEstimate(
    departureTime,
    bus.travelTime[isPeak ? 'peak' : 'normal'],
    isPeak,
  );
}
