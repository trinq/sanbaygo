import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import {
  ComparisonArticleLayout,
  type ComparisonArticleConfig,
} from '../../../src/components/Layout/ComparisonArticleLayout';

function makeConfig(
  overrides: Partial<ComparisonArticleConfig> = {},
): ComparisonArticleConfig {
  return {
    seoPath: '/grab-vs-bus-hanoi-airport',
    h1En: 'Grab vs Bus 86 Hanoi Airport',
    categoryLabel: 'So sánh phương tiện',
    subtitle: 'VND 50,000 vs 250,000–350,000 · 50–75 phút',
    intro: 'So sánh nhanh giúp bạn chọn phương tiện phù hợp.',
    options: [
      {
        name: 'Bus 86',
        priceRange: 'VND 50,000',
        durationRange: '50–75 phút',
        pros: ['Rẻ nhất', 'Giá cố định'],
        cons: ['Lịch cố định', 'Có thể đông giờ cao điểm'],
        bestFor: 'Du khách một mình, hành lý nhẹ',
      },
      {
        name: 'Grab',
        priceRange: 'VND 250,000–350,000',
        durationRange: '40–60 phút',
        pros: ['Nhanh hơn', 'Cửa-tới-cửa'],
        cons: ['Đắt hơn 5–7×', 'Phụ thuộc tắc đường'],
        bestFor: 'Gia đình hoặc nhiều hành lý',
      },
    ],
    faqItems: [
      { q: 'Bus 86 có an toàn không?', a: 'Có, xe buýt công cộng có giá cố định do nhà nước quy định.' },
      { q: 'Grab đắt hơn bao nhiêu?', a: 'Grab thường đắt hơn 5–7 lần so với xe buýt.' },
    ],
    ...overrides,
  };
}

function renderLayout(config: ComparisonArticleConfig) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[config.seoPath]}>
        <LanguageProvider>
          <ComparisonArticleLayout config={config} />
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('ComparisonArticleLayout', () => {
  it('renders H1 in English from config.h1En', () => {
    renderLayout(makeConfig());
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/Grab vs Bus 86 Hanoi Airport/);
  });

  it('renders Vietnamese category label above H1 and Vietnamese subtitle below', () => {
    renderLayout(makeConfig());
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/Grab vs Bus 86/i);
    // categoryLabel appears in hero header
    expect(screen.getByText(/So sánh phương tiện/)).toBeTruthy();
    // subtitle appears in hero header
    expect(screen.getByText(/VND 50,000 vs 250,000–350,000/)).toBeTruthy();
  });

  it('renders all option cards with pros and cons', () => {
    renderLayout(makeConfig());
    // Both option names should appear (twice each — in card heading and table header).
    expect(screen.getAllByText('Bus 86').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Grab').length).toBeGreaterThanOrEqual(2);
    // pros of Bus 86
    expect(screen.getByText('Rẻ nhất')).toBeTruthy();
    expect(screen.getByText('Giá cố định')).toBeTruthy();
    // cons of Bus 86
    expect(screen.getByText('Lịch cố định')).toBeTruthy();
    // pros of Grab
    expect(screen.getByText('Nhanh hơn')).toBeTruthy();
    expect(screen.getByText('Cửa-tới-cửa')).toBeTruthy();
    // bestFor (appears in both card and table)
    expect(screen.getAllByText(/Du khách một mình/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Gia đình hoặc nhiều hành lý/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders comparison table with one column per option', () => {
    const { container } = renderLayout(makeConfig());
    const table = container.querySelector('table');
    expect(table).toBeTruthy();
    // Header row should contain both option names as column headers
    const thead = table!.querySelector('thead');
    expect(thead).toBeTruthy();
    const headerCells = thead!.querySelectorAll('th');
    const headerTexts = Array.from(headerCells).map((c) => c.textContent ?? '');
    expect(headerTexts).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Phương tiện'),
        expect.stringContaining('Bus 86'),
        expect.stringContaining('Grab'),
      ]),
    );
  });

  it('renders FAQ schema (application/ld+json JSON-LD)', () => {
    const { container } = renderLayout(makeConfig());
    const scripts = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    );
    expect(scripts.length).toBeGreaterThanOrEqual(1);
    const schema = JSON.parse(scripts[0].textContent ?? '{}');
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(Array.isArray(schema.mainEntity)).toBe(true);
    expect(schema.mainEntity.length).toBe(2);
    expect(schema.mainEntity[0]['@type']).toBe('Question');
    expect(schema.mainEntity[0].name).toBe('Bus 86 có an toàn không?');
    expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
    expect(schema.mainEntity[0].acceptedAnswer.text).toMatch(/giá cố định/);
  });

  it('renders verdict callout when config.verdict is provided', () => {
    renderLayout(
      makeConfig({ verdict: 'Chọn xe buýt nếu bạn muốn tiết kiệm, chọn Grab nếu cần nhanh.' }),
    );
    expect(
      screen.getByText(/Chọn xe buýt nếu bạn muốn tiết kiệm/),
    ).toBeTruthy();
  });

  it('does NOT render verdict callout when config.verdict is omitted', () => {
    const { container } = renderLayout(makeConfig());
    // No callout section should match the verdict wording; a more reliable check
    // is that no element with the verdict-specific text exists.
    expect(screen.queryByText(/Chọn xe buýt nếu bạn muốn tiết kiệm/)).toBeNull();
  });

  it('renders CTA link when config.cta is provided', () => {
    renderLayout(
      makeConfig({ cta: { label: 'Mở máy tính Frylane', href: '/ket-qua' } }),
    );
    const ctaLink = screen.getByRole('link', { name: /Mở máy tính Frylane/ });
    expect(ctaLink).toBeTruthy();
    expect(ctaLink.getAttribute('href')).toBe('/ket-qua');
  });

  it('does NOT render CTA when config.cta is omitted', () => {
    renderLayout(makeConfig());
    expect(screen.queryByRole('link', { name: /Mở máy tính Frylane/ })).toBeNull();
  });

  it('renders all FAQ items with their questions and answers', () => {
    renderLayout(makeConfig());
    // Each FAQ item renders as a <details> element with the question in <summary>
    const faq1 = screen.getByText('Bus 86 có an toàn không?');
    expect(faq1).toBeTruthy();
    const faq2 = screen.getByText('Grab đắt hơn bao nhiêu?');
    expect(faq2).toBeTruthy();
    // First answer text should appear in DOM
    expect(screen.getByText(/giá cố định do nhà nước quy định/)).toBeTruthy();
  });

  it('renders all FAQ schema questions match the items', () => {
    const { container } = renderLayout(makeConfig());
    const scripts = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    );
    const schema = JSON.parse(scripts[0].textContent ?? '{}');
    const names = schema.mainEntity.map((q: { name: string }) => q.name);
    expect(names).toEqual([
      'Bus 86 có an toàn không?',
      'Grab đắt hơn bao nhiêu?',
    ]);
  });

  it('renders intro paragraph', () => {
    renderLayout(makeConfig());
    expect(
      screen.getByText(/So sánh nhanh giúp bạn chọn phương tiện phù hợp/),
    ).toBeTruthy();
  });

  it('passes alternatePath to ArticleLayout for language switch', () => {
    const { container } = renderLayout(
      makeConfig({ alternatePath: '/vi/grab-vs-bus-hanoi-airport' }),
    );
    // Nav renders a text link when languageSwitchPath is set.
    const switchLink = container.querySelector('a[href="/vi/grab-vs-bus-hanoi-airport"]');
    expect(switchLink).toBeTruthy();
  });

  it('exports ComparisonArticleConfig type via the comparison table containing one column per option', () => {
    // Render with 3 options to confirm flexibility of the config shape.
    const threeOptions = makeConfig({
      options: [
        {
          name: 'Bus 86',
          priceRange: 'VND 50,000',
          durationRange: '50–75 phút',
          pros: ['Rẻ nhất'],
          cons: ['Lịch cố định'],
          bestFor: 'Solo',
        },
        {
          name: 'Grab',
          priceRange: 'VND 250,000–350,000',
          durationRange: '40–60 phút',
          pros: ['Nhanh'],
          cons: ['Đắt'],
          bestFor: 'Family',
        },
        {
          name: 'Taxi',
          priceRange: 'VND 200,000–300,000',
          durationRange: '40–70 phút',
          pros: ['Sẵn sàng'],
          cons: ['Có thể bị lừa'],
          bestFor: 'Hành khách quen',
        },
      ],
    });
    const { container } = renderLayout(threeOptions);
    const table = container.querySelector('table');
    expect(table).toBeTruthy();
    const thead = table!.querySelector('thead');
    const headerTexts = Array.from(thead!.querySelectorAll('th')).map(
      (c) => c.textContent ?? '',
    );
    expect(headerTexts.some((t) => t.includes('Bus 86'))).toBe(true);
    expect(headerTexts.some((t) => t.includes('Grab'))).toBe(true);
    expect(headerTexts.some((t) => t.includes('Taxi'))).toBe(true);
  });
});