import type {
  AirportId,
  DestinationPoint,
  Terminal,
  TerminalId,
} from '@core';

export interface SearchCardProps {
  airport: AirportId | null;
  terminal: TerminalId | null;
  destination: string | null;
  people: number;
  carryOn: boolean;
  checked: boolean;
  terminalOptions: Terminal[];
  destinationOptions: DestinationPoint[];
  onAirportChange: (id: AirportId) => void;
  onTerminalChange: (id: TerminalId) => void;
  onDestinationChange: (id: string) => void;
  onPeopleChange: (n: number) => void;
  onCarryOnChange: (v: boolean) => void;
  onCheckedChange: (v: boolean) => void;
  onSubmit: () => void;
}
