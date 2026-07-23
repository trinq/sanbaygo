/**
 * API utilities for trip calculation
 * Thin re-export of `calculateTripComparison` from `@core`, with error wrapping
 * preserved for callers that import through the api surface.
 */
import { calculateTripComparison } from '@core';
import { TripCalculationRequest, TripCalculationResponse } from '@core';

export interface CalculateTripError {
  error: string;
}

export type CalculateTripSuccess = TripCalculationResponse;
export type CalculateTripResponse = CalculateTripSuccess | CalculateTripError;

export function calculateTrip(
  body: TripCalculationRequest
): CalculateTripResponse {
  if (
    !body.arrivalTime ||
    !body.terminalId ||
    !body.baggageType ||
    !body.destinationId ||
    !body.sortBy
  ) {
    return { error: 'Missing required fields' };
  }

  try {
    return calculateTripComparison(body);
  } catch (error) {
    console.error('Calculate trip error:', error);
    return { error: 'Internal server error' };
  }
}
