import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ResultCard } from '@design-system/primitives/ResultCard';
import { ds } from '@design-system';
import { resultCopyVi } from '@design-system/copy/result-display.vi';

interface Props { description: string; estimatedMinutes: number }

// `estimatedMinutes` is kept in the props for future use (e.g. showing a
// "5 phút" badge) but is not rendered yet. Prefix with `_` so
// `noUnusedParameters` does not fire under `web/tsconfig.json` strict mode.
export function DirectionGuide({ description, estimatedMinutes: _estimatedMinutes }: Props) {
  const c = resultCopyVi.direction;
  return (
    <ResultCard tier={2}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🧭</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{c.title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </ResultCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  iconContainer: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(224, 142, 69, 0.22)',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  icon: { fontSize: 20 },
  content: { flex: 1 },
  title: {
    fontFamily: ds.font.body, fontSize: 14, fontWeight: '600',
    color: ds.semantic.textPrimary, marginBottom: 4,
  },
  description: { fontSize: 14, color: ds.semantic.textPrimary, lineHeight: 20 },
});
