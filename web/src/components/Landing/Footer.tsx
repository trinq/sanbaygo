import { useLanguage } from '../../contexts/LanguageContext';
import { BrandMark } from './BrandMark';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-16 border-t border-surface-border bg-white/40 px-4 py-8 backdrop-blur-md lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <BrandMark />
        <p className="max-w-md text-center text-sm text-ink-soft lg:text-left">
          {t.landing.assumption}
        </p>
        <div className="flex gap-6 text-sm text-ink-soft">
          <a href="#" className="hover:text-ink">Privacy</a>
          <a href="#" className="hover:text-ink">Terms</a>
          <a href="#" className="hover:text-ink">Contact</a>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-ink-quiet lg:text-left">
        {t.landing.footer}
      </p>
    </footer>
  );
}