/**
 * Canonical trip-calculation entry point.
 *
 * All callers — web, RN, future clients — delegate here instead of
 * re-implementing the same pipeline (isPeak → exitTime → findBus →
 * arrivalEstimate → grabEstimate → result).
 *
 * The engine functions (calculateExitTime, findCatchableBusForTerminal,
 * calculateArrivalEstimate, isPeakHour) are tested in isolation.  This
 * module tests the *composition* and is the single seam for UI-layer callers.
 */
import type { ArrivalFormData, ArrivalResult } from './types';
import {
  AIRPORTS,
  DESTINATIONS_BY_AIRPORT,
  calculateExitTime,
  findCatchableBusForTerminal,
  calculateArrivalEstimate,
  isPeakHour,
} from './index';

export function calculateTrip(formData: ArrivalFormData): ArrivalResult | null {
  if (!formData.terminal || !formData.baggage || !formData.destination) {
    return null;
  }

  const airport = AIRPORTS[formData.airportId];
  if (!airport) return null;

  const terminalInfo = airport.terminals.find((t) => t.id === formData.terminal);
  const destinations = DESTINATIONS_BY_AIRPORT[formData.airportId];
  const destination = destinations.find((d) => d.id === formData.destination);

  if (!terminalInfo || !destination) return null;

  const isPeak = isPeakHour(formData.arrivalTime);
  const exitTime = calculateExitTime(
    terminalInfo.type,
    formData.baggage,
    formData.flightType,
  );

  const busRecommendation = findCatchableBusForTerminal(
    airport.busRoutes,
    formData.terminal,
    formData.arrivalTime,
    { min: exitTime.minMinutes, max: exitTime.maxMinutes },
    isPeak,
  );

  // Derive arrival estimate using the already-selected route so we don't
  // need a second lookup over airport.busRoutes.
  if (
    busRecommendation.available &&
    busRecommendation.trip &&
    busRecommendation.trip.selectedRoute
  ) {
    const selectedRoute = busRecommendation.trip.selectedRoute;
    busRecommendation.trip.arrivalEstimate = calculateArrivalEstimate(
      busRecommendation.trip.departureTime,
      selectedRoute.travelTime[isPeak ? 'peak' : 'normal'],
      isPeak,
    );
  }

  const grabEstimate = airport.grabEstimates;
  const grabTravelTime = calculateArrivalEstimate(
    formData.arrivalTime,
    grabEstimate.travelTime[isPeak ? 'peak' : 'normal'],
    isPeak,
  );

  // Per-terminal Grab pickup hint (SGN terminals have distinct pickup areas;
  // HAN terminals are curbside, so this is undefined and the UI falls back
  // to the bus pickup point).
  const resolvedGrabPickupLocation =
    grabEstimate.pickupLocations?.[formData.terminal];

  return {
    bus: busRecommendation,
    grab: {
      available: true,
      priceEstimate: `${grabEstimate.priceRange.min.toLocaleString()} - ${grabEstimate.priceRange.max.toLocaleString()} VND`,
      travelTime: grabTravelTime,
      pickupLocation: resolvedGrabPickupLocation,
    },
    direction: {
      description: `Đi bộ ${destination.walkingMinutes} phút đến điểm đón xe buýt ${terminalInfo.name}`,
      estimatedMinutes: destination.walkingMinutes,
    },
  };
}
