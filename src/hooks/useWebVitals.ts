
import React from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export const useWebVitals = () => {
  React.useEffect(() => {
    // Dynamically import web-vitals to avoid blocking
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const sendToAnalytics = (metric: WebVitalsMetric) => {
        if (window.gtag) {
          window.gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
            custom_map: {
              metric_rating: metric.rating
            }
          });
        }
        
        console.log(`🔍 Web Vitals: ${metric.name}`, {
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta
        });
      };

      // Use the correct functions for web-vitals v3+
      onCLS(sendToAnalytics);
      onINP(sendToAnalytics); // INP replaced FID in web-vitals v3+
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
    }).catch(error => {
      console.warn('Web Vitals could not be loaded:', error);
    });
  }, []);
};
