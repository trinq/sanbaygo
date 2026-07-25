import { useLanguage } from '../../contexts/LanguageContext';
import type { SortOption } from '@core';
import styles from './SortToggle.module.css';

const OPTIONS: SortOption[] = ['recommended', 'cheapest', 'fastest'];

interface Props {
  value: SortOption;
  onChange: (s: SortOption) => void;
}

export function SortToggle({ value, onChange }: Props) {
  const { t } = useLanguage();
  return (
    <div className={styles.row} role="tablist" aria-label={t.results.sortLabel}>
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          role="tab"
          aria-selected={value === opt}
          className={`${styles.btn} ${value === opt ? styles.btnActive : ''}`}
          onClick={() => onChange(opt)}
        >
          {t.results[`sort${opt.charAt(0).toUpperCase()}${opt.slice(1)}` as 'sortRecommended']}
        </button>
      ))}
    </div>
  );
}
