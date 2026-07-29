import { useNavigate } from 'react-router-dom';
import { calculateTrip as calculateResult } from '@core';
import { useLandingForm } from '../../hooks/useLandingForm';
import { Hero } from './Hero';
import { SearchCard } from './SearchCard';
import { FAQ } from './FAQ';
import { Footer } from './Footer';

export function LandingPage() {
  const navigate = useNavigate();
  const form = useLandingForm();

  const handleSubmit = () => {
    const formData = form.buildArrivalFormData();
    if (!formData) return;

    const calculation = calculateResult(formData);
    if (!calculation) return;

    // Build URL search params for the result page
    const params = new URLSearchParams({
      airport: formData.airportId === 'noi-bai' ? 'HAN' : 'SGN',
      flightTime: formData.arrivalTime,
      terminal: formData.terminal ?? '',
      destination: formData.destination ?? '',
      busAvailable: String(calculation.bus.available),
      grabPrice: calculation.grab.priceEstimate.replace('₫', ''),
    });

    navigate(`/ket-qua?${params.toString()}`);
  };

  return (
    <>
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
      <FAQ />
      <Footer />
    </>
  );
}
