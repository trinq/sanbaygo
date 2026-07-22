import { SortOption } from '@core';
import styles from './SortToggle.module.css';

interface SortToggleProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Đề xuất' },
  { value: 'cheapest', label: 'Giá rẻ nhất' },
  { value: 'fastest', label: 'Nhanh nhất' },
];

export function SortToggle({ value, onChange }: SortToggleProps) {
  return (
    <div className={styles.container}>
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`${styles.button} ${value === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
