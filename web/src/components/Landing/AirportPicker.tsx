import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AIRPORT_LIST, type AirportId } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';

export type AirportPickerProps = {
  value: AirportId | null;
  onChange: (id: AirportId) => void;
};

export function AirportPicker({ value, onChange }: AirportPickerProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const selected = value ? AIRPORT_LIST.find((a) => a.id === value) : null;

  return (
    <div className="relative">
      <label className="text-xs font-semibold text-ink-soft">{t.landing.fieldAirport}</label>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="mt-2 flex w-full items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-3 text-left text-ink hover:border-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="font-semibold">
          {selected ? selected.name : t.landing.airportPlaceholder}
        </span>
        <ChevronDown size={18} className="text-ink-soft" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-surface-border bg-white shadow-card"
        >
          {AIRPORT_LIST.map((airport) => {
            const isSelected = value === airport.id;
            return (
              <li
                key={airport.id}
                role="option"
                aria-selected={isSelected}
                className="cursor-pointer px-4 py-3 hover:bg-primary-soft"
                onClick={() => {
                  onChange(airport.id);
                  setOpen(false);
                }}
              >
                {airport.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
