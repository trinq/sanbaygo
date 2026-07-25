import type { ArrivalFormData, ArrivalResult } from '@core';

export interface LandingPageProps {
  onSubmit: (formData: ArrivalFormData) => ArrivalResult | null;
  result: ArrivalResult | null;
}

export type HeroProps = {
  language: 'vi' | 'en';
  onToggleLanguage: () => void;
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

export type BenefitChip = {
  icon: 'clock' | 'shield' | 'wallet';
  title: string;
  subtitle: string;
};
