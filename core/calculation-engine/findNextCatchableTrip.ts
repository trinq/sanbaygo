import { BusRecommendation, BusRoute, TimeRange } from '../types';
import { isAfterOrEqual, addMinutes, timeToMinutes, minutesToTime } from '../utils/time';

const WALKING_TO_PICKUP_MINUTES = 5;

export function findNextCatchableTrip(
  busRoute: BusRoute,
  arrivalTime: string,
  exitTimeMinutes: { min: number; max: number },
  isPeak = false,
): BusRecommendation {
  const readyTime = addMinutes(arrivalTime, exitTimeMinutes.max + WALKING_TO_PICKUP_MINUTES);

  if (busRoute.scheduleSource.kind === 'frequency') {
    return findNextFrequencyTrip(busRoute, arrivalTime, readyTime, isPeak);
  }

  return findNextExplicitTrip(busRoute, readyTime);
}

function findNextExplicitTrip(busRoute: BusRoute, readyTime: string): BusRecommendation {
  const departures = busRoute.scheduleSource.kind === 'explicit'
    ? busRoute.scheduleSource.departures
    : [];

  if (isAfterOrEqual(readyTime, busRoute.operatingHours.end)) {
    return { available: false, reason: 'too_late' };
  }

  if (isAfterOrEqual(readyTime, busRoute.operatingHours.start)) {
    const catchable = departures.find((d) => isAfterOrEqual(d, readyTime));
    if (!catchable) {
      return { available: false, reason: 'missed_last' };
    }
    return {
      available: true,
      trip: {
        departureTime: catchable,
        waitMinutes: calculateWaitMinutes(readyTime, catchable),
        ticketPrice: busRoute.ticketPrice,
      },
    };
  }

  return { available: false, reason: 'no_service' };
}

function findNextFrequencyTrip(
  busRoute: BusRoute,
  arrivalTime: string,
  readyTime: string,
  isPeak: boolean,
): BusRecommendation {
  if (busRoute.scheduleSource.kind !== 'frequency') {
    return { available: false, reason: 'no_service' };
  }

  const startMinutes = timeToMinutes(busRoute.operatingHours.start);
  const endMinutes = timeToMinutes(busRoute.operatingHours.end);
  const readyMinutes = timeToMinutes(readyTime);
  const arrivalMinutes = timeToMinutes(arrivalTime);
  const wrap = startMinutes > endMinutes;
  const inService = wrap
    ? (readyMinutes >= startMinutes || readyMinutes <= endMinutes)
    : (readyMinutes >= startMinutes && readyMinutes <= endMinutes);

  if (!inService) {
    const arrivalInService = wrap
      ? (arrivalMinutes >= startMinutes || arrivalMinutes <= endMinutes)
      : (arrivalMinutes >= startMinutes && arrivalMinutes <= endMinutes);
    return arrivalInService
      ? { available: false, reason: 'too_late' }
      : { available: false, reason: 'no_service' };
  }

  const headway = isPeak
    ? busRoute.scheduleSource.headwayMinutes.peak
    : busRoute.scheduleSource.headwayMinutes.normal;

  const offsetMinutes = readyMinutes - startMinutes;
  const targetMinutes = startMinutes + Math.ceil(offsetMinutes / headway) * headway;
  const departureTime = minutesToTime(targetMinutes);

  return {
    available: true,
    trip: {
      departureTime,
      waitMinutes: calculateWaitMinutes(readyTime, departureTime),
      ticketPrice: busRoute.ticketPrice,
    },
  };
}

function calculateWaitMinutes(readyTime: string, departureTime: string): number {
  return timeToMinutes(departureTime) - timeToMinutes(readyTime);
}

// Re-export for backwards compatibility
export type { TimeRange };
