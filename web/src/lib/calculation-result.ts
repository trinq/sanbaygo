import {
  ArrivalResult,
  ArrivalFormData,
  AIRPORTS,
  DESTINATIONS_BY_AIRPORT,
  isPeakHour,
  calculateExitTime,
  findCatchableBusForTerminal,
  calculateArrivalEstimate,
} from '@core';

export function calculateResult(formData: ArrivalFormData): ArrivalResult | null {
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
  const exitTime = calculateExitTime(terminalInfo.type, formData.baggage, formData.flightType);

  const busRecommendation = findCatchableBusForTerminal(
    airport.busRoutes,
    formData.terminal,
    formData.arrivalTime,
    { min: exitTime.minMinutes, max: exitTime.maxMinutes },
    isPeak,
  );

  if (busRecommendation.available && busRecommendation.trip && busRecommendation.trip.selectedRoute) {
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

  return {
    bus: busRecommendation,
    grab: {
      available: true,
      priceEstimate: `${grabEstimate.priceRange.min.toLocaleString()} - ${grabEstimate.priceRange.max.toLocaleString()} VND`,
      travelTime: grabTravelTime,
      pickupLocation: grabEstimate.pickupLocation,
    },
    direction: {
      description: `Đi bộ ${destination.walkingMinutes} phút đến điểm đón xe buýt ${terminalInfo.name}`,
      estimatedMinutes: destination.walkingMinutes,
    },
  };
}