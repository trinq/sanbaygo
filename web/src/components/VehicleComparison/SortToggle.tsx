import { SortOption } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './SortToggle.module.css';

interface SortToggleProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export function SortToggle({ value, onChange }: SortToggleProps) {
  const { t } = useLanguage();
  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'recommended', label: t.results.sortRecommended },
    { value: 'cheapest', label: t.results.sortCheapest },
    { value: 'fastest', label: t.results.sortFastest },
  ];

  return (
    <div className={styles.container}>
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`${styles.button} ${value === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
