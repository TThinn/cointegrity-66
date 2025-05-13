
// Glossary structured data using Schema.org DefinedTermSet and DefinedTerm markup

import { glossaryTerms } from "@/data/glossaryTerms";

// Create the base DefinedTermSet schema for the entire glossary
export const GLOSSARY_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://cointegrity.io/glossary#termset",
  "name": "Web3, Blockchain & AI Glossary",
  "description": "Comprehensive glossary of terms related to Web3, blockchain technology, artificial intelligence, regulatory compliance, and tokenomics by Cointegrity consultancy.",
  "inLanguage": "en-US"
};

// Generate individual DefinedTerm schemas for each glossary term
export const GLOSSARY_TERM_STRUCTURED_DATA = glossaryTerms.map(term => ({
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "@id": `https://cointegrity.io/glossary#${term.term.toLowerCase().replace(/\s+/g, '-')}`,
  "name": term.term,
  "description": term.definition.replace(/<[^>]*>/g, ''), // Remove HTML tags for structured data
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "@id": "https://cointegrity.io/glossary#termset"
  },
  "termCode": term.categories.join(', ')
}));

// Create category-specific DefinedTermSet schemas
const createCategoryTermSet = (category: string, displayName: string, description: string) => {
  const categoryTerms = glossaryTerms.filter(term => 
    term.categories.includes(category as any)
  );
  
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `https://cointegrity.io/glossary#${category}`,
    "name": `${displayName} Glossary`,
    "description": description,
    "inLanguage": "en-US",
    "hasPart": categoryTerms.map(term => ({
      "@type": "DefinedTerm",
      "@id": `https://cointegrity.io/glossary#${term.term.toLowerCase().replace(/\s+/g, '-')}`
    }))
  };
};

// Category-specific term sets
export const CATEGORY_TERM_SETS = [
  createCategoryTermSet(
    "blockchain", 
    "Blockchain Technology",
    "Essential blockchain terminology explaining distributed ledger technology, cryptocurrencies, and consensus mechanisms."
  ),
  createCategoryTermSet(
    "web3", 
    "Web3",
    "Key concepts in the decentralized web including dApps, DAOs, and digital ownership paradigms."
  ),
  createCategoryTermSet(
    "ai", 
    "Artificial Intelligence",
    "Terminology related to AI technologies including large language models, machine learning, and AI integration with blockchain."
  ),
  createCategoryTermSet(
    "regulatory", 
    "Regulatory & Compliance",
    "Important terms related to blockchain regulation, compliance frameworks, and digital asset laws like MiCA and FATF guidelines."
  ),
  createCategoryTermSet(
    "tokenomics", 
    "Tokenomics",
    "Concepts explaining token economics, distribution models, utility, and value creation mechanisms in crypto projects."
  ),
  createCategoryTermSet(
    "gaming", 
    "Blockchain Gaming",
    "Terminology for blockchain-based gaming, including play-to-earn models, in-game assets, and NFT integration."
  )
];

// Export all glossary structured data
export const ALL_GLOSSARY_STRUCTURED_DATA = [
  GLOSSARY_STRUCTURED_DATA,
  ...GLOSSARY_TERM_STRUCTURED_DATA,
  ...CATEGORY_TERM_SETS
];
