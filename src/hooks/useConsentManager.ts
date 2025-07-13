import { useEffect, useState } from 'react';

interface ConsentState {
  marketing: boolean;
  statistics: boolean;
  preferences: boolean;
  necessary: boolean;
}

declare global {
  interface Window {
    Cookiebot?: {
      consent: ConsentState;
      hasResponse: boolean;
      show: () => void;
      hide: () => void;
    };
    CookiebotCallback_OnAccept?: () => void;
    CookiebotCallback_OnDecline?: () => void;
    CookiebotCallback_OnDialogInit?: () => void;
  }
}

export const useConsentManager = () => {
  const [hasConsent, setHasConsent] = useState(false);
  const [consentLoaded, setConsentLoaded] = useState(false);

  const loadGoogleAnalytics = () => {
    if (typeof window === 'undefined') return;

    // Check if GA is already loaded
    if (window.gtag) return;

    // Create script element for gtag
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-6BG7LRFYFG';
    document.head.appendChild(script);

    // Initialize gtag
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', 'G-6BG7LRFYFG');
      
      console.log('📊 Analytics: Google Analytics loaded after consent');
    };
  };

  const checkConsent = () => {
    if (typeof window === 'undefined' || !window.Cookiebot) return false;
    
    const { Cookiebot } = window;
    
    // Check if user has responded and given statistics consent
    if (Cookiebot.hasResponse && Cookiebot.consent.statistics) {
      return true;
    }
    
    return false;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set up Cookiebot callbacks
    window.CookiebotCallback_OnAccept = () => {
      console.log('🍪 Consent: User accepted cookies');
      const hasStatsConsent = checkConsent();
      setHasConsent(hasStatsConsent);
      
      if (hasStatsConsent) {
        loadGoogleAnalytics();
      }
    };

    window.CookiebotCallback_OnDecline = () => {
      console.log('🍪 Consent: User declined cookies');
      setHasConsent(false);
    };

    window.CookiebotCallback_OnDialogInit = () => {
      console.log('🍪 Consent: Cookiebot dialog initialized');
      setConsentLoaded(true);
      
      // Check if consent was already given
      const hasStatsConsent = checkConsent();
      setHasConsent(hasStatsConsent);
      
      if (hasStatsConsent) {
        loadGoogleAnalytics();
      }
    };

    // Check if Cookiebot is already loaded
    const checkCookiebot = () => {
      if (window.Cookiebot) {
        setConsentLoaded(true);
        const hasStatsConsent = checkConsent();
        setHasConsent(hasStatsConsent);
        
        if (hasStatsConsent) {
          loadGoogleAnalytics();
        }
      } else {
        // Keep checking until Cookiebot loads
        setTimeout(checkCookiebot, 100);
      }
    };

    checkCookiebot();
  }, []);

  return {
    hasConsent,
    consentLoaded,
    showConsentDialog: () => window.Cookiebot?.show?.(),
  };
};
