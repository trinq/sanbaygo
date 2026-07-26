import { Text, View } from 'react-native';
import { landingCopy } from './landing-copy.vi';

export function BenefitChips() {
  const chips = [
    { title: landingCopy.benefitFast, subtitle: landingCopy.benefitFastDesc },
    { title: landingCopy.benefitSafe, subtitle: landingCopy.benefitSafeDesc },
    { title: landingCopy.benefitCheap, subtitle: landingCopy.benefitCheapDesc },
  ];

  return (
    <View className="mt-8 flex-row flex-wrap gap-3">
      {chips.map((chip) => (
        <View
          key={chip.title}
          className="flex-row items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5"
        >
          <View className="rounded-full bg-emerald-100 p-1.5">
            <Text className="text-emerald-600">★</Text>
          </View>
          <View>
            <Text className="text-sm font-bold text-ink">{chip.title}</Text>
            <Text className="text-xs text-ink-soft">{chip.subtitle}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
