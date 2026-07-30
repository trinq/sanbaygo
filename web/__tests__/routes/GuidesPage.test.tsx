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
});