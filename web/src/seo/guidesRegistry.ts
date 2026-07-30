import { PAGE_META } from './metaConfig';

/**
 * One row in the `/guides` listing page.
 *
 * Each entry's `href` MUST exist as a key in `web/src/seo/metaConfig.ts#PAGE_META`.
 * If not, the listing falls back to a derived title from `articleId` and an
 * empty description.
 */
export type GuideEntry = {
  href: string;
  articleId: string;
  hub: 'HN' | 'SG' | 'CROSS';
  order: number;
};

export const GUIDES_REGISTRY: ReadonlyArray<GuideEntry> = [
  // Hà Nội hub
  { articleId: 'bus-86',             href: '/bus-86-hanoi-airport',                 hub: 'HN', order: 1 },
  { articleId: 'bus-86',             href: '/vi/tuyen-86-noi-bai',                   hub: 'HN', order: 1 },
  { articleId: 'grab-vs-bus',        href: '/grab-vs-bus-hanoi-airport',             hub: 'HN', order: 2 },
  { articleId: 'grab-vs-bus',        href: '/vi/grab-vs-xe-buyt-noi-bai',            hub: 'HN', order: 2 },
  { articleId: 'noibai-t2-exit',     href: '/noibai-t2-exit-time',                   hub: 'HN', order: 3 },
  { articleId: 'noibai-t2-exit',     href: '/vi/thoi-gian-ra-cuong-t2-noi-bai',      hub: 'HN', order: 3 },
  { articleId: 'late-night-bus',     href: '/hanoi-airport-late-night-bus',          hub: 'HN', order: 4 },
  { articleId: 'tuyen-86-gio',     href: '/vi/tuyen-86-noi-bai-gio',                hub: 'HN', order: 4 },
  { articleId: 'late-night-transfer', href: '/hanoi-airport-late-night-transfer',   hub: 'HN', order: 5 },
  { articleId: 'late-night-transfer', href: '/vi/di-chuyen-dem-khuya-san-bay-noi-bai', hub: 'HN', order: 5 },
  { articleId: 'first-time',         href: '/noibai-airport-first-time-guide',       hub: 'HN', order: 6 },
  { articleId: 'first-time',         href: '/vi/noi-bai-lan-dau-di',                  hub: 'HN', order: 6 },
  { articleId: 'hoan-kiem',          href: '/hanoi-airport-to-hoan-kiem-lake',       hub: 'HN', order: 7 },
  { articleId: 'hoan-kiem',          href: '/vi/san-bay-noi-bai-den-ho-hoan-kiem',    hub: 'HN', order: 7 },
  { articleId: 'cheapest-han',       href: '/cheapest-way-hanoi-airport',             hub: 'HN', order: 8 },
  { articleId: 'cheapest-han',       href: '/vi/cach-re-nhat-san-bay-noi-bai',        hub: 'HN', order: 8 },
  { articleId: 'how-to-get-han',     href: '/how-to-get-from-hanoi-airport-to-city',  hub: 'HN', order: 9 },
  { articleId: 'how-to-get-han',     href: '/vi/cach-di-tu-sanh-bay-noi-bai',         hub: 'HN', order: 9 },
  { articleId: 'grab-noi-bai-gia',   href: '/vi/grab-noi-bai-gia-bao-nhieu',         hub: 'HN', order: 10 },

  // TP.HCM (SG) hub
  { articleId: 'bus-109',            href: '/bus-109-saigon-airport',                 hub: 'SG', order: 1 },
  { articleId: 'bus-109',            href: '/vi/tuyen-109-tan-son-nhat',              hub: 'SG', order: 1 },
  { articleId: 'bus-152',            href: '/bus-152-saigon-fare',                    hub: 'SG', order: 2 },
  { articleId: 'bus-152',            href: '/vi/tuyen-152-tan-son-nhat',              hub: 'SG', order: 2 },
  { articleId: 'bus-109-vs-152',     href: '/bus-109-vs-152-tan-son-nhat',            hub: 'SG', order: 3 },
  { articleId: 'bus-109-vs-152',     href: '/vi/xe-buyt-109-vs-152-tan-son-nhat',     hub: 'SG', order: 3 },
  { articleId: 'cheapest-sgn',       href: '/cheapest-way-saigon-airport-district-1', hub: 'SG', order: 4 },
  { articleId: 'cheapest-sgn',       href: '/vi/cach-re-nhat-san-bay-sai-gon',        hub: 'SG', order: 4 },

  // Cross-cutting (CROSS) hub
  { articleId: 'luggage-fee',        href: '/airport-bus-luggage-fee-vietnam',        hub: 'CROSS', order: 1 },
  { articleId: 'luggage-fee',        href: '/vi/phi-hanh-ly-xe-buyt-san-bay',         hub: 'CROSS', order: 1 },
  { articleId: 'scam',               href: '/airport-scam-vietnam-taxi',              hub: 'CROSS', order: 2 },
  { articleId: 'scam',               href: '/vi/xe-lo-gio-sanh-bay-viet-nam',         hub: 'CROSS', order: 2 },
  { articleId: 'pillar',             href: '/bus-from-airport-to-city',               hub: 'CROSS', order: 3 },
  { articleId: 'pillar',             href: '/vi/xe-buyt-san-bay-ve-trung-tam',        hub: 'CROSS', order: 3 },
  { articleId: 'grab-safe',          href: '/is-grab-safe-hanoi-airport',             hub: 'CROSS', order: 4 },
];

export const HUB_LABEL: {
  vi: Record<GuideEntry['hub'], string>;
  en: Record<GuideEntry['hub'], string>;
} = {
  vi: { HN: 'Hà Nội', SG: 'TP.HCM', CROSS: 'Khác' },
  en: { HN: 'Hanoi', SG: 'Ho Chi Minh City', CROSS: 'Other' },
};

export const DEFAULT_LOCALE_TITLE = {
  vi: 'Hướng dẫn xe buýt sân bay',
  en: 'Vietnam Airport Bus Guides',
} as const;

/**
 * Convert a kebab/snake articleId into Title Case, e.g.
 *   'bus-86'       → 'Bus 86'
 *   'grab-vs-bus'  → 'Grab Vs Bus'
 *   'noibai-t2-exit' → 'Noibai T2 Exit'
 */
export function humanizeArticleId(id: string): string {
  return id
    .split(/[-_]+/)
    .filter((token) => token.length > 0)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}

/** Resolve a guide's display title from PAGE_META, falling back to a humanized articleId. */
export function resolveGuideTitle(entry: GuideEntry): string {
  const meta = PAGE_META[entry.href];
  if (meta) return meta.title;
  return humanizeArticleId(entry.articleId);
}

/** Resolve a guide's description from PAGE_META, falling back to an empty string. */
export function resolveGuideDescription(entry: GuideEntry): string {
  const meta = PAGE_META[entry.href];
  if (meta) return meta.description;
  return '';
}

/**
 * Group entries by hub. Returns an object keyed by hub with the matching entries.
 * Returns plain mutable arrays so callers can locally sort/filter; the registry export itself is `ReadonlyArray`.
 */
export function groupByHub(
  entries: ReadonlyArray<GuideEntry>,
): Record<GuideEntry['hub'], GuideEntry[]> {
  const result: Record<GuideEntry['hub'], GuideEntry[]> = {
    HN: [],
    SG: [],
    CROSS: [],
  };
  for (const entry of entries) {
    result[entry.hub].push(entry);
  }
  return result;
}