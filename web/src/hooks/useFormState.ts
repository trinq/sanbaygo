import { useState, useCallback, useEffect } from 'react';
import { ArrivalFormData } from '@core';

const API_BASE_URL = 'http://localhost:3000';
const NOI_BAI_AIRPORT_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

interface ApiTerminal {
  id: string;
  code: string;
  name: string;
  type: 'domestic' | 'international';
}

interface ApiDestination {
  id: string;
  name: string;
  name_vi: string;
  nearest_bus_stop: string;
  walking_minutes: number;
  has_bus_coverage: boolean;
  travel_normal_min: number;
  travel_normal_max: number;
  travel_peak_min: number;
  travel_peak_max: number;
}

interface ApiBusRoute {
  id: string;
  route_number: string;
  ticket_price: number;
  walking_minutes: number;
  schedules?: Array<{ id: string; departure_time: string; [key: string]: unknown }>;
  travel_normal_min?: number;
  travel_normal_max?: number;
  travel_peak_min?: number;
  travel_peak_max?: number;
}

interface ApiVehicle {
  id: string;
  name: string;
  type: string;
  price_min: number;
  price_max: number;
  travel_normal_min: number;
  travel_normal_max: number;
  travel_peak_min: number;
  travel_peak_max: number;
}

function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

const initialFormState: ArrivalFormData = {
  arrivalTime: getCurrentTime(),
  terminal: null,
  baggage: null,
  destination: null,
  flightType: 'domestic',
};

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  const result = await response.json();
  return result.data;
}

export function useFormState() {
  const [formData, setFormData] = useState<ArrivalFormData>(initialFormState);
  const [terminals, setTerminals] = useState<ApiTerminal[]>([]);
  const [destinations, setDestinations] = useState<ApiDestination[]>([]);
  const [busSchedules, setBusSchedules] = useState<string[]>([]);
  const [busTicketPrice, setBusTicketPrice] = useState<number>(50000);
  const [busTravelTime, setBusTravelTime] = useState<{ normal: { min: number; max: number }; peak: { min: number; max: number } }>({
    normal: { min: 40, max: 60 },
    peak: { min: 50, max: 70 },
  });
  const [grabPriceRange, setGrabPriceRange] = useState<{ min: number; max: number }>({ min: 150000, max: 350000 });
  const [grabTravelTime, setGrabTravelTime] = useState<{ normal: { min: number; max: number }; peak: { min: number; max: number } }>({
    normal: { min: 30, max: 45 },
    peak: { min: 45, max: 60 },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const [airportData, destinationsData, busRoutesData, vehiclesData] = await Promise.all([
          fetchApi<{ terminals: ApiTerminal[] }>(`/api/airports/${NOI_BAI_AIRPORT_ID}`),
          fetchApi<ApiDestination[]>(`/api/airports/${NOI_BAI_AIRPORT_ID}/destinations`),
          fetchApi<ApiBusRoute[]>(`/api/airports/${NOI_BAI_AIRPORT_ID}/bus-routes`),
          fetchApi<ApiVehicle[]>(`/api/airports/${NOI_BAI_AIRPORT_ID}/vehicles`),
        ]);

        setTerminals(airportData.terminals);
        setDestinations(destinationsData);

        if (busRoutesData.length > 0) {
          const firstRoute = busRoutesData[0];
          const routeWithSchedules = await fetchApi<ApiBusRoute>(
            `/api/airports/${NOI_BAI_AIRPORT_ID}/bus-routes/${firstRoute.id}`
          );
          const scheduleTimes = (routeWithSchedules.schedules || []).map(
            s => typeof s === 'string' ? s : (s as { departure_time: string }).departure_time
          );
          setBusSchedules(scheduleTimes);
          setBusTicketPrice(routeWithSchedules.ticket_price || 50000);
          if (routeWithSchedules.travel_normal_min !== undefined) {
            setBusTravelTime({
              normal: { min: routeWithSchedules.travel_normal_min, max: routeWithSchedules.travel_normal_max ?? routeWithSchedules.travel_normal_min },
              peak: { min: routeWithSchedules.travel_peak_min ?? routeWithSchedules.travel_normal_min, max: routeWithSchedules.travel_peak_max ?? routeWithSchedules.travel_normal_max ?? routeWithSchedules.travel_normal_min },
            });
          }
        }

        const grabVehicle = vehiclesData.find(v => v.type === 'grab' || v.name.toLowerCase().includes('grab'));
        if (grabVehicle) {
          setGrabPriceRange({ min: grabVehicle.price_min, max: grabVehicle.price_max });
          setGrabTravelTime({
            normal: { min: grabVehicle.travel_normal_min, max: grabVehicle.travel_normal_max },
            peak: { min: grabVehicle.travel_peak_min, max: grabVehicle.travel_peak_max },
          });
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch airport data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const updateFormData = useCallback((patch: Partial<ArrivalFormData>) => {
    setFormData(prev => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setFormData({ ...initialFormState, arrivalTime: getCurrentTime() });
  }, []);

  return {
    formData,
    terminals,
    destinations,
    busSchedules,
    busTicketPrice,
    busTravelTime,
    grabPriceRange,
    grabTravelTime,
    isLoading,
    error,
    updateFormData,
    reset,
  };
}
