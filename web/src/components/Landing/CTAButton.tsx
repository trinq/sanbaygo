import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export type CTAButtonProps = { disabled: boolean; onClick: () => void };

export function CTAButton({ disabled, onClick }: CTAButtonProps) {
  const { t } = useLanguage();
  return <button type="button" onClick={onClick} disabled={disabled} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-white shadow-primary/30 shadow-xl transition-transform duration-150 hover:bg-primary-hover hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-ink-soft disabled:shadow-none motion-reduce:transition-none motion-reduce:hover:scale-100">{t.landing.cta}<ArrowRight size={18} aria-hidden="true" /></button>;
}
