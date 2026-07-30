import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { HomePage } from './routes/HomePage';
import { HomePageVI } from './routes/HomePageVI';
import { Bus86Page } from './routes/articles/Bus86Page';
import { Bus86PageVI } from './routes/articles/Bus86PageVI';
import { ExitTimePage } from './routes/articles/ExitTimePage';
import { ExitTimePageVI } from './routes/articles/ExitTimePageVI';
import { Bus109Page } from './routes/articles/Bus109Page';
import { Bus152Page } from './routes/articles/Bus152Page';
import { Bus109PageVI } from './routes/articles/Bus109PageVI';
import { Bus152PageVI } from './routes/articles/Bus152PageVI';
import { Bus109Vs152Page } from './routes/articles/Bus109Vs152Page';
import { Bus109Vs152PageVI } from './routes/articles/Bus109Vs152PageVI';
import { GrabVsBusPage } from './routes/articles/GrabVsBusPage';
import { GrabVsBusPageVI } from './routes/articles/GrabVsBusPageVI';
import { CheapestHanPage } from './routes/articles/CheapestHanPage';
import { CheapestHanPageVI } from './routes/articles/CheapestHanPageVI';
import { CheapestSgnPage } from './routes/articles/CheapestSgnPage';
import { CheapestSgnPageVI } from './routes/articles/CheapestSgnPageVI';
import { HanToHoanKiemPage } from './routes/articles/HanToHoanKiemPage';
import { HanToHoanKiemPageVI } from './routes/articles/HanToHoanKiemPageVI';
import { LateNightBusPage } from './routes/articles/LateNightBusPage';
import { LateNightHanPage } from './routes/articles/LateNightHanPage';
import { LateNightHanPageVI } from './routes/articles/LateNightHanPageVI';
import { NoibaiFirstTimePage } from './routes/articles/NoibaiFirstTimePage';
import { NoibaiFirstTimePageVI } from './routes/articles/NoibaiFirstTimePageVI';
import { HowToGetHanPage } from './routes/articles/HowToGetHanPage';
import { HowToGetHanPageVI } from './routes/articles/HowToGetHanPageVI';
import { AirportBusPillarPage } from './routes/articles/AirportBusPillarPage';
import { AirportBusPillarPageVI } from './routes/articles/AirportBusPillarPageVI';
import { GrabSafePage } from './routes/articles/GrabSafePage';
import { GrabNoiBaiGiaPageVI } from './routes/articles/GrabNoiBaiGiaPageVI';
import { LuggageFeePage } from './routes/articles/LuggageFeePage';
import { LuggageFeePageVI } from './routes/articles/LuggageFeePageVI';
import { GuidesPage, GuidesPageVI } from './routes/GuidesPage';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ScamPage } from './pages/ScamPage';
import { ScamPageVI } from './pages/ScamPageVI';
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
        <button onClick={handleBack} className="ml-4 text-primary underline">
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
            <Route path="/bus-109-saigon-airport" element={<Bus109Page />} />
            <Route path="/bus-152-saigon-fare" element={<Bus152Page />} />
            <Route path="/airport-scam-vietnam-taxi" element={<ScamPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/ket-qua" element={<ResultRoute />} />
            <Route path="/vi/tuyen-86-noi-bai" element={<Bus86PageVI />} />
            <Route path="/vi/thoi-gian-ra-cuong-t2-noi-bai" element={<ExitTimePageVI />} />
            <Route path="/vi/tuyen-109-tan-son-nhat" element={<Bus109PageVI />} />
            <Route path="/vi/tuyen-152-tan-son-nhat" element={<Bus152PageVI />} />
            <Route path="/vi/xe-lo-gio-sanh-bay-viet-nam" element={<ScamPageVI />} />
            <Route path="/bus-109-vs-152-tan-son-nhat" element={<Bus109Vs152Page />} />
            <Route path="/grab-vs-bus-hanoi-airport" element={<GrabVsBusPage />} />
            <Route path="/noibai-t2-exit-time" element={<ExitTimePage />} />
            <Route path="/vi/grab-vs-xe-buyt-noi-bai" element={<GrabVsBusPageVI />} />
            <Route path="/vi/xe-buyt-109-vs-152-tan-son-nhat" element={<Bus109Vs152PageVI />} />
            <Route path="/hanoi-airport-late-night-bus" element={<LateNightBusPage />} />
            <Route path="/hanoi-airport-late-night-transfer" element={<LateNightHanPage />} />
            <Route path="/vi/di-chuyen-dem-khuya-san-bay-noi-bai" element={<LateNightHanPageVI />} />
            <Route path="/is-grab-safe-hanoi-airport" element={<GrabSafePage />} />
            <Route path="/airport-bus-luggage-fee-vietnam" element={<LuggageFeePage />} />
            <Route path="/vi/phi-hanh-ly-xe-buyt-san-bay" element={<LuggageFeePageVI />} />
            <Route path="/cheapest-way-hanoi-airport" element={<CheapestHanPage />} />
            <Route path="/vi/cach-re-nhat-san-bay-noi-bai" element={<CheapestHanPageVI />} />
            <Route path="/cheapest-way-saigon-airport-district-1" element={<CheapestSgnPage />} />
            <Route path="/vi/cach-re-nhat-san-bay-sai-gon" element={<CheapestSgnPageVI />} />
            <Route path="/hanoi-airport-to-hoan-kiem-lake" element={<HanToHoanKiemPage />} />
            <Route path="/vi/san-bay-noi-bai-den-ho-hoan-kiem" element={<HanToHoanKiemPageVI />} />
            <Route path="/noibai-airport-first-time-guide" element={<NoibaiFirstTimePage />} />
            <Route path="/vi/noi-bai-lan-dau-di" element={<NoibaiFirstTimePageVI />} />
            <Route path="/vi/grab-noi-bai-gia-bao-nhieu" element={<GrabNoiBaiGiaPageVI />} />
            <Route path="/how-to-get-from-hanoi-airport-to-city" element={<HowToGetHanPage />} />
            <Route path="/vi/cach-di-tu-sanh-bay-noi-bai" element={<HowToGetHanPageVI />} />
            <Route path="/bus-from-airport-to-city" element={<AirportBusPillarPage />} />
            <Route path="/vi/xe-buyt-san-bay-ve-trung-tam" element={<AirportBusPillarPageVI />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/vi/guides" element={<GuidesPageVI />} />
            <Route path="/vi/*" element={<HomePageVI />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
