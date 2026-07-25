import type { ReactNode } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Nav } from './Nav';
import { Pill } from './Pill';
import { BenefitChips } from './BenefitChips';
import { SocialProof } from './SocialProof';
import { Footer } from './Footer';

export function Hero({ children }: { children?: ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 to-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt=""
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80 mix-blend-overlay lg:w-2/5"
        />
        <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-r from-transparent via-white/60 to-white" />
      </div>
      <div className="relative z-10">
        <Nav />
        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Pill />
              <h1
                className="mt-6 font-extrabold leading-tight text-ink"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                {t.landing.headline.split('nhanh nhất').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="relative inline-block">
                        <span className="relative z-10">nhanh nhất</span>
                        <span
                          className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-amber-300"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </span>
                ))}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-ink-soft">{t.landing.subtitle}</p>
              <SocialProof />
              <BenefitChips />
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
        <Footer />
      </div>
    </div>
  );
}
