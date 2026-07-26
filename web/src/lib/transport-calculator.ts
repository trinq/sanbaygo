import {
  TransportComparison,
  TransportOption,
  TripCalculationRequest,
  TripCalculationResponse,
  SortOption,
} from '@core';
import { AIRPORTS } from '@core';
import { TRANSPORT_OPTIONS, getScoreLabel } from './transport-data';
import {
  isPeakHour,
  calculateExitTime,
  timeToMinutes,
  addMinutes,
} from '@core';

const WALKING_TO_PICKUP_MINUTES = 5;
const AIRPORT_TOLL_VND = 15000;
const PEAK_SURGE = 1.25;

function calculatePrice(option: TransportOption, isPeak: boolean): number {
  if (option.type === 'bus') {
    return option.basePrice;
  }

  const peakSurge = isPeak ? PEAK_SURGE : 1.0;

  return Math.round((option.basePrice + AIRPORT_TOLL_VND) * peakSurge);
}

function formatPrice(value: number): string {
  return value.toLocaleString('vi-VN') + ' VND';
}

function formatTimeRange(startTime: string, range: { min: number; max: number }): string {
  const early = addMinutes(startTime, range.min);
  const late = addMinutes(startTime, range.max);
  return `${early} - ${late}`;
}

interface WaitTimeResult {
  minutes: number;
  nextDeparture: string;
}

function findNextDeparture(departures: string[], readyMinutes: number): string | null {
  for (const departure of departures) {
    if (timeToMinutes(departure) >= readyMinutes) {
      return departure;
    }
  }
  return null;
}

function buildComparison(
  option: TransportOption,
  airportBusDepartures: string[] | null,
  _arrivalTime: string,
  isPeak: boolean,
  readyAt: string
): TransportComparison {
  const isBus = option.type === 'bus' && airportBusDepartures !== null;

  let waitTime: WaitTimeResult | undefined;
  if (isBus && airportBusDepartures) {
    const readyMinutes = timeToMinutes(readyAt);
    const next = findNextDeparture(airportBusDepartures, readyMinutes);
    if (next) {
      waitTime = {
        minutes: timeToMinutes(next) - readyMinutes,
        nextDeparture: next,
      };
    }
  }

  const travelTimeRange = isPeak ? option.travelTime.peak : option.travelTime.normal;

  const startTime = isBus && waitTime ? waitTime.nextDeparture : readyAt;
  const arrivalEstimate = formatTimeRange(startTime, travelTimeRange);

  const priceValue = calculatePrice(option, isPeak);

  return {
    id: option.id,
    name: option.name,
    nameVi: option.nameVi,
    type: option.type,
    price: {
      estimate: formatPrice(priceValue),
      value: priceValue,
      isEstimate: !isBus,
    },
    travelTime: {
      estimate: `${travelTimeRange.min}-${travelTimeRange.max} phút`,
      minutesRange: travelTimeRange,
      arrivalEstimate,
    },
    waitTime,
    luggage: {
      score: option.luggageScore,
      label: getScoreLabel(option.luggageScore),
    },
    comfort: {
      score: option.comfortScore,
      label: getScoreLabel(option.comfortScore),
    },
    ecoFriendly: option.ecoFriendly,
    notes: option.notes,
    isRecommended: option.isRecommended,
  };
}

export function sortComparisons(
  comparisons: TransportComparison[],
  sortBy: SortOption
): TransportComparison[] {
  const sorted = [...comparisons];

  switch (sortBy) {
    case 'cheapest':
      return sorted.sort((a, b) => a.price.value - b.price.value);

    case 'fastest':
      return sorted.sort((a, b) => a.travelTime.minutesRange.min - b.travelTime.minutesRange.min);

    case 'recommended':
    default:
      return sorted.sort((a, b) => {
        if (a.isRecommended && !b.isRecommended) return -1;
        if (!a.isRecommended && b.isRecommended) return 1;
        return 0;
      });
  }
}

export function calculateTripComparison(
  request: TripCalculationRequest
): TripCalculationResponse {
  const { arrivalTime, airportId, terminalId, baggageType, sortBy } = request;

  const airport = AIRPORTS[airportId];
  const terminalInfo = airport?.terminals.find((t) => t.id === terminalId);

  const isPeak = isPeakHour(arrivalTime);
  const exitTime = calculateExitTime(
    terminalInfo?.type ?? 'domestic',
    baggageType,
  );

  const readyAt = addMinutes(
    arrivalTime,
    exitTime.maxMinutes + WALKING_TO_PICKUP_MINUTES
  );

  const airportBusRoute = airport?.busRoutes[0];
  const airportBusDepartures =
    airportBusRoute?.scheduleSource.kind === 'explicit'
      ? airportBusRoute.scheduleSource.departures
      : null;

  const comparisons = TRANSPORT_OPTIONS.map((option) =>
    buildComparison(option, airportBusDepartures, arrivalTime, isPeak, readyAt)
  );

  return {
    comparison: sortComparisons(comparisons, sortBy),
    metadata: {
      arrivalTime,
      readyAt,
      isPeakHour: isPeak,
    },
  };
}

// Export types for testing
export type { WaitTimeResult };