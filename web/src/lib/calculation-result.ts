import {
  ArrivalResult,
  ArrivalFormData,
  AIRPORTS,
  DESTINATIONS_BY_AIRPORT,
  isPeakHour,
  calculateExitTime,
  findCatchableBusForTerminal,
  calculateArrivalEstimateForBus,
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

  if (busRecommendation.available && busRecommendation.trip) {
    const matchedBus = airport.busRoutes.find((b) =>
      b.pickupPoints.some((p) => p.terminalId === formData.terminal),
    );
    if (matchedBus) {
      busRecommendation.trip.arrivalEstimate = calculateArrivalEstimateForBus(
        matchedBus,
        busRecommendation.trip.departureTime,
        isPeak,
      );
    }
  }

  const grabTravelTime = calculateArrivalEstimateForBus(
    airport.busRoutes[0],
    formData.arrivalTime,
    isPeak,
  );
  const grabEstimate = airport.grabEstimates;
  grabTravelTime.minutesRange = grabEstimate.travelTime[isPeak ? 'peak' : 'normal'];
  grabTravelTime.early = ((): string => {
    const [h, m] = formData.arrivalTime.split(':').map(Number);
    const totalMin = h * 60 + m + grabEstimate.travelTime[isPeak ? 'peak' : 'normal'].min;
    const hh = Math.floor(totalMin / 60) % 24;
    const mm = totalMin % 60;
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
  })();
  grabTravelTime.late = ((): string => {
    const [h, m] = formData.arrivalTime.split(':').map(Number);
    const totalMin = h * 60 + m + grabEstimate.travelTime[isPeak ? 'peak' : 'normal'].max;
    const hh = Math.floor(totalMin / 60) % 24;
    const mm = totalMin % 60;
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
  })();

  return {
    bus: busRecommendation,
    grab: {
      available: true,
      priceEstimate: `${grabEstimate.priceRange.min.toLocaleString()} - ${grabEstimate.priceRange.max.toLocaleString()} VND`,
      travelTime: grabTravelTime,
    },
    direction: {
      description: `Đi bộ ${destination.walkingMinutes} phút đến điểm đón xe buýt ${terminalInfo.name}`,
      estimatedMinutes: destination.walkingMinutes,
    },
  };
}
