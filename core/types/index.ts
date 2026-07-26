export type TerminalType = 'domestic' | 'international';
export type AirportId = 'noi-bai' | 'tan-son-nhat';
export type TerminalId =
  | 'HAN-T1'
  | 'HAN-T2'
  | 'SGN-T1'
  | 'SGN-T2'
  | 'SGN-T3';
export type BaggageType = 'carry_on' | 'checked';
export type FlightType = 'domestic' | 'international';

export interface Airport {
  id: AirportId;
  name: string;
  terminals: Terminal[];
  busRoutes: BusRoute[];
  grabEstimates: GrabEstimate;
}

export interface Terminal {
  id: TerminalId;
  name: string;
  type: TerminalType;
  flightTypes: FlightType[];
}

export interface PickupPoint {
  terminalId: TerminalId;
  location: string;
}

export type ScheduleSource =
  | { kind: 'explicit'; departures: string[] }
  | { kind: 'frequency'; headwayMinutes: { peak: number; normal: number } };

export interface BusRoute {
  id: string;
  routeNumber: string;
  ticketPrice: number;
  operatingHours: { start: string; end: string };
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
  pickupPoints: PickupPoint[];
  scheduleSource: ScheduleSource;
}

export interface DestinationPoint {
  id: string;
  name: string;
  nearestBusStop: string;
  walkingMinutes: number;
  hasBusCoverage: boolean;
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
}

export interface ExitTimeEstimate {
  terminalType: TerminalType;
  baggageType: BaggageType;
  flightType?: FlightType;
  minMinutes: number;
  maxMinutes: number;
}

export interface GrabEstimate {
  priceRange: { min: number; max: number };
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
}

export interface TimeRange {
  early: string;
  late: string;
  minutesRange: { min: number; max: number };
}

export interface BusRecommendation {
  available: boolean;
  trip?: {
    departureTime: string;
    waitMinutes: number;
    arrivalEstimate?: TimeRange;
    ticketPrice: number;
    selectedRoute?: BusRoute;
  };
  reason?: 'no_service' | 'too_late' | 'missed_last';
}

export interface ArrivalResult {
  bus: BusRecommendation;
  grab: {
    available: boolean;
    priceEstimate: string;
    travelTime: TimeRange;
  };
  direction?: {
    description: string;
    estimatedMinutes: number;
  };
}

export interface ArrivalFormData {
  arrivalTime: string;
  terminal: TerminalId | null;
  baggage: BaggageType | null;
  destination: string | null;
  flightType: FlightType;
  airportId: AirportId;
}

export type ArrivalFormStep = 'time' | 'terminal' | 'baggage' | 'destination';

export type TransportType = 'bus' | 'motorbike' | 'car';
export type SortOption = 'recommended' | 'cheapest' | 'fastest';

export interface TransportOption {
  id: string;
  name: string;
  nameVi: string;
  type: TransportType;
  basePrice: number;
  priceUnit: 'per_trip' | 'per_person';
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
  luggageScore: number;
  comfortScore: number;
  ecoFriendly: boolean;
  isRecommended: boolean;
  notes: string;
}

export interface TransportComparison {
  id: string;
  name: string;
  nameVi: string;
  type: TransportType;
  price: {
    estimate: string;
    value: number;
    isEstimate: boolean;
  };
  travelTime: {
    estimate: string;
    minutesRange: { min: number; max: number };
    arrivalEstimate: string;
  };
  waitTime?: {
    minutes: number;
    nextDeparture: string;
  };
  luggage: {
    score: number;
    label: string;
  };
  comfort: {
    score: number;
    label: string;
  };
  ecoFriendly: boolean;
  notes: string;
  isRecommended: boolean;
}

export interface TripCalculationRequest {
  arrivalTime: string;
  airportId: AirportId;
  terminalId: TerminalId;
  baggageType: BaggageType;
  destinationId: string;
  sortBy: SortOption;
}

export interface TripCalculationResponse {
  comparison: TransportComparison[];
  metadata: {
    arrivalTime: string;
    readyAt: string;
    isPeakHour: boolean;
  };
}