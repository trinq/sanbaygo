import { Pressable, ScrollView, Text, View } from 'react-native';
import { DESTINATIONS } from '@core';
import { landingCopy } from './landing-copy.vi';

export function DestinationChips({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string) => void;
}) {
  const options = DESTINATIONS.filter(
    (destination) => destination.hasBusCoverage && destination.id !== 'other',
  );

  return (
    <View>
      <Text className="text-xs font-semibold text-ink-soft">
        {landingCopy.fieldDestination}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
        <View className="flex-row gap-2">
          {options.map((destination) => {
            const selected = value === destination.id;

            return (
              <Pressable
                key={destination.id}
                onPress={() => onChange(destination.id)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                className={[
                  'rounded-full px-4 py-2',
                  selected ? 'bg-primary' : 'border border-surface-border bg-white',
                ].join(' ')}
              >
                <Text
                  className={
                    selected
                      ? 'text-sm font-semibold text-white'
                      : 'text-sm font-semibold text-ink-soft'
                  }
                >
                  {destination.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
