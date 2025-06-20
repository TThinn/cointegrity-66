
import React from "react";
import { SafeHelmet } from "./SafeHelmet";
import { getStructuredData } from "./SectionStructuredData";
import { InternalLinkingStructuredData } from "./InternalLinkingStructuredData";
import { HreflangSupport } from "./HreflangSupport";
import { PerformanceOptimization } from "./PerformanceOptimization";
import { DynamicLinkSuggestions } from "./DynamicLinkSuggestions";
import { RelatedContentRecommendations } from "./RelatedContentRecommendations";
import { ContentFreshnessIndicators } from "./ContentFreshnessIndicators";
import { ExpertiseAuthoritySignals } from "./ExpertiseAuthoritySignals";
import { AISearchOptimization } from "./AISearchOptimization";
import { ConversationalSearchData } from "./ConversationalSearchData";
import { EntityRelationshipData } from "./EntityRelationshipData";
import { GlossaryEnhancedSEO } from "./GlossaryEnhancedSEO";

interface SeoHeadProps {
  currentPath: string;
  currentHash: string;
  totalTermsCount?: number;
  searchTerm?: string;
  activeCategory?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ 
  currentPath, 
  currentHash, 
  totalTermsCount = 0,
  searchTerm,
  activeCategory 
}) => {
  const pathWithoutSlash = currentPath.replace(/^\/+/, '');
  
  const getSectionTitle = () => {
    // Handle path-based pages first
    if (pathWithoutSlash === 'web3-consulting') {
      return "Web3 Consulting Services | Blockchain Strategy & Implementation | Cointegrity";
    } else if (pathWithoutSlash === 'about') {
      return "About Cointegrity | Web3 & Blockchain Experts";
    } else if (pathWithoutSlash === 'services') {
      return "Our Web3 & Blockchain Services | Cointegrity";
    } else if (pathWithoutSlash === 'partners') {
      return "Our Industry Partners | Cointegrity";
    } else if (pathWithoutSlash === 'team') {
      return "Meet Our Expert Team | Cointegrity Web3 Consultancy";
    } else if (pathWithoutSlash === 'testimonials') {
      return "Client Success Stories | Cointegrity";
    } else if (pathWithoutSlash === 'contact') {
      return "Contact Cointegrity | Web3 & Blockchain Consultation";
    } else if (pathWithoutSlash === 'blog') {
      return "Web3 & Blockchain Insights | Cointegrity Blog";
    } else if (pathWithoutSlash === 'guides') {
      return "Web3 Implementation Guides | Cointegrity";
    } else if (pathWithoutSlash === 'case-studies') {
      return "Web3 Success Stories | Case Studies | Cointegrity";
    } else if (pathWithoutSlash === 'glossary') {
      return `World's Largest Web3 Glossary (${totalTermsCount || '1049+'}+ Terms) | Cointegrity`;
    } else if (pathWithoutSlash === 'process') {
      return "Our Web3 Implementation Process | Cointegrity";
    } else if (pathWithoutSlash === 'mica-ready-waitlist') {
      return "MiCA Ready Waitlist | Regulatory Compliance | Cointegrity";
    }
    
    // Handle hash-based navigation on homepage
    switch(currentHash) {
      case "#founders":
        return "Meet Our Expert Team | Cointegrity Web3 Consultancy";
      case "#services":
        return "Our Web3 & Blockchain Services | Cointegrity";
      case "#partners":
        return "Our Industry Partners | Cointegrity";
      case "#testimonials":
        return "Client Success Stories | Cointegrity";
      case "#about":
        return "About Cointegrity | Web3 & Blockchain Experts";
      case "#contact":
        return "Contact Cointegrity | Web3 & Blockchain Consultation";
      case "#process":
        return "Our Web3 Implementation Process | Cointegrity";
      default:
        return "Web3 Consulting Services | Blockchain Strategy & Implementation | Cointegrity";
    }
  };
  
  const getSectionDescription = () => {
    // Handle path-based pages first
    if (pathWithoutSlash === 'web3-consulting') {
      return "Expert Web3 consulting for blockchain strategy, tokenomics design, MiCA compliance. Transform your business with proven digital asset solutions.";
    } else if (pathWithoutSlash === 'about') {
      return "Cointegrity simplifies Web3 complexity with expert blockchain consulting, strategic positioning, and regulatory compliance for digital transformation.";
    } else if (pathWithoutSlash === 'services') {
      return "Comprehensive Web3 services: strategic positioning, tokenomics design, regulatory compliance, capital acceleration. Expert blockchain implementation.";
    } else if (pathWithoutSlash === 'partners') {
      return "Trusted industry partners enabling exceptional blockchain solutions and digital asset services for comprehensive Web3 implementation.";
    } else if (pathWithoutSlash === 'team') {
      return "Expert Web3 team with decades of blockchain experience. Proven specialists in digital asset transformation and regulatory compliance.";
    } else if (pathWithoutSlash === 'testimonials') {
      return "Real client success stories from Cointegrity's Web3 consultancy. Verified results in blockchain transformation and digital asset projects.";
    } else if (pathWithoutSlash === 'contact') {
      return "Connect with Web3 experts for blockchain consultation, tokenomics design, and regulatory compliance. Start your digital transformation.";
    } else if (pathWithoutSlash === 'blog') {
      return "Latest Web3 insights, blockchain trends, and digital asset strategies from Cointegrity's expert consultants and industry thought leaders.";
    } else if (pathWithoutSlash === 'guides') {
      return "Comprehensive Web3 implementation guides covering blockchain strategy, tokenomics, regulatory compliance, and digital asset best practices.";
    } else if (pathWithoutSlash === 'case-studies') {
      return "Detailed Web3 success stories and blockchain implementation case studies showcasing real-world digital asset transformation results.";
    } else if (pathWithoutSlash === 'glossary') {
      return `World's largest Web3 glossary with ${totalTermsCount || '1049+'}+ expert-curated terms covering blockchain, cryptocurrency, DeFi, NFTs, DAOs, tokenomics, and MiCA regulatory compliance.`;
    } else if (pathWithoutSlash === 'process') {
      return "Our proven Web3 implementation methodology: strategic assessment, architecture design, implementation guidance, and launch support.";
    } else if (pathWithoutSlash === 'mica-ready-waitlist') {
      return "Join our MiCA Ready waitlist for early access to European regulatory compliance solutions and digital asset framework guidance.";
    }
    
    // Handle hash-based navigation on homepage
    switch(currentHash) {
      case "#founders":
        return "Expert Web3 team with decades of blockchain experience. Proven specialists in digital asset transformation and regulatory compliance.";
      case "#services":
        return "Comprehensive Web3 services: strategic positioning, tokenomics design, regulatory compliance, capital acceleration. Expert blockchain implementation.";
      case "#partners":
        return "Trusted industry partners enabling exceptional blockchain solutions and digital asset services for comprehensive Web3 implementation.";
      case "#testimonials":
        return "Real client success stories from Cointegrity's Web3 consultancy. Verified results in blockchain transformation and digital asset projects.";
      case "#about":
        return "Cointegrity simplifies Web3 complexity with expert blockchain consulting, strategic positioning, and regulatory compliance for digital transformation.";
      case "#contact":
        return "Connect with Web3 experts for blockchain consultation, tokenomics design, and regulatory compliance. Start your digital transformation.";
      case "#process":
        return "Our proven Web3 implementation methodology: strategic assessment, architecture design, implementation guidance, and launch support.";
      default:
        return "Expert Web3 consulting for blockchain strategy, tokenomics design, MiCA compliance. Transform your business with proven digital asset solutions.";
    }
  };

  const getCanonicalUrl = () => {
    const basePath = "https://cointegrity.io";
    
    if (pathWithoutSlash) {
      return `${basePath}/${pathWithoutSlash}`;
    }
    
    if (currentHash) {
      return `${basePath}/${currentHash}`;
    }
    
    return basePath;
  };

  const structuredDataObjects = getStructuredData(currentPath, currentHash);

  return (
    <>
      <SafeHelmet>
        <title>{getSectionTitle()}</title>
        <meta name="description" content={getSectionDescription()} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={getSectionTitle()} />
        <meta property="og:description" content={getSectionDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png" />
        <meta property="og:image:alt" content="Cointegrity Logo" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={getCanonicalUrl()} />
        <meta property="og:site_name" content="Cointegrity" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Cointegrity" />
        <meta name="twitter:title" content={getSectionTitle()} />
        <meta name="twitter:description" content={getSectionDescription()} />
        <meta name="twitter:image" content="https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png" />
        <meta name="twitter:image:alt" content="Cointegrity Logo" />
        
        {/* LinkedIn */}
        <meta property="linkedin:owner" content="Cointegrity" />
        
        {/* Favicon */}
        <link rel="icon" href="/lovable-uploads/4154e717-451c-4f01-9cf6-8117a4fa0149.png" type="image/png" />
        <link rel="apple-touch-icon" href="/lovable-uploads/4154e717-451c-4f01-9cf6-8117a4fa0149.png" />
        <link rel="shortcut icon" href="/lovable-uploads/4154e717-451c-4f01-9cf6-8117a4fa0149.png" />
        
        {/* Canonical */}
        <link rel="canonical" href={getCanonicalUrl()} />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/lovable-uploads/4154e717-451c-4f01-9cf6-8117a4fa0149.png" as="image" />
        
        {/* Include all structured data directly */}
        {structuredDataObjects.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </SafeHelmet>
      
      {/* Existing SEO components */}
      <InternalLinkingStructuredData currentPath={currentPath} />
      <HreflangSupport currentPath={currentPath} />
      <PerformanceOptimization />
      <DynamicLinkSuggestions currentPath={currentPath} currentHash={currentHash} />
      <RelatedContentRecommendations currentPath={currentPath} currentHash={currentHash} />
      <ContentFreshnessIndicators currentPath={currentPath} />
      <ExpertiseAuthoritySignals currentPath={currentPath} currentHash={currentHash} />
      
      {/* AI search optimization components */}
      <AISearchOptimization currentPath={currentPath} currentHash={currentHash} />
      <ConversationalSearchData currentPath={currentPath} currentHash={currentHash} />
      <EntityRelationshipData currentPath={currentPath} currentHash={currentHash} />
      
      {/* Enhanced glossary SEO */}
      <GlossaryEnhancedSEO 
        currentPath={currentPath} 
        totalTermsCount={totalTermsCount}
        searchTerm={searchTerm}
        activeCategory={activeCategory}
      />
    </>
  );
};
