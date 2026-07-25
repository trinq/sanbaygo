import type { ReactNode } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { BenefitChips } from './BenefitChips';
import { Footer } from './Footer';
import { landingCopy } from './landing-copy.vi';
import { Nav } from './Nav';
import { Pill } from './Pill';
import { SocialProof } from './SocialProof';

export function Hero({ children }: { children: ReactNode }) {
  return (
    <ScrollView className="flex-1 bg-sky-50">
      <View className="relative flex-1 bg-sky-50">
        <Image
          source={require('../../assets/hero.png')}
          className="absolute right-0 top-0 h-80 w-2/3 opacity-30"
          resizeMode="cover"
        />
        <Nav />
        <View className="px-4 pb-24 pt-12">
          <Pill />
          <Text className="mt-6 text-4xl font-extrabold leading-tight text-ink">
            {landingCopy.headline}
          </Text>
          <Text className="mt-4 text-base text-ink-soft">{landingCopy.subtitle}</Text>
          <BenefitChips />
          <SocialProof />
          <View className="mt-8">{children}</View>
        </View>
        <View className="bg-white">
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
