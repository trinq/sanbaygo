// Calculation engine for web
// Re-implements parent repo's calculation-engine for the web platform

import { 
  ArrivalResult, 
  ArrivalFormData, 
  BaggageType, 
  FlightType,
  BusRecommendation,
  TimeRange,
  ExitTimeResult,
  TerminalType
} from '../types';
import { 
  BUS_86, 
  DESTINATIONS, 
  NOI_BAI_AIRPORT, 
  EXIT_TIME_ESTIMATES 
} from './data';
import { timeToMinutes, addMinutes } from './time';

// Peak hour detection
const PEAK_MORNING_START = '07:00';
const PEAK_MORNING_END = '09:00';
const PEAK_EVENING_START = '17:00';
const PEAK_EVENING_END = '19:00';

export function isPeakHour(time: string): boolean {
  const t = timeToMinutes(time);
  const morningStart = timeToMinutes(PEAK_MORNING_START);
  const morningEnd = timeToMinutes(PEAK_MORNING_END);
  const eveningStart = timeToMinutes(PEAK_EVENING_START);
  const eveningEnd = timeToMinutes(PEAK_EVENING_END);
  
  const isMorningPeak = t >= morningStart && t <= morningEnd;
  const isEveningPeak = t >= eveningStart && t <= eveningEnd;
  return isMorningPeak || isEveningPeak;
}

// Exit time calculation
export function calculateExitTime(
  terminal: TerminalType,
  baggage: BaggageType,
  flightType: FlightType = 'domestic'
): ExitTimeResult {
  const isInternational = terminal === 'international' || flightType === 'international';

  const estimate = EXIT_TIME_ESTIMATES.find(
    e => e.terminalType === terminal
      && e.baggageType === baggage
      && (isInternational ? e.flightType === 'international' : true)
  );

  if (!estimate) {
    return { minMinutes: 30, maxMinutes: 60 };
  }

  return {
    minMinutes: estimate.minMinutes,
    maxMinutes: estimate.maxMinutes,
  };
}

// Arrival estimate calculation
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

// Find next catchable trip
const WALKING_TO_PICKUP_MINUTES = 5;

function isAfterOrEqual(time1: string, time2: string): boolean {
  return timeToMinutes(time1) >= timeToMinutes(time2);
}

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
    const catchableTrip = BUS_86.schedule.find((departure: string) => 
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

// Main calculation result function
export function calculateResult(formData: ArrivalFormData): ArrivalResult | null {
  if (!formData.terminal || !formData.baggage || !formData.destination) {
    return null;
  }

  const terminalInfo = NOI_BAI_AIRPORT.terminals.find(t => t.id === formData.terminal);
  const destination = DESTINATIONS.find(d => d.id === formData.destination);

  if (!terminalInfo || !destination) {
    return null;
  }

  const isPeak = isPeakHour(formData.arrivalTime);
  const exitTime = calculateExitTime(terminalInfo.type, formData.baggage, formData.flightType);
  const busRecommendation = findNextCatchableTrip(
    formData.arrivalTime,
    { min: exitTime.minMinutes, max: exitTime.maxMinutes }
  );

  if (busRecommendation.available && busRecommendation.trip) {
    busRecommendation.trip.arrivalEstimate = calculateArrivalEstimate(
      busRecommendation.trip.departureTime,
      BUS_86.travelTime[isPeak ? 'peak' : 'normal'],
      isPeak
    );
  }

  const grabTravelTime = calculateArrivalEstimate(
    formData.arrivalTime,
    NOI_BAI_AIRPORT.grabEstimates.travelTime[isPeak ? 'peak' : 'normal'],
    isPeak
  );

  return {
    bus: busRecommendation,
    grab: {
      available: true,
      priceEstimate: `${NOI_BAI_AIRPORT.grabEstimates.priceRange.min.toLocaleString()} - ${NOI_BAI_AIRPORT.grabEstimates.priceRange.max.toLocaleString()} VND`,
      travelTime: grabTravelTime,
    },
    direction: {
      description: `Đi bộ ${destination.walkingMinutes} phút đến điểm đón xe buýt ${terminalInfo.name}`,
      estimatedMinutes: destination.walkingMinutes,
    },
  };
}

// Re-export time utilities for convenience
export { timeToMinutes, addMinutes, minutesToTime, isAfterOrEqual } from './time';
export { formatTimeRange, formatPrice } from './time';
