import { useLanguage } from '../../contexts/LanguageContext';
import { Icon } from '../../components/Icon';
import { tokens } from '@design-system';
import type { ArrivalFormData, TerminalId, BaggageType } from '@core';
import styles from './index.module.css';

interface ArrivalFormProps {
  formData: ArrivalFormData;
  onUpdate: (patch: Partial<ArrivalFormData>) => void;
  onCalculate: () => void;
}

export function ArrivalForm({ formData, onUpdate, onCalculate }: ArrivalFormProps) {
  const { t } = useLanguage();
  const canSubmit = Boolean(formData.terminal && formData.baggage && formData.destination);

  return (
    <div className={styles.root}>
      <div className={styles.eyebrow}>{t.form.stepEyebrow}</div>
      <h1 className={styles.title}>{t.form.title}</h1>
      <p className={styles.lede}>{t.form.lede}</p>

      <Field
        icon={<Icon name="airport" size={28} color={formData.terminal ? tokens.color.accent : tokens.color.textTertiary} />}
        label={t.form.fromLabel}
        active={Boolean(formData.terminal)}
      >
        <div className={styles.chips}>
          {(['T1', 'T2'] as TerminalId[]).map((tid) => (
            <Chip
              key={tid}
              label={tid === 'T1' ? t.form.t1Label : t.form.t2Label}
              sub={tid === 'T1' ? t.form.t1Sub : t.form.t2Sub}
              active={formData.terminal === tid}
              onClick={() => onUpdate({ terminal: tid, flightType: tid === 'T1' ? 'international' : 'domestic' })}
            />
          ))}
        </div>
      </Field>

      <Field
        icon={<Icon name="pin" size={28} color={formData.destination ? tokens.color.accent : tokens.color.textTertiary} />}
        label={t.form.toLabel}
        active={Boolean(formData.destination)}
      >
        <select
          className={styles.select}
          value={formData.destination ?? ''}
          onChange={(e) => onUpdate({ destination: e.target.value })}
        >
          <option value="">{t.form.selectDestination}</option>
          <option value="old-quarter">{t.form.destinationOldQuarter}</option>
          <option value="ba-dinh">{t.form.destinationBaDinh}</option>
          <option value="tay-ho">{t.form.destinationTayHo}</option>
        </select>
      </Field>

      <div className={styles.counterRow}>
        <Field icon={<Icon name="people" size={28} color={tokens.color.textTertiary} />} label={t.form.peopleLabel} active>
          <div className={styles.counter}>
            <button type="button" aria-label="decrement">−</button>
            <span className={styles.counterValue}>{formData.flightType === 'international' ? 2 : 1}</span>
            <button type="button" aria-label="increment">+</button>
          </div>
        </Field>
        <Field icon={<Icon name="luggage" size={28} color={tokens.color.textTertiary} />} label={t.form.baggageLabel} active>
          <select
            className={styles.select}
            value={formData.baggage ?? ''}
            onChange={(e) => onUpdate({ baggage: e.target.value as BaggageType })}
          >
            <option value="carry_on">{t.form.baggageCarryOn}</option>
            <option value="checked">{t.form.baggageChecked}</option>
          </select>
        </Field>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primary}
          disabled={!canSubmit}
          onClick={onCalculate}
        >
          {t.form.calculate}
        </button>
      </div>
    </div>
  );
}

function Field({
  icon, label, active, children,
}: {
  icon: React.ReactNode; label: string; active?: boolean; children: React.ReactNode;
}) {
  return (
    <div className={`${styles.field} ${active ? styles.fieldActive : ''}`}>
      <div className={styles.fieldIcon}>{icon}</div>
      <div className={styles.fieldBody}>
        <div className={styles.fieldLabel}>{label}</div>
        <div className={styles.fieldValue}>{children}</div>
      </div>
    </div>
  );
}

function Chip({ label, sub, active, onClick }: { label: string; sub?: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${active ? styles.chipActive : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className={styles.chipLabel}>{label}</span>
      {sub && <span className={styles.chipSub}>{sub}</span>}
    </button>
  );
}
