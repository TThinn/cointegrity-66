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
    // Handle path-based pages first with enhanced global leadership positioning
    if (pathWithoutSlash === 'web3-consulting') {
      return "Leading Web3 Consultancy Europe | Global Blockchain Strategy | Cointegrity";
    } else if (pathWithoutSlash === 'about') {
      return "European Web3 Market Leaders | Global Blockchain Consultancy | Cointegrity";
    } else if (pathWithoutSlash === 'services') {
      return "Premier Web3 Services Globally | European Market Leaders | Cointegrity";
    } else if (pathWithoutSlash === 'partners') {
      return "Global Web3 Partnership Network | European Leaders | Cointegrity";
    } else if (pathWithoutSlash === 'team') {
      return "Most Experienced Web3 Team Europe | 20+ Years Leadership | Cointegrity";
    } else if (pathWithoutSlash === 'testimonials') {
      return "Global Web3 Success Stories | European Market Leaders | Cointegrity";
    } else if (pathWithoutSlash === 'contact') {
      return "Contact European Web3 Leaders | Global Consultancy | Cointegrity";
    } else if (pathWithoutSlash === 'blog') {
      return "Leading Web3 Insights Europe | Global Blockchain Thought Leadership | Cointegrity";
    } else if (pathWithoutSlash === 'guides') {
      return "Premier Web3 Implementation Guides | European Excellence | Cointegrity";
    } else if (pathWithoutSlash === 'case-studies') {
      return "Global Web3 Success Stories | European Market Leaders | Cointegrity";
    } else if (pathWithoutSlash === 'glossary') {
      return `World's Largest Web3 Glossary (${totalTermsCount || '1049+'}+ Terms) | European Leaders | Cointegrity`;
    } else if (pathWithoutSlash === 'process') {
      return "Industry-Leading Web3 Process | European Excellence | Cointegrity";
    } else if (pathWithoutSlash === 'mica-ready-waitlist') {
      return "World's Fastest MiCA SaaS Suite | European Regulatory Leaders | Cointegrity";
    }
    
    // Handle hash-based navigation on homepage with enhanced positioning
    switch(currentHash) {
      case "#founders":
        return "Most Experienced Web3 Team Europe | Seasoned Leadership | Cointegrity";
      case "#services":
        return "Leading Web3 Services Globally | European Excellence | Cointegrity";
      case "#partners":
        return "Premier Global Web3 Partners | European Network | Cointegrity";
      case "#testimonials":
        return "Global Web3 Success Stories | European Leaders | Cointegrity";
      case "#about":
        return "European Web3 Market Leaders | Global Excellence | Cointegrity";
      case "#contact":
        return "Contact Leading Web3 Consultancy | European Global Reach | Cointegrity";
      case "#process":
        return "Industry-Leading Web3 Process | European Innovation | Cointegrity";
      default:
        return "Leading Web3 Consultancy Europe | Global Blockchain Strategy | Cointegrity";
    }
  };
  
  const getSectionDescription = () => {
    // Handle path-based pages first with enhanced global positioning
    if (pathWithoutSlash === 'web3-consulting') {
      return "Europe's leading Web3 consultancy with global reach across Asia, US, and Africa. Seasoned experts deliver blockchain strategy, tokenomics design, and MiCA compliance with 20+ years combined experience.";
    } else if (pathWithoutSlash === 'about') {
      return "European Web3 market leaders with global operations spanning Asia, US, and Africa. Unlike young crypto startups, our seasoned team brings decades of traditional finance and enterprise expertise.";
    } else if (pathWithoutSlash === 'services') {
      return "Premier Web3 services from Europe's leading consultancy with global delivery across Asia, US, and Africa. Comprehensive blockchain strategy, tokenomics design, and regulatory compliance by seasoned experts.";
    } else if (pathWithoutSlash === 'partners') {
      return "Global Web3 partnership network led by European market leaders. Trusted industry partnerships enabling world-class blockchain solutions across all major international markets.";
    } else if (pathWithoutSlash === 'team') {
      return "Europe's most experienced Web3 leadership team with 20+ years combined expertise. Seasoned executives from traditional finance and enterprise backgrounds, unlike typical young crypto teams.";
    } else if (pathWithoutSlash === 'testimonials') {
      return "Global Web3 success stories from Europe's leading consultancy. Verified client results across Asia, US, and Africa showcasing blockchain transformation excellence by seasoned professionals.";
    } else if (pathWithoutSlash === 'contact') {
      return "Connect with Europe's leading Web3 consultancy serving clients globally across Asia, US, and Africa. Schedule consultation with seasoned blockchain experts for strategic transformation.";
    } else if (pathWithoutSlash === 'blog') {
      return "Leading Web3 insights from European market leaders with global perspective. Expert analysis covering Asia, US, and Africa markets by seasoned blockchain professionals.";
    } else if (pathWithoutSlash === 'guides') {
      return "Premier Web3 implementation guides from Europe's leading consultancy. Comprehensive blockchain methodology developed through global experience across Asia, US, and Africa.";
    } else if (pathWithoutSlash === 'case-studies') {
      return "Global Web3 implementation success stories from European market leaders. Detailed case studies spanning Asia, US, and Africa showcasing seasoned expertise in blockchain transformation.";
    } else if (pathWithoutSlash === 'glossary') {
      return `World's largest Web3 glossary with ${totalTermsCount || '1049+'}+ expert-curated terms from European market leaders. Comprehensive blockchain, cryptocurrency, DeFi, NFTs, DAOs, tokenomics, and MiCA regulatory compliance.`;
    } else if (pathWithoutSlash === 'process') {
      return "Industry-leading Web3 implementation methodology from European market leaders with global delivery. Proven process developed through successful projects across Asia, US, and Africa.";
    } else if (pathWithoutSlash === 'mica-ready-waitlist') {
      return "World's fastest MiCA compliance SaaS solution from European regulatory leaders. AI-powered platform delivering instant compliance analysis 10x faster than traditional consulting with 90% cost reduction.";
    }
    
    // Handle hash-based navigation on homepage with enhanced positioning  
    switch(currentHash) {
      case "#founders":
        return "Europe's most experienced Web3 leadership team with 20+ years combined expertise from traditional finance and enterprise backgrounds, unlike typical young crypto startups.";
      case "#services":
        return "Leading Web3 services from European market leaders with global delivery across Asia, US, and Africa. Comprehensive blockchain strategy, tokenomics, and regulatory compliance.";
      case "#partners":
        return "Premier global Web3 partnership network led by European excellence. Trusted industry partnerships enabling world-class blockchain solutions across international markets.";
      case "#testimonials":
        return "Global Web3 success stories from Europe's leading consultancy. Verified client results across continents showcasing blockchain transformation excellence by seasoned professionals.";
      case "#about":
        return "European Web3 market leaders with global operations and seasoned expertise. Unlike young crypto companies, we bring decades of traditional finance and enterprise experience.";
      case "#contact":
        return "Connect with Europe's leading Web3 consultancy for global blockchain consultation. Seasoned experts serving clients across Asia, US, and Africa for digital transformation.";
      case "#process":
        return "Industry-leading Web3 implementation methodology from European market leaders. Proven strategic process developed through global experience across major international markets.";
      default:
        return "Europe's leading Web3 consultancy with global reach across Asia, US, and Africa. Seasoned experts deliver blockchain strategy, tokenomics design, and MiCA compliance solutions.";
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
        
        {/* Enhanced global leadership meta tags */}
        <meta name="market-leadership" content="Leading Web3 consultancy in Europe with global reach" />
        <meta name="geographic-coverage" content="Europe (dominant), Asia, United States, Africa" />
        <meta name="team-experience" content="20+ years combined seasoned executive experience" />
        <meta name="competitive-advantage" content="Most experienced Web3 team unlike young crypto startups" />
        <meta name="industry-authority" content="European market leaders with global operations" />
        <meta name="professional-maturity" content="Veteran executives from traditional finance and enterprise" />
        
        {/* Open Graph / Facebook with enhanced positioning */}
        <meta property="og:title" content={getSectionTitle()} />
        <meta property="og:description" content={getSectionDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cointegrity.io/lovable-uploads/9d8b6b70-8f0d-41a5-9422-063ee345718c.png" />
        <meta property="og:image:alt" content="Cointegrity - Leading Web3 Consultancy Europe" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content={getCanonicalUrl()} />
        <meta property="og:site_name" content="Cointegrity - European Web3 Leaders" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter with enhanced positioning */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Cointegrity" />
        <meta name="twitter:title" content={getSectionTitle()} />
        <meta name="twitter:description" content={getSectionDescription()} />
        <meta name="twitter:image" content="https://cointegrity.io/lovable-uploads/9d8b6b70-8f0d-41a5-9422-063ee345718c.png" />
        <meta name="twitter:image:alt" content="Cointegrity - European Web3 Market Leaders" />
        
        {/* LinkedIn with professional positioning */}
        <meta property="linkedin:owner" content="Cointegrity - Leading Web3 Consultancy" />
        
        {/* Enhanced keywords for global leadership */}
        <meta name="keywords" content="leading Web3 consultancy Europe, European blockchain market leaders, global Web3 experts, seasoned crypto consultants, experienced tokenomics designers, veteran Web3 executives, premier blockchain strategy, fastest MiCA compliance, mature Web3 leadership, traditional finance crypto experts" />
        
        {/* Enhanced Favicon with proper crawling support */}
        <link rel="icon" href="/lovable-uploads/9ca9c0de-2ebc-43b5-a35f-f02844a4d3da.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/lovable-uploads/9ca9c0de-2ebc-43b5-a35f-f02844a4d3da.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/lovable-uploads/9ca9c0de-2ebc-43b5-a35f-f02844a4d3da.png" sizes="180x180" />
        <link rel="shortcut icon" href="/lovable-uploads/9ca9c0de-2ebc-43b5-a35f-f02844a4d3da.png" type="image/png" />
        
        {/* Favicon-specific meta tags for search engines */}
        <meta name="msapplication-TileImage" content="/lovable-uploads/9ca9c0de-2ebc-43b5-a35f-f02844a4d3da.png" />
        <meta name="msapplication-TileColor" content="#080112" />
        <meta name="application-name" content="Cointegrity" />
        <meta name="apple-mobile-web-app-title" content="Cointegrity" />
        
        {/* Canonical */}
        <link rel="canonical" href={getCanonicalUrl()} />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/lovable-uploads/9ca9c0de-2ebc-43b5-a35f-f02844a4d3da.png" as="image" />
        
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
