import type {
  AirportId,
  DestinationPoint,
  FlightType,
  Terminal,
  TerminalId,
} from '@core';

export interface SearchCardProps {
  arrivalTime: string;
  airport: AirportId | null;
  terminal: TerminalId | null;
  destination: string | null;
  people: number;
  carryOn: boolean;
  checked: boolean;
  flightType: FlightType;
  showFlightTypeSelector: boolean;
  terminalOptions: Terminal[];
  destinationOptions: DestinationPoint[];
  onArrivalTimeChange: (time: string) => void;
  onAirportChange: (id: AirportId) => void;
  onTerminalChange: (id: TerminalId) => void;
  onDestinationChange: (id: string) => void;
  onFlightTypeChange: (v: FlightType) => void;
  onPeopleChange: (n: number) => void;
  onCarryOnChange: (v: boolean) => void;
  onCheckedChange: (v: boolean) => void;
  onSubmit: () => void;
}