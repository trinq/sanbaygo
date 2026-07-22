import { isWithinRange } from '../utils/time';

const PEAK_MORNING_START = '07:00';
const PEAK_MORNING_END = '09:00';
const PEAK_EVENING_START = '17:00';
const PEAK_EVENING_END = '19:00';

export function isPeakHour(time: string): boolean {
  const isMorningPeak = isWithinRange(time, PEAK_MORNING_START, PEAK_MORNING_END);
  const isEveningPeak = isWithinRange(time, PEAK_EVENING_START, PEAK_EVENING_END);
  return isMorningPeak || isEveningPeak;
}
