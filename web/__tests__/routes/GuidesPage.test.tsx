import { render, screen, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from '../../src/contexts/LanguageContext';
import { GuidesPage, GuidesPageVI } from '../../src/routes/GuidesPage';
import { PAGE_META } from '../../src/seo/metaConfig';
import {
  DEFAULT_LOCALE_TITLE,
  GUIDES_REGISTRY,
  HUB_LABEL,
  groupByHub,
  humanizeArticleId,
  resolveGuideDescription,
  resolveGuideTitle,
} from '../../src/seo/guidesRegistry';
import type { GuideEntry } from '../../src/seo/guidesRegistry';

/**
 * Render GuidesPage inside MemoryRouter + HelmetProvider + LanguageProvider.
 * The component uses useLocation(), so MemoryRouter is required.
 * initialEntries set to '/guides' so SEOHelmet reads PAGE_META['/guides'].
 */
function renderGuidesPage({
  path = '/guides',
  customEntries,
}: {
  path?: string;
  customEntries?: ReadonlyArray<GuideEntry>;
} = {}) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <LanguageProvider>
          <GuidesPage registry={customEntries} />
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('GuidesPage', () => {
  describe('VI mode (default LanguageProvider state)', () => {
    it('renders exactly one H1 matching the VI default title', () => {
      renderGuidesPage();
      const h1s = screen.getAllByRole('heading', { level: 1 });
      expect(h1s).toHaveLength(1);
      expect(h1s[0].textContent).toMatch(/Hướng dẫn xe buýt sân bay/);
    });

    it('renders the title from PAGE_META["/guides"] in <title> (via SEOHelmet)', async () => {
      renderGuidesPage();
      await waitFor(() =>
        expect(document.querySelector('title')?.textContent).toBe(
          PAGE_META['/guides'].title,
        ),
      );
    });

    it('renders three H2s with VI hub labels in order HN, SG, CROSS', () => {
      const { container } = renderGuidesPage();
      const h2s = Array.from(container.querySelectorAll('h2'));
      expect(h2s).toHaveLength(3);
      expect(h2s[0].textContent).toBe('Hà Nội');
      expect(h2s[1].textContent).toBe('TP.HCM');
      expect(h2s[2].textContent).toBe('Khác');
    });
  });

  describe('EN mode', () => {
    function LanguageSwitcher({ lang }: { lang: 'vi' | 'en' }) {
      const { setLanguage } = useLanguage();
      // Flip language on mount via effect to avoid the setState-during-render warning.
      useEffect(() => {
        setLanguage(lang);
      }, [lang, setLanguage]);
      return null;
    }

    function renderEn({ path = '/guides' }: { path?: string } = {}) {
      return render(
        <HelmetProvider>
          <MemoryRouter initialEntries={[path]}>
            <LanguageProvider>
              <LanguageSwitcher lang="en" />
              <GuidesPage />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>,
      );
    }

    it('renders H1 matching the EN default title', async () => {
      renderEn();
      // Wait for the effect-driven language switch to flush.
      await waitFor(() =>
        expect(
          screen
            .getAllByRole('heading', { level: 1 })[0]
            ?.textContent?.toString(),
        ).toBe(DEFAULT_LOCALE_TITLE.en),
      );
    });

    it('renders three H2s with EN hub labels in order HN, SG, CROSS', async () => {
      const { container } = renderEn();
      await waitFor(() => {
        const h2s = Array.from(container.querySelectorAll('h2'));
        expect(h2s).toHaveLength(3);
        expect(h2s[0].textContent).toBe('Hanoi');
        expect(h2s[1].textContent).toBe('Ho Chi Minh City');
        expect(h2s[2].textContent).toBe('Other');
      });
    });
  });

  describe('Renders all 33 registry entries as anchor links', () => {
    it.each(GUIDES_REGISTRY.map((e) => [e.href, e.articleId] as const))(
      'href %s (articleId %s) renders as <a> with title from PAGE_META',
      (href, _articleId) => {
        const { container } = renderGuidesPage();
        const expectedTitle = resolveGuideTitle({ href, articleId: '', hub: 'HN', order: 0 });
        // The link's accessible name concatenates title + badge + description;
        // match via a CSS attribute selector to keep the test stable.
        const links = Array.from(
          container.querySelectorAll(`a[href="${href}"]`),
        ) as HTMLAnchorElement[];
        expect(links).toHaveLength(1);
        expect(links[0].textContent).toContain(expectedTitle);
        expect(links[0].tagName.toLowerCase()).toBe('a');
      },
    );
  });

  describe('Hub ordering', () => {
    it('HN section appears before SG which appears before CROSS in DOM order', () => {
      const { container } = renderGuidesPage();
      const h2s = Array.from(container.querySelectorAll('h2'));
      expect(h2s).toHaveLength(3);
      // For each h2, find the next sibling containing <a> cards and grab its first href.
      const firstHrefs = h2s.map((h2) => {
        const section = h2.closest('section');
        if (!section) throw new Error('h2 has no section ancestor');
        const firstLink = section.querySelector('a');
        if (!firstLink) throw new Error('section has no <a>');
        return firstLink.getAttribute('href') ?? '';
      });
      const grouped = groupByHub(GUIDES_REGISTRY);
      // sortByOrder is internal to GuidesPage; first entry per hub in DOM is the
      // entry with the lowest `order` value for that hub.
      expect(grouped.HN[0].order).toBeLessThanOrEqual(2);
      expect(grouped.SG[0].order).toBe(1);
      expect(grouped.CROSS[0].order).toBe(1);
      expect(firstHrefs[0]).toBe(grouped.HN[0].href);
      expect(firstHrefs[1]).toBe(grouped.SG[0].href);
      expect(firstHrefs[2]).toBe(grouped.CROSS[0].href);
    });
  });

  describe('Card link target', () => {
    it('first HN entry (bus-86 → /bus-86-hanoi-airport) is a real <a> with the right href', () => {
      const { container } = renderGuidesPage();
      const link = container.querySelector(
        'a[href="/bus-86-hanoi-airport"]',
      ) as HTMLAnchorElement | null;
      expect(link).not.toBeNull();
      expect(link!.tagName.toLowerCase()).toBe('a');
      expect(link!.getAttribute('href')).toBe('/bus-86-hanoi-airport');
      expect(link!.textContent).toContain(PAGE_META['/bus-86-hanoi-airport'].title);
    });
  });

  describe('Missing-PAGE_META fallback', () => {
    it('falls back to humanizeArticleId(articleId) and renders no description when meta is absent', () => {
      const customRegistry: GuideEntry[] = [
        { href: '/does-not-exist', articleId: 'fake-article', hub: 'HN', order: 1 },
      ];
      const { container } = renderGuidesPage({ customEntries: customRegistry });
      const link = container.querySelector(
        'a[href="/does-not-exist"]',
      ) as HTMLAnchorElement | null;
      expect(link).not.toBeNull();
      expect(link!.textContent).toContain(humanizeArticleId('fake-article'));
      // No description paragraph is rendered (resolveGuideDescription returns '').
      expect(link!.textContent).not.toMatch(/[A-Z]{4}/); // sanity: no accidental sentence
    });
  });

  describe('Empty-hub resilience', () => {
    it('renders three H2s and zero guide cards when registry is empty', () => {
      const { container } = renderGuidesPage({ customEntries: [] });
      const h2s = Array.from(container.querySelectorAll('h2'));
      expect(h2s).toHaveLength(3);
      // Count only guide-card links (i.e. <a> inside <section data-hub>).
      const cardLinks = Array.from(
        container.querySelectorAll('section[data-hub] a'),
      );
      expect(cardLinks).toHaveLength(0);
    });

    it('does not crash with a partial registry (one hub populated)', () => {
      const customRegistry: GuideEntry[] = [
        { href: '/bus-86-hanoi-airport', articleId: 'bus-86', hub: 'HN', order: 1 },
      ];
      const { container } = renderGuidesPage({ customEntries: customRegistry });
      const h2s = Array.from(container.querySelectorAll('h2'));
      expect(h2s.length).toBeGreaterThanOrEqual(3);
      const cardLinks = Array.from(
        container.querySelectorAll('section[data-hub] a'),
      );
      expect(cardLinks).toHaveLength(1);
      expect((cardLinks[0] as HTMLAnchorElement).getAttribute('href')).toBe(
        '/bus-86-hanoi-airport',
      );
    });
  });

  describe('PAGE_META integration via SEOHelmet path prop', () => {
    it('uses PAGE_META["/vi/guides"] when path is /vi/guides', async () => {
      renderGuidesPage({ path: '/vi/guides' });
      await waitFor(() =>
        expect(document.querySelector('title')?.textContent).toBe(
          PAGE_META['/vi/guides'].title,
        ),
      );
    });
  });

  describe('Accessibility & DOM hygiene', () => {
    it('every guide card link is a real <a> (not <button>)', () => {
      const { container } = renderGuidesPage();
      const cardLinks = Array.from(
        container.querySelectorAll('section[data-hub] a'),
      );
      expect(cardLinks.length).toBeGreaterThan(0);
      for (const link of cardLinks) {
        expect(link.tagName.toLowerCase()).toBe('a');
      }
    });

    it('renders no Lingering &zwj; markup or empty-state strings', () => {
      const { container } = renderGuidesPage();
      expect(container.textContent).not.toMatch(/&zwj;/);
      // The three hub H2s always render; verify their text is non-empty.
      const h2s = Array.from(container.querySelectorAll('h2'));
      for (const h2 of h2s) {
        expect(h2.textContent?.trim().length).toBeGreaterThan(0);
      }
    });

    it('does not throw when path is arbitrary (uses SEOHelmet fallback)', () => {
      expect(() =>
        render(
          <HelmetProvider>
            <MemoryRouter initialEntries={['/some/arbitrary/path']}>
              <LanguageProvider>
                <GuidesPage />
              </LanguageProvider>
            </MemoryRouter>
          </HelmetProvider>,
        ),
      ).not.toThrow();
    });
  });

  describe('GuidesPageVI wrapper', () => {
    it('renders the same content as GuidesPage (just a thin wrapper)', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/vi/guides']}>
            <LanguageProvider>
              <GuidesPageVI />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>,
      );
      const h1s = container.querySelectorAll('h1');
      expect(h1s).toHaveLength(1);
      expect(h1s[0].textContent).toMatch(/Hướng dẫn xe buýt sân bay/);
    });
  });

  describe('Language switch URL pair', () => {
    /**
     * Asserts the URL-pair semantics: the EN page's <a> switch link points to
     * /vi/guides, and the VI page's <a> switch link points to /guides. This
     * guards against the language-derived no-op bug where a VI user on
     * /guides could click "English" and stay on /guides.
     */
    it('passes languageSwitchPath="/vi/guides" when rendered at /guides', async () => {
      const { container } = renderGuidesPage({ path: '/guides' });
      await waitFor(() => {
        const switchLink = container.querySelector('a[href="/vi/guides"]');
        expect(switchLink).not.toBeNull();
      });
    });

    it('passes languageSwitchPath="/guides" when rendered at /vi/guides', async () => {
      const { container } = renderGuidesPage({ path: '/vi/guides' });
      await waitFor(() => {
        const switchLink = container.querySelector('a[href="/guides"]');
        expect(switchLink).not.toBeNull();
      });
    });
  });

  describe('Subtitle from PAGE_META', () => {
    it('renders the EN subtitle from PAGE_META["/guides"].subtitle when path is /guides (default VI)', async () => {
      renderGuidesPage({ path: '/guides' });
      await waitFor(() =>
        expect(
          screen.getByText(PAGE_META['/guides'].subtitle),
        ).toBeInTheDocument(),
      );
    });

    it('renders the VI subtitle from PAGE_META["/vi/guides"].subtitle when path is /vi/guides', async () => {
      renderGuidesPage({ path: '/vi/guides' });
      await waitFor(() =>
        expect(
          screen.getByText(PAGE_META['/vi/guides'].subtitle),
        ).toBeInTheDocument(),
      );
    });

    it('omits the subtitle <p> when the path has no PAGE_META entry (optional field)', () => {
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/some/arbitrary/path']}>
            <LanguageProvider>
              <GuidesPage />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>,
      );
      expect(
        screen.queryByText('All Frylane guides on airport buses and Grab — grouped by city.'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('Tất cả hướng dẫn Frylane về xe buýt và Grab từ sân bay — sắp xếp theo thành phố.'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Badge text from HUB_LABEL (cross-language regression)', () => {
    /**
     * Locks down the language-leak bug found in Task 2 review:
     * the badge must read from `HUB_LABEL[language][hub]`, not a hardcoded `vi` value.
     */
    function renderGuidesPageWithLang({
      path,
      lang,
    }: {
      path: string;
      lang: 'vi' | 'en';
    }) {
      function LanguageSwitcher() {
        const { setLanguage } = useLanguage();
        useEffect(() => {
          setLanguage(lang);
        }, [lang, setLanguage]);
        return null;
      }
      return render(
        <HelmetProvider>
          <MemoryRouter initialEntries={[path]}>
            <LanguageProvider>
              <LanguageSwitcher />
              <GuidesPage />
            </LanguageProvider>
          </MemoryRouter>
        </HelmetProvider>,
      );
    }

    it('badge text on an HN card reads from HUB_LABEL[language].HN — VI shows "Hà Nội"', async () => {
      const { container } = renderGuidesPageWithLang({ path: '/guides', lang: 'vi' });
      await waitFor(() => {
        const hnLink = container.querySelector(
          'a[href="/bus-86-hanoi-airport"]',
        ) as HTMLAnchorElement | null;
        expect(hnLink).not.toBeNull();
        const badge = hnLink!.querySelector('[data-testid="hub-badge"]');
        expect(badge?.textContent).toBe(HUB_LABEL.vi.HN);
        expect(badge?.textContent).toBe('Hà Nội');
      });
    });

    it('badge text on an HN card reads from HUB_LABEL[language].HN — EN shows "Hanoi" (regression: not VI)', async () => {
      const { container } = renderGuidesPageWithLang({ path: '/guides', lang: 'en' });
      await waitFor(() => {
        const hnLink = container.querySelector(
          'a[href="/bus-86-hanoi-airport"]',
        ) as HTMLAnchorElement | null;
        expect(hnLink).not.toBeNull();
        const badge = hnLink!.querySelector('[data-testid="hub-badge"]');
        expect(badge?.textContent).toBe(HUB_LABEL.en.HN);
        expect(badge?.textContent).toBe('Hanoi');
        // Negative assertion: VI text must NOT leak into the EN locale.
        expect(badge?.textContent).not.toBe('Hà Nội');
      });
    });

    it('badge text on an SG card reads from HUB_LABEL[language].SG — EN shows "Ho Chi Minh City"', async () => {
      const { container } = renderGuidesPageWithLang({ path: '/guides', lang: 'en' });
      await waitFor(() => {
        const sgLink = container.querySelector(
          'a[href="/bus-109-saigon-airport"]',
        ) as HTMLAnchorElement | null;
        expect(sgLink).not.toBeNull();
        const badge = sgLink!.querySelector('[data-testid="hub-badge"]');
        expect(badge?.textContent).toBe(HUB_LABEL.en.SG);
        expect(badge?.textContent).toBe('Ho Chi Minh City');
        expect(badge?.textContent).not.toBe('TP.HCM');
      });
    });

    it('badge text on an CROSS card reads from HUB_LABEL[language].CROSS — EN shows "Other"', async () => {
      const { container } = renderGuidesPageWithLang({ path: '/guides', lang: 'en' });
      await waitFor(() => {
        const crossLink = container.querySelector(
          'a[href="/airport-bus-luggage-fee-vietnam"]',
        ) as HTMLAnchorElement | null;
        expect(crossLink).not.toBeNull();
        const badge = crossLink!.querySelector('[data-testid="hub-badge"]');
        expect(badge?.textContent).toBe(HUB_LABEL.en.CROSS);
        expect(badge?.textContent).toBe('Other');
        expect(badge?.textContent).not.toBe('Khác');
      });
    });
  });

  describe('Resolver integrations (sanity)', () => {
    it('resolveGuideTitle matches PAGE_META title for the first HN entry', () => {
      const entry = GUIDES_REGISTRY.find((e) => e.href === '/bus-86-hanoi-airport');
      expect(entry).toBeDefined();
      expect(resolveGuideTitle(entry!)).toBe(PAGE_META['/bus-86-hanoi-airport'].title);
    });

    it('resolveGuideDescription returns empty string for a missing-meta entry', () => {
      const entry: GuideEntry = {
        href: '/never-existed',
        articleId: 'fake',
        hub: 'CROSS',
        order: 99,
      };
      expect(resolveGuideDescription(entry)).toBe('');
    });

    it('HUB_LABEL.vi.HN matches the first H2 text on the VI listing page', () => {
      expect(HUB_LABEL.vi.HN).toBe('Hà Nội');
      const { container } = renderGuidesPage();
      const firstH2 = container.querySelector('h2');
      expect(firstH2?.textContent).toBe(HUB_LABEL.vi.HN);
    });
  });

  describe('Route number rendering (departure board)', () => {
    it('bus-86 entry shows "86" in monospace font-mono', () => {
      const { container } = renderGuidesPage();
      const link = container.querySelector('a[href="/bus-86-hanoi-airport"]') as HTMLAnchorElement;
      const routeSpan = link.querySelector('[data-testid="route-number"]');
      expect(routeSpan).not.toBeNull();
      expect(routeSpan!.textContent).toBe('86');
      expect(routeSpan!.className).toMatch(/font-mono/);
      expect(routeSpan!.className).toMatch(/font-bold/);
    });

    it('bus-109 entry shows "109" route number', () => {
      const { container } = renderGuidesPage();
      const link = container.querySelector('a[href="/bus-109-saigon-airport"]') as HTMLAnchorElement;
      const routeSpan = link.querySelector('[data-testid="route-number"]');
      expect(routeSpan?.textContent).toBe('109');
    });

    it('bus-152 entry shows "152" route number', () => {
      const { container } = renderGuidesPage();
      const link = container.querySelector('a[href="/bus-152-saigon-fare"]') as HTMLAnchorElement;
      const routeSpan = link.querySelector('[data-testid="route-number"]');
      expect(routeSpan?.textContent).toBe('152');
    });

    it('non-bus entry (luggage-fee) does NOT have route number column', () => {
      const { container } = renderGuidesPage();
      const link = container.querySelector('a[href="/airport-bus-luggage-fee-vietnam"]') as HTMLAnchorElement;
      const routeSpan = link.querySelector('[data-testid="route-number"]');
      expect(routeSpan).toBeNull();
    });

    it('non-bus entry (scam) does NOT have route number column', () => {
      const { container } = renderGuidesPage();
      const link = container.querySelector('a[href="/airport-scam-vietnam-taxi"]') as HTMLAnchorElement;
      const routeSpan = link.querySelector('[data-testid="route-number"]');
      expect(routeSpan).toBeNull();
    });

    it('non-bus entry (grab-vs-bus) does NOT have route number column', () => {
      const { container } = renderGuidesPage();
      const link = container.querySelector('a[href="/grab-vs-bus-hanoi-airport"]') as HTMLAnchorElement;
      const routeSpan = link.querySelector('[data-testid="route-number"]');
      expect(routeSpan).toBeNull();
    });
  });

  describe('Row styling (departure board)', () => {
    it('row uses flex layout with bottom border separator', () => {
      const { container } = renderGuidesPage();
      const link = container.querySelector('a[href="/bus-86-hanoi-airport"]') as HTMLAnchorElement;
      expect(link.className).toMatch(/flex/);
      expect(link.className).toMatch(/items-center/);
      expect(link.className).toMatch(/justify-between/);
      expect(link.className).toMatch(/border-b/);
    });

    it('row no longer uses rounded-2xl (card removed)', () => {
      const { container } = renderGuidesPage();
      const link = container.querySelector('a[href="/bus-86-hanoi-airport"]') as HTMLAnchorElement;
      expect(link.className).not.toMatch(/rounded-2xl/);
    });

    it('row does not use shadow (replaced by divider)', () => {
      const { container } = renderGuidesPage();
      const link = container.querySelector('a[href="/bus-86-hanoi-airport"]') as HTMLAnchorElement;
      expect(link.className).not.toMatch(/shadow/);
    });
  });

  describe('Hub header styling (airport-style)', () => {
    it('renders horizontal rule separator below each hub header', () => {
      const { container } = renderGuidesPage();
      const h2s = container.querySelectorAll('h2');
      for (const h2 of h2s) {
        const section = h2.closest('section');
        expect(section?.querySelector('hr')).not.toBeNull();
      }
    });

    it('header uses text-2xl font-bold tracking-tight', () => {
      const { container } = renderGuidesPage();
      const h2 = container.querySelector('h2') as HTMLHeadingElement;
      expect(h2.className).toMatch(/text-2xl/);
      expect(h2.className).toMatch(/font-bold/);
      expect(h2.className).toMatch(/tracking-tight/);
    });

    it('HubSection uses flat list, not grid', () => {
      const { container } = renderGuidesPage();
      const guideList = container.querySelector('[data-guide-list]');
      expect(guideList).not.toBeNull();
      expect(guideList?.className).not.toMatch(/grid/);
    });
  });
});