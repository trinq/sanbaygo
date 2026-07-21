/**
 * API utilities for trip calculation
 * These provide server-style API responses for trip calculations
 */
import { calculateTripComparison } from '../transport-calculator';
import { TripCalculationRequest, TripCalculationResponse } from '../../types';

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
