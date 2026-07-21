import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { ArrivalForm } from './components/ArrivalForm';
import { ResultDisplay } from './components/ResultDisplay';
import { useFormState } from './hooks/useFormState';
import { calculateResult } from './lib/calculation-engine';
import { SimpleArrivalResult } from './types';
import styles from './App.module.css';

type View = 'form' | 'result';

function AppContent() {
  const [view, setView] = useState<View>('form');
  const [result, setResult] = useState<SimpleArrivalResult | null>(null);
  const { formData, updateFormData, reset } = useFormState();

  const handleCalculate = () => {
    // Convert FormData to ArrivalFormData for calculation
    const formDataForCalc = {
      arrivalTime: formData.arrivalTime,
      terminal: formData.terminal,
      baggage: formData.baggage.replace('-', '_') as 'carry_on' | 'checked',
      destination: formData.destination,
      flightType: 'domestic' as const,
    };
    const calculated = calculateResult(formDataForCalc);
    if (calculated) {
      // Convert ArrivalResult to SimpleArrivalResult for display
      setResult({
        canCatchBus: calculated.bus.available,
        exitTimeMinutes: 30,
        nextBusTime: calculated.bus.trip?.departureTime ?? null,
        waitMinutes: calculated.bus.trip?.waitMinutes ?? 0,
        isPeakHour: false,
        lastBusTime: '22:15',
        grabEstimate: {
          minPrice: 250000,
          maxPrice: 350000,
          travelTime: calculated.grab.travelTime.early + ' - ' + calculated.grab.travelTime.late,
        },
      });
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
      <Header />
      <main className={styles.main}>
        {view === 'form' ? (
          <ArrivalForm
            formData={formData}
            onUpdate={updateFormData}
            onCalculate={handleCalculate}
          />
        ) : (
          result && (
            <ResultDisplay
              result={result}
              formData={formData}
              onRecalculate={handleRecalculate}
            />
          )
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
