import { useEffect, useState } from 'react';
import type { BusRecommendation } from '@core';
import styles from './CountdownTimer.module.css';

type BusTrip = NonNullable<BusRecommendation['trip']>;

interface CountdownTimerProps {
  trip: BusTrip | null;
}

const TICK_MS = 60_000;
const VISIBLE_WINDOW_MINUTES = 120;

function formatCountdown(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const hourWord = h === 1 ? 'tiếng' : 'tiếng';
    if (m === 0) return `Còn khoảng ${h} ${hourWord}`;
    return `Còn khoảng ${h} ${hourWord} ${m} phút`;
  }
  return `Còn khoảng ${minutes} phút`;
}

/**
 * Parses `HH:mm` into a Date anchored to today in the device's local timezone.
 * Returns null if the format is invalid.
 */
function parseLocalTime(hhmm: string, now: Date): Date | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
  return target;
}

/**
 * Returns rounded-down minutes until `target` from `now`,
 * or null if the target has already passed.
 */
function minutesUntil(target: Date, now: Date): number | null {
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) return null;
  return Math.floor(diffMs / 60_000);
}

export function CountdownTimer({ trip }: CountdownTimerProps) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    if (!trip) return;
    const id = setInterval(() => {
      setNow(new Date());
    }, TICK_MS);
    return () => clearInterval(id);
  }, [trip]);

  if (!trip) return null;

  const target = parseLocalTime(trip.departureTime, now);
  if (!target) return null;

  const minutes = minutesUntil(target, now);
  if (minutes === null) return null;
  if (minutes > VISIBLE_WINDOW_MINUTES) return null;

  return (
    <div className={styles.countdown} data-testid="countdown-timer">
      <span className={styles.countdownText}>{formatCountdown(minutes)}</span>
    </div>
  );
}
