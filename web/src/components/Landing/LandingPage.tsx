import type { ArrivalFormData, ArrivalResult } from '@core';
import { calculateTrip as calculateResult } from '@core';
import { useLandingForm } from '../../hooks/useLandingForm';
import { Hero } from './Hero';
import { SearchCard } from './SearchCard';

interface LandingPageProps {
  onSearch: (formData: ArrivalFormData, result: ArrivalResult) => void;
}

export function LandingPage({ onSearch }: LandingPageProps) {
  const form = useLandingForm();

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;

    const calculation = calculateResult(formData);
    if (!calculation) return;

    onSearch(formData, calculation);
  };

  return (
    <Hero>
      <SearchCard
        arrivalTime={form.arrivalTime}
        airport={form.airport}
        terminal={form.terminal}
        destination={form.destination}
        people={form.people}
        carryOn={form.carryOn}
        checked={form.checked}
        flightType={form.flightType}
        showFlightTypeSelector={form.showFlightTypeSelector}
        terminalOptions={form.terminalOptions}
        destinationOptions={form.destinationOptions}
        onArrivalTimeChange={form.setArrivalTime}
        onAirportChange={form.setAirport}
        onTerminalChange={form.setTerminal}
        onDestinationChange={form.setDestination}
        onFlightTypeChange={form.setFlightType}
        onPeopleChange={form.setPeople}
        onCarryOnChange={form.setCarryOn}
        onCheckedChange={form.setChecked}
        onSubmit={handleSubmit}
      />
    </Hero>
  );
}