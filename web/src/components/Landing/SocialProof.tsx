import { Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function SocialProof() {
  const { t } = useLanguage();
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="flex -space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br from-sky-300 to-sky-500"
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="flex items-center gap-1">
        <Star size={16} className="fill-amber-400 text-amber-400" aria-hidden="true" />
        <span className="text-sm font-semibold text-ink">4.9</span>
      </div>
      <span className="text-sm text-ink-soft">{t.landing.socialProof}</span>
    </div>
  );
}