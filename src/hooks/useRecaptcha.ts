
import { useEffect } from 'react';

const RECAPTCHA_SITE_KEY = "6Lc_BCMrAAAAAAJ53CbmGbCdpq1plgfqyOJjInN1";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: {
        action: string;
      }) => Promise<string>;
    };
  }
}

export const useRecaptcha = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const getToken = async () => {
    return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
      action: 'submit'
    });
  };

  return { getToken };
};
