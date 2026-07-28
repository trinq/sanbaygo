import { useState } from 'react';
import { LandingPage } from './components/Landing';
import { ResultPage } from './components/Result';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { LanguageProvider } from './contexts/LanguageContext';
import type { ArrivalResult, ArrivalFormData } from '@core';

type Page = 'home' | 'result' | 'privacy' | 'terms';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [tripResult, setTripResult] = useState<ArrivalResult | null>(null);
  const [tripFormData, setTripFormData] = useState<ArrivalFormData | null>(null);

  const handleSearch = (formData: ArrivalFormData, result: ArrivalResult) => {
    setTripFormData(formData);
    setTripResult(result);
    setPage('result');
  };

  const handleBack = () => {
    setPage('home');
    setTripResult(null);
    setTripFormData(null);
  };

  return (
    <LanguageProvider>
      {page === 'result' && tripResult && tripFormData ? (
        <ResultPage
          onBack={handleBack}
          formData={tripFormData}
          result={tripResult}
        />
      ) : page === 'privacy' ? (
        <Privacy />
      ) : page === 'terms' ? (
        <Terms />
      ) : (
        <LandingPage onSearch={handleSearch} />
      )}
    </LanguageProvider>
  );
}