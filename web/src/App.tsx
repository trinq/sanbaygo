import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { ArrivalForm } from './components/ArrivalForm';
import { ResultDisplay } from './components/ResultDisplay';
import { useFormState } from './hooks/useFormState';
import { calculateResult } from './lib/calculation-engine';
import { ArrivalResult } from './types';
import styles from './App.module.css';

type View = 'form' | 'result';

function AppContent() {
  const [view, setView] = useState<View>('form');
  const [result, setResult] = useState<ArrivalResult | null>(null);
  const { formData, updateFormData, reset } = useFormState();

  const handleCalculate = () => {
    const calculated = calculateResult(formData);
    if (calculated) {
      setResult(calculated);
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
