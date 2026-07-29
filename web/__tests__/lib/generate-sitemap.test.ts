import { generateSitemap } from '@/seo/generateSitemap';
import type { PageRegistryEntry } from '@/seo/pageRegistry';

describe('generateSitemap', () => {
  const registry: PageRegistryEntry[] = [
    {
      path: '/',
      lastmod: '2026-07-30',
      priority: 1,
      changefreq: 'weekly',
      alternatePath: '/vi/',
    },
    {
      path: '/new-article',
      lastmod: '2026-07-30',
      priority: 0.5,
      changefreq: 'monthly',
    },
  ];

  it('generates a sitemap urlset with route metadata', () => {
    const sitemap = generateSitemap(registry);

    expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(sitemap).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect(sitemap).toContain('<loc>https://frylane.com/</loc>');
    expect(sitemap).toContain('<lastmod>2026-07-30</lastmod>');
    expect(sitemap).toContain('<changefreq>weekly</changefreq>');
    expect(sitemap).toContain('<priority>1.0</priority>');
    expect(sitemap).toContain('<loc>https://frylane.com/new-article</loc>');
    expect(sitemap).toContain('<priority>0.5</priority>');
    expect(sitemap).toContain('<changefreq>monthly</changefreq>');
    expect(sitemap.match(/<url>/g)).toHaveLength(2);
  });

  it('emits an alternate hreflang link for alternatePath', () => {
    const sitemap = generateSitemap([registry[0]]);

    expect(sitemap).toContain(
      '<xhtml:link rel="alternate" hreflang="vi" href="https://frylane.com/vi/"/>',
    );
  });

  it('adds a url when a new registry entry is added', () => {
    const sitemap = generateSitemap(registry);
    const expandedSitemap = generateSitemap([
      ...registry,
      { path: '/another-article', lastmod: '2026-07-30' },
    ]);

    expect(expandedSitemap.match(/<url>/g)).toHaveLength(3);
    expect(expandedSitemap).toContain('<loc>https://frylane.com/another-article</loc>');
    expect(expandedSitemap).not.toBe(sitemap);
  });
});
