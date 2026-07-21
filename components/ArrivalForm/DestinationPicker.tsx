import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DESTINATIONS } from '../../data/destinations';

interface DestinationPickerProps {
  value: string | null;
  onChange: (destination: string) => void;
}

export function DestinationPicker({ value, onChange }: DestinationPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn điểm đến</Text>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {DESTINATIONS.map((dest) => (
          <TouchableOpacity
            key={dest.id}
            style={[styles.item, value === dest.id && styles.itemSelected]}
            onPress={() => onChange(dest.id)}
          >
            <View style={styles.itemContent}>
              <Text style={[styles.itemTitle, value === dest.id && styles.itemTitleSelected]}>
                {dest.name}
              </Text>
              {dest.hasBusCoverage ? (
                <Text style={styles.itemSubtitle}>
                  Xe buýt 86: {dest.travelTime.normal.min}-{dest.travelTime.normal.max} phút
                </Text>
              ) : (
                <Text style={styles.itemSubtitleWarning}>
                  Không có xe buýt 86, chỉ Grab
                </Text>
              )}
            </View>
            {value === dest.id && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  itemSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#1E3A5F',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  itemTitleSelected: {
    color: '#1E3A5F',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6B7C8F',
  },
  itemSubtitleWarning: {
    fontSize: 14,
    color: '#D97706',
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
