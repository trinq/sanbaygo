import { SEOHelmet } from '../components/SEO';
import { LandingPage } from '../components/Landing';

export function HomePageVI() {
  return (
    <>
      <SEOHelmet path="/vi/" />
      <LandingPage />
    </>
  );
}
