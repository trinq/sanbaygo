import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrivalFormData } from '../../types';
import { TimeInput } from './TimeInput';
import { TerminalSelector } from './TerminalSelector';
import { BaggageSelector } from './BaggageSelector';
import { DestinationPicker } from './DestinationPicker';

interface ArrivalFormProps {
  formData: ArrivalFormData;
  onTimeChange: (time: string) => void;
  onTerminalChange: (terminal: 'T1' | 'T2') => void;
  onBaggageChange: (baggage: 'carry_on' | 'checked') => void;
  onDestinationChange: (destination: string) => void;
  onComplete: () => void;
}

const STEPS = [
  { key: 'time', title: 'Giờ đáp', subtitle: 'Máy bay đáp lúc mấy giờ?' },
  { key: 'terminal', title: 'Nhà ga', subtitle: 'Bạn đáp ở nhà ga nào?' },
  { key: 'baggage', title: 'Hành lý', subtitle: 'Bạn mang loại hành lý gì?' },
  { key: 'destination', title: 'Điểm đến', subtitle: 'Bạn muốn đi đâu?' },
];

export function ArrivalForm({
  formData,
  onTimeChange,
  onTerminalChange,
  onBaggageChange,
  onDestinationChange,
  onComplete,
}: ArrivalFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!formData.arrivalTime;
      case 1:
        return !!formData.terminal;
      case 2:
        return !!formData.baggage;
      case 3:
        return !!formData.destination;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <TimeInput value={formData.arrivalTime} onChange={onTimeChange} />;
      case 1:
        return <TerminalSelector value={formData.terminal} onChange={onTerminalChange} />;
      case 2:
        return <BaggageSelector value={formData.baggage} onChange={onBaggageChange} />;
      case 3:
        return <DestinationPicker value={formData.destination} onChange={onDestinationChange} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        {STEPS.map((step, index) => (
          <View
            key={step.key}
            style={[
              styles.progressDot,
              index <= currentStep && styles.progressDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.header}>
        <Text style={styles.stepTitle}>{STEPS[currentStep].title}</Text>
        <Text style={styles.stepSubtitle}>{STEPS[currentStep].subtitle}</Text>
      </View>

      <View style={styles.content}>
        {renderStep()}
      </View>

      <View style={styles.navigation}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Quay lại</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === STEPS.length - 1 ? 'Xem kết quả →' : 'Tiếp tục →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8EEF4',
  },
  progressDotActive: {
    backgroundColor: '#1E3A5F',
    width: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#6B7C8F',
  },
  content: {
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8EEF4',
  },
  backButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B7C8F',
    fontWeight: '500',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#1E3A5F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#E8EEF4',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
