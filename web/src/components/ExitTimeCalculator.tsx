import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateExitTime } from '@core/calculation-engine/calculateExitTime';
import type { TerminalType, BaggageType, FlightType } from '@core';

const TERMINALS: Array<{ value: TerminalType; label: string; labelVi: string }> = [
  { value: 'domestic', label: 'T1 Domestic', labelVi: 'Ga T1 nội địa' },
  { value: 'international', label: 'T1 International', labelVi: 'Ga T1 quốc tế' },
];

const BAGGAGE_OPTIONS: Array<{ value: BaggageType; label: string; labelVi: string }> = [
  { value: 'carry_on', label: 'Carry-on only', labelVi: 'Hành lý xách tay' },
  { value: 'checked', label: 'Checked baggage', labelVi: 'Hành lý ký gửi' },
];

const FLIGHT_TYPE_OPTIONS: Array<{ value: FlightType; label: string; labelVi: string }> = [
  { value: 'domestic', label: 'Domestic', labelVi: 'Nội địa' },
  { value: 'international', label: 'International', labelVi: 'Quốc tế' },
];

interface Props {
  language?: 'en' | 'vi';
}

export function ExitTimeCalculator({ language = 'en' }: Props) {
  const [terminal, setTerminal] = useState<TerminalType>('international');
  const [baggage, setBaggage] = useState<BaggageType>('carry_on');
  const [flightType, setFlightType] = useState<FlightType>('international');
  const navigate = useNavigate();

  const result = calculateExitTime(terminal, baggage, flightType);
  const is = language === 'vi';

  const handlePlanTrip = () => {
    const terminalMap: Record<string, string> = {
      domestic: 'HAN-T1',
      international: 'HAN-T2',
    };
    const params = new URLSearchParams({
      airport: 'HAN',
      terminal: terminalMap[terminal] ?? 'HAN-T2',
      baggage,
      flightType,
    });
    navigate(`/ket-qua?${params.toString()}`);
  };

  return (
    <div
      data-testid="exit-time-calculator"
      className="bg-white border border-surface-border rounded-2xl shadow-card p-4 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-ink mb-1">
        {is ? 'Tính thời gian ra khỏi nhà ga' : 'Calculate Exit Time'}
      </h2>
      <p className="text-sm text-ink-soft mb-5">
        {is
          ? 'Chọn thông tin chuyến bay để ước tính thời gian.'
          : 'Select your flight details to estimate exit time.'}
      </p>

      {/* Terminal */}
      <fieldset className="mb-4">
        <legend className="text-sm font-medium text-ink mb-2">
          {is ? 'Nhà ga' : 'Terminal'}
        </legend>
        <div className="flex flex-wrap gap-2">
          {TERMINALS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTerminal(opt.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                terminal === opt.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-ink border-surface-border hover:border-primary/50'
              }`}
            >
              {is ? opt.labelVi : opt.label}
            </button>
          ))}
          {/* T2 option — always international */}
          <button
            type="button"
            onClick={() => { setTerminal('international'); setFlightType('international'); }}
            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
              terminal === 'international' && flightType === 'international'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-ink border-surface-border hover:border-primary/50'
            }`}
          >
            {is ? 'Ga T2 quốc tế' : 'T2 International'}
          </button>
        </div>
      </fieldset>

      {/* Baggage */}
      <fieldset className="mb-4">
        <legend className="text-sm font-medium text-ink mb-2">
          {is ? 'Hành lý' : 'Baggage'}
        </legend>
        <div className="flex flex-wrap gap-2">
          {BAGGAGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setBaggage(opt.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                baggage === opt.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-ink border-surface-border hover:border-primary/50'
              }`}
            >
              {is ? opt.labelVi : opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Flight type */}
      <fieldset className="mb-5">
        <legend className="text-sm font-medium text-ink mb-2">
          {is ? 'Loại chuyến bay' : 'Flight Type'}
        </legend>
        <div className="flex flex-wrap gap-2">
          {FLIGHT_TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFlightType(opt.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                flightType === opt.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-ink border-surface-border hover:border-primary/50'
              }`}
            >
              {is ? opt.labelVi : opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Result */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
        <p className="text-sm text-ink-soft mb-1">
          {is ? 'Thời gian ra khỏi nhà ga ước tính:' : 'Estimated exit time:'}
        </p>
        <p className="text-2xl font-bold text-primary">
          {result.minMinutes}–{result.maxMinutes} {is ? 'phút' : 'minutes'}
        </p>
      </div>

      {/* Breakdown */}
      <div className="bg-slate-50 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-3">
          {is ? 'Chi tiết thời gian' : 'Time Breakdown'}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-ink">
              {flightType === 'international'
                ? (is ? 'Lối kiểm tra hộ chiếu' : 'Passport control')
                : (is ? 'Qua cổng trong nội địa' : 'Domestic exit gate')}
            </span>
            <span className="text-ink-soft">
              {flightType === 'international' ? '20–40 min' : '5–10 min'}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-ink">
              {baggage === 'carry_on'
                ? (is ? 'Nhận hành lý xách tay' : 'Collect carry-on')
                : (is ? 'Nhận hành lý ký gửi' : 'Collect checked baggage')}
            </span>
            <span className="text-ink-soft">
              {baggage === 'carry_on' ? '0–5 min' : '10–25 min'}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-ink">
              {is ? 'Đi bộ đến điểm đón xe buýt' : 'Walk to bus stop'}
            </span>
            <span className="text-ink-soft">8–12 min</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={handlePlanTrip}
        className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors"
      >
        {is ? 'Kế hoạch chuyến xe buýt →' : 'Plan your bus trip →'}
      </button>
    </div>
  );
}
