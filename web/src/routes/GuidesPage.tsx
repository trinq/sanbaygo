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
  groupByHub,
  resolveGuideDescription,
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

interface GuidesPageProps {
  /** Optional override for testing — defaults to GUIDES_REGISTRY. */
  registry?: ReadonlyArray<GuideEntry>;
}

function GuideCard({ entry }: { entry: GuideEntry }) {
  const { language } = useLanguage();
  const title = resolveGuideTitle(entry);
  const description = resolveGuideDescription(entry);
  const badge = HUB_BADGE_CLASSES[entry.hub];
  const badgeText = HUB_LABEL[language][entry.hub];

  return (
    <a
      href={entry.href}
      className="group block rounded-2xl border border-surface-border bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-lg text-ink group-hover:text-primary transition-colors">
          {title}
        </h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ml-3 ${badge.bg} ${badge.text}`}
        >
          {badgeText}
        </span>
      </div>

      {description && (
        <p className="text-sm text-ink-soft leading-relaxed">{description}</p>
      )}
    </a>
  );
}

function HubSection({ hub, entries }: { hub: Hub; entries: GuideEntry[] }) {
  const { language } = useLanguage();
  const heading = HUB_LABEL[language][hub];

  return (
    <section className="mb-12" data-hub={hub}>
      <h2 className="text-2xl font-bold text-ink">{heading}</h2>
      {entries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {entries.map((entry) => (
            <GuideCard key={`${entry.href}-${entry.articleId}`} entry={entry} />
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
      <ArticleLayout languageSwitchPath={language === 'vi' ? '/guides' : '/vi/guides'}>
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

/** Thin VI wrapper per the brief — same component, language context flips content. */
export function GuidesPageVI() {
  return <GuidesPage />;
}

export default GuidesPage;