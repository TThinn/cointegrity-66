
// Security headers configuration for client-side protection

export const initializeSecurityHeaders = () => {
  // Set Content Security Policy meta tag if not already present
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://consent.cookiebot.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https: blob:;
      connect-src 'self' https://eofxxvsfyvwqjyattgbn.supabase.co wss://eofxxvsfyvwqjyattgbn.supabase.co;
      frame-src 'self' https://www.google.com https://consent.cookiebot.com;
      media-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
    `.replace(/\s+/g, ' ').trim();
    document.head.appendChild(cspMeta);
  }

  // Add additional security meta tags
  const securityMetas = [
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
    { httpEquiv: 'X-Frame-Options', content: 'SAMEORIGIN' }, // Changed from DENY to allow Cookiebot
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

// Optimized security event monitoring with better filtering
export const initializeSecurityMonitoring = () => {
  // Check if user is a crawler - skip monitoring entirely for crawlers
  const userAgent = navigator.userAgent?.toLowerCase() || '';
  const isCrawler = ['bot', 'crawler', 'spider', 'nightwatch', 'googlebot', 'bingbot'].some(term => 
    userAgent.includes(term)
  );
  
  if (isCrawler) {
    return () => {}; // No-op cleanup for crawlers
  }

  let mutationCount = 0;
  const MAX_MUTATIONS_PER_MINUTE = 100;
  
  // Reset mutation counter every minute
  setInterval(() => {
    mutationCount = 0;
  }, 60000);

  // Monitor for suspicious DOM manipulation with better filtering
  const observer = new MutationObserver((mutations) => {
    mutationCount++;
    
    // Stop monitoring if too many mutations (prevents performance issues)
    if (mutationCount > MAX_MUTATIONS_PER_MINUTE) {
      return;
    }

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          
          // Whitelist legitimate services
          const isLegitimate = 
            element.hasAttribute('data-approved') ||
            element.hasAttribute('isCookiebotDynamicTag') ||
            element.className?.includes('cookiebot') ||
            element.id?.includes('cookiebot') ||
            element.getAttribute('src')?.includes('cookiebot.com') ||
            element.getAttribute('src')?.includes('google.com') ||
            element.getAttribute('src')?.includes('gstatic.com');
          
          if (isLegitimate) {
            return; // Skip security checks for whitelisted elements
          }
          
          // Check for suspicious script injection (more targeted)
          if (element.tagName === 'SCRIPT') {
            const src = element.getAttribute('src');
            const isExternal = src && !src.startsWith('/') && !src.includes(window.location.hostname);
            const hasInlineCode = element.textContent && element.textContent.trim().length > 0;
            
            if (isExternal && hasInlineCode) {
              console.warn('[Security] Potentially suspicious script:', element);
              // Don't automatically remove - just log for now
            }
          }
          
          // Check for suspicious iframe injection (more targeted)
          if (element.tagName === 'IFRAME') {
            const src = element.getAttribute('src');
            const isDataUrl = src?.startsWith('data:');
            const isSuspiciousOrigin = src && !src.includes(window.location.hostname) && 
              !src.includes('google.com') && !src.includes('cookiebot.com');
            
            if (isDataUrl || (isSuspiciousOrigin && !element.hasAttribute('data-approved'))) {
              console.warn('[Security] Potentially suspicious iframe:', element);
              // Don't automatically remove - just log for now
            }
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Simplified console monitoring (reduced overhead)
  const originalConsole = console.error;
  console.error = (...args: any[]) => {
    // Call original first
    originalConsole(...args);
    
    // Only check for obviously malicious patterns
    if (args.some(arg => 
      typeof arg === 'string' && 
      (arg.includes('document.cookie=') || arg.includes('eval(')) // More specific patterns
    )) {
      console.warn('[Security] Suspicious console activity detected');
    }
  };

  // Cleanup function
  return () => {
    observer.disconnect();
    console.error = originalConsole;
  };
};
