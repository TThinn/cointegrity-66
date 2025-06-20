
import { Helmet } from "react-helmet-async";

interface RelatedContentRecommendationsProps {
  currentPath: string;
  currentHash: string;
}

// Related content recommendations for enhanced SEO - no visual component
export const RelatedContentRecommendations = ({ currentPath, currentHash }: RelatedContentRecommendationsProps) => {
  const getRelatedContent = () => {
    const pathWithoutSlash = currentPath.replace(/^\/+/, '');
    
    // Content relationship mapping for better topic clustering
    const contentRelationships: Record<string, {
      topics: string[];
      relatedPages: Array<{
        url: string;
        title: string;
        relevance: 'high' | 'medium' | 'low';
        contentType: 'service' | 'about' | 'team' | 'process' | 'testimonial' | 'resource';
      }>;
    }> = {
      '': {
        topics: ['Web3 Consultancy', 'Blockchain Strategy', 'Tokenomics', 'Regulatory Compliance'],
        relatedPages: [
          { url: '/services', title: 'Our Web3 Services', relevance: 'high', contentType: 'service' },
          { url: '/about', title: 'About Our Mission', relevance: 'high', contentType: 'about' },
          { url: '/process', title: 'Implementation Process', relevance: 'medium', contentType: 'process' }
        ]
      },
      'about': {
        topics: ['Company Mission', 'Web3 Expertise', 'Blockchain Innovation'],
        relatedPages: [
          { url: '/team', title: 'Meet Our Experts', relevance: 'high', contentType: 'team' },
          { url: '/services', title: 'Our Capabilities', relevance: 'high', contentType: 'service' },
          { url: '/process', title: 'Our Methodology', relevance: 'medium', contentType: 'process' }
        ]
      },
      'services': {
        topics: ['Strategic Positioning', 'Tokenomics Design', 'Regulatory Compliance', 'Capital Acceleration'],
        relatedPages: [
          { url: '/process', title: 'Implementation Process', relevance: 'high', contentType: 'process' },
          { url: '/team', title: 'Service Experts', relevance: 'high', contentType: 'team' },
          { url: '/testimonials', title: 'Success Stories', relevance: 'medium', contentType: 'testimonial' },
          { url: '/glossary', title: 'Web3 Terminology', relevance: 'low', contentType: 'resource' }
        ]
      },
      'team': {
        topics: ['Leadership', 'Web3 Expertise', 'Industry Experience'],
        relatedPages: [
          { url: '/about', title: 'Company Background', relevance: 'high', contentType: 'about' },
          { url: '/services', title: 'Team Capabilities', relevance: 'high', contentType: 'service' },
          { url: '/testimonials', title: 'Client Feedback', relevance: 'medium', contentType: 'testimonial' }
        ]
      },
      'process': {
        topics: ['Methodology', 'Implementation', 'Web3 Strategy', 'Project Management'],
        relatedPages: [
          { url: '/services', title: 'Service Details', relevance: 'high', contentType: 'service' },
          { url: '/testimonials', title: 'Process Results', relevance: 'high', contentType: 'testimonial' },
          { url: '/team', title: 'Process Experts', relevance: 'medium', contentType: 'team' }
        ]
      },
      'partners': {
        topics: ['Industry Partnerships', 'Collaboration', 'Web3 Ecosystem'],
        relatedPages: [
          { url: '/services', title: 'Partnership Services', relevance: 'high', contentType: 'service' },
          { url: '/about', title: 'Partnership Philosophy', relevance: 'medium', contentType: 'about' },
          { url: '/team', title: 'Partnership Team', relevance: 'medium', contentType: 'team' }
        ]
      },
      'testimonials': {
        topics: ['Success Stories', 'Client Results', 'Case Studies'],
        relatedPages: [
          { url: '/services', title: 'Related Services', relevance: 'high', contentType: 'service' },
          { url: '/process', title: 'How We Deliver', relevance: 'high', contentType: 'process' },
          { url: '/team', title: 'Meet the Team', relevance: 'medium', contentType: 'team' }
        ]
      },
      'contact': {
        topics: ['Consultation', 'Web3 Planning', 'Project Inquiry'],
        relatedPages: [
          { url: '/services', title: 'Available Services', relevance: 'high', contentType: 'service' },
          { url: '/process', title: 'How We Work', relevance: 'high', contentType: 'process' },
          { url: '/about', title: 'Why Choose Us', relevance: 'medium', contentType: 'about' }
        ]
      },
      'glossary': {
        topics: ['Web3 Education', 'Blockchain Terms', 'Industry Knowledge'],
        relatedPages: [
          { url: '/services', title: 'Applied Services', relevance: 'high', contentType: 'service' },
          { url: '/about', title: 'Our Expertise', relevance: 'medium', contentType: 'about' }
        ]
      },
      'mica-ready-waitlist': {
        topics: ['MiCA Compliance', 'EU Regulation', 'AI Solutions', 'Regulatory Technology', 'CASP Licensing'],
        relatedPages: [
          { url: '/services', title: 'Regulatory Services', relevance: 'high', contentType: 'service' },
          { url: '/contact', title: 'Expert Consultation', relevance: 'high', contentType: 'service' },
          { url: '/about', title: 'Regulatory Expertise', relevance: 'medium', contentType: 'about' },
          { url: '/glossary', title: 'MiCA Terminology', relevance: 'medium', contentType: 'resource' }
        ]
      }
    };

    // Handle hash-based navigation
    if (pathWithoutSlash === '' && currentHash) {
      const hashSection = currentHash.replace('#', '');
      return contentRelationships[hashSection] || contentRelationships[''];
    }

    return contentRelationships[pathWithoutSlash] || { topics: [], relatedPages: [] };
  };

  const content = getRelatedContent();
  
  if (!content.relatedPages.length) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://cointegrity.io${currentPath}`,
    "about": content.topics.map(topic => ({
      "@type": "Thing",
      "name": topic
    })),
    "relatedLink": content.relatedPages
      .filter(page => page.relevance === 'high')
      .map(page => `https://cointegrity.io${page.url}`),
    "mentions": content.relatedPages.map(page => ({
      "@type": "WebPage",
      "url": `https://cointegrity.io${page.url}`,
      "name": page.title,
      "additionalType": page.contentType,
      "relevanceScore": page.relevance
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Add topic-based meta keywords */}
      <meta name="keywords" content={content.topics.join(', ')} />
      
      {/* Add content clustering signals */}
      <meta name="content-cluster" content={content.topics[0]} />
      <meta name="related-content-count" content={content.relatedPages.length.toString()} />
    </Helmet>
  );
};
