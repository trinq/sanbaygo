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
  const isInternational = terminal === 'international' || flightType === 'international';
  
  const estimate = EXIT_TIME_ESTIMATES.find(
    e => e.terminalType === terminal 
      && e.baggageType === baggage
      && (isInternational ? e.flightType === 'international' : !e.flightType || e.flightType === 'domestic')
  );

  if (!estimate) {
    return { minMinutes: 30, maxMinutes: 60 };
  }

  return {
    minMinutes: estimate.minMinutes,
    maxMinutes: estimate.maxMinutes,
  };
}
