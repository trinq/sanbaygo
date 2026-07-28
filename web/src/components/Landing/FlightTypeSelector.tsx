import { FlightType } from '@core';
import styles from './FlightTypeSelector.module.css';

interface FlightTypeSelectorProps {
  value: FlightType;
  onChange: (v: FlightType) => void;
  label?: string;
}

export function FlightTypeSelector({
  value,
  onChange,
  label = 'Loại chuyến bay',
}: FlightTypeSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <div className={styles.options} role="radiogroup" aria-label={label}>
        <label className={styles.option}>
          <input
            type="radio"
            name="flight-type"
            value="domestic"
            checked={value === 'domestic'}
            onChange={() => onChange('domestic')}
            className={styles.radio}
          />
          <span className={`${styles.chip} ${value === 'domestic' ? styles.chipActive : ''}`}>
            ✈️ Quốc nội
          </span>
        </label>
        <label className={styles.option}>
          <input
            type="radio"
            name="flight-type"
            value="international"
            checked={value === 'international'}
            onChange={() => onChange('international')}
            className={styles.radio}
          />
          <span className={`${styles.chip} ${value === 'international' ? styles.chipActive : ''}`}>
            🌍 Quốc tế
          </span>
        </label>
      </div>
    </div>
  );
}
