import { useState } from 'react';
import type { ArrivalFormData, ArrivalResult } from '@core';
import { useLandingForm } from '../../hooks/useLandingForm';
import { calculateResult } from '../../lib/calculation-result';
import { ResultDisplay } from '../ResultDisplay';
import { Hero } from './Hero';
import { SearchCard } from './SearchCard';

export function LandingPage() {
  const form = useLandingForm();
  const [result, setResult] = useState<ArrivalResult | null>(null);
  const [submittedFormData, setSubmittedFormData] = useState<ArrivalFormData | null>(null);

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;

    const calculation = calculateResult(formData);
    if (!calculation) return;

    setSubmittedFormData(formData);
    setResult(calculation);
  };

  const handleRecalculate = () => {
    setResult(null);
    setSubmittedFormData(null);
    form.reset();
  };

  if (result && submittedFormData) {
    return (
      <ResultDisplay
        result={result}
        formData={submittedFormData}
        onRecalculate={handleRecalculate}
      />
    );
  }

  return (
    <Hero>
      <SearchCard
        departure={form.departure}
        destination={form.destination}
        people={form.people}
        carryOn={form.carryOn}
        checked={form.checked}
        onDepartureChange={form.setDeparture}
        onDestinationChange={form.setDestination}
        onPeopleChange={form.setPeople}
        onCarryOnChange={form.setCarryOn}
        onCheckedChange={form.setChecked}
        onSubmit={handleSubmit}
      />
    </Hero>
  );
}
