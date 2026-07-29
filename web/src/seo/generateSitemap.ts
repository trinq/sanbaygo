import {
  PAGE_REGISTRY,
  SITE_ORIGIN,
  type PageChangefreq,
  type PageRegistryEntry,
} from './pageRegistry';

const DEFAULT_PRIORITY = 0.5;
const DEFAULT_CHANGEFREQ: PageChangefreq = 'monthly';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function hreflangFor(path: string): 'en' | 'vi' {
  const trimmed = path.replace(/\/$/, '');
  if (trimmed === '/vi' || trimmed.startsWith('/vi/')) return 'vi';
  return 'en';
}

function buildUrlBlock(
  entry: PageRegistryEntry,
  origin: string = SITE_ORIGIN,
  now: Date = new Date(),
): string {
  const lastmod = entry.lastmod ?? now.toISOString().slice(0, 10);
  const alternate = entry.alternatePath
    ? `    <xhtml:link rel="alternate" hreflang="${hreflangFor(entry.alternatePath)}" href="${escapeXml(origin + entry.alternatePath)}"/>`
    : '';
  const priority = (entry.priority ?? DEFAULT_PRIORITY).toFixed(1);
  const changefreq = entry.changefreq ?? DEFAULT_CHANGEFREQ;

  return [
    '  <url>',
    `    <loc>${escapeXml(origin + entry.path)}</loc>`,
    `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
    alternate,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ]
    .filter((line) => line !== '')
    .join('\n');
}

export function generateSitemap(
  registry: PageRegistryEntry[] = PAGE_REGISTRY,
  origin: string = SITE_ORIGIN,
  now: Date = new Date(),
): string {
  const header = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ].join('\n');
  const footer = '</urlset>';
  const body = registry.map((entry) => buildUrlBlock(entry, origin, now)).join('\n');

  return `${header}\n${body}\n${footer}\n`;
}
