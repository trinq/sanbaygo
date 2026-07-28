import type { ReactNode } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Nav } from './Nav';
import { Pill } from './Pill';
import { BenefitChips } from './BenefitChips';
import { SocialProof } from './SocialProof';
import { Footer } from './Footer';
import { HowItWorks } from './HowItWorks';

export function Hero({ children }: { children?: ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#e6eff6]">
      {/* ── Hero background — Figma blur stack (5 layers) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Đường phố hiện đại"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.85] mix-blend-overlay"
        />
        {/* Gradient trái → phải (desktop): hòa tan hero vào nội dung */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/10 md:w-2/3" />
        {/* Gradient trên → dưới (mobile): fade cho stacked layout */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/90 md:hidden" />
        {/* Lớp phủ mờ — backdrop blur nhẹ cho toàn bộ hero */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col">
        <Nav />
        <main
          data-testid="landing-main"
          className="flex-1"
        >
          <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-24 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <Pill />
                <h1
                  className="mt-6 font-extrabold leading-tight text-ink"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  {t.landing.headline}
                </h1>
                <p className="mt-4 max-w-xl text-lg text-ink-soft">{t.landing.subtitle}</p>
                <SocialProof />
                <BenefitChips />
                <HowItWorks />
              </div>
              <div className="lg:col-span-5">
                {children ?? (
                  <div
                    data-testid="search-card-slot"
                    className="rounded-2xl border border-dashed border-surface-border bg-white/60 p-12 text-center text-ink-quiet"
                  >
                    SearchCard placeholder
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
