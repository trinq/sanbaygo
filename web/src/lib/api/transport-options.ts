/**
 * API utilities for transport options
 * These provide server-style API responses using static data
 */
import { TRANSPORT_OPTIONS } from '../transport-data';

export interface TransportOptionsResponse {
  options: typeof TRANSPORT_OPTIONS;
  lastUpdated: string;
}

export function getTransportOptions(): TransportOptionsResponse {
  return {
    options: TRANSPORT_OPTIONS,
    lastUpdated: new Date().toISOString(),
  };
}
