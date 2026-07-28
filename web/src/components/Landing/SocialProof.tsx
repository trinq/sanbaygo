import { useLanguage } from '../../contexts/LanguageContext';

export function SocialProof() {
  const { t } = useLanguage();
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-ink">{t.landing.socialProof.badge}</p>
        <p className="text-sm text-ink-soft">{t.landing.socialProof.tagline}</p>
      </div>
    </div>
  );
}