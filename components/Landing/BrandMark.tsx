import { Text, View } from 'react-native';
import { landingCopy } from './landing-copy.vi';

export function BrandMark() {
  return (
    <View className="flex-row items-center gap-2">
      <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Text className="text-base font-extrabold text-white">▲</Text>
      </View>
      <Text className="text-2xl font-extrabold text-ink">
        {landingCopy.navBrand}
        <Text className="text-primary">{landingCopy.navBrandAccent}</Text>
      </Text>
    </View>
  );
}
