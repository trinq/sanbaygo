import { fetchApi } from './client';

export interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
  timezone: string;
  is_active: boolean;
}

export interface AirportWithTerminals extends Airport {
  terminals: Terminal[];
}

export interface Terminal {
  id: string;
  code: string;
  name: string;
  type: 'domestic' | 'international';
}

export interface BusRoute {
  id: string;
  route_number: string;
  ticket_price: number;
  operating_start: string;
  operating_end: string;
  walking_minutes: number;
}

export interface BusSchedule {
  id: string;
  departure_time: string;
  travel_normal_min: number;
  travel_normal_max: number;
  travel_peak_min: number;
  travel_peak_max: number;
}

export interface Destination {
  id: string;
  name: string;
  name_vi: string;
  nearest_bus_stop: string;
  has_bus_coverage: boolean;
  walking_minutes: number;
  travel_normal_min: number;
  travel_normal_max: number;
  travel_peak_min: number;
  travel_peak_max: number;
}

export async function getAirports(): Promise<Airport[]> {
  return fetchApi<Airport[]>('/api/airports');
}

export async function getAirport(id: string): Promise<AirportWithTerminals> {
  return fetchApi<AirportWithTerminals>(`/api/airports/${id}`);
}

export async function getBusRoutes(airportId: string): Promise<BusRoute[]> {
  return fetchApi<BusRoute[]>(`/api/airports/${airportId}/bus-routes`);
}

export async function getBusRouteWithSchedules(
  airportId: string,
  routeId: string
): Promise<BusRoute & { schedules: BusSchedule[] }> {
  return fetchApi(`/api/airports/${airportId}/bus-routes/${routeId}`);
}

export async function getDestinations(airportId: string): Promise<Destination[]> {
  return fetchApi<Destination[]>(`/api/airports/${airportId}/destinations`);
}

export async function getVehicles(airportId: string) {
  return fetchApi(`/api/airports/${airportId}/vehicles`);
}
