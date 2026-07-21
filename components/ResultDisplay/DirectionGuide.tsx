import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DirectionGuideProps {
  description: string;
  estimatedMinutes: number;
}

export function DirectionGuide({ description, estimatedMinutes }: DirectionGuideProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🧭</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Hướng dẫn</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FDE68A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
});
