import { useLanguage } from '../../contexts/LanguageContext';
import { Icon } from '../Icon';
import { TiaHint } from '../Result/TiaHint';
import { ArrivalResult, ArrivalFormData, TerminalId } from '@core';
import styles from './index.module.css';

function getBusIdForAirportAndTerminal(airportId: string, terminalId: TerminalId | null): string | null {
  if (airportId === 'tan-son-nhat' && (terminalId === 'SGN-T1' || terminalId === 'SGN-T2')) {
    return 'bus-109';
  }
  return null;
}

interface ResultDisplayProps {
  result: ArrivalResult;
  formData: ArrivalFormData;
  onBack: () => void;
  onRecalculate: () => void;
}

export function ResultDisplay({ result, formData, onBack, onRecalculate }: ResultDisplayProps) {
  const { t } = useLanguage();
  const trip = result.bus.trip;
  const catchable = result.bus.available && trip;

  return (
    <article className={styles.root}>
      <header className={styles.header}>
        <div className={styles.byline}>
          <span className={styles.bylineLabel}>{t.results.tripIssue}</span>
          <span className={styles.bylineRule} aria-hidden="true" />
          <span className={styles.bylineTime}>{formData.arrivalTime}</span>
        </div>

        <h1 className={styles.title}>
          {catchable ? (
            <>
              {t.results.nextBus} <span className={styles.titleCatchable}>{trip?.departureTime}</span>.
            </>
          ) : (
            <>
              {t.results.missedLastBus} <span className={styles.titleMissed}>{t.results.callRide}</span>
            </>
          )}
        </h1>

        <p className={styles.lede}>
          {catchable ? (
            <>
              Bạn hạ cánh lúc <span className={styles.ledeMark}>{formData.arrivalTime}</span>,
              đi bộ ~{t.results.timelineExitSub}, và bắt{' '}
              <strong className={styles.ledeStrong}>xe buýt 86</strong> lúc{' '}
              <span className={styles.ledeMark}>{trip?.departureTime}</span>.
              Đến <span className={styles.ledeMark}>{trip?.arrivalEstimate?.late ?? '—'}</span>.
            </>
          ) : (
            <>
              Chuyến cuối lúc 22:15. Bạn hạ cánh lúc{' '}
              <span className={styles.ledeMark}>{formData.arrivalTime}</span> — không kịp.
              Gọi xe là lựa chọn duy nhất.
            </>
          )}
        </p>
      </header>

      <TiaHint
        airportId={formData.airportId}
        terminalId={formData.terminal}
        recommendedBusId={result.bus.trip ? getBusIdForAirportAndTerminal(formData.airportId, formData.terminal) : null}
      />

      <hr className={styles.rule} />

      {catchable && (
        <section className={styles.timelineSection} aria-label={t.results.timelineTitle}>
          <div className={styles.timelineEyebrow}>
            <span className={styles.timelineEyebrowRule} aria-hidden="true" />
            <span>{t.results.timelineTitle}</span>
          </div>

          <ol className={styles.timeline}>
            <li className={styles.timelineItem}>
              <span className={styles.timelineDot} aria-hidden="true" />
              <div className={styles.timelineRow}>
                <div className={styles.timelineKey}>
                  <Icon name="airport" size={14} color="var(--color-ink-soft)" />
                  <span>{t.results.timelineExit}</span>
                </div>
                <span className={styles.timelineTime}>{formData.arrivalTime}</span>
              </div>
              <span className={styles.timelineMeta}>{t.results.timelineExitSub}</span>
            </li>

            <li className={styles.timelineItem}>
              <span className={styles.timelineDot} aria-hidden="true" />
              <div className={styles.timelineRow}>
                <div className={styles.timelineKey}>
                  <Icon name="clock" size={14} color="var(--color-ink-soft)" />
                  <span>{t.results.timelineWalk}</span>
                </div>
                <span className={styles.timelineTime}>~{t.results.timelineWalkSub}</span>
              </div>
              <span className={styles.timelineMeta}>{t.results.timelineWalkSub}</span>
            </li>

            <li className={styles.timelineItem}>
              <span className={`${styles.timelineDot} ${styles.timelineDotFinal}`} aria-hidden="true" />
              <div className={styles.timelineRow}>
                <div className={styles.timelineKey}>
                  <Icon name="bus" size={14} color="var(--color-accent-ink)" />
                  <span>{t.results.timelineBoard}</span>
                </div>
                <span className={styles.timelineTime}>{trip?.departureTime}</span>
              </div>
              <span className={styles.timelineMeta}>
                {t.results.timelineBoardSub} · Đến {trip?.arrivalEstimate?.late ?? '—'}
              </span>
            </li>
          </ol>
        </section>
      )}

      <hr className={styles.rule} />

      <section className={styles.footnoteSection}>
        <div className={styles.footnoteEyebrow}>
          <span className={styles.footnoteEyebrowRule} aria-hidden="true" />
          <span>{t.results.rideHailTitle}</span>
        </div>
        <h2 className={styles.footnoteTitle}>
          {t.results.rideHailSubtitle}
        </h2>
        <div className={styles.footnoteRow}>
          <div className={styles.footnoteLine}>
            <span className={styles.footnoteKey}>{t.results.rideHailProviders}</span>
            <span className={styles.footnoteValue}>{t.results.rideHailPrice}</span>
            <span className={styles.footnoteMeta}>40–60 phút</span>
          </div>
          <div className={styles.footnoteLine}>
            <span className={styles.footnoteKey}>Đón tại</span>
            <span className={styles.footnoteValue}>{t.results.rideHailPickupLocation}</span>
            <span className={styles.footnoteMeta}>2 phút đi bộ</span>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerNote}>{t.results.disclaimer}</span>
        <div className={styles.footerActions}>
          <button type="button" className={styles.editLink} onClick={onBack}>
            {t.results.edit}
          </button>
          <button type="button" className={styles.recalcLink} onClick={onRecalculate}>
            {t.results.recalculate}
          </button>
        </div>
      </footer>
    </article>
  );
}
