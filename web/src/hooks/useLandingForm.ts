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

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function useLandingForm() {
  const [airport, setAirportRaw] = useState<AirportId | null>(null);
  const [terminal, setTerminalRaw] = useState<TerminalId | null>(null);
  const [destination, setDestinationRaw] = useState<string | null>(null);
  const [people, setPeopleRaw] = useState(1);
  const [carryOn, setCarryOnRaw] = useState(false);
  const [checked, setCheckedRaw] = useState(false);

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
      arrivalTime: DEFAULT_ARRIVAL_TIME,
      airportId: airport,
      terminal,
      baggage: DEFAULT_BAGGAGE,
      destination,
      flightType,
    };
  }, [airport, terminal, destination]);

  const reset = useCallback(() => {
    setAirportRaw(null);
    setTerminalRaw(null);
    setDestinationRaw(null);
    setPeopleRaw(1);
    setCarryOnRaw(false);
    setCheckedRaw(false);
  }, []);

  return {
    airport,
    terminal,
    destination,
    people,
    carryOn,
    checked,
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