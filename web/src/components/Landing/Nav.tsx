import { useLanguage } from '../../contexts/LanguageContext';
import { BrandMark } from './BrandMark';

export function Nav() {
  const { language, setLanguage } = useLanguage();
  return (
    <nav className="flex items-center justify-between px-4 py-4 lg:px-8">
      <BrandMark />
      <button
        type="button"
        onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        className="rounded-full border border-surface-border bg-white/70 px-3 py-1 text-sm font-semibold text-ink-soft hover:bg-white"
        aria-label="Toggle language"
      >
        {language === 'vi' ? 'EN' : 'VN'}
      </button>
    </nav>
  );
}
