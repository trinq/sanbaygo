import { useState } from 'react';
import { LandingPage } from './components/Landing';
import { ResultPage } from './components/Result';
import { LanguageProvider } from './contexts/LanguageContext';
import type { ArrivalResult, ArrivalFormData } from '@core';

export default function App() {
  const [showResult, setShowResult] = useState(false);

  const handleSearch = (_formData: ArrivalFormData, _result: ArrivalResult) => {
    setShowResult(true);
  };

  const handleBack = () => {
    setShowResult(false);
  };

  return (
    <LanguageProvider>
      {showResult ? (
        <ResultPage onBack={handleBack} />
      ) : (
        <LandingPage onSearch={handleSearch} />
      )}
    </LanguageProvider>
  );
}