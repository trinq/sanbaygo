import { Text, View } from 'react-native';
import { landingCopy } from './landing-copy.vi';

export function SocialProof() {
  return (
    <View className="mt-6 flex-row items-center gap-3">
      <View className="flex-row -space-x-2">
        {[1, 2, 3].map((i) => (
          <View key={i} className="h-9 w-9 rounded-full border-2 border-white bg-sky-400" />
        ))}
      </View>
      <Text className="text-sm font-semibold text-amber-400">★ 4.9</Text>
      <Text className="text-sm text-ink-soft">{landingCopy.socialProof}</Text>
    </View>
  );
}
