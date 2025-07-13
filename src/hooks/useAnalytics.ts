
type EventOptions = {
  category?: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: any;
};

export const useAnalytics = () => {
  const checkConsent = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Check if Cookiebot exists and user has given statistics consent
    return window.Cookiebot?.hasResponse && window.Cookiebot?.consent.statistics || false;
  };

  /**
   * Track a page view with Google Analytics (with consent checks)
   * @param path - The page path
   * @param title - The page title
   */
  const pageView = (path: string, title?: string) => {
    // Check consent first
    if (!checkConsent()) {
      console.warn('📊 Analytics: No consent for statistics, skipping page view');
      return;
    }

    // Safety check for gtag availability
    if (typeof window === 'undefined' || !window.gtag) {
      console.warn('📊 Analytics: gtag not available, skipping page view');
      return;
    }
    
    try {
      window.gtag('config', 'G-6BG7LRFYFG', {
        page_path: path,
        page_title: title
      });

      console.log(`📊 Analytics: Page view tracked - ${path}`);
    } catch (error) {
      console.error('📊 Analytics: Page view tracking failed:', error);
    }
  };

  /**
   * Track an event with Google Analytics (with consent checks)
   * @param action - The action name
   * @param options - Additional event parameters
   */
  const trackEvent = (action: string, options: EventOptions = {}) => {
    // Check consent first
    if (!checkConsent()) {
      console.warn('📊 Analytics: No consent for statistics, skipping event');
      return;
    }

    // Safety check for gtag availability
    if (typeof window === 'undefined' || !window.gtag) {
      console.warn('📊 Analytics: gtag not available, skipping event');
      return;
    }
    
    try {
      window.gtag('event', action, {
        event_category: options.category || 'general',
        event_label: options.label,
        value: options.value,
        non_interaction: options.nonInteraction || false,
        ...options
      });

      console.log(`📊 Analytics: Event tracked - ${action}`, options);
    } catch (error) {
      console.error('📊 Analytics: Event tracking failed:', error);
    }
  };

  /**
   * Track a conversion (with consent checks)
   * @param action - The conversion action
   * @param id - Optional conversion ID
   * @param options - Additional conversion parameters
   */
  const trackConversion = (action: string, id?: string, options: EventOptions = {}) => {
    // Check consent first
    if (!checkConsent()) {
      console.warn('📊 Analytics: No consent for statistics, skipping conversion');
      return;
    }

    // Safety check for gtag availability
    if (typeof window === 'undefined' || !window.gtag) {
      console.warn('📊 Analytics: gtag not available, skipping conversion');
      return;
    }
    
    try {
      // Track both as an event and potentially as a conversion
      trackEvent(action, {
        category: 'conversion',
        ...options
      });
      
      // If there's a specific conversion ID, track it as such
      if (id) {
        window.gtag('event', 'conversion', {
          send_to: `G-6BG7LRFYFG/${id}`,
          ...options
        });
        
        console.log(`📊 Analytics: Conversion tracked - ${action} (ID: ${id})`);
      }
    } catch (error) {
      console.error('📊 Analytics: Conversion tracking failed:', error);
    }
  };

  return {
    pageView,
    trackEvent,
    trackConversion
  };
};

// Add TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}
