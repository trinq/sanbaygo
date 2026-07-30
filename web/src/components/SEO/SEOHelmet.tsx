import { Helmet } from 'react-helmet-async';
import { PAGE_META, DEFAULT_META } from '../../seo/metaConfig';

type Props = {
  path: string;
};

export function SEOHelmet({ path }: Props) {
  const meta = PAGE_META[path] ?? DEFAULT_META;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      {meta.ogUrl && <meta property="og:url" content={meta.ogUrl} />}
      <meta property="og:title" content={meta.ogTitle ?? meta.title} />
      <meta property="og:description" content={meta.ogDescription ?? meta.description} />
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.twitterTitle ?? meta.ogTitle ?? meta.title} />
      <meta name="twitter:description" content={meta.twitterDescription ?? meta.ogDescription ?? meta.description} />

      {/* Hreflang — self-reference + counterpart (required by Google spec) */}
      {/* Self-reference: this page declares its own language */}
      <link rel="alternate" hrefLang={path.startsWith('/vi') ? 'vi' : 'en'} href={`https://frylane.com${path}`} />
      {/* Counterpart: the other-language version of this page */}
      {meta.alternateEN && (
        <link rel="alternate" hrefLang="en" href={meta.alternateEN} />
      )}
      {meta.alternateEN && (
        <link rel="alternate" hrefLang="x-default" href={meta.alternateEN} />
      )}
      {meta.alternateVI && (
        <link rel="alternate" hrefLang="vi" href={meta.alternateVI} />
      )}
    </Helmet>
  );
}
