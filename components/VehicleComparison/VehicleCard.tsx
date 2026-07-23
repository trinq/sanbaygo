import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TransportComparison } from '@core';
import { ResultCard } from '@design-system/primitives/ResultCard';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';
import { getTransportIcon } from './transportIcons';

interface Props { comparison: TransportComparison }

export function VehicleCard({ comparison }: Props) {
  const c = resultCopyVi.comparison.card;
  const icon = getTransportIcon(comparison.type);
  const tier = comparison.isRecommended ? 3 : 1;

  return (
    <ResultCard tier={tier as 1 | 2 | 3} style={styles.card}>
      {comparison.isRecommended && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{c.recommendedBadge}</Text>
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.icon} accessibilityElementsHidden importantForAccessibility="no">{icon}</Text>
        <View style={styles.nameBlock}>
          <Text style={styles.nameVi}>{comparison.nameVi}</Text>
          <Text style={styles.nameEn}>{comparison.name}</Text>
        </View>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceValue}>{comparison.price.estimate}</Text>
        {comparison.price.isEstimate && (
          <Text style={styles.estimateTag}>{c.estimateTag}</Text>
        )}
      </View>

      <View style={styles.row}>
        <Text accessibilityElementsHidden importantForAccessibility="no">⏱️</Text>
        <Text style={styles.value}>{comparison.travelTime.estimate}</Text>
      </View>

      {comparison.waitTime && (
        <View style={styles.row}>
          <Text style={styles.label}>
            {c.waitLabel}{' '}
            <Text style={styles.value}>
              {c.waitMinutesUnit.replace('{n}', String(comparison.waitTime.minutes))} ({comparison.waitTime.nextDeparture})
            </Text>
          </Text>
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.label}>
          {c.arrivalLabel}{' '}
          <Text style={styles.value}>{comparison.travelTime.arrivalEstimate}</Text>
        </Text>
      </View>

      <View style={styles.ratings}>
        <RatingChip label={c.luggageLabel} score={comparison.luggage.score} text={comparison.luggage.label} />
        <RatingChip label={c.comfortLabel} score={comparison.comfort.score} text={comparison.comfort.label} />
      </View>

      {comparison.ecoFriendly && <Text style={styles.eco}>{c.eco}</Text>}

      {!!comparison.notes && <Text style={styles.notes}>{comparison.notes}</Text>}
    </ResultCard>
  );
}

function RatingChip({ label, score, text }: { label: string; score: number; text: string }) {
  const palette =
    score >= 4 ? styles.scoreHigh :
    score === 3 ? styles.scoreMid :
    styles.scoreLow;
  return (
    <View style={styles.ratingBlock}>
      <Text style={styles.ratingLabel}>{label}</Text>
      <View style={[styles.ratingBadge, palette]}>
        <Text style={styles.ratingBadgeText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: 280 },
  badge: {
    position: 'absolute', top: -10, left: 16,
    backgroundColor: ds.semantic.accentRecommended,
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8,
  },
  badgeText: { color: ds.color.ivory['50'], fontSize: 12, fontWeight: '700' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  icon: { fontSize: 32 },
  nameBlock: { flexDirection: 'column' },
  nameVi: { fontFamily: ds.font.body, fontSize: 16, fontWeight: '600', color: ds.semantic.textPrimary },
  nameEn: { fontSize: 12, color: ds.semantic.textMuted },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 8 },
  priceValue: {
    fontFamily: ds.font.display,
    fontSize: 24, fontWeight: '700', color: ds.semantic.accentRecommended,
  },
  estimateTag: {
    fontSize: 11, fontWeight: '600',
    paddingHorizontal: 6, paddingVertical: 2,
    backgroundColor: ds.semantic.accentWarning, color: ds.color.ivory['50'],
    borderRadius: 4,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  label: { fontSize: 14, color: ds.semantic.textMuted },
  value: { fontSize: 14, fontWeight: '600', color: ds.semantic.textPrimary },
  ratings: { flexDirection: 'row', gap: 12, marginVertical: 12 },
  ratingBlock: { flexDirection: 'column', gap: 4 },
  ratingLabel: { fontSize: 11, color: ds.semantic.textMuted },
  ratingBadge: {
    paddingVertical: 4, paddingHorizontal: 8,
    borderRadius: 6, alignSelf: 'flex-start',
  },
  ratingBadgeText: { fontSize: 12, fontWeight: '600' },
  scoreHigh: { backgroundColor: 'rgba(46, 125, 50, 0.18)' },
  scoreMid: { backgroundColor: 'rgba(239, 108, 0, 0.18)' },
  scoreLow: { backgroundColor: 'rgba(198, 40, 40, 0.18)' },
  eco: { fontSize: 12, color: '#2E7D32', marginBottom: 8 },
  notes: { fontSize: 13, color: ds.semantic.textMuted, lineHeight: 18 },
});
