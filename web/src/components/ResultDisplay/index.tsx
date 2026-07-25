import { useLanguage } from '../../contexts/LanguageContext';
import { ArrivalResult, ArrivalFormData } from '@core';
import styles from './index.module.css';

interface ResultDisplayProps {
  result: ArrivalResult;
  formData: ArrivalFormData;
  onRecalculate: () => void;
}

export function ResultDisplay({ result, formData, onRecalculate }: ResultDisplayProps) {
  const { t } = useLanguage();

  return (
    <article className={styles.root}>
      <header className={styles.header}>
        <div className={styles.byline}>
          <span className={styles.bylineLabel}>Số 02 — Chuyến đi</span>
          <span className={styles.bylineRule} aria-hidden="true" />
          <span className={styles.bylineTime}>{formData.arrivalTime}</span>
        </div>

        <h1 className={styles.title}>
          {result.bus.available ? (
            <>
              Chuyến buýt kế tiếp: <span className={styles.titleCatchable}>{result.bus.trip?.departureTime}</span>.
            </>
          ) : (
            <>
              Đã lỡ chuyến cuối. <span className={styles.titleMissed}>Gọi xe thôi.</span>
            </>
          )}
        </h1>

        <p className={styles.lede}>
          {result.bus.available ? (
            <>
              Bạn hạ cánh lúc <span className={styles.ledeMark}>{formData.arrivalTime}</span>,
              đi bộ ~{t.results.timelineExitSub}, và bắt{' '}
              <strong className={styles.ledeStrong}>xe buýt 86</strong> lúc{' '}
              <span className={styles.ledeMark}>{result.bus.trip?.departureTime}</span>.
              Đến <span className={styles.ledeMark}>{result.bus.trip?.arrivalEstimate?.late ?? '—'}</span>.
            </>
          ) : (
            <>
              Chuyến cuối lúc 22:15. Bạn hạ cánh lúc{' '}
              <span className={styles.ledeMark}>{formData.arrivalTime}</span> — không kịp.
              Gọi xe là lựa chọn duy nhất.
            </>
          )}
        </p>

        <button type="button" className={styles.editLink} onClick={onRecalculate}>
          {t.results.edit}
        </button>
      </header>

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
            <span className={styles.footnoteKey}>Grab · Taxi</span>
            <span className={styles.footnoteValue}>~250–350k VND</span>
            <span className={styles.footnoteMeta}>40–60 phút</span>
          </div>
          <div className={styles.footnoteLine}>
            <span className={styles.footnoteKey}>Đón tại</span>
            <span className={styles.footnoteValue}>Cột số 4 · Tầng 1 nhà ga đến</span>
            <span className={styles.footnoteMeta}>2 phút đi bộ</span>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerNote}>{t.results.disclaimer}</span>
        <button type="button" className={styles.recalcLink} onClick={onRecalculate}>
          {t.results.recalculate}
        </button>
      </footer>
    </article>
  );
}
