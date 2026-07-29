import { useLanguage } from '../../contexts/LanguageContext';
import { BrandMark } from './BrandMark';

interface Props {
  /** When provided, renders a text link to this path instead of the EN/VI toggle button.
   *  Used on article pages where each language has its own dedicated URL. */
  languageSwitchPath?: string;
}

export function Nav({ languageSwitchPath }: Props) {
  const { language } = useLanguage();

  return (
    <nav className="flex items-center justify-between px-4 py-4 lg:px-8">
      <BrandMark />
      {languageSwitchPath ? (
        <a
          href={languageSwitchPath}
          className="rounded-full border border-surface-border bg-white/70 px-3 py-1 text-sm font-semibold text-ink-soft hover:bg-white"
        >
          {language === 'vi' ? 'English' : 'Tiếng Việt'}
        </a>
      ) : (
        <LanguageToggle />
      )}
    </nav>
  );
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
      className="rounded-full border border-surface-border bg-white/70 px-3 py-1 text-sm font-semibold text-ink-soft hover:bg-white"
      aria-label="Toggle language"
    >
      {language === 'vi' ? 'EN' : 'VN'}
    </button>
  );
}
