import { Helmet } from "react-helmet-async";

// Simplified performance optimization
export const PerformanceOptimization = () => {
  return (
    <Helmet>
      {/* Essential resource hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Basic cache control */}
      <meta httpEquiv="Cache-Control" content="public, max-age=3600" />
      
      {/* Build timestamp for cache busting */}
      <meta name="build-timestamp" content={process.env.BUILD_TIMESTAMP || ''} />
      
      {/* Theme color */}
      <meta name="theme-color" content="#133a63" />
    </Helmet>
  );
};
