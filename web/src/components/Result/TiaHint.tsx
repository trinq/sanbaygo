import type { AirportId, TerminalId } from '@core';
import styles from './TiaHint.module.css';

interface TiaHintProps {
  airportId: AirportId;
  terminalId: TerminalId | null;
  recommendedBusId: string | null;
}

export function TiaHint({ airportId, terminalId, recommendedBusId }: TiaHintProps) {
  const isSGN = airportId === 'tan-son-nhat';
  const isWrongTerminal = terminalId === 'SGN-T1' || terminalId === 'SGN-T2';
  const isBus109 = recommendedBusId === 'bus-109';

  if (!isSGN || !isWrongTerminal || !isBus109) {
    return null;
  }

  return (
    <div role="note" className={styles.root}>
      <p className={styles.title}>
        Bạn ở {terminalId}. Tuyến 109 chỉ đón tại SGN-T3.
      </p>
      <p className={styles.body}>
        Bạn có thể đi TIA miễn phí (~15–20 phút) tới SGN-T3 rồi bắt tuyến 109,
        hoặc đi tuyến 152 trực tiếp từ Làn B ga {terminalId === 'SGN-T1' ? 'quốc nội' : 'quốc tế'}.
      </p>
    </div>
  );
}
