import { useLanguage } from '../../contexts/LanguageContext';

export function Pill() {
  const { t } = useLanguage();
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white/70 px-4 py-1.5 text-sm font-semibold text-ink-soft backdrop-blur-md">
      <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
      {t.landing.pill}
    </span>
  );
}