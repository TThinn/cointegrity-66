
/**
 * Performance optimization headers and directives
 */

export interface PerformanceDirectives {
  preload: Array<{
    href: string;
    as: string;
    type?: string;
    crossorigin?: string;
  }>;
  prefetch: Array<{
    href: string;
    as?: string;
  }>;
  preconnect: Array<{
    href: string;
    crossorigin?: string;
  }>;
  dns_prefetch: string[];
}

export const getPerformanceDirectives = (currentPath: string): PerformanceDirectives => {
  const baseDirectives: PerformanceDirectives = {
    preload: [
      {
        href: "/lovable-uploads/4154e717-451c-4f01-9cf6-8117a4fa0149.png",
        as: "image",
        type: "image/png"
      },
      {
        href: "/src/main.tsx",
        as: "script"
      }
    ],
    prefetch: [
      { href: "/services", as: "document" },
      { href: "/contact", as: "document" },
      { href: "/testimonials", as: "document" }
    ],
    preconnect: [
      { href: "https://fonts.googleapis.com", crossorigin: "" },
      { href: "https://fonts.gstatic.com", crossorigin: "" }
    ],
    dns_prefetch: [
      "//www.google.com",
      "//www.googletagmanager.com",
      "//fonts.googleapis.com"
    ]
  };

  // Add path-specific optimizations
  if (currentPath === "/services") {
    baseDirectives.preload.push({
      href: "/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png",
      as: "image", 
      type: "image/png"
    });
  }

  return baseDirectives;
};

/**
 * Generate CSP (Content Security Policy) directives for security and performance
 */
export const generateCSPDirectives = (): Record<string, string[]> => {
  return {
    "default-src": ["'self'"],
    "script-src": [
      "'self'", 
      "'unsafe-inline'", 
      "https://www.googletagmanager.com",
      "https://www.google.com",
      "https://cdn.gpteng.co"
    ],
    "style-src": [
      "'self'", 
      "'unsafe-inline'", 
      "https://fonts.googleapis.com"
    ],
    "img-src": [
      "'self'", 
      "data:", 
      "https://cointegrity.io",
      "https://www.google.com"
    ],
    "font-src": [
      "'self'", 
      "https://fonts.gstatic.com"
    ],
    "connect-src": [
      "'self'",
      "https://www.google-analytics.com"
    ],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"]
  };
};

/**
 * Generate cache control headers
 */
export const getCacheControlHeaders = (resourceType: string): string => {
  const cacheHeaders: Record<string, string> = {
    "static": "public, max-age=31536000, immutable", // 1 year for static assets
    "html": "public, max-age=3600, must-revalidate", // 1 hour for HTML
    "api": "no-cache, must-revalidate", // No cache for API responses
    "images": "public, max-age=604800", // 1 week for images
    "fonts": "public, max-age=31536000, crossorigin" // 1 year for fonts
  };
  
  return cacheHeaders[resourceType] || "public, max-age=3600";
};
