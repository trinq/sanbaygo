import { PAGE_META } from '@/seo/metaConfig';
import {
  DEFAULT_LOCALE_TITLE,
  GUIDES_REGISTRY,
  HUB_LABEL,
  groupByHub,
  humanizeArticleId,
  resolveGuideDescription,
  resolveGuideTitle,
} from '@/seo/guidesRegistry';

describe('GUIDES_REGISTRY', () => {
  it('exports exactly 33 entries', () => {
    expect(GUIDES_REGISTRY).toHaveLength(33);
  });

  it('every entry href exists in PAGE_META', () => {
    for (const entry of GUIDES_REGISTRY) {
      expect(PAGE_META[entry.href]).toBeDefined();
    }
  });

  it('groups into HN: 18, SG: 8, CROSS: 7', () => {
    const grouped = groupByHub(GUIDES_REGISTRY);
    expect(grouped.HN).toHaveLength(18);
    expect(grouped.SG).toHaveLength(8);
    expect(grouped.CROSS).toHaveLength(7);
  });

  it('within each hub, entries are sorted by `order` ascending', () => {
    const grouped = groupByHub(GUIDES_REGISTRY);
    for (const hub of ['HN', 'SG', 'CROSS'] as const) {
      const orders = grouped[hub].map((e) => e.order);
      const sorted = [...orders].sort((a, b) => a - b);
      expect(orders).toEqual(sorted);
    }
  });
});

describe('humanizeArticleId', () => {
  it("'bus-86' → 'Bus 86'", () => {
    expect(humanizeArticleId('bus-86')).toBe('Bus 86');
  });

  it("'grab-vs-bus' → 'Grab Vs Bus'", () => {
    expect(humanizeArticleId('grab-vs-bus')).toBe('Grab Vs Bus');
  });

  it("'noibai-t2-exit' → 'Noibai T2 Exit'", () => {
    expect(humanizeArticleId('noibai-t2-exit')).toBe('Noibai T2 Exit');
  });
});

describe('HUB_LABEL', () => {
  it("HUB_LABEL.vi.HN === 'Hà Nội'", () => {
    expect(HUB_LABEL.vi.HN).toBe('Hà Nội');
  });

  it("HUB_LABEL.en.SG === 'Ho Chi Minh City'", () => {
    expect(HUB_LABEL.en.SG).toBe('Ho Chi Minh City');
  });

  it("HUB_LABEL.vi.CROSS === 'Khác'", () => {
    expect(HUB_LABEL.vi.CROSS).toBe('Khác');
  });
});

describe('DEFAULT_LOCALE_TITLE', () => {
  it("vi title === 'Hướng dẫn xe buýt sân bay'", () => {
    expect(DEFAULT_LOCALE_TITLE.vi).toBe('Hướng dẫn xe buýt sân bay');
  });

  it("en title === 'Vietnam Airport Bus Guides'", () => {
    expect(DEFAULT_LOCALE_TITLE.en).toBe('Vietnam Airport Bus Guides');
  });
});

describe('resolveGuideTitle', () => {
  it('returns PAGE_META[href].title for an entry where meta exists', () => {
    const entry = GUIDES_REGISTRY.find((e) => e.href === '/bus-86-hanoi-airport');
    expect(entry).toBeDefined();
    const title = resolveGuideTitle(entry!);
    expect(title).toBe(PAGE_META['/bus-86-hanoi-airport'].title);
  });

  it("falls back to humanizeArticleId(articleId) when meta is missing", () => {
    const missingMetaEntry = {
      href: '/this-href-does-not-exist',
      articleId: 'grab-vs-bus',
      hub: 'HN' as const,
      order: 99,
    };
    expect(resolveGuideTitle(missingMetaEntry)).toBe('Grab Vs Bus');
  });
});

describe('resolveGuideDescription', () => {
  it('returns PAGE_META[href].description for an entry where meta exists', () => {
    const entry = GUIDES_REGISTRY.find((e) => e.href === '/bus-86-hanoi-airport');
    expect(entry).toBeDefined();
    expect(resolveGuideDescription(entry!)).toBe(
      PAGE_META['/bus-86-hanoi-airport'].description,
    );
  });

  it("returns '' when meta is missing", () => {
    const missingMetaEntry = {
      href: '/this-href-does-not-exist',
      articleId: 'bus-86',
      hub: 'HN' as const,
      order: 99,
    };
    expect(resolveGuideDescription(missingMetaEntry)).toBe('');
  });
});
