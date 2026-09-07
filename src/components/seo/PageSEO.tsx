import React, { useEffect } from 'react';

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
}

export const PageSEO: React.FC<PageSEOProps> = ({ title, description, path }) => {
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${path}`;
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(property ? 'property' : 'name', name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMeta('description', description);
    setMeta('robots', 'index, follow');
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'The QR Code Generate', true);
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [description, path, title]);

  return null;
};