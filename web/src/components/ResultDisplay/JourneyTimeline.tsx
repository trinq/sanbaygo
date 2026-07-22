import { useLanguage } from '../../contexts/LanguageContext';
import { ArrivalResult, ArrivalFormData, calculateExitTime, NOI_BAI_AIRPORT } from '@core';
import styles from './JourneyTimeline.module.css';

interface JourneyTimelineProps {
  result: ArrivalResult;
  formData: ArrivalFormData;
}

export function JourneyTimeline({ result, formData }: JourneyTimelineProps) {
  const { t } = useLanguage();

  if (!formData.terminal || !formData.baggage || !result.bus.trip) {
    return null;
  }

  const terminalInfo = NOI_BAI_AIRPORT.terminals.find(t => t.id === formData.terminal);
  const exitTime = calculateExitTime(terminalInfo!.type, formData.baggage, formData.flightType);

  // Calculate timeline points
  const arrivalMinutes = timeToMinutes(formData.arrivalTime);
  const exitMinutes = arrivalMinutes + exitTime.maxMinutes + 5; // +5 for walking

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t.results.journey}</h2>
      <div className={styles.timeline}>
        <TimelinePoint
          time={formData.arrivalTime}
          label={terminalInfo?.name || 'Arrival'}
          icon="✈️"
          color="primary"
        />
        <TimelineLine />
        <TimelinePoint
          time={minutesToTime(exitMinutes)}
          label={t.results.exitTerminal}
          icon="🚶"
          color="neutral"
        />
        <TimelineLine />
        <TimelinePoint
          time={minutesToTime(exitMinutes + 5)}
          label={t.results.walkToStop}
          icon="🚏"
          color="neutral"
        />
        <TimelineLine />
        <TimelinePoint
          time={result.bus.trip.departureTime}
          label={t.results.busDeparts}
          icon="🚌"
          color="success"
          highlight
        />
        {result.bus.trip.arrivalEstimate && (
          <>
            <TimelineLine />
            <TimelinePoint
              time={result.bus.trip.arrivalEstimate.late}
              label={t.results.arrive}
              icon="📍"
              color="success"
            />
          </>
        )}
      </div>
    </div>
  );
}

interface TimelinePointProps {
  time: string;
  label: string;
  icon: string;
  color: 'primary' | 'neutral' | 'success';
  highlight?: boolean;
}

function TimelinePoint({ time, label, icon, color, highlight }: TimelinePointProps) {
  return (
    <div className={`${styles.point} ${styles[color]} ${highlight ? styles.highlight : ''}`}>
      <span className={styles.pointIcon}>{icon}</span>
      <span className={styles.pointTime}>{time}</span>
      <span className={styles.pointLabel}>{label}</span>
    </div>
  );
}

function TimelineLine() {
  return <div className={styles.line} />;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
