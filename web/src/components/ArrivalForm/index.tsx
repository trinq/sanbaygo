import { useLanguage } from '../../contexts/LanguageContext';
import { ArrivalFormData, TerminalId, BaggageType } from '../../types';
import { TimePicker } from './TimePicker';
import { TerminalSelector } from './TerminalSelector';
import { BaggageSelector } from './BaggageSelector';
import { DestinationPicker } from './DestinationPicker';
import { BUS_86_SCHEDULE } from '../../lib/data';
import { isFormValid } from './validation';
import styles from './index.module.css';

interface ArrivalFormProps {
  formData: ArrivalFormData;
  onUpdate: <K extends keyof ArrivalFormData>(key: K, value: ArrivalFormData[K]) => void;
  onCalculate: () => void;
}

export function ArrivalForm({ formData, onUpdate, onCalculate }: ArrivalFormProps) {
  const { t } = useLanguage();
  const canCalculate = isFormValid(formData);

  return (
    <div className={styles.container}>
      {/* Left column: Inputs */}
      <div className={styles.inputSection}>
        <h1 className={styles.title}>{t.form.title}</h1>

        <div className={styles.field}>
          <TimePicker
            label={t.form.arrivalTime}
            value={formData.arrivalTime}
            onChange={(time) => onUpdate('arrivalTime', time)}
          />
        </div>

        <div className={styles.field}>
          <TerminalSelector
            label={t.form.terminal}
            value={formData.terminal}
            onChange={(terminal) => onUpdate('terminal', terminal as TerminalId)}
            options={{
              t1: t.form.t1,
              t2: t.form.t2,
            }}
          />
        </div>

        <div className={styles.field}>
          <BaggageSelector
            label={t.form.baggage}
            value={formData.baggage}
            onChange={(baggage) => onUpdate('baggage', baggage as BaggageType)}
            options={{
              carry_on: t.form.carryOn,
              checked: t.form.checked,
            }}
          />
        </div>

        <div className={styles.field}>
          <DestinationPicker
            label={t.form.destination}
            value={formData.destination}
            onChange={(destination) => onUpdate('destination', destination)}
          />
        </div>

        <button
          type="button"
          className={styles.calculateButton}
          onClick={onCalculate}
          disabled={!canCalculate}
        >
          {t.form.calculate}
        </button>
      </div>

      {/* Right column: Schedule Preview */}
      <div className={styles.previewSection}>
        <SchedulePreview arrivalTime={formData.arrivalTime} />
      </div>
    </div>
  );
}

function SchedulePreview({ arrivalTime }: { arrivalTime: string }) {
  return (
    <div className={styles.schedulePreview}>
      <h3 className={styles.scheduleTitle}>🚌 Bus 86 Schedule</h3>
      <p className={styles.scheduleSubtitle}>
        After your arrival at {arrivalTime}
      </p>
      <div className={styles.scheduleGrid}>
        {BUS_86_SCHEDULE.map((time: string) => {
          const [h, m] = time.split(':').map(Number);
          const [ah, am] = arrivalTime.split(':').map(Number);
          const isCatchable = (h * 60 + m) >= (ah * 60 + am);

          return (
            <div
              key={time}
              className={`${styles.scheduleItem} ${isCatchable ? styles.catchable : styles.uncatchable}`}
            >
              {time}
            </div>
          );
        })}
      </div>
      <div className={styles.scheduleLegend}>
        <span className={styles.legendCatchable}>● Catchable</span>
        <span className={styles.legendUncatchable}>● Missed</span>
      </div>
    </div>
  );
}
