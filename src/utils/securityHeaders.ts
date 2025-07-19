// Security headers configuration for client-side protection

export const initializeSecurityHeaders = () => {
  // Set Content Security Policy meta tag if not already present
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https: blob:;
      connect-src 'self' https://eofxxvsfyvwqjyattgbn.supabase.co wss://eofxxvsfyvwqjyattgbn.supabase.co;
      frame-src 'self' https://www.google.com;
      media-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim();
    document.head.appendChild(cspMeta);
  }

  // Add additional security meta tags
  const securityMetas = [
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
    { httpEquiv: 'X-Frame-Options', content: 'DENY' },
    { httpEquiv: 'X-XSS-Protection', content: '1; mode=block' },
    { httpEquiv: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
    { httpEquiv: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=(), payment=()' }
  ];

  securityMetas.forEach(({ httpEquiv, content }) => {
    if (!document.querySelector(`meta[http-equiv="${httpEquiv}"]`)) {
      const meta = document.createElement('meta');
      meta.httpEquiv = httpEquiv;
      meta.content = content;
      document.head.appendChild(meta);
    }
  });
};

// Security event monitoring
export const initializeSecurityMonitoring = () => {
  // Monitor for suspicious DOM manipulation
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          
          // Check for suspicious script injection
          if (element.tagName === 'SCRIPT' && !element.getAttribute('data-approved')) {
            console.warn('[Security] Unauthorized script injection detected:', element);
            element.remove();
          }
          
          // Check for suspicious iframe injection
          if (element.tagName === 'IFRAME' && !element.getAttribute('data-approved')) {
            console.warn('[Security] Unauthorized iframe injection detected:', element);
            element.remove();
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Monitor for console manipulation attempts
  const originalConsole = { ...console };
  Object.keys(console).forEach((key) => {
    if (typeof console[key as keyof Console] === 'function') {
      (console as any)[key] = (...args: any[]) => {
        // Log to original console
        (originalConsole as any)[key](...args);
        
        // Check for suspicious console usage patterns (skip for crawlers)
        if (key === 'log' && 
            !navigator.userAgent?.toLowerCase().includes('bot') &&
            !navigator.userAgent?.toLowerCase().includes('crawler') &&
            args.some(arg => 
              typeof arg === 'string' && 
              (arg.includes('document.cookie') || arg.includes('localStorage') || arg.includes('sessionStorage'))
            )) {
          console.warn('[Security] Suspicious console activity detected');
        }
      };
    }
  });

  // Prevent common attacks
  window.addEventListener('beforeunload', (event) => {
    // Clear sensitive data on page unload
    try {
      sessionStorage.removeItem('temp-form-data');
    } catch (error) {
      // Silent fail for security
    }
  });

  return () => {
    observer.disconnect();
  };
};