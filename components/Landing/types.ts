import type { ArrivalFormData, ArrivalResult } from '@core';

export type LandingPageProps = {
  onSubmit: (formData: ArrivalFormData) => ArrivalResult | null;
  result: ArrivalResult | null;
};

export type SearchCardProps = {
  departure: string | null;
  destination: string | null;
  people: number;
  luggage: number;
  onDepartureChange: (id: string) => void;
  onDestinationChange: (id: string) => void;
  onPeopleChange: (n: number) => void;
  onLuggageChange: (n: number) => void;
  onSubmit: () => void;
};
