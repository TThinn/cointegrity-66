
import { useEffect } from 'react';

export const ResourceHints = () => {
  useEffect(() => {
    const addResourceHint = (rel: string, href: string, as?: string) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.as = as;
      document.head.appendChild(link);
    };

    // Preconnect to external domains
    addResourceHint('preconnect', 'https://www.google.com');
    addResourceHint('preconnect', 'https://www.googletagmanager.com');
    addResourceHint('preconnect', 'https://fonts.googleapis.com');
    addResourceHint('preconnect', 'https://fonts.gstatic.com');

    // DNS prefetch for other domains
    addResourceHint('dns-prefetch', 'https://www.recaptcha.net');
  }, []);

  return null;
};
