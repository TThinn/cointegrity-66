
import { useEffect, useState } from 'react';

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if reCAPTCHA script is already loaded
    if (window.grecaptcha) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    
    script.onload = () => {
      window.grecaptcha.ready(() => {
        setIsLoaded(true);
      });
    };
    
    document.body.appendChild(script);

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const getToken = async () => {
    if (!isLoaded) {
      console.log('reCAPTCHA not loaded yet');
      return '';
    }
    
    try {
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: 'submit'
      });
    } catch (error) {
      console.error('Error getting reCAPTCHA token:', error);
      return '';
    }
  };

  return { getToken, isLoaded };
};
