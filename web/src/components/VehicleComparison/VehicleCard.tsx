import { TransportComparison } from '@/types';
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
  const icon = TYPE_ICONS[comparison.type] || '🚗';

  return (
    <div className={`${styles.card} ${comparison.isRecommended ? styles.recommended : ''}`}>
      {comparison.isRecommended && (
        <div className={styles.badge}>Đề xuất</div>
      )}

      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <div className={styles.name}>
          <h3 className={styles.nameText}>{comparison.nameVi}</h3>
          <span className={styles.nameEn}>{comparison.name}</span>
        </div>
      </div>

      <div className={styles.price}>
        <span className={styles.priceValue}>{comparison.price.estimate}</span>
        {comparison.price.isEstimate && (
          <span className={styles.estimateTag}>ước tính</span>
        )}
      </div>

      <div className={styles.time}>
        <span className={styles.timeIcon}>⏱️</span>
        <span className={styles.timeValue}>{comparison.travelTime.estimate}</span>
      </div>

      {comparison.waitTime && (
        <div className={styles.wait}>
          <span className={styles.waitLabel}>Chờ xe:</span>
          <span className={styles.waitValue}>{comparison.waitTime.minutes} phút</span>
          <span className={styles.waitNext}>({comparison.waitTime.nextDeparture})</span>
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
