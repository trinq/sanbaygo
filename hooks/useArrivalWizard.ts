import { useReducer, useCallback } from 'react';
import {
  AirportId,
  ArrivalFormData,
  ArrivalResult,
  calculateExitTime,
  isPeakHour,
  findNextCatchableTrip,
  findCatchableBusForTerminal,
  calculateArrivalEstimate,
  AIRPORTS,
  DESTINATIONS_BY_AIRPORT,
  TerminalId,
} from '@core';

type Action =
  | { type: 'SET_TIME'; payload: string }
  | { type: 'SET_TERMINAL'; payload: TerminalId }
  | { type: 'SET_BAGGAGE'; payload: 'carry_on' | 'checked' }
  | { type: 'SET_DESTINATION'; payload: string }
  | { type: 'SET_FLIGHT_TYPE'; payload: 'domestic' | 'international' }
  | { type: 'RESET' };

function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

export const initialFormState: ArrivalFormData = {
  arrivalTime: getCurrentTime(),
  terminal: null,
  baggage: null,
  destination: null,
  flightType: 'domestic',
  airportId: 'noi-bai' as AirportId,
};

export function formReducer(state: ArrivalFormData, action: Action): ArrivalFormData {
  switch (action.type) {
    case 'SET_TIME':
      return { ...state, arrivalTime: action.payload };
    case 'SET_TERMINAL':
      return { ...state, terminal: action.payload };
    case 'SET_BAGGAGE':
      return { ...state, baggage: action.payload };
    case 'SET_DESTINATION':
      return { ...state, destination: action.payload };
    case 'SET_FLIGHT_TYPE':
      return { ...state, flightType: action.payload };
    case 'RESET':
      return { ...initialFormState, arrivalTime: getCurrentTime() };
    default:
      return state;
  }
}

export function calculateResultFromForm(formData: ArrivalFormData): ArrivalResult | null {
  if (!formData.terminal || !formData.baggage || !formData.destination) {
    return null;
  }

  const airport = AIRPORTS[formData.airportId];
  if (!airport) return null;

  const terminalInfo = airport.terminals.find((t) => t.id === formData.terminal);
  const destinations = DESTINATIONS_BY_AIRPORT[formData.airportId];
  const destination = destinations.find((d) => d.id === formData.destination);

  if (!terminalInfo || !destination) {
    return null;
  }

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
      busRecommendation.trip.arrivalEstimate = calculateArrivalEstimate(
        busRecommendation.trip.departureTime,
        matchedBus.travelTime[isPeak ? 'peak' : 'normal'],
        isPeak,
      );
    }
  }

  const grabTravelTime = calculateArrivalEstimate(
    formData.arrivalTime,
    airport.grabEstimates.travelTime[isPeak ? 'peak' : 'normal'],
    isPeak,
  );

  return {
    bus: busRecommendation,
    grab: {
      available: true,
      priceEstimate: `${airport.grabEstimates.priceRange.min.toLocaleString()} - ${airport.grabEstimates.priceRange.max.toLocaleString()} VND`,
      travelTime: grabTravelTime,
    },
    direction: {
      description: `Đi bộ ${destination.walkingMinutes} phút đến điểm đón xe buýt ${terminalInfo.name}`,
      estimatedMinutes: destination.walkingMinutes,
    },
  };
}

export function useArrivalWizard() {
  const [formData, dispatch] = useReducer(formReducer, initialFormState);

  const setArrivalTime = useCallback((time: string) => {
    dispatch({ type: 'SET_TIME', payload: time });
  }, []);

  const setTerminal = useCallback((terminal: TerminalId) => {
    dispatch({ type: 'SET_TERMINAL', payload: terminal });
  }, []);

  const setBaggage = useCallback((baggage: 'carry_on' | 'checked') => {
    dispatch({ type: 'SET_BAGGAGE', payload: baggage });
  }, []);

  const setDestination = useCallback((destination: string) => {
    dispatch({ type: 'SET_DESTINATION', payload: destination });
  }, []);

  const setFlightType = useCallback((flightType: 'domestic' | 'international') => {
    dispatch({ type: 'SET_FLIGHT_TYPE', payload: flightType });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const calculateResult = useCallback((): ArrivalResult | null => {
    return calculateResultFromForm(formData);
  }, [formData]);

  return {
    formData,
    setArrivalTime,
    setTerminal,
    setBaggage,
    setDestination,
    setFlightType,
    reset,
    calculateResult,
  };
}