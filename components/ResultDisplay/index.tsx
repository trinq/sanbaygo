import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrivalResult } from '../../types';
import { isPeakHour } from '../../calculation-engine';
import { BusRecommendationCard } from './BusRecommendation';
import { GrabFallbackCard } from './GrabFallback';
import { DirectionGuide } from './DirectionGuide';

interface ResultDisplayProps {
  result: ArrivalResult;
  arrivalTime: string;
  onBack: () => void;
  onRecalculate: () => void;
}

export function ResultDisplay({ result, arrivalTime, onBack, onRecalculate }: ResultDisplayProps) {
  const isPeak = isPeakHour(arrivalTime);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Kết quả</Text>
        <Text style={styles.subtitle}>
          Dựa trên giờ đáp {arrivalTime}
          {isPeak && ' (giờ cao điểm)'}
        </Text>
      </View>

      {/* Bus recommendation */}
      <BusRecommendationCard recommendation={result.bus} />

      {/* Direction guide (if bus available) */}
      {result.bus.available && result.direction && (
        <DirectionGuide
          description={result.direction.description}
          estimatedMinutes={result.direction.estimatedMinutes}
        />
      )}

      {/* Grab fallback */}
      <GrabFallbackCard
        priceEstimate={result.grab.priceEstimate}
        travelTime={result.grab.travelTime}
        isPeak={isPeak}
      />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Sửa lại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.recalculateButton} onPress={onRecalculate}>
          <Text style={styles.recalculateButtonText}>Tính lại</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7C8F',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6B7C8F',
    fontWeight: '500',
  },
  recalculateButton: {
    flex: 1,
    backgroundColor: '#1E3A5F',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  recalculateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
