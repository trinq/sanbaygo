import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrivalResult, isPeakHour } from '@core';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';
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
  const c = resultCopyVi;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{c.header.title}</Text>
        <Text style={styles.subtitle}>
          {c.header.basedOn} {arrivalTime}
          {isPeak && ` ${c.header.peakSuffix}`}
        </Text>
      </View>

      <BusRecommendationCard recommendation={result.bus} />

      {result.bus.available && result.direction && (
        <DirectionGuide
          description={result.direction.description}
          estimatedMinutes={result.direction.estimatedMinutes}
        />
      )}

      <GrabFallbackCard
        priceEstimate={result.grab.priceEstimate}
        travelTime={result.grab.travelTime}
        isPeak={isPeak}
      />

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={c.actions.back}
        >
          <Text style={styles.backButtonText}>{c.actions.back}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recalculateButton}
          onPress={onRecalculate}
          accessibilityRole="button"
          accessibilityLabel={c.actions.recalculate}
        >
          <Text style={styles.recalculateButtonText}>{c.actions.recalculate}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: ds.space[4] },
  header: { marginBottom: 20 },
  title: {
    fontFamily: ds.font.display,
    fontSize: ds.fontSize.display,
    fontWeight: '700',
    color: ds.semantic.textPrimary,
    marginBottom: 4,
  },
  subtitle: { fontSize: ds.fontSize.body, color: ds.semantic.textMuted },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  backButton: { paddingVertical: 14, paddingHorizontal: 20 },
  backButtonText: { fontSize: 16, color: ds.semantic.textMuted, fontWeight: '500' },
  recalculateButton: {
    flex: 1,
    backgroundColor: ds.semantic.accentRecommended,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  recalculateButtonText: { fontSize: 16, fontWeight: '600', color: ds.color.ivory['50'] },
});
