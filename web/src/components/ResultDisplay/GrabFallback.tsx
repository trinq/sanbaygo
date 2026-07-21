import { useLanguage } from '../../contexts/LanguageContext';
import { TimeRange } from '../../types';
import styles from './GrabFallback.module.css';

interface GrabFallbackProps {
  priceEstimate: string;
  travelTime: TimeRange;
}

export function GrabFallback({ priceEstimate, travelTime }: GrabFallbackProps) {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>🚗</span>
        <h3 className={styles.title}>{t.results.grabFallback}</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.price}>
          <span className={styles.priceLabel}>{t.results.priceEstimate}</span>
          <span className={styles.priceValue}>{priceEstimate}</span>
        </div>
        <div className={styles.time}>
          <span className={styles.timeLabel}>{t.results.travelTime}</span>
          <span className={styles.timeValue}>
            {travelTime.minutesRange.min} - {travelTime.minutesRange.max} min
          </span>
        </div>
      </div>

      <button className={styles.button} onClick={() => window.open('https://www.grab.com/vn/', '_blank')}>
        {t.results.openGrab}
      </button>
    </div>
  );
}
