import { useEffect, useState } from 'react';
import type { BusRecommendation } from '@core';
import styles from './CountdownTimer.module.css';

type BusTrip = NonNullable<BusRecommendation['trip']>;

interface CountdownTimerProps {
  trip: BusTrip | null;
}

const TICK_MS = 60_000;
const VISIBLE_WINDOW_MINUTES = 60;

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
  const target = new Date(now);
  target.setHours(hours, minutes, 0, 0);
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
      <span className={styles.countdownText}>
        Còn khoảng {minutes} phút
      </span>
    </div>
  );
}
