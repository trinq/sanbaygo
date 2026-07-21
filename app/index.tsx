import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useArrivalWizard } from '../hooks/useArrivalWizard';
import { ArrivalForm } from '../components/ArrivalForm';
import { ResultDisplay } from '../components/ResultDisplay';
import { ArrivalResult } from '../types';

type AppState = 'form' | 'result';

export default function HomeScreen() {
  const [appState, setAppState] = useState<AppState>('form');
  const [result, setResult] = useState<ArrivalResult | null>(null);

  const {
    formData,
    setArrivalTime,
    setTerminal,
    setBaggage,
    setDestination,
    reset,
    calculateResult,
  } = useArrivalWizard();

  const handleFormComplete = () => {
    const calculatedResult = calculateResult();
    if (calculatedResult) {
      setResult(calculatedResult);
      setAppState('result');
    }
  };

  const handleBack = () => {
    setAppState('form');
  };

  const handleRecalculate = () => {
    reset();
    setResult(null);
    setAppState('form');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {appState === 'form' ? (
          <ArrivalForm
            formData={formData}
            onTimeChange={setArrivalTime}
            onTerminalChange={setTerminal}
            onBaggageChange={setBaggage}
            onDestinationChange={setDestination}
            onComplete={handleFormComplete}
          />
        ) : (
          result && (
            <ResultDisplay
              result={result}
              arrivalTime={formData.arrivalTime}
              onBack={handleBack}
              onRecalculate={handleRecalculate}
            />
          )
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
});
