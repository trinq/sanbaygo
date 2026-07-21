import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GrabFallbackCardProps {
  priceEstimate: string;
  travelTime: { early: string; late: string };
  isPeak: boolean;
}

export function GrabFallbackCard({ priceEstimate, travelTime, isPeak }: GrabFallbackCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🚗</Text>
        <Text style={styles.title}>Grab (tham khảo)</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Giá ước tính:</Text>
          <Text style={styles.price}>{priceEstimate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Thời gian di chuyển:</Text>
          <Text style={[styles.value, isPeak && styles.peakValue]}>
            {travelTime.early} - {travelTime.late}
            {isPeak && ' (giờ cao điểm)'}
          </Text>
        </View>
        {isPeak && (
          <View style={styles.peakWarning}>
            <Text style={styles.peakWarningText}>
              ⚠️ Giờ cao điểm, thời gian có thể lâu hơn bình thường
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.disclaimer}>
        * Giá và thời gian chỉ mang tính tham khảo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F7FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8EEF4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 28,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7C8F',
  },
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: '#6B7C8F',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  peakValue: {
    color: '#D97706',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A5F',
  },
  peakWarning: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  peakWarningText: {
    fontSize: 13,
    color: '#92400E',
  },
  disclaimer: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 12,
    fontStyle: 'italic',
  },
});
