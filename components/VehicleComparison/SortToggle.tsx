import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SortOption } from '@core';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';

interface Props {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const OPTIONS: SortOption[] = ['recommended', 'cheapest', 'fastest'];
const LABELS: Record<SortOption, string> = {
  recommended: resultCopyVi.comparison.sort.recommended,
  cheapest: resultCopyVi.comparison.sort.cheapest,
  fastest: resultCopyVi.comparison.sort.fastest,
};

export function SortToggle({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((opt) => {
        const active = opt === value;
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.button, active && styles.buttonActive]}
            onPress={() => onChange(opt)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={LABELS[opt]}
          >
            <Text style={[styles.buttonText, active && styles.buttonTextActive]}>
              {LABELS[opt]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: ds.glass['1'].background,
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: { backgroundColor: ds.semantic.accentRecommended },
  buttonText: { fontSize: 14, fontWeight: '500', color: ds.semantic.textMuted, fontFamily: ds.font.body },
  buttonTextActive: { color: ds.color.ivory['50'] },
});
