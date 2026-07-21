// Core types matching the parent repo

export type Terminal = 'T1' | 'T2';
export type TerminalId = 'T1' | 'T2';
export type TerminalType = 'domestic' | 'international';
export type BaggageType = 'carry_on' | 'checked';
export type FlightType = 'domestic' | 'international';

// Legacy baggages for existing components (with hyphen format)
export type Baggage = 'carry-on' | 'checked';
export type Destination =
  | 'old-quarter'
  | 'hoan-kiem'
  | 'dong-da'
  | 'ba-dinh'
  | 'cau-giay'
  | 'other';

export interface BusRoute {
  id: string;
  routeNumber: string;
  schedule: string[];
  ticketPrice: number;
  operatingHours: { start: string; end: string };
  travelTime: {
    normal: { min: number; max: number };
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
}

export interface ExitTimeResult {
  minMinutes: number;
  maxMinutes: number;
}

// Legacy form data type for existing components
export interface FormData {
  arrivalTime: string;
  terminal: Terminal;
  baggage: Baggage;
  destination: Destination;
}
