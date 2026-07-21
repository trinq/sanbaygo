import {
  TransportComparison,
  TransportOption,
  TripCalculationRequest,
  TripCalculationResponse,
  SortOption,
} from '../types';
import { TRANSPORT_OPTIONS, getScoreLabel } from './transport-data';
import {
  isPeakHour,
  calculateExitTime,
  timeToMinutes,
  addMinutes,
} from './calculation-engine';
import { BUS_86 } from './data';

const WALKING_TO_PICKUP_MINUTES = 5;

function calculatePrice(option: TransportOption, isPeak: boolean): number {
  if (option.id === 'BUS_86') {
    return option.basePrice;
  }

  const airportToll = 15000;
  const peakSurge = isPeak ? 1.25 : 1.0;

  return Math.round((option.basePrice + airportToll) * peakSurge);
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

function buildComparison(
  option: TransportOption,
  _arrivalTime: string,
  isPeak: boolean,
  readyAt: string
): TransportComparison {
  const isBus86 = option.id === 'BUS_86';

  let waitTime: WaitTimeResult | undefined;
  if (isBus86) {
    const readyMinutes = timeToMinutes(readyAt);
    for (const departure of BUS_86.schedule) {
      if (timeToMinutes(departure) >= readyMinutes) {
        waitTime = {
          minutes: timeToMinutes(departure) - readyMinutes,
          nextDeparture: departure,
        };
        break;
      }
    }
  }

  const travelTimeRange = isPeak ? option.travelTime.peak : option.travelTime.normal;

  const startTime = isBus86 && waitTime ? waitTime.nextDeparture : readyAt;
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
      isEstimate: !isBus86,
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
  const { arrivalTime, terminalId, baggageType, sortBy } = request;

  const isPeak = isPeakHour(arrivalTime);
  const exitTime = calculateExitTime(
    terminalId === 'T1' ? 'domestic' : 'international',
    baggageType
  );

  const readyAt = addMinutes(
    arrivalTime,
    exitTime.maxMinutes + WALKING_TO_PICKUP_MINUTES
  );

  const comparisons = TRANSPORT_OPTIONS.map((option) =>
    buildComparison(option, arrivalTime, isPeak, readyAt)
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
