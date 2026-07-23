import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { ds } from '../tokens';

export type GlassTier = 1 | 2 | 3;

interface ResultCardProps {
  tier?: GlassTier;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  testID?: string;
}

export function ResultCard({ tier = 1, style, children, testID }: ResultCardProps) {
  return <View testID={testID} style={[styles.base, tierStyles[tier], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    // `position: 'relative'` so absolutely-positioned children (e.g. the
    // "Đề xuất" badge in BusRecommendation) anchor to this card, not the
    // screen root.
    position: 'relative',
    borderRadius: ds.radius.lg,
    padding: ds.space[4],
    marginBottom: ds.space[4],
    borderWidth: 1,
    borderColor: ds.semantic.borderGlass,
    shadowColor: '#C45A2C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 4,
  },
});

const tierStyles: Record<GlassTier, ViewStyle> = {
  1: { backgroundColor: ds.glass['1'].background },
  2: { backgroundColor: ds.glass['2'].background },
  3: { backgroundColor: ds.glass['3'].background },
};
