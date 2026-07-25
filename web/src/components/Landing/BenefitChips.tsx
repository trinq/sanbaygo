import { Clock, ShieldCheck, Wallet } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function BenefitChips() {
  const { t } = useLanguage();
  const chips = [
    {
      key: 'fast',
      icon: Clock,
      title: t.landing.benefitFast,
      subtitle: t.landing.benefitFastDesc,
    },
    {
      key: 'safe',
      icon: ShieldCheck,
      title: t.landing.benefitSafe,
      subtitle: t.landing.benefitSafeDesc,
    },
    {
      key: 'cheap',
      icon: Wallet,
      title: t.landing.benefitCheap,
      subtitle: t.landing.benefitCheapDesc,
    },
  ] as const;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {chips.map(({ key, icon: Icon, title, subtitle }) => (
        <div
          key={key}
          className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5"
        >
          <div className="rounded-full bg-emerald-100 p-1.5">
            <Icon size={16} className="text-emerald-600" aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-bold text-ink">{title}</div>
            <div className="text-xs text-ink-soft">{subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}