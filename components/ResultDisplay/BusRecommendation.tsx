import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BusRecommendation } from '../../types';

interface BusRecommendationCardProps {
  recommendation: BusRecommendation;
}

export function BusRecommendationCard({ recommendation }: BusRecommendationCardProps) {
  if (!recommendation.available) {
    return (
      <View style={styles.container}>
        <View style={styles.unavailableHeader}>
          <Text style={styles.unavailableIcon}>🚌</Text>
          <Text style={styles.unavailableTitle}>Xe buýt 86</Text>
        </View>
        <View style={styles.unavailableContent}>
          {recommendation.reason === 'no_service' && (
            <Text style={styles.unavailableText}>
              Xe buýt chưa bắt đầu hoạt động.{'\n'}
              Giờ hoạt động: 06:40 - 22:15
            </Text>
          )}
          {recommendation.reason === 'too_late' && (
            <Text style={styles.unavailableText}>
              Xe buýt đã kết thúc chuyến cuối.{'\n'}
              Giờ hoạt động: 06:40 - 22:15
            </Text>
          )}
          {recommendation.reason === 'missed_last' && (
            <Text style={styles.unavailableText}>
              Bạn không kịp chuyến cuối của ngày.{'\n'}
              Vui lòng cân nhắc Grab.
            </Text>
          )}
        </View>
      </View>
    );
  }

  const { trip } = recommendation;
  if (!trip) return null;

  return (
    <View style={styles.container}>
      <View style={styles.recommendedBadge}>
        <Text style={styles.recommendedBadgeText}>✓ ĐỀ XUẤT</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.icon}>🚌</Text>
        <Text style={styles.title}>Xe buýt 86</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Giờ xe khởi hành:</Text>
          <Text style={styles.value}>{trip.departureTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Thời gian chờ:</Text>
          <Text style={styles.value}>~{trip.waitMinutes} phút</Text>
        </View>
        {trip.arrivalEstimate && (
          <View style={styles.row}>
            <Text style={styles.label}>Thời gian đến nơi:</Text>
            <Text style={styles.value}>
              {trip.arrivalEstimate.early} - {trip.arrivalEstimate.late}
            </Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Giá vé:</Text>
          <Text style={styles.price}>{trip.ticketPrice.toLocaleString()} VND</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recommendedBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E3A5F',
  },
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 15,
    color: '#6B7C8F',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E3A5F',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  unavailableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  unavailableIcon: {
    fontSize: 28,
    marginRight: 10,
    opacity: 0.5,
  },
  unavailableTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7C8F',
  },
  unavailableContent: {
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    padding: 12,
  },
  unavailableText: {
    fontSize: 14,
    color: '#6B7C8F',
    lineHeight: 22,
  },
});
