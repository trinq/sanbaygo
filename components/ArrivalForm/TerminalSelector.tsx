import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TerminalSelectorProps {
  value: 'T1' | 'T2' | null;
  onChange: (terminal: 'T1' | 'T2') => void;
}

export function TerminalSelector({ value, onChange }: TerminalSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn nhà ga</Text>
      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.option, value === 'T1' && styles.optionSelected]}
          onPress={() => onChange('T1')}
        >
          <Text style={[styles.optionTitle, value === 'T1' && styles.optionTitleSelected]}>
            T1
          </Text>
          <Text style={[styles.optionSubtitle, value === 'T1' && styles.optionSubtitleSelected]}>
            Chuyến bay nội địa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, value === 'T2' && styles.optionSelected]}
          onPress={() => onChange('T2')}
        >
          <Text style={[styles.optionTitle, value === 'T2' && styles.optionTitleSelected]}>
            T2
          </Text>
          <Text style={[styles.optionSubtitle, value === 'T2' && styles.optionSubtitleSelected]}>
            Chuyến bay quốc tế
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
  optionTitle: {
    fontSize: 24,
    fontWeight: '700',
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
