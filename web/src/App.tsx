import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { HomePage } from './routes/HomePage';
import { HomePageVI } from './routes/HomePageVI';
import { Bus86Page } from './routes/articles/Bus86Page';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ResultPage } from './components/Result';
import type { ArrivalResult, ArrivalFormData, AirportId, TerminalId } from '@core';

function ResultRoute() {
  const [searchParams] = useSearchParams();

  const rawAirport = searchParams.get('airport') ?? 'HAN';
  const airportIdMap: Record<string, AirportId> = {
    HAN: 'noi-bai',
    SGN: 'tan-son-nhat',
  };
  const airportId: AirportId = airportIdMap[rawAirport] ?? 'noi-bai';

  const rawTerminal = searchParams.get('terminal');
  const terminal: TerminalId | null = (rawTerminal as TerminalId) ?? null;

  const flightTime = searchParams.get('flightTime') ?? '14:30';
  const destination = searchParams.get('destination') ?? 'old-quarter';
  const busAvailable = searchParams.get('busAvailable') === 'true';
  const grabPrice = searchParams.get('grabPrice') ?? '250,000 – 350,000';

  const formData: ArrivalFormData = {
    airportId,
    arrivalTime: flightTime,
    destination,
    terminal,
    baggage: 'carry_on',
    flightType: 'domestic',
  };

  const result: ArrivalResult = {
    bus: {
      available: busAvailable,
      reason: busAvailable ? undefined : 'too_late',
    },
    grab: {
      available: true,
      priceEstimate: `${grabPrice}₫`,
      travelTime: {
        early: '35 min',
        late: '55 min',
        minutesRange: { min: 35, max: 55 },
      },
    },
  };

  const handleBack = () => {
    window.history.back();
  };

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
