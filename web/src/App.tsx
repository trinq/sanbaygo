import { useState } from 'react';
import { LandingPage } from './components/Landing';
import { ResultPage } from './components/Result';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [showResult, setShowResult] = useState(false);

  return (
    <LanguageProvider>
      {showResult ? (
        <ResultPage onBack={() => setShowResult(false)} />
      ) : (
        <LandingPage onSearch={() => setShowResult(true)} />
      )}
    </LanguageProvider>
  );
}