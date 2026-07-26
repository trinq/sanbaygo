import { Minus, Plus } from 'lucide-react';

export type StepperProps = { label: string; value: number; min: number; max: number; onChange: (n: number) => void };

export function Stepper({ label, value, min, max, onChange }: StepperProps) {
  return <div>
    <label className="text-xs font-semibold text-ink-soft">{label}</label>
    <div className="mt-2 flex items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-2">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`${label} giảm`} className="rounded-full p-2 text-ink-soft hover:bg-surface-muted disabled:opacity-30"><Minus size={16} /></button>
      <span className="text-lg font-bold text-ink">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`${label} tăng`} className="rounded-full p-2 text-ink-soft hover:bg-surface-muted disabled:opacity-30"><Plus size={16} /></button>
    </div>
  </div>;
}
