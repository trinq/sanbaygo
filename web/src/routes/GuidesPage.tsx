import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHelmet } from '../components/SEO';
import { ArticleLayout } from '../components/Layout/ArticleLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { PAGE_META } from '../seo/metaConfig';
import {
  DEFAULT_LOCALE_TITLE,
  GUIDES_REGISTRY,
  HUB_LABEL,
  getRouteNumber,
  groupByHub,
  resolveGuideTitle,
  type GuideEntry,
} from '../seo/guidesRegistry';

type Hub = GuideEntry['hub'];

const HUB_ORDER: ReadonlyArray<Hub> = ['HN', 'SG', 'CROSS'];

/** Per-hub badge color tokens. HN/blue and SG/orange match BusGuides.tsx. */
const HUB_BADGE_CLASSES: Record<Hub, { bg: string; text: string }> = {
  HN: { bg: 'bg-blue-100', text: 'text-blue-700' },
  SG: { bg: 'bg-orange-100', text: 'text-orange-700' },
  CROSS: { bg: 'bg-slate-100', text: 'text-slate-700' },
};

/** Airport-style glyph shown next to each hub heading. */
const HUB_EMOJI: Record<Hub, string> = {
  HN: '✈',
  SG: '✈',
  CROSS: '✈',
};

interface GuidesPageProps {
  /** Optional override for testing — defaults to GUIDES_REGISTRY. */
  registry?: ReadonlyArray<GuideEntry>;
}

function GuideRow({ entry }: { entry: GuideEntry }) {
  const { language } = useLanguage();
  const title = resolveGuideTitle(entry);
  const badge = HUB_BADGE_CLASSES[entry.hub];
  const badgeText = HUB_LABEL[language][entry.hub];
  const routeNumber = entry.routeNumber ?? getRouteNumber(entry.articleId);

  return (
    <a
      href={entry.href}
      className="group flex items-center justify-between gap-4 py-4 border-b border-surface-border hover:bg-surface-bg/50 transition-colors"
    >
      <div className="flex items-center gap-4 min-w-0">
        {routeNumber && (
          <span className="font-mono font-bold text-ink text-lg w-12 shrink-0">
            {routeNumber}
          </span>
        )}
        <span className="text-base font-medium text-ink group-hover:text-primary transition-colors truncate">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span
          data-testid="hub-badge"
          className={`text-xs font-semibold px-2 py-1 rounded-full ${badge.bg} ${badge.text}`}
        >
          {badgeText}
        </span>
        <span className="text-ink-soft group-hover:text-primary group-hover:translate-x-0.5 transition-all">
          →
        </span>
      </div>
    </a>
  );
}

function HubSection({ hub, entries }: { hub: Hub; entries: GuideEntry[] }) {
  const { language } = useLanguage();
  const heading = HUB_LABEL[language][hub];
  const emoji = HUB_EMOJI[hub];

  return (
    <section className="mb-12" data-hub={hub}>
      <header className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-ink tracking-tight">{heading}</h2>
        <span aria-hidden="true" className="text-2xl">{emoji}</span>
      </header>
      <hr className="border-surface-border mb-2" />
      {entries.length > 0 ? (
        <div data-guide-list>
          {entries.map((entry) => (
            <GuideRow key={`${entry.href}-${entry.articleId}`} entry={entry} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function GuidesPage({ registry = GUIDES_REGISTRY }: GuidesPageProps) {
  const location = useLocation();
  const { language } = useLanguage();
  const h1 = DEFAULT_LOCALE_TITLE[language];
  const meta = PAGE_META[location.pathname];
  const subtitle = meta?.subtitle;

  // Group + sort within each hub by `order` ascending.
  const grouped = useMemo(() => {
    const byHub = groupByHub(registry);
    const sortByOrder = (a: GuideEntry, b: GuideEntry) => a.order - b.order;
    return {
      HN: [...byHub.HN].sort(sortByOrder),
      SG: [...byHub.SG].sort(sortByOrder),
      CROSS: [...byHub.CROSS].sort(sortByOrder),
    };
  }, [registry]);

  return (
    <>
      <SEOHelmet path={location.pathname} />
      <ArticleLayout
        languageSwitchPath={
          location.pathname.startsWith('/vi') ? '/guides' : '/vi/guides'
        }
      >
        <div className="bg-white py-16 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-ink mb-2">{h1}</h1>
            {subtitle && <p className="text-ink-soft mb-10">{subtitle}</p>}

            {HUB_ORDER.map((hub) => (
              <HubSection key={hub} hub={hub} entries={grouped[hub]} />
            ))}
          </div>
        </div>
      </ArticleLayout>
    </>
  );
}

/** Same component as GuidesPage; the language context (which defaults to VI in LanguageProvider) flips content. */
export function GuidesPageVI() {
  return <GuidesPage />;
}

export default GuidesPage;
