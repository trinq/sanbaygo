import { Pressable, Text, View } from 'react-native';
import { BrandMark } from './BrandMark';
import { landingCopy } from './landing-copy.vi';

export function Nav() {
  return (
    <View className="flex-row items-center justify-between px-4 py-4">
      <BrandMark />
      <Pressable
        accessibilityLabel="Toggle language"
        className="rounded-full border border-surface-border bg-white/70 px-3 py-1"
      >
        <Text className="text-sm font-semibold text-ink-soft">
          {landingCopy.languagePill}
        </Text>
      </Pressable>
    </View>
  );
}
