import { useLanguage } from '../../contexts/LanguageContext';
import { ArrivalResult, ArrivalFormData, isPeakHour } from '@core';
import { JourneyTimeline } from './JourneyTimeline';
import { BusRecommendation } from './BusRecommendation';
import { GrabFallback } from './GrabFallback';
import { VehicleComparison } from '../VehicleComparison';
import styles from './index.module.css';

interface ResultDisplayProps {
  result: ArrivalResult;
  formData: ArrivalFormData;
  onRecalculate: () => void;
}

export function ResultDisplay({ result, formData, onRecalculate }: ResultDisplayProps) {
  const { t } = useLanguage();
  const isPeak = isPeakHour(formData.arrivalTime);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t.results.title}</h1>
        <p className={styles.subtitle}>
          {t.results.basedOn} {formData.arrivalTime}
          {isPeak && ` (${t.results.peakHour})`}
        </p>
      </header>

      {result.bus.available ? (
        <>
          <JourneyTimeline
            result={result}
            formData={formData}
          />
          <BusRecommendation
            recommendation={result.bus}
          />
        </>
      ) : (
        <div className={styles.noBus}>
          <div className={styles.noBusIcon}>⚠️</div>
          <h2 className={styles.noBusTitle}>{t.results.noBus}</h2>
          <p className={styles.noBusText}>
            {t.results.lastBusAt} 22:15. {t.results.needToArriveBy} 22:00.
          </p>
        </div>
      )}

      <GrabFallback
        priceEstimate={result.grab.priceEstimate}
        travelTime={result.grab.travelTime}
      />

      <VehicleComparison
        formData={{
          arrivalTime: formData.arrivalTime,
          terminalId: formData.terminal as 'T1' | 'T2',
          baggageType: formData.baggage ?? 'carry_on',
          destinationId: formData.destination || 'old-quarter',
        }}
      />

      <div className={styles.actions}>
        <button className={styles.recalculateButton} onClick={onRecalculate}>
          {t.results.recalculate}
        </button>
      </div>
    </div>
  );
}
