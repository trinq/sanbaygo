import { TerminalType, BaggageType, FlightType } from '../types';
import { EXIT_TIME_ESTIMATES } from '../data/exitTimeEstimates';

export interface ExitTimeResult {
  minMinutes: number;
  maxMinutes: number;
}

export function calculateExitTime(
  terminal: TerminalType,
  baggage: BaggageType,
  flightType: FlightType = 'domestic'
): ExitTimeResult {
  // isInternational is true for:
  //   - T2 flights (terminal='international')
  //   - T1 international flights (flightType='international', terminal stays 'domestic')
  const isInternational = terminal === 'international' || flightType === 'international';

  // Lookup predicate:
  //   - When isInternational=true: match only entries where flightType='international'
  //     This finds T2-international entries (terminalType='international', flightType='international')
  //     and T1-international entries (terminalType='domestic', flightType='international').
  //   - When isInternational=false: match entries where flightType is absent or 'domestic'
  //     This finds T1-domestic entries (terminalType='domestic', no flightType).
  const estimate = EXIT_TIME_ESTIMATES.find(
    e => e.terminalType === terminal
      && e.baggageType === baggage
      && (isInternational
        ? e.flightType === 'international'
        : !e.flightType || e.flightType === 'domestic')
  );

  if (!estimate) {
    return { minMinutes: 30, maxMinutes: 60 };
  }

  return {
    minMinutes: estimate.minMinutes,
    maxMinutes: estimate.maxMinutes,
  };
}
