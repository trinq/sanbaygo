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

function roundUpToNearest5(): string {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const rounded = Math.ceil(totalMinutes / 5) * 5;
  const h = String(Math.floor(rounded / 60)).padStart(2, '0');
  const m = String(rounded % 60).padStart(2, '0');
  return `${h}:${m}`;
}

const DEFAULT_ARRIVAL_TIME = roundUpToNearest5();
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
  const [flightType, setFlightTypeRaw] = useState<FlightType>('domestic');

  const setArrivalTime = useCallback((time: string) => {
    if (!TIME_FORMAT.test(time)) return;
    setArrivalTimeRaw(time);
  }, []);

  const setAirport = useCallback((id: AirportId) => {
    setAirportRaw(id);
    setTerminalRaw(null);
    setDestinationRaw(null);
    setFlightTypeRaw('domestic');
  }, []);

  const setTerminal = useCallback((id: TerminalId) => {
    setTerminalRaw(id);
    setDestinationRaw(null);
    if (!airport) return;
    const term = AIRPORTS[airport].terminals.find((t: Terminal) => t.id === id);
    setFlightTypeRaw(term?.flightTypes[0] ?? term?.type ?? 'domestic');
  }, [airport]);
  const setDestination = useCallback((id: string) => setDestinationRaw(id), []);
  const setPeople = useCallback((n: number) => setPeopleRaw(clamp(n, 1, 10)), []);
  const setCarryOn = useCallback((v: boolean) => setCarryOnRaw(v), []);
  const setChecked = useCallback((v: boolean) => setCheckedRaw(v), []);
  const setFlightType = useCallback((v: FlightType) => setFlightTypeRaw(v), []);

  const flightTypeOptions: FlightType[] = useMemo(() => {
    if (!airport || !terminal) return [];
    const term = AIRPORTS[airport].terminals.find(t => t.id === terminal);
    if (!term) return [];
    return term.flightTypes;
  }, [airport, terminal]);

  const showFlightTypeSelector = useMemo(() => {
    return flightTypeOptions.length > 1;
  }, [flightTypeOptions]);

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
    const term = AIRPORTS[airport].terminals.find(t => t.id === terminal);
    const resolvedFlightType: FlightType = flightTypeOptions.length === 1
      ? (term?.type ?? 'domestic')
      : flightType;

    return {
      arrivalTime,
      airportId: airport,
      terminal,
      baggage: DEFAULT_BAGGAGE,
      destination,
      flightType: resolvedFlightType,
    };
  }, [arrivalTime, airport, terminal, destination, flightType, flightTypeOptions]);

  const reset = useCallback(() => {
    setArrivalTimeRaw(DEFAULT_ARRIVAL_TIME);
    setAirportRaw(null);
    setTerminalRaw(null);
    setDestinationRaw(null);
    setPeopleRaw(1);
    setCarryOnRaw(false);
    setCheckedRaw(false);
    setFlightTypeRaw('domestic');
  }, []);

  return {
    arrivalTime,
    airport,
    terminal,
    destination,
    people,
    carryOn,
    checked,
    flightType,
    setFlightType,
    showFlightTypeSelector,
    flightTypeOptions,
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