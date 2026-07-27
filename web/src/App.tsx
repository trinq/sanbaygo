import { useState } from 'react';
import { LandingPage } from './components/Landing';
import { ResultPage } from './components/Result';
import { LanguageProvider } from './contexts/LanguageContext';
import type { ArrivalResult, ArrivalFormData } from '@core';

export default function App() {
  const [showResult, setShowResult] = useState(false);
  const [tripResult, setTripResult] = useState<ArrivalResult | null>(null);
  const [tripFormData, setTripFormData] = useState<ArrivalFormData | null>(null);

  const handleSearch = (formData: ArrivalFormData, result: ArrivalResult) => {
    setTripFormData(formData);
    setTripResult(result);
    setShowResult(true);
  };

  const handleBack = () => {
    setShowResult(false);
    setTripResult(null);
    setTripFormData(null);
  };

  return (
    <LanguageProvider>
      {showResult && tripResult && tripFormData ? (
        <ResultPage
          onBack={handleBack}
          formData={tripFormData}
          result={tripResult}
        />
      ) : (
        <LandingPage onSearch={handleSearch} />
      )}
    </LanguageProvider>
  );
}