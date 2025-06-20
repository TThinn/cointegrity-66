
import { Helmet } from "react-helmet-async";

// Performance optimization meta tags and hints - Phase 2 implementation
export const PerformanceOptimization = () => {
  return (
    <Helmet>
      {/* Critical resource hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
      
      {/* Prefetch next likely pages */}
      <link rel="prefetch" href="/about" />
      <link rel="prefetch" href="/services" />
      <link rel="prefetch" href="/contact" />
      
      {/* Optimize loading behavior */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* PHASE 2: Smart cache control - balance performance and freshness */}
      <meta httpEquiv="Cache-Control" content="public, max-age=1800, stale-while-revalidate=3600" />
      <meta httpEquiv="Pragma" content="no-cache" />
      
      {/* Add cache invalidation hint with build timestamp */}
      <meta name="build-timestamp" content={process.env.BUILD_TIMESTAMP || ''} />
      
      {/* Optimize viewport and rendering */}
      <meta name="theme-color" content="#133a63" />
      <meta name="msapplication-TileColor" content="#133a63" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Optimize font loading */}
      <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
      
      {/* Resource timing API enablement */}
      <meta name="resource-timing" content="enabled" />
      
      {/* Critical CSS inline hint */}
      <meta name="critical-css" content="inline" />
    </Helmet>
  );
};
