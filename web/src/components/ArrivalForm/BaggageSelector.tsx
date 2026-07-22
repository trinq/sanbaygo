import { BaggageType } from '@core';
import styles from './BaggageSelector.module.css';

interface BaggageSelectorProps {
  label: string;
  value: BaggageType | null;
  onChange: (baggage: BaggageType) => void;
  options: {
    carry_on: string;
    checked: string;
  };
}

export function BaggageSelector({ label, value, onChange, options }: BaggageSelectorProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.cards}>
        <button
          className={`${styles.card} ${value === 'carry_on' ? styles.selected : ''}`}
          onClick={() => onChange('carry_on')}
          type="button"
        >
          <span className={styles.icon}>🎒</span>
          <span className={styles.text}>{options.carry_on}</span>
        </button>
        <button
          className={`${styles.card} ${value === 'checked' ? styles.selected : ''}`}
          onClick={() => onChange('checked')}
          type="button"
        >
          <span className={styles.icon}>🧳</span>
          <span className={styles.text}>{options.checked}</span>
        </button>
      </div>
    </div>
  );
}
