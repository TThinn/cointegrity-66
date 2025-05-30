
import React from "react";
import { Helmet } from "react-helmet-async";
import { getStructuredData } from "./SectionStructuredData";
import { useLocation } from "react-router-dom";

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
      return "About Cointegrity | Leading Web3 & Blockchain Consulting Experts";
    } else if (pathWithoutSlash === 'services') {
      return "Web3 Consulting Services | Blockchain Strategy & MiCA Compliance | Cointegrity";
    } else if (pathWithoutSlash === 'partners') {
      return "Our Strategic Partners | Web3 Ecosystem & Blockchain Networks | Cointegrity";
    } else if (pathWithoutSlash === 'team') {
      return "Expert Web3 Team | Blockchain Consultants & Tokenomics Specialists | Cointegrity";
    } else if (pathWithoutSlash === 'testimonials') {
      return "Client Success Stories & Reviews | Web3 Consulting Results | Cointegrity";
    } else if (pathWithoutSlash === 'contact') {
      return "Contact Web3 Experts | Blockchain Consulting & MiCA Compliance | Cointegrity";
    }
    
    // Handle hash-based navigation on homepage
    switch(currentHash) {
      case "#founders":
        return "Expert Web3 Team | Blockchain Consultants & Tokenomics Specialists | Cointegrity";
      case "#services":
        return "Web3 Consulting Services | Blockchain Strategy & MiCA Compliance | Cointegrity";
      case "#partners":
        return "Our Strategic Partners | Web3 Ecosystem & Blockchain Networks | Cointegrity";
      case "#testimonials":
        return "Client Success Stories & Reviews | Web3 Consulting Results | Cointegrity";
      case "#about":
        return "About Cointegrity | Leading Web3 & Blockchain Consulting Experts";
      case "#contact":
        return "Contact Web3 Experts | Blockchain Consulting & MiCA Compliance | Cointegrity";
      case "#faq":
        return "Web3 & Blockchain FAQ | MiCA Compliance Questions | Cointegrity";
      default:
        return "Cointegrity | Leading Web3 Consultancy | Blockchain Strategy & MiCA Compliance Experts";
    }
  };
  
  const getSectionDescription = () => {
    // Handle path-based pages first
    if (pathWithoutSlash === 'about') {
      return "Discover Cointegrity's mission to bridge traditional business with Web3 innovation. Our expert team specializes in blockchain strategy, tokenomics, and regulatory compliance to help organizations navigate the decentralized future successfully.";
    } else if (pathWithoutSlash === 'services') {
      return "Comprehensive Web3 consulting services including blockchain strategy, tokenomics design, MiCA regulatory compliance, smart contract development, and digital asset advisory. Transform your business with expert Web3 guidance.";
    } else if (pathWithoutSlash === 'partners') {
      return "Explore Cointegrity's extensive network of blockchain partners including Ethereum, Solana, Avalanche, and leading Web3 organizations. Discover our collaborative ecosystem driving innovation in decentralized technology.";
    } else if (pathWithoutSlash === 'team') {
      return "Meet Cointegrity's world-class team of Web3 specialists, blockchain developers, and regulatory experts. Our founders bring decades of experience in digital asset transformation and decentralized technology implementation.";
    } else if (pathWithoutSlash === 'testimonials') {
      return "Read authentic client testimonials and success stories from businesses Cointegrity has helped transform with Web3 technology. Discover how our blockchain consulting delivers measurable results and competitive advantages.";
    } else if (pathWithoutSlash === 'contact') {
      return "Connect with Cointegrity's Web3 experts for professional blockchain consulting, tokenomics advisory, and MiCA compliance guidance. Schedule a consultation to discuss your digital asset transformation strategy.";
    }
    
    // Handle hash-based navigation on homepage
    switch(currentHash) {
      case "#founders":
        return "Meet Cointegrity's world-class team of Web3 specialists, blockchain developers, and regulatory experts. Our founders bring decades of experience in digital asset transformation and decentralized technology implementation.";
      case "#services":
        return "Comprehensive Web3 consulting services including blockchain strategy, tokenomics design, MiCA regulatory compliance, smart contract development, and digital asset advisory. Transform your business with expert Web3 guidance.";
      case "#partners":
        return "Explore Cointegrity's extensive network of blockchain partners including Ethereum, Solana, Avalanche, and leading Web3 organizations. Discover our collaborative ecosystem driving innovation in decentralized technology.";
      case "#testimonials":
        return "Read authentic client testimonials and success stories from businesses Cointegrity has helped transform with Web3 technology. Discover how our blockchain consulting delivers measurable results and competitive advantages.";
      case "#about":
        return "Discover Cointegrity's mission to bridge traditional business with Web3 innovation. Our expert team specializes in blockchain strategy, tokenomics, and regulatory compliance to help organizations navigate the decentralized future successfully.";
      case "#contact":
        return "Connect with Cointegrity's Web3 experts for professional blockchain consulting, tokenomics advisory, and MiCA compliance guidance. Schedule a consultation to discuss your digital asset transformation strategy.";
      case "#faq":
        return "Get expert answers to common Web3, blockchain, and MiCA compliance questions from Cointegrity's experienced consultants. Learn about tokenomics, regulatory requirements, and digital asset transformation strategies.";
      default:
        return "Leading Web3 consultancy specializing in blockchain strategy, tokenomics design, MiCA regulatory compliance, and digital asset transformation. Expert guidance for enterprises, governments, and Web3 startups navigating decentralized technology.";
    }
  };

  const getKeywords = () => {
    const baseKeywords = "web3 consulting, blockchain strategy, tokenomics design, MiCA compliance, digital asset advisory";
    
    if (pathWithoutSlash === 'services' || currentHash === '#services') {
      return `${baseKeywords}, smart contract development, DeFi consulting, NFT strategy, crypto compliance`;
    } else if (pathWithoutSlash === 'team' || currentHash === '#founders') {
      return `${baseKeywords}, blockchain experts, web3 specialists, crypto consultants, digital asset advisors`;
    } else if (pathWithoutSlash === 'testimonials' || currentHash === '#testimonials') {
      return `${baseKeywords}, client reviews, web3 success stories, blockchain case studies`;
    }
    
    return baseKeywords;
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
    <Helmet>
      <title>{getSectionTitle()}</title>
      <meta name="description" content={getSectionDescription()} />
      <meta name="keywords" content={getKeywords()} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={getSectionTitle()} />
      <meta property="og:description" content={getSectionDescription()} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png" />
      <meta property="og:image:alt" content="Cointegrity - Leading Web3 & Blockchain Consultancy" />
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
      <meta name="twitter:image:alt" content="Cointegrity - Leading Web3 & Blockchain Consultancy" />
      
      {/* LinkedIn */}
      <meta property="linkedin:owner" content="Cointegrity" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Cointegrity" />
      <meta name="language" content="en" />
      <meta name="geo.region" content="EU" />
      <meta name="geo.placename" content="Europe" />
      
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
  );
};
