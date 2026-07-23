/**
 * API utilities for transport options
 * Pulls TRANSPORT_OPTIONS from `@core` (relocated from web/src/lib/transport-data).
 */
import { TRANSPORT_OPTIONS } from '@core';

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
