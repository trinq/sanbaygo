import { useLanguage } from '../../contexts/LanguageContext';
import { BUS_86_SCHEDULE } from '@core';
import styles from './BusTimetableSpine.module.css';

interface BusTimetableSpineProps {
  /** The earliest catchable departure, in HH:mm. */
  catchableFrom: string | null;
  /** Recommendation: highlight one specific departure as the choice. */
  recommendedDeparture?: string | null;
  /** True if the user has missed the last bus. */
  hasMissedLastBus?: boolean;
  /** True if the user is inside the peak hour window. */
  isPeak?: boolean;
}

/**
 * The signature element of the result screen.
 * A vertical rail of the 26 Bus 86 departures. Past departures are struck
 * in muted ink. Catchable ones sit in solid ink. The recommended one is
 * printed in signal red, with a small label that says "next catchable."
 *
 * Reads like a printed timetable at the airport stop.
 */
export function BusTimetableSpine({
  catchableFrom,
  recommendedDeparture,
  hasMissedLastBus,
  isPeak,
}: BusTimetableSpineProps) {
  const { t } = useLanguage();

  return (
    <section className={styles.spine} aria-label={t.results.spineTitle}>
      <header className={styles.spineHeader}>
        <div className={styles.headEyebrow}>
          <span className={styles.headEyebrowRule} aria-hidden="true" />
          <span>{t.results.spineEyebrow}</span>
        </div>
        <h2 className={styles.headTitle}>{t.results.spineTitle}</h2>
        {isPeak && (
          <p className={styles.headMeta}>
            <span className={styles.headMetaDot} aria-hidden="true" />
            {t.results.peakHour}
          </p>
        )}
      </header>

      <div className={styles.railWrap}>
        <div className={styles.rail} aria-hidden="true" />

        <ol className={styles.departures}>
          {BUS_86_SCHEDULE.map((time) => {
            const status = pickStatus(time, {
              catchableFrom,
              hasMissedLastBus,
            });
            const isRecommended = recommendedDeparture === time;
            return (
              <li
                key={time}
                className={`${styles.departure} ${styles[`status_${status}`]} ${isRecommended ? styles.recommended : ''}`}
              >
                <span className={styles.tick} aria-hidden="true" />
                <span className={styles.time}>{time}</span>
                <span className={styles.label}>
                  {isRecommended
                    ? t.results.spineNext
                    : status === 'missed'
                      ? t.results.spineMissed
                      : ''}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <footer className={styles.spineFooter}>
        <span className={styles.legendKey}>
          <span className={`${styles.legendTick} ${styles.legendTickMuted}`} aria-hidden="true" />
          {t.results.spineMissed}
        </span>
        <span className={styles.legendKey}>
          <span className={`${styles.legendTick} ${styles.legendTickInk}`} aria-hidden="true" />
          {t.results.spineCatchable}
        </span>
        <span className={styles.legendKey}>
          <span className={`${styles.legendTick} ${styles.legendTickAccent}`} aria-hidden="true" />
          {t.results.spineNext}
        </span>
      </footer>
    </section>
  );
}

type Status = 'missed' | 'catchable' | 'last';

function pickStatus(
  time: string,
  { catchableFrom, hasMissedLastBus }: { catchableFrom: string | null; hasMissedLastBus?: boolean },
): Status {
  const t = toMinutes(time);
  const last = toMinutes(BUS_86_SCHEDULE[BUS_86_SCHEDULE.length - 1]);
  if (t === last && hasMissedLastBus) return 'missed';
  if (catchableFrom === null) return 'missed';
  const from = toMinutes(catchableFrom);
  return t >= from ? 'catchable' : 'missed';
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}
