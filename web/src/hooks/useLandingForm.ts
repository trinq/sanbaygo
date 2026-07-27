import { useCallback, useMemo, useState } from 'react';
import type {
  AirportId,
  ArrivalFormData,
  BaggageType,
  DestinationPoint,
  FlightType,
  Terminal,
  TerminalId,
} from '@core';
import { AIRPORTS, DESTINATIONS_BY_AIRPORT } from '@core';

const DEFAULT_ARRIVAL_TIME = '12:00';
const DEFAULT_BAGGAGE: BaggageType = 'carry_on';

const TIME_FORMAT = /^([01]\d|2[0-3]):[0-5]\d$/;

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function useLandingForm() {
  const [arrivalTime, setArrivalTimeRaw] = useState<string>(DEFAULT_ARRIVAL_TIME);
  const [airport, setAirportRaw] = useState<AirportId | null>(null);
  const [terminal, setTerminalRaw] = useState<TerminalId | null>(null);
  const [destination, setDestinationRaw] = useState<string | null>(null);
  const [people, setPeopleRaw] = useState(1);
  const [carryOn, setCarryOnRaw] = useState(false);
  const [checked, setCheckedRaw] = useState(false);

  const setArrivalTime = useCallback((time: string) => {
    if (!TIME_FORMAT.test(time)) return;
    setArrivalTimeRaw(time);
  }, []);

  const setAirport = useCallback((id: AirportId) => {
    setAirportRaw(id);
    setTerminalRaw(null);
    setDestinationRaw(null);
  }, []);

  const setTerminal = useCallback((id: TerminalId) => setTerminalRaw(id), []);
  const setDestination = useCallback((id: string) => setDestinationRaw(id), []);
  const setPeople = useCallback((n: number) => setPeopleRaw(clamp(n, 1, 10)), []);
  const setCarryOn = useCallback((v: boolean) => setCarryOnRaw(v), []);
  const setChecked = useCallback((v: boolean) => setCheckedRaw(v), []);

  const terminalOptions: Terminal[] = useMemo(() => {
    if (!airport) return [];
    return AIRPORTS[airport].terminals;
  }, [airport]);

  const destinationOptions: DestinationPoint[] = useMemo(() => {
    if (!airport) return [];
    return DESTINATIONS_BY_AIRPORT[airport];
  }, [airport]);

  const validate = useCallback(
    () => airport !== null && terminal !== null && destination !== null,
    [airport, terminal, destination],
  );

  const buildArrivalFormData = useCallback((): ArrivalFormData | null => {
    if (!airport || !terminal || !destination) return null;

    const terminalData = AIRPORTS[airport].terminals.find((t) => t.id === terminal);
    const flightType: FlightType = terminalData?.flightTypes[0] ?? terminalData?.type ?? 'domestic';

    return {
      arrivalTime,
      airportId: airport,
      terminal,
      baggage: DEFAULT_BAGGAGE,
      destination,
      flightType,
    };
  }, [arrivalTime, airport, terminal, destination]);

  const reset = useCallback(() => {
    setArrivalTimeRaw(DEFAULT_ARRIVAL_TIME);
    setAirportRaw(null);
    setTerminalRaw(null);
    setDestinationRaw(null);
    setPeopleRaw(1);
    setCarryOnRaw(false);
    setCheckedRaw(false);
  }, []);

  return {
    arrivalTime,
    airport,
    terminal,
    destination,
    people,
    carryOn,
    checked,
    setArrivalTime,
    setAirport,
    setTerminal,
    setDestination,
    setPeople,
    setCarryOn,
    setChecked,
    terminalOptions,
    destinationOptions,
    validate,
    buildArrivalFormData,
    reset,
  };
}