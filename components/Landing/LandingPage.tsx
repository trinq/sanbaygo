import { useState } from 'react';
import type { ArrivalResult } from '@core';
import { calculateTrip } from '@core';
import { useLandingForm } from '../../app/hooks/useLandingForm';
import { ResultDisplay } from '../ResultDisplay';
import { Hero } from './Hero';
import { SearchCard } from './SearchCard';

export function LandingPage() {
  const form = useLandingForm();
  const [result, setResult] = useState<ArrivalResult | null>(null);

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;
    const calculation = calculateTrip(formData);
    if (calculation) setResult(calculation);
  };

  const handleRecalculate = () => {
    setResult(null);
    form.reset();
  };

  if (result) {
    return (
      <ResultDisplay
        result={result}
        arrivalTime="12:00"
        onBack={handleRecalculate}
        onRecalculate={handleRecalculate}
      />
    );
  }

  return (
    <Hero>
      <SearchCard
        departure={form.terminal}
        destination={form.destination}
        people={form.people}
        luggage={form.carryOn || form.checked ? 1 : 0}
        onDepartureChange={form.setTerminal as (id: string) => void}
        onDestinationChange={form.setDestination}
        onPeopleChange={form.setPeople}
        onLuggageChange={() => {}}
        onSubmit={handleSubmit}
      />
    </Hero>
  );
}
