interface TimePickerProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (time: string) => void;
}

export function TimePicker({ label, hint, value, onChange }: TimePickerProps) {
  return (
    <div>
      <label
        htmlFor="landing-arrival-time"
        className="text-xs font-semibold text-ink-soft"
      >
        {label}
      </label>
      <input
        id="landing-arrival-time"
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        aria-describedby={hint ? 'landing-arrival-time-hint' : undefined}
        step={300}
        className="mt-2 block w-full rounded-xl border border-surface-border bg-white px-4 py-2 text-lg font-bold text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {hint && (
        <p
          id="landing-arrival-time-hint"
          className="mt-1 text-xs text-ink-soft/80"
        >
          {hint}
        </p>
      )}
    </div>
  );
}