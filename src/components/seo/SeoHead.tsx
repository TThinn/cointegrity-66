import React from "react";
import { Helmet } from "react-helmet-async";
import { getStructuredData } from "./SectionStructuredData";
import { useLocation } from "react-router-dom";
import { InternalLinkingStructuredData } from "./InternalLinkingStructuredData";
import { HreflangSupport } from "./HreflangSupport";
import { PerformanceOptimization } from "./PerformanceOptimization";
import { DynamicLinkSuggestions } from "./DynamicLinkSuggestions";
import { RelatedContentRecommendations } from "./RelatedContentRecommendations";
import { ContentFreshnessIndicators } from "./ContentFreshnessIndicators";
import { ExpertiseAuthoritySignals } from "./ExpertiseAuthoritySignals";

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
    if (pathWithoutSlash === 'about') {
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
        return "Cointegrity Web3 Consultancy - Blockchain Solutions & Tokenomics Experts";
    }
  };
  
  const getSectionDescription = () => {
    // Handle path-based pages first
    if (pathWithoutSlash === 'about') {
      return "Learn about Cointegrity's mission to simplify Web3 complexity and our comprehensive approach to blockchain consulting and implementation.";
    } else if (pathWithoutSlash === 'services') {
      return "Discover our comprehensive Web3 services including strategic positioning, tokenomics design, regulatory compliance, and capital acceleration solutions.";
    } else if (pathWithoutSlash === 'partners') {
      return "Explore our network of trusted industry partners helping us deliver exceptional blockchain solutions and digital asset services.";
    } else if (pathWithoutSlash === 'team') {
      return "Meet the talented team of Web3 specialists behind Cointegrity's success. Our founders bring decades of experience in blockchain technology and digital asset transformation.";
    } else if (pathWithoutSlash === 'testimonials') {
      return "Read what our clients say about Cointegrity's Web3 consultancy services. Real success stories from businesses we've helped transform.";
    } else if (pathWithoutSlash === 'contact') {
      return "Connect with Cointegrity's Web3 experts for consultation on blockchain technology, tokenomics, and regulatory compliance solutions.";
    }
    
    // Handle hash-based navigation on homepage
    switch(currentHash) {
      case "#founders":
        return "Meet the talented team of Web3 specialists behind Cointegrity's success. Our founders bring decades of experience in blockchain technology and digital asset transformation.";
      case "#services":
        return "Discover our comprehensive Web3 services including strategic positioning, tokenomics design, regulatory compliance, and capital acceleration solutions.";
      case "#partners":
        return "Explore our network of trusted industry partners helping us deliver exceptional blockchain solutions and digital asset services.";
      case "#testimonials":
        return "Read what our clients say about Cointegrity's Web3 consultancy services. Real success stories from businesses we've helped transform.";
      case "#about":
        return "Learn about Cointegrity's mission to simplify Web3 complexity and our comprehensive approach to blockchain consulting and implementation.";
      case "#contact":
        return "Connect with Cointegrity's Web3 experts for consultation on blockchain technology, tokenomics, and regulatory compliance solutions.";
      case "#faq":
        return "Get answers to common questions about blockchain, Web3, tokenomics, and MiCA compliance from Cointegrity's expert consultants.";
      default:
        return "Leading Web3 consultancy specialized in blockchain strategy, tokenomics design, and MiCA regulatory compliance for enterprises building the future of finance.";
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
      <Helmet>
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
      </Helmet>
      
      {/* Add new SEO components */}
      <InternalLinkingStructuredData currentPath={currentPath} />
      <HreflangSupport currentPath={currentPath} />
      <PerformanceOptimization />
      
      {/* New advanced SEO components */}
      <DynamicLinkSuggestions currentPath={currentPath} currentHash={currentHash} />
      <RelatedContentRecommendations currentPath={currentPath} currentHash={currentHash} />
      <ContentFreshnessIndicators currentPath={currentPath} />
      <ExpertiseAuthoritySignals currentPath={currentPath} currentHash={currentHash} />
    </>
  );
};
