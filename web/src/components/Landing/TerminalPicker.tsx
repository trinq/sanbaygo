import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Terminal, TerminalId } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';

export type TerminalPickerProps = {
  value: TerminalId | null;
  options: Terminal[];
  onChange: (id: TerminalId) => void;
};

export function TerminalPicker({ value, options, onChange }: TerminalPickerProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const selected = value ? options.find((opt) => opt.id === value) : null;

  return (
    <div className="relative">
      <label className="text-xs font-semibold text-ink-soft">{t.landing.fieldTerminal}</label>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="mt-2 flex w-full items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-3 text-left text-ink hover:border-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="font-semibold">
          {selected ? selected.name : t.landing.terminalPlaceholder}
        </span>
        <ChevronDown size={18} className="text-ink-soft" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-surface-border bg-white shadow-card"
        >
          {options.map((opt) => {
            const isSelected = value === opt.id;
            return (
              <li
                key={opt.id}
                role="option"
                aria-selected={isSelected}
                className="cursor-pointer px-4 py-3 hover:bg-primary-soft"
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
              >
                {opt.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
