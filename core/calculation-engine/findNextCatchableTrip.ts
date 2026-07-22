import { BusRecommendation } from '../types';
import { BUS_86 } from '../data/busSchedule';
import { isAfterOrEqual, addMinutes, timeToMinutes } from '../utils/time';

const WALKING_TO_PICKUP_MINUTES = 5;

export function findNextCatchableTrip(
  arrivalTime: string,
  exitTimeMinutes: { min: number; max: number }
): BusRecommendation {
  // Calculate when passenger will be ready at pickup point (use max for safety)
  const readyTime = addMinutes(arrivalTime, exitTimeMinutes.max + WALKING_TO_PICKUP_MINUTES);
  
  // Check if within operating hours - too late if after last bus
  if (isAfterOrEqual(readyTime, BUS_86.operatingHours.end)) {
    return {
      available: false,
      reason: 'too_late',
    };
  }

  // Check if after first departure (can potentially catch a bus)
  if (isAfterOrEqual(readyTime, BUS_86.operatingHours.start)) {
    // Find first trip of the day that is >= readyTime
    const catchableTrip = BUS_86.schedule.find(departure => 
      isAfterOrEqual(departure, readyTime)
    );

    if (!catchableTrip) {
      return {
        available: false,
        reason: 'missed_last',
      };
    }

    return {
      available: true,
      trip: {
        departureTime: catchableTrip,
        waitMinutes: calculateWaitMinutes(readyTime, catchableTrip),
        ticketPrice: BUS_86.ticketPrice,
      },
    };
  }

  // Before operating hours start (readyTime < start)
  return {
    available: false,
    reason: 'no_service',
  };
}

function calculateWaitMinutes(readyTime: string, departureTime: string): number {
  return timeToMinutes(departureTime) - timeToMinutes(readyTime);
}
