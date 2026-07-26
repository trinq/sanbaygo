import { useState } from 'react';
import {
  calculateArrivalEstimate,
  calculateExitTime,
  DESTINATIONS,
  findNextCatchableTrip,
  isPeakHour,
  NOI_BAI_AIRPORT,
} from '@core';
import type { ArrivalFormData, ArrivalResult } from '@core';
import { useLandingForm } from '../../app/hooks/useLandingForm';
import { ResultDisplay } from '../ResultDisplay';
import { Hero } from './Hero';
import { SearchCard } from './SearchCard';

function calculateResult(formData: ArrivalFormData): ArrivalResult | null {
  if (!formData.terminal || !formData.baggage || !formData.destination) return null;
  const terminalInfo = NOI_BAI_AIRPORT.terminals.find(
    (terminal) => terminal.id === formData.terminal,
  );
  const destination = DESTINATIONS.find(
    (destinationPoint) => destinationPoint.id === formData.destination,
  );
  if (!terminalInfo || !destination) return null;
  const isPeak = isPeakHour(formData.arrivalTime);
  const exitTime = calculateExitTime(
    terminalInfo.type,
    formData.baggage,
    formData.flightType,
  );
  const busRecommendation = findNextCatchableTrip(
    NOI_BAI_AIRPORT.busRoutes[0],
    formData.arrivalTime,
    { min: exitTime.minMinutes, max: exitTime.maxMinutes },
  );
  if (busRecommendation.available && busRecommendation.trip) {
    busRecommendation.trip.arrivalEstimate = calculateArrivalEstimate(
      busRecommendation.trip.departureTime,
      NOI_BAI_AIRPORT.busRoutes[0].travelTime[isPeak ? 'peak' : 'normal'],
      isPeak,
    );
  }
  const grabTravelTime = calculateArrivalEstimate(
    formData.arrivalTime,
    NOI_BAI_AIRPORT.grabEstimates.travelTime[isPeak ? 'peak' : 'normal'],
    isPeak,
  );
  return {
    bus: busRecommendation,
    grab: {
      available: true,
      priceEstimate: '250.000 – 350.000 VND',
      travelTime: grabTravelTime,
    },
  };
}

export function LandingPage() {
  const form = useLandingForm();
  const [result, setResult] = useState<ArrivalResult | null>(null);

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;
    const calculation = calculateResult(formData);
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
