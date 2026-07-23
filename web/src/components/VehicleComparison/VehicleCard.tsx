import { TransportComparison } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './VehicleCard.module.css';

interface VehicleCardProps {
  comparison: TransportComparison;
}

const TYPE_ICONS: Record<string, string> = {
  bus: '🚌',
  motorbike: '🏍️',
  car: '🚗',
};

export function VehicleCard({ comparison }: VehicleCardProps) {
  const { t } = useLanguage();
  const icon = TYPE_ICONS[comparison.type] || '🚗';
  const className = `${styles.card} ${comparison.isRecommended ? styles.recommended : ''}`;

  return (
    <div className={className}>
      {comparison.isRecommended && (
        <div className={styles.badge}>{t.results.recommended}</div>
      )}

      <div className={styles.header}>
        <span className={styles.icon} aria-hidden>{icon}</span>
        <div className={styles.name}>
          <h3 className={styles.nameText}>{comparison.nameVi}</h3>
          <span className={styles.nameEn}>{comparison.name}</span>
        </div>
      </div>

      <div className={styles.price}>
        <span className={styles.priceValue}>{comparison.price.estimate}</span>
        {comparison.price.isEstimate && (
          <span className={styles.estimateTag}>{t.results.grabEstimate}</span>
        )}
      </div>

      <div className={styles.time}>
        <span aria-hidden>⏱️</span>
        <span>{comparison.travelTime.estimate}</span>
      </div>

      {comparison.waitTime && (
        <div className={styles.wait}>
          <span className={styles.waitLabel}>Chờ xe:</span>
          <span className={styles.waitValue}>
            {comparison.waitTime.minutes} phút ({comparison.waitTime.nextDeparture})
          </span>
        </div>
      )}

      <div className={styles.arrival}>
        <span className={styles.arrivalLabel}>Đến nơi:</span>
        <span className={styles.arrivalValue}>{comparison.travelTime.arrivalEstimate}</span>
      </div>

      <div className={styles.ratings}>
        <div className={styles.rating}>
          <span className={styles.ratingLabel}>Hành lý</span>
          <span className={`${styles.ratingBadge} ${styles[`score${comparison.luggage.score}`]}`}>
            {comparison.luggage.label}
          </span>
        </div>
        <div className={styles.rating}>
          <span className={styles.ratingLabel}>Thoải mái</span>
          <span className={`${styles.ratingBadge} ${styles[`score${comparison.comfort.score}`]}`}>
            {comparison.comfort.label}
          </span>
        </div>
      </div>

      {comparison.ecoFriendly && (
        <div className={styles.eco}>🌿 Thân thiện môi trường</div>
      )}

      <p className={styles.notes}>{comparison.notes}</p>
    </div>
  );
}
