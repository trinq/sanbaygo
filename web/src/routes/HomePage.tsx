import { SEOHelmet } from '../components/SEO';
import { LandingPage } from '../components/Landing';

export function HomePage() {
  return (
    <>
      <SEOHelmet path="/" />
      <LandingPage />
    </>
  );
}
