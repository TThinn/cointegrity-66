
import { glossaryTerms } from "@/data/glossaryTerms";
import { categoryMeta } from "@/components/glossary/types";

// Generate FAQ structured data for glossary terms
export const generateGlossaryFaqStructuredData = () => {
  // Create FAQ entries from glossary terms that have questions
  const glossaryFaqEntries = glossaryTerms
    .filter(term => term.definition && term.term)
    .slice(0, 20) // Limit to top 20 terms for FAQ
    .map(term => ({
      "@type": "Question",
      "name": `What is ${term.term}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": term.definition.replace(/<[^>]*>/g, ''), // Remove HTML tags
        "author": {
          "@type": "Organization",
          "name": "Cointegrity",
          "url": "https://cointegrity.io"
        }
      }
    }));

  // Create category-specific FAQ entries
  const categoryFaqEntries = categoryMeta
    .filter(cat => cat.value !== "all")
    .slice(0, 10) // Limit to top 10 categories
    .map(category => ({
      "@type": "Question",
      "name": `What terms are included in ${category.label}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${category.description} This category includes comprehensive terminology covering all aspects of ${category.label.toLowerCase()}.`,
        "author": {
          "@type": "Organization",
          "name": "Cointegrity",
          "url": "https://cointegrity.io"
        }
      }
    }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://cointegrity.io/glossary#faq",
    "name": "Web3 Glossary FAQ",
    "description": "Frequently asked questions about Web3, blockchain, and cryptocurrency terminology",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the world's largest Web3 glossary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cointegrity's Web3 glossary contains over 1400+ expert-curated terms, making it the most comprehensive Web3, blockchain, and cryptocurrency terminology resource available online.",
          "author": {
            "@type": "Organization",
            "name": "Cointegrity",
            "url": "https://cointegrity.io"
          }
        }
      },
      {
        "@type": "Question",
        "name": "How are the glossary terms organized?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Terms are organized by categories including Blockchain Technology, DeFi, NFTs, Smart Contracts, Tokenomics, Regulatory Compliance, and more. Each term includes comprehensive definitions and related concepts.",
          "author": {
            "@type": "Organization",
            "name": "Cointegrity",
            "url": "https://cointegrity.io"
          }
        }
      },
      {
        "@type": "Question",
        "name": "Who creates and maintains the glossary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The glossary is maintained by Cointegrity's team of Web3 experts and blockchain consultants, ensuring accuracy and relevance of all terminology.",
          "author": {
            "@type": "Organization",
            "name": "Cointegrity",
            "url": "https://cointegrity.io"
          }
        }
      },
      ...glossaryFaqEntries,
      ...categoryFaqEntries
    ]
  };
};

// Export the FAQ structured data
export const GLOSSARY_FAQ_STRUCTURED_DATA = generateGlossaryFaqStructuredData();
