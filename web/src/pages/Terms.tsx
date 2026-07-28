import { useLanguage } from '../contexts/LanguageContext';
import { Footer } from '../components/Landing/Footer';

export function Terms() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-3xl font-bold text-ink">{t.pages.terms.title}</h1>
        <p className="mt-6 text-ink-soft leading-relaxed">{t.pages.terms.content}</p>
        <a href="/" className="mt-8 inline-block text-primary hover:underline">
          ← Quay về trang chủ
        </a>
      </main>
      <Footer />
    </div>
  );
}
