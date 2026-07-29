import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/Layout/PageLayout';

export function Terms() {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-ink">{t.pages.terms.title}</h1>
        <p className="mt-6 text-ink-soft leading-relaxed">{t.pages.terms.content}</p>
        <a href="/" className="mt-8 inline-block text-primary hover:underline">
          {t.pages.terms.back}
        </a>
      </main>
    </PageLayout>
  );
}
