import { Briefcase, Luggage as LuggageIcon } from 'lucide-react';

type BaggageChipsProps = {
  fieldLabel: string;
  carryOnLabel: string;
  checkedLabel: string;
  carryOn: boolean;
  checked: boolean;
  onCarryOnChange: (next: boolean) => void;
  onCheckedChange: (next: boolean) => void;
};

const baseClass =
  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';
const inactiveClass = 'border-surface-border bg-white text-ink-soft hover:border-primary/40 hover:text-ink';
const activeClass = 'border-transparent bg-primary text-white shadow-sm';

export function BaggageChips({
  fieldLabel,
  carryOnLabel,
  checkedLabel,
  carryOn,
  checked,
  onCarryOnChange,
  onCheckedChange,
}: BaggageChipsProps) {
  return (
    <div
      role="group"
      aria-label={fieldLabel}
      className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
    >
      <p className="sr-only">{fieldLabel}</p>
      <button
        type="button"
        aria-pressed={carryOn}
        onClick={() => onCarryOnChange(!carryOn)}
        className={`${baseClass} ${carryOn ? activeClass : inactiveClass}`}
      >
        <Briefcase className="h-4 w-4" aria-hidden="true" />
        {carryOnLabel}
      </button>
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`${baseClass} ${checked ? activeClass : inactiveClass}`}
      >
        <LuggageIcon className="h-4 w-4" aria-hidden="true" />
        {checkedLabel}
      </button>
    </div>
  );
}