export type TerminalType = 'domestic' | 'international';
export type TerminalId = 'T1' | 'T2';
export type BaggageType = 'carry_on' | 'checked';
export type FlightType = 'domestic' | 'international';

export interface Airport {
  id: string;
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

export interface BusRoute {
  id: string;
  routeNumber: string;
  schedule: string[]; // HH:mm format
  ticketPrice: number; // VND
  operatingHours: { start: string; end: string };
  travelTime: {
    normal: { min: number; max: number }; // minutes
    peak: { min: number; max: number };
  };
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
  flightType?: FlightType; // if international, add immigration time
  minMinutes: number;
  maxMinutes: number;
}

export interface GrabEstimate {
  priceRange: { min: number; max: number }; // VND
  travelTime: {
    normal: { min: number; max: number };
    peak: { min: number; max: number };
  };
}

export interface TimeRange {
  early: string; // HH:mm
  late: string;  // HH:mm
  minutesRange: { min: number; max: number };
}

export interface BusRecommendation {
  available: boolean;
  trip?: {
    departureTime: string; // HH:mm
    waitMinutes: number;
    arrivalEstimate?: TimeRange; // Optional - calculated separately with destination info
    ticketPrice: number;
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

// Form state
export interface ArrivalFormData {
  arrivalTime: string; // HH:mm
  terminal: TerminalId | null;
  baggage: BaggageType | null;
  destination: string | null;
  flightType: FlightType;
}

export type ArrivalFormStep = 'time' | 'terminal' | 'baggage' | 'destination';

// ============================================
// Vehicle Comparison Types
// ============================================

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
  luggageScore: number; // 1-5
  comfortScore: number; // 1-5
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
  terminalId: 'T1' | 'T2';
  baggageType: 'carry_on' | 'checked';
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
