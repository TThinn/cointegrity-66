import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

interface AdvancedPerformanceOptimizationProps {
  priority?: boolean;
  page?: string;
}

export const AdvancedPerformanceOptimization = ({ 
  priority = false, 
  page = "home" 
}: AdvancedPerformanceOptimizationProps) => {
  
  useEffect(() => {
    // Preload critical resources for next likely navigation
    const preloadNextPage = () => {
      if (page === "home") {
        // Preload glossary and MiCA pages as they're commonly visited from home
        const glossaryLink = document.createElement('link');
        glossaryLink.rel = 'prefetch';
        glossaryLink.href = '/glossary';
        document.head.appendChild(glossaryLink);
        
        const micaLink = document.createElement('link');
        micaLink.rel = 'prefetch';
        micaLink.href = '/mica-ready-waitlist';
        document.head.appendChild(micaLink);
      }
    };

    // Delay non-critical preloading
    const timer = setTimeout(preloadNextPage, 2000);
    return () => clearTimeout(timer);
  }, [page]);

  const buildTimestamp = process.env.NODE_ENV === 'production' 
    ? new Date().toISOString() 
    : 'dev';

  return (
    <Helmet>
      {/* Essential DNS and connection preloads */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
      
      {/* Optimized cache control */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
      
      {/* Enhanced security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Performance optimization hints */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Build versioning for cache busting */}
      <meta name="build-timestamp" content={buildTimestamp} />
      <meta name="cache-version" content="v2.1.0" />
      
      {/* Theme and viewport optimization */}
      <meta name="theme-color" content="#010822" />
      <meta name="msapplication-TileColor" content="#010822" />
      <meta name="color-scheme" content="dark light" />
      
      {/* Resource hints based on priority */}
      {priority && (
        <>
          <link rel="preload" href="/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png" as="image" type="image/png" />
          <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
        </>
      )}
      
      {/* Service Worker registration hint */}
      <meta name="serviceWorker" content="/sw.js" />
    </Helmet>
  );
};