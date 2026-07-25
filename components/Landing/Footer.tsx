import { Text, View } from 'react-native';
import { BrandMark } from './BrandMark';
import { landingCopy } from './landing-copy.vi';

export function Footer() {
  return (
    <View className="mt-16 border-t border-surface-border bg-white/40 px-4 py-8">
      <View className="flex-col items-center justify-between gap-6 lg:flex-row">
        <BrandMark />
        <Text className="max-w-md text-center text-sm text-ink-soft">
          {landingCopy.assumption}
        </Text>
      </View>
      <Text className="mt-4 text-center text-xs text-ink-quiet">{landingCopy.footer}</Text>
    </View>
  );
}
