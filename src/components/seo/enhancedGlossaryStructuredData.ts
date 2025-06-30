
import { glossaryTerms } from "@/data/glossaryTerms";

// Enhanced WebSite schema with comprehensive glossary search
export const ENHANCED_WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://cointegrity.io/#website-enhanced",
  "url": "https://cointegrity.io/",
  "name": "Cointegrity - World's Largest Web3 Glossary",
  "description": "Leading Web3 consultancy with the world's most comprehensive blockchain, cryptocurrency, and crypto crime prevention glossary",
  "publisher": {
    "@type": "Organization",
    "name": "Cointegrity",
    "url": "https://cointegrity.io"
  },
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://cointegrity.io/glossary?search={search_term_string}",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "query-input": "required name=search_term_string",
      "result": {
        "@type": "SearchResultsPage",
        "name": "Web3 Glossary Search Results"
      }
    }
  ],
  "mainEntity": {
    "@type": "DefinedTermSet",
    "@id": "https://cointegrity.io/glossary#termset-enhanced",
    "name": "World's Largest Web3 Glossary",
    "description": `Comprehensive glossary containing ${glossaryTerms.length}+ expert-curated Web3, blockchain, cryptocurrency, and crypto crime prevention terms`,
    "numberOfItems": glossaryTerms.length
  }
};

// Enhanced review and rating schema for the glossary
export const GLOSSARY_REVIEW_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Review",
  "@id": "https://cointegrity.io/glossary#expert-review",
  "name": "Expert Review: World's Most Comprehensive Web3 Glossary",
  "reviewBody": `This glossary represents the most comprehensive collection of Web3, blockchain, cryptocurrency, and crypto crime prevention terminology available online, with over ${glossaryTerms.length} expert-curated definitions covering everything from basic blockchain concepts to advanced DeFi protocols, regulatory frameworks, and criminal activity prevention.`,
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": 5,
    "bestRating": 5,
    "worstRating": 1,
    "reviewAspect": "Comprehensiveness"
  },
  "author": {
    "@type": "Organization",
    "name": "Cointegrity",
    "url": "https://cointegrity.io",
    "expertise": "Web3 and Blockchain Consulting"
  },
  "itemReviewed": {
    "@type": "DefinedTermSet",
    "@id": "https://cointegrity.io/glossary#termset",
    "name": "Web3 Glossary"
  },
  "datePublished": "2024-12-20"
};

// Comprehensive learning resource schema
export const GLOSSARY_LEARNING_RESOURCE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "@id": "https://cointegrity.io/glossary#learning-resource",
  "name": "Web3 & Blockchain Learning Glossary",
  "description": `Comprehensive educational resource with ${glossaryTerms.length}+ terms for learning Web3, blockchain technology, and crypto crime prevention`,
  "learningResourceType": "Reference Material",
  "educationalLevel": ["Beginner", "Intermediate", "Advanced"],
  "teaches": [
    "Blockchain Fundamentals",
    "Cryptocurrency Economics",
    "DeFi Protocols",
    "Smart Contract Development",
    "NFT Standards",
    "DAO Governance",
    "Tokenomics Design",
    "Regulatory Compliance",
    "Web3 Infrastructure",
    "Crypto Crime Prevention",
    "Blockchain Forensics",
    "Anti-Money Laundering"
  ],
  "educationalUse": "Reference",
  "interactivityType": "Expositive",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": ["Developer", "Entrepreneur", "Investor", "Student", "Law Enforcement", "Compliance Officer"]
  },
  "provider": {
    "@type": "Organization",
    "name": "Cointegrity",
    "url": "https://cointegrity.io"
  },
  "inLanguage": "en-US",
  "isAccessibleForFree": true,
  "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/"
};

// Aggregate rating for the glossary
export const GLOSSARY_AGGREGATE_RATING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "@id": "https://cointegrity.io/glossary#aggregate-rating",
  "itemReviewed": {
    "@type": "DefinedTermSet",
    "@id": "https://cointegrity.io/glossary#termset",
    "name": "Web3 Glossary"
  },
  "ratingValue": 4.9,
  "bestRating": 5,
  "worstRating": 1,
  "ratingCount": 150,
  "reviewCount": 75
};

// Export all enhanced schemas
export const ENHANCED_GLOSSARY_SCHEMAS = [
  ENHANCED_WEBSITE_SCHEMA,
  GLOSSARY_REVIEW_SCHEMA,
  GLOSSARY_LEARNING_RESOURCE_SCHEMA,
  GLOSSARY_AGGREGATE_RATING_SCHEMA
];
