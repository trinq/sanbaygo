import { useLanguage } from '../../contexts/LanguageContext';
import type { SearchCardProps } from './types';
import { TimePicker } from './TimePicker';
import { AirportPicker } from './AirportPicker';
import { TerminalPicker } from './TerminalPicker';
import { DestinationChips } from './DestinationChips';
import { FlightTypeSelector } from './FlightTypeSelector';
import { Stepper } from './Stepper';
import { CTAButton } from './CTAButton';
import { BaggageChips } from './BaggageChips';

export function SearchCard({
  arrivalTime,
  airport,
  terminal,
  destination,
  people,
  carryOn,
  checked,
  flightType,
  showFlightTypeSelector,
  terminalOptions,
  destinationOptions,
  onArrivalTimeChange,
  onAirportChange,
  onTerminalChange,
  onDestinationChange,
  onFlightTypeChange,
  onPeopleChange,
  onCarryOnChange,
  onCheckedChange,
  onSubmit,
}: SearchCardProps) {
  const { t } = useLanguage();
  const ready = airport !== null && terminal !== null && destination !== null;
  return (
    <div className="rounded-2xl border border-surface-border bg-white/80 p-6 shadow-card backdrop-blur-md">
      <div className="space-y-4">
        <TimePicker
          label={t.form.arrivalTimeLabel}
          hint={t.form.arrivalTimeHint}
          value={arrivalTime}
          onChange={onArrivalTimeChange}
        />
        <AirportPicker value={airport} onChange={onAirportChange} />
        {airport && (
          <TerminalPicker
            value={terminal}
            options={terminalOptions}
            onChange={onTerminalChange}
          />
        )}
        {showFlightTypeSelector && (
          <FlightTypeSelector
            value={flightType}
            onChange={onFlightTypeChange}
          />
        )}
        {airport && (
          <DestinationChips
            value={destination}
            options={destinationOptions}
            onChange={onDestinationChange}
          />
        )}
        <Stepper
          label={t.landing.fieldPeople}
          value={people}
          min={1}
          max={10}
          onChange={onPeopleChange}
        />
        <BaggageChips
          fieldLabel={t.landing.fieldLuggage}
          carryOnLabel={t.landing.fieldCarryOn}
          checkedLabel={t.landing.fieldChecked}
          carryOn={carryOn}
          checked={checked}
          onCarryOnChange={onCarryOnChange}
          onCheckedChange={onCheckedChange}
        />
        <CTAButton disabled={!ready} onClick={onSubmit} />
      </div>
    </div>
  );
}