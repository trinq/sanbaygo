import type { CSSProperties, ReactNode } from 'react';
import { tokens } from '@design-system';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  title?: string;
};

const C = tokens.color;

function Svg({
  d,
  size = 22,
  style,
  title,
  viewBox = '0 0 22 22',
}: IconProps & { d: ReactNode; viewBox?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      style={style}
    >
      {title && <title>{title}</title>}
      {d}
    </svg>
  );
}

const paths = {
  airport: (color: string, sw: number) => (
    <>
      <path d="M11 2L11 20M3 11L19 11M5 7L17 7M5 15L17 15" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="11" cy="11" r="2" stroke={color} strokeWidth={sw} />
    </>
  ),
  pin: (color: string, sw: number) => (
    <>
      <path d="M11 20s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <circle cx="11" cy="8" r="2.5" stroke={color} strokeWidth={sw} />
    </>
  ),
  people: (color: string, sw: number) => (
    <>
      <circle cx="8" cy="7" r="3" stroke={color} strokeWidth={sw} />
      <path d="M2 19c0-3 2.7-5 6-5s6 2 6 5" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="15" cy="8" r="2.5" stroke={color} strokeWidth={sw} />
      <path d="M14 14c2.8 0 5 1.5 5 4" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </>
  ),
  luggage: (color: string, sw: number) => (
    <>
      <rect x="4" y="7" width="14" height="13" rx="2" stroke={color} strokeWidth={sw} />
      <path d="M8 7V4a1 1 0 011-1h4a1 1 0 011 1v3" stroke={color} strokeWidth={sw} />
      <path d="M11 11v5" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </>
  ),
  bus: (color: string, sw: number) => (
    <g stroke={color} fill="none">
      <rect x="4" y="3" width="16" height="15" rx="3" strokeWidth={sw + 0.3} />
      <circle cx="8" cy="20" r="1.5" strokeWidth={sw} />
      <circle cx="16" cy="20" r="1.5" strokeWidth={sw} />
      <path d="M4 11h16" strokeWidth={sw} />
      <circle cx="8" cy="7" r="0.8" fill={color} />
      <circle cx="16" cy="7" r="0.8" fill={color} />
    </g>
  ),
  taxi: (color: string, sw: number) => (
    <g stroke={color} fill="none">
      <path d="M5 13l1.5-5h11l1.5 5" strokeWidth={sw + 0.3} strokeLinejoin="round" />
      <rect x="3" y="13" width="18" height="6" rx="2" strokeWidth={sw + 0.3} />
      <circle cx="7" cy="19" r="1.5" strokeWidth={sw} />
      <circle cx="17" cy="19" r="1.5" strokeWidth={sw} />
    </g>
  ),
  grab: (color: string, sw: number) => (
    <g stroke={color} fill="none">
      <rect x="6" y="3" width="12" height="18" rx="3" strokeWidth={sw + 0.3} />
      <path d="M10 7h4M10 11h4M10 15h2" strokeWidth={sw} strokeLinecap="round" />
    </g>
  ),
  info: (color: string, sw: number) => (
    <g>
      <circle cx="10" cy="10" r="8.5" stroke={color} strokeWidth={sw - 0.1} fill="none" />
      <circle cx="10" cy="6.5" r="0.9" fill={color} />
      <path d="M10 9v5" stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none" />
    </g>
  ),
  chevron: (color: string) => (
    <path d="M1 1l5.5 6L1 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  check: (color: string) => (
    <path d="M4 10.5l3.5 3.5L16 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  search: (color: string, sw: number) => (
    <g stroke={color} fill="none">
      <circle cx="9" cy="9" r="6.5" strokeWidth={sw} />
      <path d="M14 14l4 4" strokeWidth={sw} strokeLinecap="round" />
    </g>
  ),
  clock: (color: string, sw: number) => (
    <g stroke={color} fill="none">
      <circle cx="10" cy="10" r="8" strokeWidth={sw} />
      <path d="M10 5v5l3 2" strokeWidth={sw} strokeLinecap="round" />
    </g>
  ),
  speed: (color: string, sw: number) => (
    <g stroke={color} fill="none">
      <path d="M3 14a7 7 0 1114 0" strokeWidth={sw} strokeLinecap="round" />
      <path d="M10 14l4-3" strokeWidth={sw} strokeLinecap="round" />
      <circle cx="10" cy="14" r="1.5" fill={color} />
    </g>
  ),
  bag: (color: string, sw: number) => (
    <g stroke={color} fill="none">
      <path d="M5 7V5a3 3 0 016 0v2" strokeWidth={sw} />
      <rect x="3" y="7" width="14" height="11" rx="2" strokeWidth={sw} />
    </g>
  ),
  menu: (color: string, sw: number) => (
    <path d="M3 6h16M3 11h16M3 16h16" stroke={color} strokeWidth={sw + 0.1} strokeLinecap="round" />
  ),
  warning: (color: string, sw: number) => (
    <g stroke={color} fill="none">
      <path d="M10 2L1.5 18h17L10 2z" strokeWidth={sw} strokeLinejoin="round" />
      <path d="M10 9v4" strokeWidth={sw} strokeLinecap="round" />
      <circle cx="10" cy="15.5" r="0.9" fill={color} />
    </g>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({ name, ...rest }: { name: IconName } & IconProps) {
  const isChevron = name === 'chevron' || name === 'check';
  const isMenu = name === 'menu';
  const d = paths[name](rest.color ?? C.inkSoft, rest.strokeWidth ?? 1.5);
  return (
    <Svg
      {...rest}
      d={d}
      viewBox={
        isChevron ? '0 0 8 14' :
        isMenu ? '0 0 22 22' :
        ['bus', 'taxi', 'grab'].includes(name) ? '0 0 24 24' :
        ['info', 'search', 'clock', 'speed', 'bag', 'warning'].includes(name) ? '0 0 20 20' :
        '0 0 22 22'
      }
    />
  );
}

export const iconNames = Object.keys(paths) as IconName[];
