import { TerminalId } from '@core';
import styles from './TerminalSelector.module.css';

interface TerminalSelectorProps {
  label: string;
  value: TerminalId | null;
  onChange: (terminal: TerminalId) => void;
  options: {
    t1: string;
    t2: string;
  };
}

export function TerminalSelector({ label, value, onChange, options }: TerminalSelectorProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.cards}>
        <button
          className={`${styles.card} ${value === 'T1' ? styles.selected : ''}`}
          onClick={() => onChange('T1')}
          type="button"
        >
          <span className={styles.icon}>✈️</span>
          <span className={styles.text}>{options.t1}</span>
        </button>
        <button
          className={`${styles.card} ${value === 'T2' ? styles.selected : ''}`}
          onClick={() => onChange('T2')}
          type="button"
        >
          <span className={styles.icon}>🌍</span>
          <span className={styles.text}>{options.t2}</span>
        </button>
      </div>
    </div>
  );
}
