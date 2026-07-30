export type PageChangefreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export type PageRegistryEntry = {
  /** Path relative to domain root, no trailing slash except for root '/'. */
  path: string;
  /**
   * ISO date (YYYY-MM-DD) for <lastmod>.
   * Optional — when omitted, the sitemap generator falls back to the build-time
   * date so the field stays "always fresh" without manual drift.
   */
  lastmod?: string;
  /** If this page has a counterpart in the other language, its path here. */
  alternatePath?: string;
  /** Search-engine priority 0.0–1.0. Defaults to 0.5. */
  priority?: number;
  /** Sitemap changefreq. Defaults to 'monthly'. */
  changefreq?: PageChangefreq;
};

/** Single source of truth for sitemap entries. Keep aligned with web/src/App.tsx routes. */
export const PAGE_REGISTRY: PageRegistryEntry[] = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
    alternatePath: '/vi/',
  },
  {
    path: '/vi/',
    priority: 0.9,
    changefreq: 'weekly',
    alternatePath: '/',
  },

  {
    path: '/bus-86-hanoi-airport',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/vi/tuyen-86-noi-bai',
  },
  {
    path: '/vi/tuyen-86-noi-bai',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/bus-86-hanoi-airport',
  },

  {
    path: '/bus-109-saigon-airport',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/vi/tuyen-109-tan-son-nhat',
  },
  {
    path: '/vi/tuyen-109-tan-son-nhat',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/bus-109-saigon-airport',
  },
  {
    path: '/bus-152-saigon-fare',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/vi/tuyen-152-tan-son-nhat',
  },
  {
    path: '/vi/tuyen-152-tan-son-nhat',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/bus-152-saigon-fare',
  },

  {
    path: '/bus-109-vs-152-tan-son-nhat',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/vi/xe-buyt-109-vs-152-tan-son-nhat',
  },
  {
    path: '/vi/xe-buyt-109-vs-152-tan-son-nhat',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/bus-109-vs-152-tan-son-nhat',
  },

  {
    path: '/grab-vs-bus-hanoi-airport',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/vi/grab-vs-xe-buyt-noi-bai',
  },
  {
    path: '/vi/grab-vs-xe-buyt-noi-bai',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/grab-vs-bus-hanoi-airport',
  },

  {
    path: '/airport-scam-vietnam-taxi',
    priority: 0.7,
    changefreq: 'monthly',
    alternatePath: '/vi/xe-lo-gio-sanh-bay-viet-nam',
  },
  {
    path: '/hanoi-airport-late-night-bus',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/is-grab-safe-hanoi-airport',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/noibai-t2-exit-time',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/vi/thoi-gian-ra-cuong-t2-noi-bai',
  },
  {
    path: '/vi/xe-lo-gio-sanh-bay-viet-nam',
    priority: 0.7,
    changefreq: 'monthly',
    alternatePath: '/airport-scam-vietnam-taxi',
  },
  {
    path: '/vi/thoi-gian-ra-cuong-t2-noi-bai',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/noibai-t2-exit-time',
  },
  {
    path: '/airport-bus-luggage-fee-vietnam',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/vi/phi-hanh-ly-xe-buyt-san-bay',
  },
  {
    path: '/vi/phi-hanh-ly-xe-buyt-san-bay',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/airport-bus-luggage-fee-vietnam',
  },
  {
    path: '/cheapest-way-hanoi-airport',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/vi/cach-re-nhat-san-bay-noi-bai',
  },
  {
    path: '/vi/cach-re-nhat-san-bay-noi-bai',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/cheapest-way-hanoi-airport',
  },
  {
    path: '/cheapest-way-saigon-airport-district-1',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/vi/cach-re-nhat-san-bay-sai-gon',
  },
  {
    path: '/vi/cach-re-nhat-san-bay-sai-gon',
    priority: 0.8,
    changefreq: 'monthly',
    alternatePath: '/cheapest-way-saigon-airport-district-1',
  },

  {
    path: '/privacy',
    priority: 0.3,
    changefreq: 'yearly',
  },
  {
    path: '/terms',
    priority: 0.3,
    changefreq: 'yearly',
  },
];

export const SITE_ORIGIN = 'https://frylane.com';
