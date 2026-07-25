import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NOI_BAI_AIRPORT } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';

export type DepartureDropdownProps = { value: string | null; onChange: (id: string) => void };

export function DepartureDropdown({ value, onChange }: DepartureDropdownProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const selected = value === NOI_BAI_AIRPORT.id;
  return <div className="relative">
    <label className="text-xs font-semibold text-ink-soft">{t.landing.fieldDeparture}</label>
    <button type="button" onClick={() => setOpen((current) => !current)} className="mt-2 flex w-full items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-3 text-left text-ink hover:border-primary" aria-haspopup="listbox" aria-expanded={open}>
      <span className="font-semibold">{selected ? NOI_BAI_AIRPORT.name : t.landing.departurePlaceholder}</span><ChevronDown size={18} className="text-ink-soft" />
    </button>
    {open && <ul role="listbox" className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-surface-border bg-white shadow-card">
      <li role="option" aria-selected={selected} className="cursor-pointer px-4 py-3 hover:bg-primary-soft" onClick={() => { onChange(NOI_BAI_AIRPORT.id); setOpen(false); }}>{NOI_BAI_AIRPORT.name}</li>
    </ul>}
  </div>;
}
