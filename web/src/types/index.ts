export type Terminal = 'T1' | 'T2';
export type Baggage = 'carry-on' | 'checked';
export type Destination =
  | 'old-quarter'
  | 'hoan-kiem'
  | 'dong-da'
  | 'ba-dinh'
  | 'cau-giay'
  | 'other';

export interface FormData {
  arrivalTime: string;
  terminal: Terminal;
  baggage: Baggage;
  destination: Destination;
}

export interface ArrivalResult {
  canCatchBus: boolean;
  exitTimeMinutes: number;
  nextBusTime: string | null;
  waitMinutes: number;
  isPeakHour: boolean;
  lastBusTime: string | null;
  grabEstimate: {
    minPrice: number;
    maxPrice: number;
    travelTime: string;
  };
}
