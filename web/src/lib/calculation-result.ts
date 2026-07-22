// Calculation result orchestration — wires core functions into the ArrivalResult shape
import {
  ArrivalResult,
  ArrivalFormData,
  NOI_BAI_AIRPORT,
  DESTINATIONS,
  isPeakHour,
  calculateExitTime,
  findNextCatchableTrip,
  calculateArrivalEstimate,
} from '@core';

export function calculateResult(formData: ArrivalFormData): ArrivalResult | null {
  if (!formData.terminal || !formData.baggage || !formData.destination) {
    return null;
  }

  const terminalInfo = NOI_BAI_AIRPORT.terminals.find((t) => t.id === formData.terminal);
  const destination = DESTINATIONS.find((d) => d.id === formData.destination);

  if (!terminalInfo || !destination) {
    return null;
  }

  const isPeak = isPeakHour(formData.arrivalTime);
  const exitTime = calculateExitTime(
    terminalInfo.type,
    formData.baggage,
    formData.flightType
  );
  const busRecommendation = findNextCatchableTrip(
    formData.arrivalTime,
    { min: exitTime.minMinutes, max: exitTime.maxMinutes }
  );

  if (busRecommendation.available && busRecommendation.trip) {
    busRecommendation.trip.arrivalEstimate = calculateArrivalEstimate(
      busRecommendation.trip.departureTime,
      NOI_BAI_AIRPORT.busRoutes[0].travelTime[isPeak ? 'peak' : 'normal'],
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
