/**
 * Advanced performance optimization utilities
 */

// Image optimization constants
export const IMAGE_BREAKPOINTS = [320, 640, 768, 1024, 1280, 1920] as const;
export const IMAGE_FORMATS = ['webp', 'avif', 'png', 'jpg'] as const;

// Bundle splitting configuration
export const CHUNK_PRIORITIES = {
  critical: ['index', 'header', 'hero'],
  high: ['services', 'testimonials', 'footer'],
  medium: ['glossary', 'mica', 'founders'],
  low: ['blog', 'guides', 'case-studies']
} as const;

/**
 * Lazy load images with intersection observer
 */
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });

    return () => imageObserver.disconnect();
  }
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png', // Logo
    '/fonts/inter-var.woff2' // Main font
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    if (resource.includes('.woff2')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = '';
    } else if (resource.includes('.png') || resource.includes('.jpg') || resource.includes('.webp')) {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
};

/**
 * Optimize images based on device characteristics
 */
export const getOptimalImageSize = (containerWidth: number, devicePixelRatio: number = 1): number => {
  const targetWidth = containerWidth * devicePixelRatio;
  return IMAGE_BREAKPOINTS.find(width => width >= targetWidth) || IMAGE_BREAKPOINTS[IMAGE_BREAKPOINTS.length - 1];
};

/**
 * Generate responsive image srcset
 */
export const generateResponsiveSourceSet = (
  basePath: string, 
  format: string = 'webp',
  quality: number = 80
): string => {
  return IMAGE_BREAKPOINTS
    .map(width => {
      const url = new URL(basePath, window.location.origin);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('format', format);
      return `${url.toString()} ${width}w`;
    })
    .join(', ');
};

/**
 * Setup performance monitoring
 */
export const initPerformanceMonitoring = () => {
  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('LCP:', entry);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('FID:', entry);
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          console.log('CLS:', entry);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Monitor resource loading
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    console.log('Performance metrics:', {
      DOMContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
      LoadComplete: perfData.loadEventEnd - perfData.loadEventStart,
      FirstByte: perfData.responseStart - perfData.requestStart,
      DNSLookup: perfData.domainLookupEnd - perfData.domainLookupStart
    });
  });
};

/**
 * Optimize font loading
 */
export const optimizeFontLoading = () => {
  // Add font-display: swap to improve text rendering
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url('/fonts/inter-var.woff2') format('woff2');
    }
  `;
  document.head.appendChild(style);
};

/**
 * Setup advanced caching strategy
 */
export const setupAdvancedCaching = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    }).then((registration) => {
      console.log('Service Worker registered:', registration);
      
      // Check for updates every 24 hours
      setInterval(() => {
        registration.update();
      }, 24 * 60 * 60 * 1000);
    }).catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
  }
};

/**
 * Minimize main thread blocking
 */
export const scheduleNonCriticalTasks = (tasks: (() => void)[]): void => {
  const runTasks = () => {
    if (tasks.length === 0) return;
    
    const task = tasks.shift();
    if (task) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          task();
          runTasks();
        }, { timeout: 1000 });
      } else {
        setTimeout(() => {
          task();
          runTasks();
        }, 16);
      }
    }
  };
  
  runTasks();
};