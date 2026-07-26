import { Plane } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const links = [
  { key: 'legalTerms' as const, href: '#terms' },
  { key: 'legalPrivacy' as const, href: '#privacy' },
  { key: 'legalSupport' as const, href: '#support' },
];

export function Footer() {
  const { t } = useLanguage();
  const brandPrefix = t.landing.navBrand;
  const brandAccent = t.landing.navBrandAccent;
  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="font-bold text-slate-800">
            {brandPrefix}
            <span className="text-primary">{brandAccent}</span>
          </span>
        </div>
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
