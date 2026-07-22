import { ExitTimeEstimate } from '../types';

export const EXIT_TIME_ESTIMATES: ExitTimeEstimate[] = [
  // T1 Domestic
  { terminalType: 'domestic', baggageType: 'carry_on', minMinutes: 15, maxMinutes: 25 },
  { terminalType: 'domestic', baggageType: 'checked', minMinutes: 25, maxMinutes: 45 },
  // T1 International (uses same times, no immigration at T1)
  { terminalType: 'domestic', baggageType: 'carry_on', flightType: 'international', minMinutes: 15, maxMinutes: 25 },
  { terminalType: 'domestic', baggageType: 'checked', flightType: 'international', minMinutes: 25, maxMinutes: 45 },
  // T2 Domestic (no domestic flights at T2, but keep for data completeness)
  { terminalType: 'international', baggageType: 'carry_on', minMinutes: 20, maxMinutes: 35 },
  { terminalType: 'international', baggageType: 'checked', minMinutes: 35, maxMinutes: 60 },
  // T2 International with immigration
  { terminalType: 'international', baggageType: 'carry_on', flightType: 'international', minMinutes: 45, maxMinutes: 75 },
  { terminalType: 'international', baggageType: 'checked', flightType: 'international', minMinutes: 60, maxMinutes: 90 },
];
