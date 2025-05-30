
import { useEffect } from 'react';
import { useAnalytics } from './useAnalytics';

export const useCoreWebVitals = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVital = (name: string, value: number, id: string) => {
      trackEvent('web_vital', {
        category: 'Performance',
        label: name,
        value: Math.round(value),
        custom_parameter_1: id,
        nonInteraction: true
      });
    };

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any; // LCP-specific entry
          const entryId = lastEntry.element?.tagName || `lcp-${Date.now()}`;
          trackWebVital('LCP', lastEntry.startTime, entryId);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }
    };

    // First Input Delay (FID)
    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            const entryId = entry.name || `fid-${Date.now()}`;
            trackWebVital('FID', entry.processingStart - entry.startTime, entryId);
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      }
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          trackWebVital('CLS', clsValue, 'cls-session');
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    };

    // Time to First Byte (TTFB)
    const observeTTFB = () => {
      if ('navigation' in performance) {
        const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navEntry) {
          const ttfb = navEntry.responseStart - navEntry.requestStart;
          trackWebVital('TTFB', ttfb, 'navigation');
        }
      }
    };

    observeLCP();
    observeFID();
    observeCLS();
    observeTTFB();

    // Cleanup function
    return () => {
      // Performance observers are automatically cleaned up
    };
  }, [trackEvent]);
};
