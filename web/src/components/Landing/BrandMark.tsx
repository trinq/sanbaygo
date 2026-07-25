import { useLanguage } from '../../contexts/LanguageContext';

export function BrandMark() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="2" y="2" width="28" height="28" rx="8" fill="#0284C7" />
        <path
          d="M9 22 L16 9 L23 22 L19 22 L16 16 L13 22 Z"
          fill="white"
        />
      </svg>
      <span className="text-2xl font-extrabold text-ink">
        {t.landing.navBrand}
        <span className="text-primary">{t.landing.navBrandAccent}</span>
      </span>
    </div>
  );
}
