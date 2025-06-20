import React from "react";
import { SafeHelmet } from "./SafeHelmet";
import { getStructuredData } from "./SectionStructuredData";
import { useLocation } from "react-router-dom";
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

interface SeoHeadProps {
  currentPath: string;
  currentHash: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ currentPath, currentHash }) => {
  const location = useLocation();
  const pathWithoutSlash = location.pathname.replace(/^\/+/, '');
  
  // Determine which section is being viewed to customize meta tags
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
      case "#faq":
        return "Frequently Asked Questions | Web3 & Blockchain | Cointegrity";
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
      case "#faq":
        return "Expert answers to Web3, blockchain, tokenomics, and MiCA compliance questions from Cointegrity's experienced consultants.";
      default:
        return "Expert Web3 consulting for blockchain strategy, tokenomics design, MiCA compliance. Transform your business with proven digital asset solutions.";
    }
  };

  // Get canonical URL based on whether it's path or hash based
  const getCanonicalUrl = () => {
    const basePath = "https://cointegrity.io";
    
    // For dedicated section pages, use the path
    if (pathWithoutSlash) {
      return `${basePath}/${pathWithoutSlash}`;
    }
    
    // For homepage with hash, use the hash
    if (currentHash) {
      return `${basePath}/${currentHash}`;
    }
    
    // Default to homepage
    return basePath;
  };

  // Get all structured data objects with current path and hash
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
      
      {/* New AI search optimization components */}
      <AISearchOptimization currentPath={currentPath} currentHash={currentHash} />
      <ConversationalSearchData currentPath={currentPath} currentHash={currentHash} />
      <EntityRelationshipData currentPath={currentPath} currentHash={currentHash} />
    </>
  );
};
