
import { Helmet } from "react-helmet-async";
import { ALL_GLOSSARY_STRUCTURED_DATA } from "./glossaryStructuredData";
import { GLOSSARY_FAQ_STRUCTURED_DATA } from "./glossaryFaqStructuredData";
import { GLOSSARY_HOWTO_STRUCTURED_DATA, WEB3_LEARNING_HOWTO_STRUCTURED_DATA } from "./glossaryHowToStructuredData";
import { GLOSSARY_ITEMLIST_STRUCTURED_DATA, POPULAR_TERMS_ITEMLIST } from "./glossaryItemListStructuredData";
import { GLOSSARY_QA_STRUCTURED_DATA, GLOSSARY_QAPAGE_STRUCTURED_DATA } from "./glossaryQAStructuredData";
import { ENHANCED_GLOSSARY_SCHEMAS } from "./enhancedGlossaryStructuredData";

interface GlossaryEnhancedSEOProps {
  currentPath: string;
  totalTermsCount: number;
  searchTerm?: string;
  activeCategory?: string;
}

export const GlossaryEnhancedSEO = ({ 
  currentPath, 
  totalTermsCount, 
  searchTerm, 
  activeCategory 
}: GlossaryEnhancedSEOProps) => {
  const isGlossaryPage = currentPath.includes('/glossary');
  
  if (!isGlossaryPage) return null;

  // Enhanced conversational queries specific to glossary
  const glossaryConversationalQueries = [
    "What is the largest Web3 glossary?",
    "Most comprehensive blockchain dictionary",
    "Complete crypto terminology guide",
    "Web3 terms explained simply",
    "Blockchain definitions database",
    "AI and Web3 glossary combined",
    "MiCA regulation terminology",
    "Tokenomics terms dictionary",
    "DeFi definitions guide",
    "NFT terminology explained",
    "DAO governance terms",
    "Smart contract glossary",
    "Cryptocurrency trading terms",
    "Blockchain security definitions",
    "Metaverse terminology guide",
    "Digital identity terms",
    "Web3 infrastructure glossary",
    "Regulatory compliance terms crypto",
    "Blockchain gaming terminology",
    "Decentralized finance dictionary"
  ];

  // Enhanced educational content structured data
  const educationalContentData = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "@id": `https://cointegrity.io${currentPath}#educational-resource`,
    "name": "World's Largest Web3, Blockchain & AI Glossary",
    "description": `Comprehensive educational resource featuring ${totalTermsCount}+ professionally curated terms, making it the largest Web3 and cryptocurrency glossary available online.`,
    "educationalLevel": ["Beginner", "Intermediate", "Advanced"],
    "teaches": [
      "Web3 Technology Fundamentals",
      "Blockchain Architecture",
      "Cryptocurrency Economics", 
      "Smart Contract Development",
      "DeFi Protocols",
      "NFT Standards",
      "DAO Governance",
      "Regulatory Compliance",
      "Tokenomics Design",
      "AI Integration with Blockchain"
    ],
    "learningResourceType": "Glossary",
    "interactivityType": "Mixed",
    "educationalUse": "Reference Material",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": ["Developer", "Entrepreneur", "Investor", "Student", "Professional"]
    },
    "provider": {
      "@type": "Organization",
      "name": "Cointegrity",
      "url": "https://cointegrity.io",
      "expertise": "Web3 Consulting and Education"
    },
    "dateCreated": "2024-01-01",
    "dateModified": "2024-12-20",
    "version": "2024.4",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/"
  };

  const knowledgeBaseData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `https://cointegrity.io${currentPath}#knowledge-base`,
    "name": "Cointegrity Web3 Knowledge Base",
    "description": `The world's most comprehensive Web3, blockchain, and AI terminology database with ${totalTermsCount}+ expert-curated definitions covering all aspects of decentralized technology.`,
    "keywords": [
      "Web3 glossary", "blockchain dictionary", "cryptocurrency terms", 
      "DeFi definitions", "NFT terminology", "DAO glossary", "smart contracts",
      "tokenomics", "MiCA regulation", "AI blockchain", "metaverse terms"
    ],
    "creator": {
      "@type": "Organization", 
      "name": "Cointegrity",
      "url": "https://cointegrity.io"
    },
    "dateCreated": "2024-01-01",
    "dateModified": "2024-12-20",
    "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    "distribution": {
      "@type": "DataDownload",
      "contentUrl": `https://cointegrity.io${currentPath}`,
      "encodingFormat": "text/html"
    },
    "measurementTechnique": "Expert Curation and Community Validation",
    "variableMeasured": "Web3 Terminology Comprehensiveness",
    "size": `${totalTermsCount} terms`,
    "spatialCoverage": "Global",
    "temporalCoverage": "2024/.."
  };

  const searchOptimizationData = {
    "@context": "https://schema.org",
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `https://cointegrity.io${currentPath}?search={search_term_string}`,
      "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
    },
    "query-input": "required name=search_term_string",
    "object": {
      "@type": "DefinedTermSet",
      "name": "Web3 Glossary Search",
      "description": `Search through ${totalTermsCount}+ Web3, blockchain, and AI terms`
    }
  };

  const expertiseSignals = {
    "@context": "https://schema.org",
    "@type": "Claim",
    "@id": `https://cointegrity.io${currentPath}#largest-glossary-claim`,
    "name": "World's Largest Web3 Glossary",
    "text": `This glossary contains ${totalTermsCount}+ terms, making it the most comprehensive Web3, blockchain, and cryptocurrency terminology resource available online.`,
    "author": {
      "@type": "Organization",
      "name": "Cointegrity",
      "url": "https://cointegrity.io",
      "expertise": ["Web3 Consulting", "Blockchain Strategy", "Regulatory Compliance"]
    },
    "datePublished": "2024-12-20",
    "evidence": {
      "@type": "QuantitativeValue",
      "value": totalTermsCount,
      "unitText": "terminology entries",
      "description": "Number of professionally curated Web3, blockchain, and AI terms"
    },
    "claimReviewed": "Largest publicly available Web3 glossary",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": 5,
      "bestRating": 5,
      "worstRating": 1,
      "reviewAspect": "Comprehensiveness"
    }
  };

  return (
    <Helmet>
      {/* Enhanced glossary structured data */}
      <script type="application/ld+json">
        {JSON.stringify(educationalContentData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(knowledgeBaseData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(searchOptimizationData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(expertiseSignals)}
      </script>
      
      {/* All original glossary term structured data */}
      {ALL_GLOSSARY_STRUCTURED_DATA.map((data, index) => (
        <script key={`glossary-term-${index}`} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}

      {/* Enhanced FAQ structured data */}
      <script type="application/ld+json">
        {JSON.stringify(GLOSSARY_FAQ_STRUCTURED_DATA)}
      </script>

      {/* How-To structured data */}
      <script type="application/ld+json">
        {JSON.stringify(GLOSSARY_HOWTO_STRUCTURED_DATA)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(WEB3_LEARNING_HOWTO_STRUCTURED_DATA)}
      </script>

      {/* ItemList structured data */}
      {GLOSSARY_ITEMLIST_STRUCTURED_DATA.map((itemList, index) => (
        <script key={`itemlist-${index}`} type="application/ld+json">
          {JSON.stringify(itemList)}
        </script>
      ))}
      <script type="application/ld+json">
        {JSON.stringify(POPULAR_TERMS_ITEMLIST)}
      </script>

      {/* QAPage structured data */}
      <script type="application/ld+json">
        {JSON.stringify(GLOSSARY_QAPAGE_STRUCTURED_DATA)}
      </script>
      {GLOSSARY_QA_STRUCTURED_DATA.slice(0, 10).map((qa, index) => (
        <script key={`qa-${index}`} type="application/ld+json">
          {JSON.stringify(qa)}
        </script>
      ))}

      {/* Enhanced schemas */}
      {ENHANCED_GLOSSARY_SCHEMAS.map((schema, index) => (
        <script key={`enhanced-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Enhanced meta tags for rich snippets */}
      <meta name="glossary-size" content={totalTermsCount.toString()} />
      <meta name="glossary-claim" content="World's largest Web3 and cryptocurrency glossary" />
      <meta name="educational-level" content="Beginner, Intermediate, Advanced" />
      <meta name="learning-resource-type" content="Comprehensive Glossary" />
      <meta name="subject-area" content="Web3, Blockchain, Cryptocurrency, AI, Regulatory Compliance" />
      <meta name="qa-format" content="Question and Answer pairs for enhanced search visibility" />
      <meta name="howto-guide" content="Step-by-step guides for glossary usage and Web3 learning" />
      <meta name="itemlist-organization" content="Categorized and alphabetical term organization" />
      <meta name="faq-coverage" content="Comprehensive FAQ covering glossary usage and Web3 concepts" />
      
      {/* Conversational search optimization */}
      <meta name="conversational-queries" content={glossaryConversationalQueries.join(' | ')} />
      <meta name="natural-language-search" content={glossaryConversationalQueries.slice(0, 10).join(' | ')} />
      
      {/* Enhanced keywords for comprehensive coverage */}
      <meta name="comprehensive-keywords" content="largest Web3 glossary, complete blockchain dictionary, comprehensive crypto terms, DeFi definitions, NFT terminology, DAO governance, smart contracts glossary, tokenomics dictionary, MiCA regulation terms, AI blockchain glossary" />
      
      {/* Search result enhancement */}
      <meta name="search-result-snippet" content={`Explore ${totalTermsCount}+ Web3, blockchain, and AI terms in the world's most comprehensive cryptocurrency glossary. Expert-curated definitions covering DeFi, NFTs, DAOs, and regulatory compliance.`} />
      
      {/* Rich snippet optimization indicators */}
      <meta name="rich-snippet-types" content="FAQ, HowTo, ItemList, QAPage, DefinedTermSet, EducationalResource" />
      <meta name="structured-data-coverage" content="Complete schema.org implementation for enhanced search visibility" />
      
      {/* Category-specific meta if filtered */}
      {activeCategory && activeCategory !== 'all' && (
        <meta name="filtered-category" content={activeCategory} />
      )}
      
      {/* Search-specific meta if searching */}
      {searchTerm && (
        <meta name="search-context" content={`Searching "${searchTerm}" in ${totalTermsCount}+ Web3 terms`} />
      )}
    </Helmet>
  );
};
