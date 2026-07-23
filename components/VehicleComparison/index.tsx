import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  TransportComparison,
  SortOption,
  TerminalId,
  BaggageType,
  calculateTripComparison,
} from '@core';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';
import { SortToggle } from './SortToggle';
import { VehicleCard } from './VehicleCard';

interface Props {
  arrivalTime: string;
  terminalId: TerminalId;
  baggageType: BaggageType;
  destinationId: string;
}

export function VehicleComparison({
  arrivalTime,
  terminalId,
  baggageType,
  destinationId,
}: Props) {
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Pull `isPeakHour` from `metadata` so the peak badge can render.
  // The badge is part of the spec's edge-case copy (story 14: peak-hour
  // surcharge reflected in arrival estimate).
  const { comparison: comparisons, metadata: { isPeakHour } } = useMemo(
    () =>
      calculateTripComparison({
        arrivalTime,
        terminalId,
        baggageType,
        destinationId,
        sortBy,
      }),
    [arrivalTime, terminalId, baggageType, destinationId, sortBy]
  );

  const c = resultCopyVi.comparison;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{c.title}</Text>
        {isPeakHour && <Text style={styles.peakBadge}>{c.peakBadge}</Text>}
      </View>

      <SortToggle value={sortBy} onChange={setSortBy} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {comparisons.map((comparison: TransportComparison) => (
          <VehicleCard key={comparison.id} comparison={comparison} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontFamily: ds.font.display, fontSize: 22, fontWeight: '700', color: ds.semantic.textPrimary },
  peakBadge: {
    backgroundColor: ds.semantic.accentWarning,
    color: ds.color.ivory['50'],
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  scroll: { paddingVertical: 12, gap: 16 },
});
