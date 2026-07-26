import { fetchApi } from './client';

export interface CalculateRequest {
  airportId: string;
  arrivalTime: string;
  terminalCode: string;
  baggageType: 'carry_on' | 'checked';
  destinationId: string;
}

export interface CalculateResponse {
  metadata: {
    arrivalTime: string;
    readyTime: string;
    isPeakHour: boolean;
    exitTime: {
      minMinutes: number;
      maxMinutes: number;
    };
  };
  busRoutes: unknown[];
  destination: unknown;
  vehicles: unknown[];
}

export async function calculateTrip(
  request: CalculateRequest
): Promise<CalculateResponse> {
  return fetchApi<CalculateResponse>('/api/trips/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
}
