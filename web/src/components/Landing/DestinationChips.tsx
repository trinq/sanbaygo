import type { DestinationPoint } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';

export type DestinationChipsProps = {
  value: string | null;
  options: DestinationPoint[];
  onChange: (id: string) => void;
};

export function DestinationChips({ value, options, onChange }: DestinationChipsProps) {
  const { t } = useLanguage();
  const filtered = options.filter((destination) => destination.hasBusCoverage && destination.id !== 'other');
  return (
    <div>
      <label className="text-xs font-semibold text-ink-soft">{t.landing.fieldDestination}</label>
      <div className="mt-2 flex flex-wrap gap-2">
        {filtered.map((destination) => {
          const selected = value === destination.id;
          return (
            <button
              key={destination.id}
              type="button"
              onClick={() => onChange(destination.id)}
              aria-pressed={selected}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selected ? 'bg-primary text-white' : 'border border-surface-border bg-white text-ink-soft hover:border-primary'}`}
            >
              {t.destinations[destination.id] ?? destination.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
