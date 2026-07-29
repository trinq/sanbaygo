import { SEOHelmet } from '../SEO';
import { ArticleLayout } from './ArticleLayout';
import { FAQSection, FAQSchema, type FAQItem } from './shared/FAQ';

export interface ComparisonOption {
  /** Name of the option (e.g. "Bus 86", "Grab", "Taxi") */
  name: string;
  /** Human-readable price range (e.g. "VND 50,000") */
  priceRange: string;
  /** Human-readable travel duration range (e.g. "50–75 phút") */
  durationRange: string;
  /** Bullet points for strengths */
  pros: string[];
  /** Bullet points for weaknesses */
  cons: string[];
  /** One-line "best for" recommendation (e.g. "Solo backpackers with light luggage") */
  bestFor: string;
}

export interface ComparisonArticleConfig {
  /** SEO Helmet path, e.g. "/grab-vs-bus-hanoi-airport" */
  seoPath: string;
  /** English H1 — e.g. "Grab vs Bus 86 Hanoi Airport" */
  h1En: string;
  /** Vietnamese label above H1 (e.g. "So sánh phương tiện") */
  categoryLabel: string;
  /** Vietnamese subtitle below H1 */
  subtitle: string;
  /** Optional intro paragraph (Vietnamese) */
  intro?: string;
  /** Comparison options — must contain ≥ 2 entries */
  options: ComparisonOption[];
  /** Optional verdict / bottom-line callout shown after the comparison table */
  verdict?: string;
  /** FAQ items */
  faqItems: FAQItem[];
  /** Optional CTA below FAQ — e.g. "Open SanBayGo calculator" */
  cta?: { label: string; href: string };
  /** Path to the counterpart language page (used for the language switcher link in nav). */
  alternatePath?: string;
}

interface Props {
  config: ComparisonArticleConfig;
}

function OptionsSection({ options }: { options: ComparisonOption[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-ink mb-4">Các lựa chọn</h2>
      <div className="space-y-6">
        {options.map((option, i) => (
          <div
            key={i}
            className="rounded-2xl border border-surface-border bg-white p-6 shadow-card"
          >
            <h3 className="text-xl font-bold text-ink mb-2">{option.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-ink-soft">Giá</p>
                <p className="text-ink font-medium">{option.priceRange}</p>
              </div>
              <div>
                <p className="text-sm text-ink-soft">Thời gian</p>
                <p className="text-ink font-medium">{option.durationRange}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-ink mb-1">Ưu điểm</p>
                <ul className="list-disc list-inside space-y-1 text-ink-soft">
                  {option.pros.map((pro, j) => (
                    <li key={j}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-ink mb-1">Nhược điểm</p>
                <ul className="list-disc list-inside space-y-1 text-ink-soft">
                  {option.cons.map((con, j) => (
                    <li key={j}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-ink mt-4">
              <strong>Phù hợp nhất:</strong> {option.bestFor}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparisonTable({ options }: { options: ComparisonOption[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-ink mb-4">Bảng so sánh</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-surface-border">
              <th className="text-left py-3 px-2 text-ink-soft font-medium">
                Phương tiện
              </th>
              {options.map((option, i) => (
                <th
                  key={i}
                  className="text-left py-3 px-2 text-ink-soft font-medium"
                >
                  {option.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-surface-border">
              <td className="py-3 px-2 text-ink font-medium">Giá</td>
              {options.map((option, i) => (
                <td key={i} className="py-3 px-2 text-primary font-medium">
                  {option.priceRange}
                </td>
              ))}
            </tr>
            <tr className="border-b border-surface-border">
              <td className="py-3 px-2 text-ink font-medium">Thời gian</td>
              {options.map((option, i) => (
                <td key={i} className="py-3 px-2 text-ink">
                  {option.durationRange}
                </td>
              ))}
            </tr>
            <tr className="border-b border-surface-border">
              <td className="py-3 px-2 text-ink font-medium">Phù hợp nhất</td>
              {options.map((option, i) => (
                <td key={i} className="py-3 px-2 text-ink-soft">
                  {option.bestFor}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function VerdictCallout({ verdict }: { verdict: string }) {
  return (
    <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
      <h2 className="text-xl font-bold text-ink mb-3">Kết luận</h2>
      <p className="text-ink">{verdict}</p>
    </section>
  );
}

function CTASection({ cta }: { cta: { label: string; href: string } }) {
  return (
    <section className="mb-12">
      <a
        href={cta.href}
        className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
      >
        {cta.label}
      </a>
    </section>
  );
}

export function ComparisonArticleLayout({ config }: Props) {
  const {
    seoPath,
    h1En,
    categoryLabel,
    subtitle,
    intro,
    options,
    verdict,
    faqItems,
    cta,
    alternatePath,
  } = config;

  return (
    <>
      <SEOHelmet path={seoPath} />
      <ArticleLayout languageSwitchPath={alternatePath}>
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              {categoryLabel}
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">{h1En}</h1>
            <p className="text-lg opacity-90">{subtitle}</p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Intro */}
          {intro && (
            <section className="mb-12">
              <p className="text-ink-soft leading-relaxed">{intro}</p>
            </section>
          )}

          {/* Options cards */}
          <OptionsSection options={options} />

          {/* Side-by-side comparison table */}
          <ComparisonTable options={options} />

          {/* Optional verdict callout */}
          {verdict && <VerdictCallout verdict={verdict} />}

          {/* FAQ section + JSON-LD schema */}
          <FAQSection items={faqItems} />
        </div>

        <FAQSchema items={faqItems} />

        {/* Optional CTA */}
        {cta && (
          <div className="max-w-3xl mx-auto px-4 pb-12">
            <CTASection cta={cta} />
          </div>
        )}
      </ArticleLayout>
    </>
  );
}
