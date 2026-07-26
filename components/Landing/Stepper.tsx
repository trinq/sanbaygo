import { Pressable, Text, View } from 'react-native';

export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <View className="flex-1">
      <Text className="text-xs font-semibold text-ink-soft">{label}</Text>
      <View className="mt-2 flex-row items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-2">
        <Pressable
          onPress={() => onChange(value - 1)}
          disabled={value <= min}
          accessibilityLabel={`${label} giảm`}
          className="rounded-full p-2"
        >
          <Text className="text-ink-soft">−</Text>
        </Pressable>
        <Text className="text-lg font-bold text-ink">{value}</Text>
        <Pressable
          onPress={() => onChange(value + 1)}
          disabled={value >= max}
          accessibilityLabel={`${label} tăng`}
          className="rounded-full p-2"
        >
          <Text className="text-ink-soft">+</Text>
        </Pressable>
      </View>
    </View>
  );
}
