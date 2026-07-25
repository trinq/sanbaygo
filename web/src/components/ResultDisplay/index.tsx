import { useLanguage } from '../../contexts/LanguageContext';
import { ArrivalResult, ArrivalFormData, isPeakHour } from '@core';
import { calculateTripComparison, sortComparisons } from '../../lib/transport-calculator';
import { useViewport } from '../../hooks/useViewport';
import { RecommendedRow } from './RecommendedRow';
import { Icon } from '../Icon';
import { tokens } from '@design-system';
import styles from './index.module.css';

interface ResultDisplayProps {
  result: ArrivalResult;
  formData: ArrivalFormData;
  onRecalculate: () => void;
}

export function ResultDisplay({ result, formData, onRecalculate }: ResultDisplayProps) {
  const { t } = useLanguage();
  const viewport = useViewport();
  const isPeak = isPeakHour(formData.arrivalTime);
  const isDesktop = viewport === 'desktop';

  const comparison = sortComparisons(
    calculateTripComparison({
      arrivalTime: formData.arrivalTime,
      terminalId: formData.terminal as 'T1' | 'T2',
      baggageType: formData.baggage ?? 'carry_on',
      destinationId: formData.destination ?? 'old-quarter',
      sortBy: 'recommended',
    }).comparison,
    'recommended',
  );

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button type="button" className={styles.editLink} onClick={onRecalculate}>
          {t.results.edit}
        </button>
        <h1 className={styles.title}>
          {t.results.from} <span className={styles.arrow}>→</span> {t.results.to}
        </h1>
        <div className={styles.meta}>
          <span>{formData.arrivalTime}</span>
          <Dot />
          <span>{t.results.peopleCount.replace('{n}', '2')}</span>
          <Dot />
          <span>{formData.baggage === 'checked' ? t.results.baggageChecked : t.results.baggageCarryOn}</span>
          {isPeak && (
            <>
              <Dot />
              <span className={styles.peak}>
                <span className={styles.peakDot} aria-hidden="true" />
                {t.results.peakHour}
              </span>
            </>
          )}
        </div>
      </header>

      {result.bus.available && (
        <div className={styles.timelineSection}>
          <h2 className={styles.sectionTitle}>{t.results.timelineTitle}</h2>
          <div className={styles.timeline}>
            <TimelineRow time={formData.arrivalTime} label={t.results.timelineExit} sub={t.results.timelineExitSub} />
            <TimelineRow time={formData.arrivalTime} label={t.results.timelineWalk} sub={t.results.timelineWalkSub} />
            <TimelineRow time={result.bus.trip?.departureTime ?? ''} label={t.results.timelineBoard} sub={t.results.timelineBoardSub} />
            <TimelineRow time={result.bus.trip?.arrivalEstimate?.late ?? ''} label={t.results.timelineArrive} sub={t.results.timelineArriveSub} last />
          </div>
        </div>
      )}

      {isDesktop ? (
        <div className={styles.table} role="table" aria-label={t.results.comparisonTitle}>
          <div className={styles.tableHead} role="row">
            {t.results.tableHeaders.map((h) => (
              <div key={h} role="columnheader" className={styles.tableHeadCell}>{h}</div>
            ))}
          </div>
          {comparison.map((c, idx) => (
            <RecommendedRow
              key={c.id}
              icon={idx === 0 ? 'bus' : idx === 1 ? 'taxi' : 'grab'}
              name={c.name}
              sub={c.notes ?? ''}
              price={c.price.estimate}
              badge={idx === 0 ? t.results.recommended : undefined}
              time={`${c.travelTime.minutesRange.min}-${c.travelTime.minutesRange.max} ${t.results.min}`}
              convenience={`${c.comfort.score} / 5`}
              luggage={c.luggage.label}
              isRecommended={idx === 0}
              action={idx === 0 ? 'primary' : 'secondary'}
              actionLabel={t.results[`action${idx === 0 ? 'Bus' : idx === 1 ? 'Taxi' : 'Grab'}` as 'actionBus']}
            />
          ))}
        </div>
      ) : (
        <div className={styles.cards}>
          {comparison.map((c, idx) => (
            <article
              key={c.id}
              className={`${styles.card} ${idx === 0 ? styles.cardRecommended : ''}`}
              aria-label={`${c.name} — ${c.price.estimate}${idx === 0 ? ' — ' + t.results.recommended : ''}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <Icon name={idx === 0 ? 'bus' : idx === 1 ? 'taxi' : 'grab'} size={28} color={idx === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)'} />
                </div>
                <div className={styles.cardName}>
                  <div className={styles.cardTitle}>{c.name}</div>
                  <div className={styles.cardSub}>{c.notes}</div>
                </div>
                <div className={styles.cardPrice}>
                  <div className={styles.priceValue}>{c.price.estimate}</div>
                  {idx === 0 && <div className={styles.priceBadge}>{t.results.recommended}</div>}
                </div>
              </div>
              <div className={styles.cardStats}>
                <Stat icon="clock" label={t.results.time} value={`${c.travelTime.minutesRange.min}-${c.travelTime.minutesRange.max} ${t.results.min}`} />
                <Stat icon="speed" label={t.results.convenience} value={`${c.comfort.score} / 5`} />
                <Stat icon="bag" label={t.results.luggage} value={c.luggage.label} />
              </div>
              <button
                type="button"
                className={`${styles.cardAction} ${idx === 0 ? styles.cardActionPrimary : styles.cardActionSecondary}`}
              >
                {t.results[`action${idx === 0 ? 'Bus' : idx === 1 ? 'Taxi' : 'Grab'}` as 'actionBus']}
              </button>
            </article>
          ))}
        </div>
      )}

      {!result.bus.available && (
        <div className={styles.noBus}>
          <Icon name="warning" size={22} color={tokens.color.warn} />
          <h2 className={styles.noBusTitle}>{t.results.noBus}</h2>
          <p className={styles.noBusText}>{t.results.lastBusAt} 22:15. {t.results.needToArriveBy} 22:00.</p>
        </div>
      )}

      <div className={styles.footnote}>
        <span>{t.results.disclaimer}</span>
        <button type="button" className={styles.recalcLink} onClick={onRecalculate}>
          {t.results.recalculate}
        </button>
      </div>
    </div>
  );
}

function Dot() {
  return <span className={styles.dot} aria-hidden="true" />;
}

function TimelineRow({ time, label, sub, last }: { time: string; label: string; sub: string; last?: boolean }) {
  return (
    <div className={`${styles.timelineRow} ${last ? styles.timelineRowLast : ''}`}>
      <div className={styles.timelineTime}>{time}</div>
      <div className={styles.timelineBody}>
        <div className={styles.timelineDot} data-last={last ? 'true' : 'false'} aria-hidden="true" />
        <div>
          <div className={styles.timelineLabel}>{label}</div>
          <div className={styles.timelineSub}>{sub}</div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: 'clock' | 'speed' | 'bag'; label: string; value: string }) {
  return (
    <div className={styles.stat}>
      <Icon name={icon} size={14} />
      <div>
        <div className={styles.statLabel}>{label}</div>
        <div className={styles.statValue}>{value}</div>
      </div>
    </div>
  );
}
