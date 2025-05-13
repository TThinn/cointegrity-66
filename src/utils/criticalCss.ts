
/**
 * Critical CSS extraction and management utilities
 */

/**
 * Extracts critical CSS rules from a page
 * @returns String of critical CSS
 */
export const extractCriticalCss = (): string => {
  if (typeof document === 'undefined') return '';

  const criticalStyles: string[] = [];
  
  // Get all stylesheets
  const stylesheets = Array.from(document.styleSheets);
  
  try {
    // Extract rules that apply to elements above the fold
    stylesheets.forEach(stylesheet => {
      // Skip external stylesheets due to CORS restrictions
      if (!stylesheet.href || stylesheet.href.startsWith(window.location.origin)) {
        try {
          const rules = Array.from(stylesheet.cssRules || []);
          rules.forEach(rule => {
            const selectorText = (rule as CSSStyleRule).selectorText;
            if (selectorText) {
              // Check if the selector applies to any element in the viewport
              try {
                const elements = document.querySelectorAll(selectorText);
                if (elements.length > 0) {
                  // Check if any of these elements are in the viewport (above the fold)
                  const isVisible = Array.from(elements).some(el => {
                    const rect = el.getBoundingClientRect();
                    return rect.top < window.innerHeight;
                  });
                  
                  if (isVisible) {
                    criticalStyles.push(rule.cssText);
                  }
                }
              } catch (e) {
                // Invalid selector, skip
              }
            } else {
              // Include non-selector rules (like @font-face)
              criticalStyles.push(rule.cssText);
            }
          });
        } catch (e) {
          // CORS error or other issue, skip this stylesheet
        }
      }
    });
    
    return criticalStyles.join('\n');
  } catch (e) {
    console.error('Error extracting critical CSS:', e);
    return '';
  }
};

/**
 * Injects critical CSS into the head of the document
 * @param css The critical CSS to inject
 */
export const injectCriticalCss = (css: string): void => {
  if (!css || typeof document === 'undefined') return;
  
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('data-critical', 'true');
  style.textContent = css;
  
  // Add to head
  document.head.appendChild(style);
};

/**
 * Defers loading of non-critical CSS
 * @param cssUrls Array of CSS URLs to load
 */
export const deferNonCriticalCss = (cssUrls: string[]): void => {
  if (!cssUrls.length || typeof document === 'undefined') return;
  
  cssUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.media = 'print'; // Set to print initially
    
    // Add to document
    document.head.appendChild(link);
    
    // Once loaded, switch to all media
    link.onload = () => {
      link.media = 'all';
    };
  });
};

/**
 * Initialize critical CSS optimization
 */
export const initCriticalCssOptimization = (): void => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;
  
  // Detect if this is the first page load
  const isInitialLoad = !window.performance.navigation.type;
  
  if (isInitialLoad) {
    // Extract and inject critical CSS
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const criticalCss = extractCriticalCss();
        injectCriticalCss(criticalCss);
        
        // Store in sessionStorage for future navigations
        try {
          sessionStorage.setItem('criticalCss', criticalCss);
        } catch (e) {
          // Session storage may be unavailable
        }
      }, 0);
    });
  } else {
    // Try to use previously extracted critical CSS
    try {
      const storedCss = sessionStorage.getItem('criticalCss');
      if (storedCss) {
        injectCriticalCss(storedCss);
      }
    } catch (e) {
      // Session storage may be unavailable
    }
  }
};
