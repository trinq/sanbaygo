import { useReducer, useCallback } from 'react';
import {
  AirportId,
  ArrivalFormData,
  ArrivalResult,
  calculateTrip,
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
  return calculateTrip(formData);
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