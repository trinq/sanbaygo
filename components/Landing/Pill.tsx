import { Text, View } from 'react-native';
import { landingCopy } from './landing-copy.vi';

export function Pill() {
  return (
    <View className="flex-row items-center gap-2 self-start rounded-full border border-surface-border bg-white/70 px-4 py-1.5">
      <View className="h-2 w-2 rounded-full bg-primary" />
      <Text className="text-sm font-semibold text-ink-soft">{landingCopy.pill}</Text>
    </View>
  );
}
