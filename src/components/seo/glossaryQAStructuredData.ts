
import { glossaryTerms } from "@/data/glossaryTerms";

// Generate QAPage structured data for glossary terms with questions
export const generateGlossaryQAStructuredData = () => {
  // Find terms that would work well as Q&A pairs
  const qaTerms = glossaryTerms
    .filter(term => term.definition && term.definition.length > 100)
    .slice(0, 50) // Limit to top 50 terms for Q&A
    .map(term => ({
      "@context": "https://schema.org",
      "@type": "QAPage",
      "@id": `https://cointegrity.io/glossary/${term.term.toLowerCase().replace(/[^a-z0-9]/g, '-')}/#qa`,
      "name": `Q&A: ${term.term}`,
      "description": `Question and answer about ${term.term} in Web3 and blockchain context`,
      "mainEntity": {
        "@type": "Question",
        "@id": `https://cointegrity.io/glossary/${term.term.toLowerCase().replace(/[^a-z0-9]/g, '-')}/#question`,
        "name": `What is ${term.term}?`,
        "text": `What is ${term.term} in the context of Web3 and blockchain technology?`,
        "answerCount": 1,
        "datePublished": "2024-01-01T00:00:00Z",
        "author": {
          "@type": "Organization",
          "name": "Cointegrity",
          "url": "https://cointegrity.io",
          "expertise": "Web3 and Blockchain Consulting"
        },
        "acceptedAnswer": {
          "@type": "Answer",
          "@id": `https://cointegrity.io/glossary/${term.term.toLowerCase().replace(/[^a-z0-9]/g, '-')}/#answer`,
          "url": `https://cointegrity.io/glossary/${term.term.toLowerCase().replace(/[^a-z0-9]/g, '-')}/`,
          "text": term.definition.replace(/<[^>]*>/g, ''), // Remove HTML tags
          "dateCreated": "2024-01-01T00:00:00Z",
          "upvoteCount": 1,
          "author": {
            "@type": "Organization",
            "name": "Cointegrity",
            "url": "https://cointegrity.io",
            "expertise": "Web3 and Blockchain Consulting"
          }
        },
        "suggestedAnswer": term.related ? term.related.slice(0, 3).map(relatedTerm => ({
          "@type": "Answer",
          "text": `See also: ${relatedTerm}`,
          "datePublished": "2024-01-01T00:00:00Z",
          "author": {
            "@type": "Organization",
            "name": "Cointegrity",
            "url": "https://cointegrity.io"
          }
        })) : []
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://cointegrity.io"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Glossary",
            "item": "https://cointegrity.io/glossary/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": term.term,
            "item": `https://cointegrity.io/glossary/${term.term.toLowerCase().replace(/[^a-z0-9]/g, '-')}/`
          }
        ]
      }
    }));

  return qaTerms;
};

// Comprehensive QAPage for the entire glossary
export const GLOSSARY_QAPAGE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  "@id": "https://cointegrity.io/glossary/#main-qa",
  "name": "Web3 Glossary Q&A",
  "description": "Comprehensive questions and answers about Web3, blockchain, and cryptocurrency terminology",
  "mainEntity": {
    "@type": "Question",
    "name": "What is included in the world's largest Web3 glossary?",
    "text": "What terms and concepts are covered in the comprehensive Web3 glossary?",
    "answerCount": 1,
    "datePublished": "2024-01-01T00:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "Cointegrity",
      "url": "https://cointegrity.io",
      "expertise": "Web3 and Blockchain Consulting"
    },
    "acceptedAnswer": {
      "@type": "Answer",
      "url": "https://cointegrity.io/glossary/",
      "text": `The glossary includes over ${glossaryTerms.length} expert-curated terms covering blockchain technology, cryptocurrency types, DeFi protocols, NFTs, smart contracts, tokenomics, regulatory frameworks, and emerging Web3 technologies. Each term includes comprehensive definitions, related concepts, and practical applications.`,
      "dateCreated": "2024-01-01T00:00:00Z",
      "author": {
        "@type": "Organization",
        "name": "Cointegrity",
        "url": "https://cointegrity.io",
        "expertise": "Web3 and Blockchain Consulting"
      }
    }
  }
};

// Export QA structured data
export const GLOSSARY_QA_STRUCTURED_DATA = generateGlossaryQAStructuredData();
