import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimeRange } from '@core';
import { ResultCard } from '@design-system/primitives/ResultCard';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';

interface Props {
  priceEstimate: string;
  travelTime: TimeRange;
  isPeak: boolean;
}

export function GrabFallbackCard({ priceEstimate, travelTime, isPeak }: Props) {
  const c = resultCopyVi.grab;
  return (
    <ResultCard tier={1}>
      <View style={styles.header}>
        <Text style={styles.icon}>🚗</Text>
        <Text style={styles.title}>{c.title}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.column}>
          <Text style={styles.label}>{c.price}</Text>
          <Text style={styles.price}>{priceEstimate}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>{c.travelTime}</Text>
          <Text style={[styles.value, isPeak && styles.peakValue]}>
            {travelTime.early} - {travelTime.late}
            {isPeak && ` ${c.peakSuffix}`}
          </Text>
        </View>
        {isPeak && (
          <View style={styles.peakWarning}>
            <Text style={styles.peakWarningText}>{c.peakWarning}</Text>
          </View>
        )}
      </View>
      <Text style={styles.disclaimer}>{c.disclaimer}</Text>
    </ResultCard>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  icon: { fontSize: 28, marginRight: 10 },
  title: { fontFamily: ds.font.body, fontSize: 18, fontWeight: '600', color: ds.semantic.textPrimary },
  content: { gap: 12 },
  column: { flexDirection: 'column', gap: 4 },
  label: { fontSize: 14, color: ds.semantic.textMuted },
  value: { fontSize: 15, fontWeight: '600', color: ds.semantic.textPrimary },
  peakValue: { color: ds.semantic.accentWarning },
  price: { fontSize: 18, fontWeight: '700', color: ds.semantic.textPrimary },
  peakWarning: {
    backgroundColor: 'rgba(224, 142, 69, 0.18)',
    borderRadius: 8, padding: 10, marginTop: 8,
  },
  peakWarningText: { fontSize: 13, color: ds.semantic.accentWarning },
  disclaimer: { fontSize: 12, color: ds.semantic.textMuted, marginTop: 12, fontStyle: 'italic' },
});
