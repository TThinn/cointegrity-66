
import { Helmet } from "react-helmet-async";

// Internal linking recommendations for SEO - no visual component
export const InternalLinkingStructuredData = ({ currentPath }: { currentPath: string }) => {
  const getRelatedPages = () => {
    const pathWithoutSlash = currentPath.replace(/^\/+/, '');
    
    // Define related page relationships for better internal linking SEO
    const linkingMap: Record<string, string[]> = {
      'about': ['/services', '/team', '/process'],
      'services': ['/about', '/contact', '/process', '/partners'],
      'team': ['/about', '/services', '/testimonials'],
      'process': ['/services', '/about', '/contact'],
      'partners': ['/services', '/about', '/team'],
      'testimonials': ['/services', '/team', '/contact'],
      'contact': ['/services', '/about', '/process'],
      'glossary': ['/services', '/about'],
      '': ['/about', '/services', '/contact'] // homepage
    };
    
    return linkingMap[pathWithoutSlash] || [];
  };

  const relatedPages = getRelatedPages();
  
  if (relatedPages.length === 0) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://cointegrity.io${currentPath}`,
    "relatedLink": relatedPages.map(path => `https://cointegrity.io${path}`),
    "significantLink": relatedPages.map(path => `https://cointegrity.io${path}`),
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://cointegrity.io/#organization"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
