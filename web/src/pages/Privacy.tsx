import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/Layout/PageLayout';

export function Privacy() {
  const { t } = useLanguage();
  return (
    <PageLayout>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-ink">{t.pages.privacy.title}</h1>
        <p className="mt-6 text-ink-soft leading-relaxed">{t.pages.privacy.content}</p>
        <a href="/" className="mt-8 inline-block text-primary hover:underline">
          {t.pages.privacy.back}
        </a>
      </main>
    </PageLayout>
  );
}
