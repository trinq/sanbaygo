import { BlurView } from 'expo-blur';
import { View } from 'react-native';
import { CTAButton } from './CTAButton';
import { DepartureDropdown } from './DepartureDropdown';
import { DestinationChips } from './DestinationChips';
import { landingCopy } from './landing-copy.vi';
import { Stepper } from './Stepper';
import type { SearchCardProps } from './types';

export function SearchCard({
  departure,
  destination,
  people,
  luggage,
  onDepartureChange,
  onDestinationChange,
  onPeopleChange,
  onLuggageChange,
  onSubmit,
}: SearchCardProps) {
  const ready = departure !== null && destination !== null;

  return (
    <View className="overflow-hidden rounded-2xl border border-surface-border">
      <BlurView intensity={60} tint="light" className="p-6">
        <View className="gap-4">
          <DepartureDropdown value={departure} onChange={onDepartureChange} />
          <DestinationChips value={destination} onChange={onDestinationChange} />
          <View className="flex-row gap-3">
            <Stepper
              label={landingCopy.fieldPeople}
              value={people}
              min={1}
              max={10}
              onChange={onPeopleChange}
            />
            <Stepper
              label={landingCopy.fieldLuggage}
              value={luggage}
              min={0}
              max={10}
              onChange={onLuggageChange}
            />
          </View>
          <CTAButton disabled={!ready} onClick={onSubmit} />
        </View>
      </BlurView>
    </View>
  );
}
