import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { TopBar, TabletTopBar } from './components/Layout/TopBar';
import { ArrivalForm } from './components/ArrivalForm';
import { ResultDisplay } from './components/ResultDisplay';
import { useViewport } from './hooks/useViewport';
import { useFormState } from './hooks/useFormState';
import { calculateResult } from './lib/calculation-result';
import styles from './App.module.css';

type View = 'form' | 'result';

function AppContent() {
  const [view, setView] = useState<View>('form');
  const [result, setResult] = useState<ReturnType<typeof calculateResult>>(null);
  const viewport = useViewport();
  const { formData, updateFormData, reset } = useFormState();

  const handleCalculate = () => {
    if (!formData.terminal || !formData.baggage || !formData.destination) return;
    const calc = calculateResult({
      arrivalTime: formData.arrivalTime,
      terminal: formData.terminal,
      baggage: formData.baggage,
      destination: formData.destination,
      flightType: formData.flightType,
    });
    if (calc) {
      setResult(calc);
      setView('result');
    }
  };

  const handleRecalculate = () => {
    reset();
    setResult(null);
    setView('form');
  };

  return (
    <div className={styles.app}>
      {viewport === 'mobile' ? (
        <TopBar title="SanBayGo" />
      ) : viewport === 'tablet' ? (
        <TabletTopBar />
      ) : (
        <Header />
      )}
      <main className={`${styles.main} ${styles.mainCentered}`}>
        {view === 'form' ? (
          <ArrivalForm formData={formData} onUpdate={updateFormData} onCalculate={handleCalculate} />
        ) : (
          result && <ResultDisplay result={result} formData={formData} onRecalculate={handleRecalculate} />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
