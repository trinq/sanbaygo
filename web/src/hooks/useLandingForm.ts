import { useCallback, useState } from 'react';
import type {
  ArrivalFormData,
  BaggageType,
  FlightType,
  TerminalId,
} from '@core';

const DEFAULT_ARRIVAL_TIME = '12:00';
const DEFAULT_TERMINAL: TerminalId = 'T1';
const DEFAULT_BAGGAGE: BaggageType = 'carry_on';
const DEFAULT_FLIGHT_TYPE: FlightType = 'international';

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function useLandingForm() {
  const [departure, setDeparture] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [people, setPeopleRaw] = useState(1);
  const [carryOn, setCarryOnRaw] = useState(false);
  const [checked, setCheckedRaw] = useState(false);

  const setPeople = useCallback((n: number) => setPeopleRaw(clamp(n, 1, 10)), []);
  const setCarryOn = useCallback((v: boolean) => setCarryOnRaw(v), []);
  const setChecked = useCallback((v: boolean) => setCheckedRaw(v), []);

  const validate = useCallback(
    () => departure !== null && destination !== null,
    [departure, destination],
  );

  const buildArrivalFormData = useCallback((): ArrivalFormData | null => {
    if (!departure || !destination) return null;
    return {
      arrivalTime: DEFAULT_ARRIVAL_TIME,
      terminal: DEFAULT_TERMINAL,
      baggage: DEFAULT_BAGGAGE,
      destination,
      flightType: DEFAULT_FLIGHT_TYPE,
    };
  }, [departure, destination]);

  const reset = useCallback(() => {
    setDeparture(null);
    setDestination(null);
    setPeopleRaw(1);
    setCarryOnRaw(false);
    setCheckedRaw(false);
  }, []);

  return {
    departure,
    destination,
    people,
    carryOn,
    checked,
    setDeparture,
    setDestination,
    setPeople,
    setCarryOn,
    setChecked,
    validate,
    buildArrivalFormData,
    reset,
  };
}
