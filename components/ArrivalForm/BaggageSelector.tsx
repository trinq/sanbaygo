import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BaggageSelectorProps {
  value: 'carry_on' | 'checked' | null;
  onChange: (baggage: 'carry_on' | 'checked') => void;
}

export function BaggageSelector({ value, onChange }: BaggageSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Loại hành lý</Text>
      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.option, value === 'carry_on' && styles.optionSelected]}
          onPress={() => onChange('carry_on')}
        >
          <Text style={styles.optionIcon}>🎒</Text>
          <Text style={[styles.optionTitle, value === 'carry_on' && styles.optionTitleSelected]}>
            Xách tay
          </Text>
          <Text style={[styles.optionSubtitle, value === 'carry_on' && styles.optionSubtitleSelected]}>
            Không cần nhận hành lý
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, value === 'checked' && styles.optionSelected]}
          onPress={() => onChange('checked')}
        >
          <Text style={styles.optionIcon}>🧳</Text>
          <Text style={[styles.optionTitle, value === 'checked' && styles.optionTitleSelected]}>
            Ký gửi
          </Text>
          <Text style={[styles.optionSubtitle, value === 'checked' && styles.optionSubtitleSelected]}>
            Cần chờ nhận hành lý
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 16,
  },
  options: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#F5F7FA',
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#E8F4F8',
    borderColor: '#1E3A5F',
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  optionTitleSelected: {
    color: '#1E3A5F',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6B7C8F',
    textAlign: 'center',
  },
  optionSubtitleSelected: {
    color: '#1E3A5F',
  },
});
