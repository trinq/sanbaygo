import { useLanguage } from '../../contexts/LanguageContext';
import { BusRecommendation as BusRecommendationType } from '@core';
import styles from './BusRecommendation.module.css';

interface BusRecommendationProps {
  recommendation: BusRecommendationType;
}

export function BusRecommendation({ recommendation }: BusRecommendationProps) {
  const { t } = useLanguage();

  if (!recommendation.available || !recommendation.trip) {
    return null;
  }

  const { departureTime, waitMinutes, ticketPrice } = recommendation.trip;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t.results.busRecommendation}</h3>
        <span className={styles.badge}>{t.results.catchable}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.busIcon}>🚌</div>
        <div className={styles.details}>
          <div className={styles.route}>Bus 86</div>
          <div className={styles.info}>
            <span className={styles.depart}>
              {t.results.departAt}: <strong>{departureTime}</strong>
            </span>
            <span className={styles.wait}>
              {t.results.waitMinutes}: <strong>{waitMinutes} min</strong>
            </span>
            <span className={styles.price}>
              {t.results.ticketPrice}: <strong>{ticketPrice.toLocaleString()} VND</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
