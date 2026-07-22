/**
 * Parse HH:mm time string to Date (using today's date as reference)
 */
export function parseTime(time: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
}

/**
 * Format Date to HH:mm string
 */
export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Add minutes to HH:mm time string
 */
export function addMinutes(time: string, minutes: number): string {
  const date = parseTime(time);
  date.setMinutes(date.getMinutes() + minutes);
  return formatTime(date);
}

/**
 * Convert HH:mm to minutes since midnight
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convert minutes since midnight to HH:mm
 */
export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Compare two HH:mm times: returns negative if a < b, 0 if equal, positive if a > b
 */
export function compareTimes(a: string, b: string): number {
  return timeToMinutes(a) - timeToMinutes(b);
}

/**
 * Check if time a is after or equal to time b
 */
export function isAfterOrEqual(a: string, b: string): boolean {
  return compareTimes(a, b) >= 0;
}

/**
 * Check if time is within a range (inclusive)
 */
export function isWithinRange(time: string, start: string, end: string): boolean {
  const t = timeToMinutes(time);
  return t >= timeToMinutes(start) && t <= timeToMinutes(end);
}
