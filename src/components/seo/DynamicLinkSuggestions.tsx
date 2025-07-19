
import { Helmet } from "react-helmet-async";

interface DynamicLinkSuggestionsProps {
  currentPath: string;
  currentHash: string;
}

// Dynamic internal link suggestions for SEO - no visual component
export const DynamicLinkSuggestions = ({ currentPath, currentHash }: DynamicLinkSuggestionsProps) => {
  const getSuggestedLinks = () => {
    const pathWithoutSlash = currentPath.replace(/^\/+/, '');
    
    // Dynamic link suggestions based on user journey and content relevance
    const linkSuggestions: Record<string, { primary: string[], secondary: string[], related: string[] }> = {
      '': { // homepage
        primary: ['/about', '/services', '/contact'],
        secondary: ['/team', '/process', '/partners'],
        related: ['/testimonials', '/glossary']
      },
      'about': {
        primary: ['/team', '/process', '/services'],
        secondary: ['/partners', '/contact'],
        related: ['/testimonials']
      },
      'services': {
        primary: ['/contact', '/process', '/about'],
        secondary: ['/team', '/partners'],
        related: ['/testimonials', '/glossary']
      },
      'team': {
        primary: ['/about', '/services', '/contact'],
        secondary: ['/process', '/partners'],
        related: ['/testimonials']
      },
      'process': {
        primary: ['/services', '/contact', '/about'],
        secondary: ['/team', '/partners'],
        related: ['/testimonials']
      },
      'partners': {
        primary: ['/services', '/about', '/team'],
        secondary: ['/process', '/contact'],
        related: ['/testimonials']
      },
      'testimonials': {
        primary: ['/services', '/contact', '/team'],
        secondary: ['/about', '/process'],
        related: ['/partners']
      },
      'contact': {
        primary: ['/services', '/about', '/process'],
        secondary: ['/team', '/partners'],
        related: ['/testimonials']
      },
      'glossary': {
        primary: ['/services', '/about'],
        secondary: ['/contact', '/team'],
        related: ['/process', '/partners']
      },
      'mica': {
        primary: ['/services', '/contact', '/about'],
        secondary: ['/glossary', '/process'],
        related: ['/team', '/testimonials']
      }
    };

    // Handle hash-based navigation on homepage
    if (pathWithoutSlash === '' && currentHash) {
      const hashSection = currentHash.replace('#', '');
      return linkSuggestions[hashSection] || linkSuggestions[''];
    }

    return linkSuggestions[pathWithoutSlash] || { primary: [], secondary: [], related: [] };
  };

  const suggestions = getSuggestedLinks();
  
  if (!suggestions.primary.length) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://cointegrity.io${currentPath}`,
    "suggestedContent": [
      ...suggestions.primary.map(path => ({
        "@type": "WebPage",
        "url": `https://cointegrity.io${path}`,
        "name": getPageTitle(path),
        "description": getPageDescription(path),
        "relevanceScore": "high"
      })),
      ...suggestions.secondary.map(path => ({
        "@type": "WebPage", 
        "url": `https://cointegrity.io${path}`,
        "name": getPageTitle(path),
        "description": getPageDescription(path),
        "relevanceScore": "medium"
      })),
      ...suggestions.related.map(path => ({
        "@type": "WebPage",
        "url": `https://cointegrity.io${path}`,
        "name": getPageTitle(path), 
        "description": getPageDescription(path),
        "relevanceScore": "related"
      }))
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Add prefetch hints for suggested content */}
      {suggestions.primary.map(path => (
        <link key={`prefetch-${path}`} rel="prefetch" href={path} />
      ))}
    </Helmet>
  );
};

// Helper functions to get page metadata
const getPageTitle = (path: string): string => {
  const titles: Record<string, string> = {
    '/about': 'About Cointegrity',
    '/services': 'Web3 & Blockchain Services',
    '/team': 'Expert Team',
    '/process': 'Our Process',
    '/partners': 'Industry Partners',
    '/testimonials': 'Client Success Stories',
    '/contact': 'Contact Us',
    '/glossary': 'Web3 Glossary',
    '/mica': 'MiCA-Ready Suite Waitlist'
  };
  return titles[path] || 'Cointegrity';
};

const getPageDescription = (path: string): string => {
  const descriptions: Record<string, string> = {
    '/about': 'Learn about our Web3 consultancy mission',
    '/services': 'Comprehensive blockchain and tokenomics services',
    '/team': 'Meet our Web3 specialists and founders',
    '/process': 'Our proven 4-step Web3 implementation process',
    '/partners': 'Trusted industry partners and collaborations',
    '/testimonials': 'Real success stories from our clients',
    '/contact': 'Get in touch for Web3 consultation',
    '/glossary': 'Complete Web3 and blockchain terminology guide',
    '/mica': 'AI-powered MiCA compliance solutions waitlist'
  };
  return descriptions[path] || 'Leading Web3 consultancy services';
};
