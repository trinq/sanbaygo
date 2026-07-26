import { BusRecommendation, BusRoute, TerminalId } from '../types';
import { findNextCatchableTrip } from './findNextCatchableTrip';

export function findCatchableBusForTerminal(
  buses: BusRoute[],
  terminalId: TerminalId,
  arrivalTime: string,
  exitTimeMinutes: { min: number; max: number },
  isPeak = false,
): BusRecommendation {
  const matching = buses.filter((b) =>
    b.pickupPoints.some((p) => p.terminalId === terminalId),
  );

  if (matching.length === 0) {
    return { available: false, reason: 'no_service' };
  }

  const candidates = matching
    .map((bus) => findNextCatchableTrip(bus, arrivalTime, exitTimeMinutes, isPeak))
    .filter((r) => r.available && r.trip) as Array<BusRecommendation & { trip: NonNullable<BusRecommendation['trip']> }>;

  if (candidates.length === 0) {
    return { available: false, reason: 'no_service' };
  }

  candidates.sort((a, b) => {
    const priceDiff = a.trip.ticketPrice - b.trip.ticketPrice;
    if (priceDiff !== 0) return priceDiff;
    return a.trip.waitMinutes - b.trip.waitMinutes;
  });

  return candidates[0];
}
