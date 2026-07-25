import { useLanguage } from '../../contexts/LanguageContext';
import type { ArrivalFormData, TerminalId, BaggageType } from '@core';
import styles from './index.module.css';

interface ArrivalFormProps {
  formData: ArrivalFormData;
  onUpdate: (patch: Partial<ArrivalFormData>) => void;
  onCalculate: () => void;
}

const DESTINATION_OPTIONS: Array<{ id: string; label: string }> = [
  { id: 'old-quarter', label: 'Phố Cổ' },
  { id: 'ba-dinh', label: 'Ba Đình' },
  { id: 'tay-ho', label: 'Tây Hồ' },
];

export function ArrivalForm({ formData, onUpdate, onCalculate }: ArrivalFormProps) {
  const canSubmit = Boolean(formData.terminal && formData.baggage && formData.destination);

  return (
    <article className={styles.root}>
      <div className={styles.byline}>
        <span className={styles.bylineDate}>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: 'short' })}</span>
        <span className={styles.bylineLabel}>Số 01 — Lên kế hoạch</span>
      </div>

      <h1 className={styles.title}>
        Chuyến bay của <em className={styles.titleEm}>bạn</em>,<br />
        trung tâm Hà Nội —<br />
        <span className={styles.titleAccent}>đi xe buýt hay gọi xe?</span>
      </h1>

      <p className={styles.lede}>
        Xem 26 giờ xe buýt 86 hôm nay, chọn chuyến kịp nhất, và quyết định có cần gọi Grab hay không.
        Một bảng, một quyết định, không quảng cáo.
      </p>

      <hr className={styles.rule} />

      <TimeField
        value={formData.arrivalTime}
        onChange={(v) => onUpdate({ arrivalTime: v })}
      />

      <InlineRow
        label="Sân bay khởi hành"
        hint="Ga nào?"
      >
        {() => (
          <div className={styles.tagRow}>
            {(['T1', 'T2'] as TerminalId[]).map((tid) => (
              <button
                key={tid}
                type="button"
                className={`${styles.tag} ${formData.terminal === tid ? styles.tagActive : ''}`}
                onClick={() =>
                  onUpdate({
                    terminal: tid,
                    flightType: tid === 'T1' ? 'international' : 'domestic',
                  })
                }
                aria-pressed={formData.terminal === tid}
              >
                <span className={styles.tagMain}>{tid === 'T1' ? 'Nội Bài · T1' : 'Nội Bài · T2'}</span>
                <span className={styles.tagSub}>{tid === 'T1' ? 'Quốc tế' : 'Quốc nội'}</span>
              </button>
            ))}
          </div>
        )}
      </InlineRow>

      <InlineRow label="Điểm đến" hint="Trung tâm Hà Nội">
        {() => (
          <div className={styles.tagRow}>
            {DESTINATION_OPTIONS.map((d) => (
              <button
                key={d.id}
                type="button"
                className={`${styles.tag} ${styles.tagNarrow} ${formData.destination === d.id ? styles.tagActive : ''}`}
                onClick={() => onUpdate({ destination: d.id })}
                aria-pressed={formData.destination === d.id}
              >
                <span className={styles.tagMain}>{d.label}</span>
              </button>
            ))}
          </div>
        )}
      </InlineRow>

      <InlineRow label="Hành lý" hint="Một hay hai vali?">
        {() => (
          <div className={styles.tagRow}>
            {(['carry_on', 'checked'] as BaggageType[]).map((b) => (
              <button
                key={b}
                type="button"
                className={`${styles.tag} ${formData.baggage === b ? styles.tagActive : ''}`}
                onClick={() => onUpdate({ baggage: b })}
                aria-pressed={formData.baggage === b}
              >
                <span className={styles.tagMain}>{b === 'carry_on' ? 'Xách tay' : 'Ký gửi'}</span>
                <span className={styles.tagSub}>{b === 'carry_on' ? '1 balô' : '1 vali'}</span>
              </button>
            ))}
          </div>
        )}
      </InlineRow>

      <hr className={styles.rule} />

      <div className={styles.cta}>
        <button
          type="button"
          className={styles.ctaBtn}
          disabled={!canSubmit}
          onClick={onCalculate}
        >
          {canSubmit ? 'Xem các chuyến buýt kế tiếp' : 'Chọn đầy đủ thông tin →'}
        </button>
        <p className={styles.ctaFootnote}>
          Không lưu dữ liệu. Mọi tính toán chạy trong trình duyệt của bạn.
        </p>
      </div>
    </article>
  );
}

/* — The hero — a monospace time field with a soft caret. */
function TimeField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { t } = useLanguage();
  return (
    <section className={styles.timeField}>
      <div className={styles.timeLabel}>
        <span className={styles.timeLabelText}>{t.form.arrivalTimeLabel}</span>
        <span className={styles.timeLabelHint}>{t.form.arrivalTimeHint}</span>
      </div>
      <div className={styles.timeInputWrap}>
        <input
          type="time"
          step={300}
          className={styles.timeInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={t.form.arrivalTimeLabel}
        />
        <span className={styles.timeCursor} aria-hidden="true">›</span>
      </div>
    </section>
  );
}

/* — A labeled row with a label on the left, choices on the right. */
function InlineRow({
  label, hint, children,
}: {
  label: string; hint: string; children: (active: boolean) => React.ReactNode;
}) {
  return (
    <section className={styles.row}>
      <div className={styles.rowLabel}>
        <span className={styles.rowLabelText}>{label}</span>
        <span className={styles.rowLabelHint}>{hint}</span>
      </div>
      <div className={styles.rowValue}>{children(true)}</div>
    </section>
  );
}
