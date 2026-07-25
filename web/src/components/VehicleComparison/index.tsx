import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { calculateTripComparison, sortComparisons } from '../../lib/transport-calculator';
import type { SortOption } from '@core';
import { useViewport } from '../../hooks/useViewport';
import { RecommendedRow } from '../ResultDisplay/RecommendedRow';
import { SortToggle } from './SortToggle';
import styles from './index.module.css';

interface Props {
  formData: {
    arrivalTime: string;
    terminalId: 'T1' | 'T2';
    baggageType: 'carry_on' | 'checked';
    destinationId: string;
  };
}

const ICONS: Array<'bus' | 'taxi' | 'grab'> = ['bus', 'taxi', 'grab'];

export function VehicleComparison({ formData }: Props) {
  const { t } = useLanguage();
  const viewport = useViewport();
  const [sort, setSort] = useState<SortOption>('recommended');

  const comparison = sortComparisons(
    calculateTripComparison({ ...formData, sortBy: 'recommended' }).comparison,
    sort,
  );

  if (viewport === 'desktop') {
    return (
      <section className={styles.section}>
        <SortToggle value={sort} onChange={setSort} />
        <div className={styles.table}>
          {comparison.map((c, idx) => (
            <RecommendedRow
              key={c.id}
              icon={ICONS[idx % ICONS.length]}
              name={c.name}
              sub={c.notes ?? ''}
              price={c.price.estimate}
              badge={idx === 0 && sort === 'recommended' ? t.results.recommended : undefined}
              time={`${c.travelTime.minutesRange.min}-${c.travelTime.minutesRange.max}`}
              convenience={`${c.comfort.score} / 5`}
              luggage={c.luggage.label}
              isRecommended={idx === 0 && sort === 'recommended'}
              action={idx === 0 ? 'primary' : 'secondary'}
              actionLabel={t.results.actionBus}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <SortToggle value={sort} onChange={setSort} />
      <div className={styles.cards}>
        {comparison.map((c, idx) => (
          <article
            key={c.id}
            className={`${styles.card} ${idx === 0 && sort === 'recommended' ? styles.cardRecommended : ''}`}
          >
            <h3 className={styles.cardTitle}>{c.name}</h3>
            <div className={styles.cardPrice}>{c.price.estimate}</div>
            <p className={styles.cardSub}>{c.notes}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
