// Time utilities matching parent repo

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function addMinutes(time: string, minutes: number): string {
  return minutesToTime(timeToMinutes(time) + minutes);
}

export function isAfterOrEqual(time1: string, time2: string): boolean {
  return timeToMinutes(time1) >= timeToMinutes(time2);
}

export function isWithinRange(time: string, start: string, end: string): boolean {
  const t = timeToMinutes(time);
  return t >= timeToMinutes(start) && t <= timeToMinutes(end);
}

export function formatTimeRange(range: { early: string; late: string }): string {
  return `${range.early} - ${range.late}`;
}

export function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN');
}
