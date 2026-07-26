import { AirportId, DestinationPoint } from '../types';
import { HAN_DESTINATIONS } from './destinations/han';
import { SGN_DESTINATIONS } from './destinations/sgn';

export const DESTINATIONS: DestinationPoint[] = [
  ...HAN_DESTINATIONS,
  ...SGN_DESTINATIONS,
];

export const DESTINATIONS_BY_AIRPORT: Record<AirportId, DestinationPoint[]> = {
  'noi-bai': HAN_DESTINATIONS,
  'tan-son-nhat': SGN_DESTINATIONS,
};
