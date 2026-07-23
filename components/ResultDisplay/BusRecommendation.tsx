import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BusRecommendation } from '@core';
import { ResultCard } from '@design-system/primitives/ResultCard';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';

interface Props { recommendation: BusRecommendation }

export function BusRecommendationCard({ recommendation }: Props) {
  const c = resultCopyVi.bus;

  if (!recommendation.available) {
    const reason = recommendation.reason;
    if (!reason) return null;
    return (
      <ResultCard tier={1}>
        <View style={styles.unavailableHeader}>
          <Text style={styles.unavailableIcon}>🚌</Text>
          <Text style={styles.unavailableTitle}>{c.title}</Text>
        </View>
        <View style={styles.unavailableContent}>
          <Text style={styles.unavailableText}>{c.unavailable[reason]}</Text>
        </View>
      </ResultCard>
    );
  }

  const trip = recommendation.trip;
  if (!trip) return null;

  return (
    <ResultCard tier={3}>
      <View style={styles.recommendedBadge}>
        <Text style={styles.recommendedBadgeText}>{c.recommendedBadge}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.icon}>🚌</Text>
        <Text style={styles.title}>{c.title}</Text>
      </View>
      <View style={styles.content}>
        <Row label={c.departure} value={trip.departureTime} />
        <Row label={c.wait} value={c.waitMinutesUnit.replace('{n}', String(trip.waitMinutes))} />
        <Row
          label={c.arrival}
          value={trip.arrivalEstimate
            ? `${trip.arrivalEstimate.early} - ${trip.arrivalEstimate.late}`
            : '—'}
        />
        <Row label={c.price} value={formatVnd(trip.ticketPrice)} valueStyle={styles.price} />
      </View>
    </ResultCard>
  );
}

function formatVnd(value: number): string {
  // Manual dot-thousands formatter. Locale-independent (avoids CI drift
  // when `vi-VN` is not the host's default locale).
  const raw = String(value);
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
}

function Row({ label, value, valueStyle }: { label: string; value: string; valueStyle?: import('react-native').TextStyle }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  recommendedBadge: {
    position: 'absolute', top: -10, right: 16,
    backgroundColor: ds.semantic.accentRecommended,
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8,
  },
  recommendedBadgeText: { color: ds.color.ivory['50'], fontSize: 12, fontWeight: '700' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  icon: { fontSize: 32, marginRight: 12 },
  title: { fontFamily: ds.font.display, fontSize: 22, fontWeight: '700', color: ds.semantic.textPrimary },
  content: { gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  label: { fontSize: 15, color: ds.semantic.textMuted },
  value: { fontSize: 15, fontWeight: '600', color: ds.semantic.textPrimary },
  price: { fontSize: 18, fontWeight: '700', color: ds.semantic.accentRecommended },
  unavailableHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  unavailableIcon: { fontSize: 28, marginRight: 10, opacity: 0.5 },
  unavailableTitle: { fontSize: 18, fontWeight: '600', color: ds.semantic.textMuted },
  unavailableContent: { backgroundColor: 'rgba(255, 250, 245, 0.7)', borderRadius: 8, padding: 12 },
  unavailableText: { fontSize: 14, color: ds.semantic.textMuted, lineHeight: 22 },
});
