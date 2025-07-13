import { useEffect } from 'react';
import { useConsentManager } from '@/hooks/useConsentManager';

/**
 * ConsentManager component handles the integration with Cookiebot
 * and manages Google Analytics loading based on user consent
 */
export const ConsentManager = () => {
  const { hasConsent, consentLoaded } = useConsentManager();

  useEffect(() => {
    console.log('🍪 Consent Manager: Status', { hasConsent, consentLoaded });
  }, [hasConsent, consentLoaded]);

  // This component doesn't render anything visible
  return null;
};