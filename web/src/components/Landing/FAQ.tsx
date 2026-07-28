import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16" id="faq">
      <h2 className="text-center text-2xl font-bold text-ink">{t.landing.faq.title}</h2>
      <div className="mt-8 space-y-4">
        {t.landing.faq.questions.map((item: { q: string; a: string }, i: number) => (
          <div key={i} className="rounded-xl border border-surface-border bg-white">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              aria-controls={`faq-answer-${i}`}
              className="flex w-full items-center justify-between p-5 text-left font-medium text-ink"
            >
              {item.q}
              <svg
                className={`h-5 w-5 text-ink-soft transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div id={`faq-answer-${i}`} className="border-t border-surface-border px-5 pb-5 pt-4 text-ink-soft">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
