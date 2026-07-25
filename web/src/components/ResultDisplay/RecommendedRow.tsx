import styles from './RecommendedRow.module.css';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';

interface RecommendedRowProps {
  icon: IconName;
  name: string;
  sub: string;
  price: string;
  badge?: string;
  time: string;
  convenience: string;
  luggage: string;
  isRecommended?: boolean;
  action: 'primary' | 'secondary';
  actionLabel: string;
  onAction?: () => void;
}

export function RecommendedRow({
  icon, name, sub, price, badge,
  time, convenience, luggage,
  isRecommended, action, actionLabel, onAction,
}: RecommendedRowProps) {
  return (
    <div
      className={`${styles.row} ${isRecommended ? styles.recommended : ''}`}
      aria-label={`${name} — ${price}, ${time}${isRecommended ? ' — Khuyến nghị' : ''}`}
    >
      <div className={styles.name}>
        <Icon name={icon} size={28} color={isRecommended ? 'var(--color-accent)' : 'var(--color-text-primary)'} />
        <div>
          <div className={styles.nameTitle}>{name}</div>
          <div className={styles.nameSub}>{sub}</div>
        </div>
      </div>

      <div>
        <div className={styles.price}>{price}</div>
        {badge && (
          <div className={`${styles.priceBadge} ${isRecommended ? styles.recommended : ''}`}>
            {badge}
          </div>
        )}
      </div>

      <div className={styles.cell}>
        <span className={styles.cellIcon}><Icon name="clock" size={14} /></span>
        {time}
      </div>

      <div className={styles.cell}>
        <span className={styles.cellIcon}><Icon name="speed" size={14} /></span>
        {convenience}
      </div>

      <div className={styles.cell}>
        <span className={styles.cellIcon}><Icon name="bag" size={14} /></span>
        {luggage}
      </div>

      <div className={styles.action}>
        <button
          type="button"
          className={`${styles.actionBtn} ${action === 'primary' ? styles.primary : styles.secondary}`}
          onClick={onAction}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}