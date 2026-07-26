import { BusRecommendation, BusRoute, TerminalId } from '../types';
import { findNextCatchableTrip } from './findNextCatchableTrip';

type Candidate = {
  bus: BusRoute;
  recommendation: BusRecommendation & { trip: NonNullable<BusRecommendation['trip']> };
};

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

  const candidates: Candidate[] = matching
    .map((bus) => {
      const recommendation = findNextCatchableTrip(
        bus,
        arrivalTime,
        exitTimeMinutes,
        isPeak,
      );
      return recommendation.available && recommendation.trip
        ? ({ bus, recommendation } as Candidate)
        : null;
    })
    .filter((c): c is Candidate => c !== null);

  if (candidates.length === 0) {
    return { available: false, reason: 'no_service' };
  }

  candidates.sort((a, b) => {
    const kindRank = (s: BusRoute['scheduleSource']) => (s.kind === 'explicit' ? 0 : 1);
    const aKind = kindRank(a.bus.scheduleSource);
    const bKind = kindRank(b.bus.scheduleSource);
    if (aKind !== bKind) return aKind - bKind;

    const priceDiff = a.recommendation.trip.ticketPrice - b.recommendation.trip.ticketPrice;
    if (priceDiff !== 0) return priceDiff;

    return a.recommendation.trip.waitMinutes - b.recommendation.trip.waitMinutes;
  });

  const chosen = candidates[0];
  if (chosen.recommendation.trip) {
    chosen.recommendation.trip.selectedRoute = chosen.bus;
  }
  return chosen.recommendation;
}
