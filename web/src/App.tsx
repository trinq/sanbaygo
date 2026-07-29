import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { HomePage } from './routes/HomePage';
import { HomePageVI } from './routes/HomePageVI';
import { Bus86Page } from './routes/articles/Bus86Page';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ResultPage } from './components/Result';
import type { ArrivalResult, ArrivalFormData, AirportId, TerminalId, BaggageType, FlightType } from '@core';
import { calculateTrip } from '@core/calculate-trip';

function ResultRoute() {
  const [searchParams] = useSearchParams();

  const rawAirport = searchParams.get('airport') ?? 'HAN';
  const airportIdMap: Record<string, AirportId> = {
    HAN: 'noi-bai',
    SGN: 'tan-son-nhat',
  };
  const airportId: AirportId = airportIdMap[rawAirport] ?? 'noi-bai';

  const rawTerminal = searchParams.get('terminal') as TerminalId | null;
  const rawBaggage = searchParams.get('baggage') as BaggageType | null;
  const rawFlightType = searchParams.get('flightType') as FlightType | null;

  const flightTime = searchParams.get('flightTime') ?? '14:30';
  const destination = searchParams.get('destination') ?? 'old-quarter';
  const flightType: FlightType = rawFlightType ?? 'domestic';

  const formData: ArrivalFormData = {
    airportId,
    arrivalTime: flightTime,
    destination,
    terminal: rawTerminal,
    baggage: rawBaggage,
    flightType,
  };

  const result: ArrivalResult | null = calculateTrip(formData);

  const handleBack = () => {
    window.history.back();
  };

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Unable to calculate trip. Please go back and try again.</p>
        <button onClick={handleBack} className="ml-4 text-green-600 underline">
          ← Go back
        </button>
      </div>
    );
  }

  return <ResultPage onBack={handleBack} formData={formData} result={result} />;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bus-86-hanoi-airport" element={<Bus86Page />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/ket-qua" element={<ResultRoute />} />
            <Route path="/vi/*" element={<HomePageVI />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
