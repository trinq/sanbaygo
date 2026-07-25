import { Pressable, Text } from 'react-native';
import { landingCopy } from './landing-copy.vi';

export function CTAButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <Pressable
      onPress={onClick}
      disabled={disabled}
      accessibilityRole="button"
      className={[
        'mt-2 items-center justify-center rounded-xl px-6 py-4',
        disabled ? 'bg-ink-soft' : 'bg-primary',
      ].join(' ')}
    >
      <Text className="text-base font-bold text-white">{landingCopy.cta}</Text>
    </Pressable>
  );
}
