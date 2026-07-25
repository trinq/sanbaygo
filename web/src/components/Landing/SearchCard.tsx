import { useLanguage } from '../../contexts/LanguageContext';
import type { SearchCardProps } from './types';
import { DepartureDropdown } from './DepartureDropdown';
import { DestinationChips } from './DestinationChips';
import { Stepper } from './Stepper';
import { CTAButton } from './CTAButton';

export function SearchCard({ departure, destination, people, luggage, onDepartureChange, onDestinationChange, onPeopleChange, onLuggageChange, onSubmit }: SearchCardProps) {
  const { t } = useLanguage();
  const ready = departure !== null && destination !== null;
  return <div className="rounded-2xl border border-surface-border bg-white/80 p-6 shadow-card backdrop-blur-md"><div className="space-y-4">
    <DepartureDropdown value={departure} onChange={onDepartureChange} />
    <DestinationChips value={destination} onChange={onDestinationChange} />
    <div className="grid grid-cols-2 gap-3"><Stepper label={t.landing.fieldPeople} value={people} min={1} max={10} onChange={onPeopleChange} /><Stepper label={t.landing.fieldLuggage} value={luggage} min={0} max={10} onChange={onLuggageChange} /></div>
    <CTAButton disabled={!ready} onClick={onSubmit} />
  </div></div>;
}
