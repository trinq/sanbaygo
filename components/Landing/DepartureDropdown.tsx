import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { NOI_BAI_AIRPORT } from '@core';
import { landingCopy } from './landing-copy.vi';

export function DepartureDropdown({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = value === NOI_BAI_AIRPORT.id ? NOI_BAI_AIRPORT : null;

  return (
    <View>
      <Text className="text-xs font-semibold text-ink-soft">
        {landingCopy.fieldDeparture}
      </Text>
      <Pressable
        onPress={() => setOpen((isOpen) => !isOpen)}
        accessibilityRole="button"
        className="mt-2 flex-row items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-3"
      >
        <Text className="font-semibold text-ink">{current?.name ?? 'Chọn sân bay'}</Text>
        <Text className="text-ink-soft">▼</Text>
      </Pressable>
      {open && (
        <Pressable
          onPress={() => {
            onChange(NOI_BAI_AIRPORT.id);
            setOpen(false);
          }}
          className="mt-1 rounded-xl border border-surface-border bg-white px-4 py-3"
        >
          <Text>{NOI_BAI_AIRPORT.name}</Text>
        </Pressable>
      )}
    </View>
  );
}
