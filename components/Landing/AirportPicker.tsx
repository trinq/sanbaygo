import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AIRPORT_LIST, type AirportId } from '@core';

type AirportPickerProps = {
  value: AirportId | null;
  onChange: (id: AirportId) => void;
  label: string;
  placeholder: string;
  airportLabels: Record<AirportId, string>;
};

export function AirportPicker({
  value,
  onChange,
  label,
  placeholder,
  airportLabels,
}: AirportPickerProps) {
  const [open, setOpen] = useState(false);
  const selected = value ? AIRPORT_LIST.find((a) => a.id === value) : null;

  return (
    <View>
      <Text className="text-xs font-semibold text-ink-soft">{label}</Text>
      <Pressable
        onPress={() => setOpen((current) => !current)}
        accessibilityRole="button"
        accessibilityLabel={selected ? airportLabels[selected.id] : placeholder}
        className="mt-2 flex-row items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-3"
      >
        <Text className="font-semibold text-ink">
          {selected ? airportLabels[selected.id] : placeholder}
        </Text>
        <Text className="text-ink-soft">▼</Text>
      </Pressable>
      {open && (
        <View className="mt-1 overflow-hidden rounded-xl border border-surface-border bg-white">
          {AIRPORT_LIST.map((airport) => (
            <Pressable
              key={airport.id}
              onPress={() => {
                onChange(airport.id);
                setOpen(false);
              }}
              accessibilityRole="button"
              accessibilityLabel={airportLabels[airport.id]}
              className="px-4 py-3"
            >
              <Text className={value === airport.id ? 'font-semibold text-ink' : 'text-ink'}>
                {airportLabels[airport.id]}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
