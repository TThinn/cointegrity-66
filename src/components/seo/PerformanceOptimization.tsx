
import { Helmet } from "react-helmet-async";

// Performance optimization meta tags and hints - no visual component
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
      
      {/* FIXED: More reasonable cache control - prevent aggressive caching */}
      <meta httpEquiv="Cache-Control" content="public, max-age=3600, must-revalidate" />
      
      {/* Optimize viewport and rendering */}
      <meta name="theme-color" content="#133a63" />
      <meta name="msapplication-TileColor" content="#133a63" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Optimize font loading */}
      <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
      
      {/* Resource timing API enablement */}
      <meta name="resource-timing" content="enabled" />
    </Helmet>
  );
};

