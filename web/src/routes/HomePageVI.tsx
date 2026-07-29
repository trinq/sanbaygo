import { SEOHelmet } from '../components/SEO';
import { LandingPage } from '../components/Landing';
import { LanguageProvider } from '../contexts/LanguageContext';

export function HomePageVI() {
  return (
    <LanguageProvider>
      <SEOHelmet path="/vi/" />
      <LandingPage />
    </LanguageProvider>
  );
}
