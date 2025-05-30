
import { useEffect } from 'react';

export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Critical rendering path optimization
    const optimizeCriticalPath = () => {
      // Defer non-critical CSS
      const deferCSS = () => {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link: any) => {
          if (!link.hasAttribute('data-critical')) {
            link.media = 'print';
            link.onload = () => {
              link.media = 'all';
            };
          }
        });
      };

      // Optimize font loading
      const optimizeFonts = () => {
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach((link: any) => {
          link.setAttribute('rel', 'preload');
          link.setAttribute('as', 'style');
          link.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
        });
      };

      // Lazy load images below the fold
      const lazyLoadImages = () => {
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                  observer.unobserve(img);
                }
              }
            });
          });

          document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
          });
        }
      };

      deferCSS();
      optimizeFonts();
      lazyLoadImages();
    };

    // Add performance monitoring
    const monitorPerformance = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Log slow resources
            if (entry.duration > 1000) {
              console.warn('Slow resource detected:', entry.name, 'Duration:', entry.duration);
            }
          });
        });
        observer.observe({ entryTypes: ['resource'] });
      }
    };

    optimizeCriticalPath();
    monitorPerformance();

    // Add content freshness indicators
    const addFreshnessIndicators = () => {
      const lastModified = document.lastModified;
      console.log('Page last modified:', lastModified);
      
      // Could add this to analytics for content freshness tracking
      if (window.gtag) {
        window.gtag('event', 'content_freshness', {
          'last_modified': lastModified,
          'page_location': window.location.href
        });
      }
    };

    addFreshnessIndicators();
  }, []);
};
