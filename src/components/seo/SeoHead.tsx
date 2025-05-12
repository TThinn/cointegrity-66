
import React from "react";
import { Helmet } from "react-helmet-async";
import { getStructuredData } from "./SectionStructuredData";

interface SeoHeadProps {
  currentPath: string;
  currentHash: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ currentPath, currentHash }) => {
  // Determine which section is being viewed to customize meta tags
  const getSectionTitle = () => {
    switch(currentPath) {
      case "/team":
        return "Meet Our Expert Team | Cointegrity Web3 Consultancy";
      case "/services":
        return "Our Web3 & Blockchain Services | Cointegrity";
      case "/partners":
        return "Our Industry Partners | Cointegrity";
      case "/testimonials":
        return "Client Success Stories | Cointegrity";
      case "/about":
        return "About Cointegrity | Web3 & Blockchain Experts";
      case "/contact":
        return "Contact Cointegrity | Web3 & Blockchain Consultation";
      default:
        return "Strategic Consulting & Web3 Infrastructure Solutions | Cointegrity";
    }
  };
  
  const getSectionDescription = () => {
    switch(currentPath) {
      case "/team":
        return "Meet the talented team of Web3 specialists behind Cointegrity's success. Our founders bring decades of experience in blockchain technology and digital asset transformation.";
      case "/services":
        return "Discover our comprehensive Web3 services including strategic positioning, tokenomics design, regulatory compliance, and capital acceleration solutions.";
      case "/partners":
        return "Explore our network of trusted industry partners helping us deliver exceptional blockchain solutions and digital asset services.";
      case "/testimonials":
        return "Read what our clients say about Cointegrity's Web3 consultancy services. Real success stories from businesses we've helped transform.";
      case "/about":
        return "Learn about Cointegrity's mission to simplify Web3 complexity and our comprehensive approach to blockchain consulting and implementation.";
      case "/contact":
        return "Connect with Cointegrity's Web3 experts for consultation on blockchain technology, tokenomics, and regulatory compliance solutions.";
      default:
        return "Cointegrity delivers expert consulting across government, Web3, and corporate sectors. Our team enhances service delivery through AI-powered solutions while strongly focusing on personal collaboration. Specializing in Digital Strategy, Web3 infrastructure, Tax & Compliance, and providing growth capital.";
    }
  };

  // Get all structured data objects
  const structuredDataObjects = getStructuredData();

  const fullUrl = `https://cointegrity.io${currentPath}${currentHash}`;

  return (
    <Helmet>
      <title>{getSectionTitle()}</title>
      <meta name="description" content={getSectionDescription()} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={getSectionTitle()} />
      <meta property="og:description" content={getSectionDescription()} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png" />
      <meta property="og:image:alt" content="Cointegrity Logo" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Cointegrity" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Cointegrity" />
      <meta name="twitter:title" content={getSectionTitle()} />
      <meta name="twitter:description" content={getSectionDescription()} />
      <meta name="twitter:image" content="https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png" />
      <meta name="twitter:image:alt" content="Cointegrity Logo" />
      
      {/* LinkedIn */}
      <meta property="linkedin:owner" content="Cointegrity" />
      
      {/* Favicon */}
      <link rel="icon" href="/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png" type="image/png" />
      <link rel="apple-touch-icon" href="/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png" />
      <link rel="shortcut icon" href="/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png" />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Include all structured data directly */}
      {structuredDataObjects.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};
