
type EventOptions = {
  category?: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: any;
};

export const useAnalytics = () => {
  /**
   * Track a page view with Google Analytics
   * @param path - The page path
   * @param title - The page title
   */
  const pageView = (path: string, title?: string) => {
    if (!window.gtag) return;
    
    window.gtag('config', 'G-6BG7LRFYFG', {
      page_path: path,
      page_title: title
    });

    console.log(`📊 Analytics: Page view - ${path}`);
  };

  /**
   * Track an event with Google Analytics
   * @param action - The action name
   * @param options - Additional event parameters
   */
  const trackEvent = (action: string, options: EventOptions = {}) => {
    if (!window.gtag) return;
    
    window.gtag('event', action, {
      event_category: options.category || 'general',
      event_label: options.label,
      value: options.value,
      non_interaction: options.nonInteraction || false,
      ...options
    });

    console.log(`📊 Analytics: Event - ${action}`, options);
  };

  /**
   * Track a conversion
   * @param action - The conversion action
   * @param id - Optional conversion ID
   * @param options - Additional conversion parameters
   */
  const trackConversion = (action: string, id?: string, options: EventOptions = {}) => {
    if (!window.gtag) return;
    
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
