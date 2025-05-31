
import { Helmet } from "react-helmet-async";

export const ResourceHints = () => {
  return (
    <Helmet>
      {/* DNS prefetch for third-party domains */}
      <link rel="dns-prefetch" href="//www.google.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect to critical third-party origins */}
      <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
      <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Preload critical resources */}
      <link 
        rel="preload" 
        href="/lovable-uploads/4154e717-451c-4f01-9cf6-8117a4fa0149.png" 
        as="image" 
        type="image/png"
      />
      
      {/* Module preload for critical JS */}
      <link rel="modulepreload" href="/src/main.tsx" />
      <link rel="modulepreload" href="/src/App.tsx" />
    </Helmet>
  );
};
