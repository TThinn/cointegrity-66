
import { useEffect } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export const useWebVitals = () => {
  useEffect(() => {
    // Dynamically import web-vitals to avoid blocking
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
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

      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    }).catch(error => {
      console.warn('Web Vitals could not be loaded:', error);
    });
  }, []);
};
