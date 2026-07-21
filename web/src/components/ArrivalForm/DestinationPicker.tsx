import { useLanguage } from '../../contexts/LanguageContext';
import { DESTINATIONS } from '../../lib/data';
import styles from './DestinationPicker.module.css';

interface DestinationPickerProps {
  label: string;
  value: string | null;
  onChange: (destination: string) => void;
}

const DESTINATION_ICONS: Record<string, string> = {
  'old-quarter': '🏮',
  'hoan-kiem': '🌉',
  'dong-da': '🎓',
  'ba-dinh': '🏛️',
  'cau-giay': '🏢',
};

export function DestinationPicker({ label, value, onChange }: DestinationPickerProps) {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.cards}>
        {DESTINATIONS.map((dest) => (
          <button
            key={dest.id}
            className={`${styles.card} ${value === dest.id ? styles.selected : ''}`}
            onClick={() => onChange(dest.id)}
            type="button"
          >
            <span className={styles.icon}>{DESTINATION_ICONS[dest.id] || '📍'}</span>
            <span className={styles.name}>{t.destinations[dest.id] || dest.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
