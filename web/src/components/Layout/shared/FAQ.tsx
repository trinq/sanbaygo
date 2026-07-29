export interface FAQItem {
  q: string;
  a: string;
}

export function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-ink mb-4">Câu hỏi thường gặp</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details key={i} className="rounded-xl border border-surface-border bg-white">
            <summary className="cursor-pointer p-5 font-medium text-ink list-none flex items-center justify-between">
              {item.q}
              <svg
                className="h-5 w-5 text-ink-soft shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="border-t border-surface-border px-5 pb-5 pt-4 text-ink-soft">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const mainEntity = items.map((item) => ({
    '@type': 'Question' as const,
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: item.a,
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity,
        }),
      }}
    />
  );
}