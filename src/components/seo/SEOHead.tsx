import React, { useEffect } from 'react';
import { QRTypeConfig } from '../../data/qrTypeConfigs';

interface SEOHeadProps {
  config: QRTypeConfig;
  canonicalBaseUrl?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  config,
  canonicalBaseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://the-qr-code-generate.vercel.app',
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = `${config.metaTitle} | The QR Code Generate`;

    // 2. Helper to set or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 3. Meta Description & Robots
    setMeta('description', config.metaDescription);
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // 4. Open Graph Tags
    const fullCanonical = `${canonicalBaseUrl}${config.route}`;
    setMeta('og:title', `${config.title} – Free & Fast`, true);
    setMeta('og:description', config.metaDescription, true);
    setMeta('og:url', fullCanonical, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'The QR Code Generate', true);

    // 5. Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', config.metaTitle);
    setMeta('twitter:description', config.metaDescription);

    // 6. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonical);

    // 7. Inject JSON-LD Schema (WebPage, BreadcrumbList, and FAQPage)
    const scriptId = 'jsonld-qr-type-schema';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${fullCanonical}#webpage`,
          url: fullCanonical,
          name: config.metaTitle,
          description: config.metaDescription,
          breadcrumb: {
            '@id': `${fullCanonical}#breadcrumb`,
          },
          inLanguage: 'en-US',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${fullCanonical}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: canonicalBaseUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'QR Code Generators',
              item: `${canonicalBaseUrl}/#generators`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: config.breadcrumbLabel,
              item: fullCanonical,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${fullCanonical}#faq`,
          mainEntity: config.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    };

    scriptEl.textContent = JSON.stringify(schemaData);

    return () => {
      // Clean up JSON-LD on unmount if navigating
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [config, canonicalBaseUrl]);

  return null;
};
