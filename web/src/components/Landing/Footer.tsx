import { useLanguage } from '../../contexts/LanguageContext';
import { BrandMark } from './BrandMark';

const links = [
  { key: 'legalTerms' as const, href: '#terms' },
  { key: 'legalPrivacy' as const, href: '#privacy' },
  { key: 'legalSupport' as const, href: '#support' },
];

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <BrandMark />
        <p className="text-sm font-medium text-slate-500 text-center">{t.landing.tagline}</p>
        <div className="flex items-center gap-6 text-sm font-semibold text-slate-500">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {t.landing[link.key]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
