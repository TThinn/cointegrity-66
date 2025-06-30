
// Glossary structured data using Schema.org DefinedTermSet and DefinedTerm markup

import { glossaryTerms } from "@/data/glossaryTerms";

// Create the base DefinedTermSet schema for the entire glossary
export const GLOSSARY_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://cointegrity.io/glossary#termset",
  "name": "Web3, Blockchain & AI Glossary",
  "description": "Comprehensive glossary of terms related to Web3, blockchain technology, artificial intelligence, regulatory compliance, crypto crime prevention, and tokenomics by Cointegrity consultancy.",
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

// Helper function to create category-specific term sets
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

// Get unique categories from glossary terms - UPDATED WITH CRYPTO CRIME
const getUniqueCategories = (): Array<{
  key: string;
  displayName: string;
  description: string;
}> => {
  // This is where you define all your categories with their descriptions
  return [
    {
      key: "blockchain",
      displayName: "Blockchain Technology",
      description: "Essential blockchain terminology explaining distributed ledger technology, cryptocurrencies, and consensus mechanisms."
    },
    {
      key: "web3",
      displayName: "Web3",
      description: "Key concepts in the decentralized web including dApps, DAOs, and digital ownership paradigms."
    },
    {
      key: "ai",
      displayName: "Artificial Intelligence",
      description: "Terminology related to AI technologies including large language models, machine learning, and AI integration with blockchain."
    },
    {
      key: "regulatory",
      displayName: "Regulatory & Compliance",
      description: "Important terms related to blockchain regulation, compliance frameworks, and digital asset laws like MiCA and FATF guidelines."
    },
    {
      key: "tokenomics",
      displayName: "Tokenomics",
      description: "Concepts explaining token economics, distribution models, utility, and value creation mechanisms in crypto projects."
    },
    {
      key: "gaming",
      displayName: "Blockchain Gaming",
      description: "Terminology for blockchain-based gaming, including play-to-earn models, in-game assets, and NFT integration."
    },
    {
      key: "strategy",
      displayName: "Strategic Implementation",
      description: "Terms related to strategic planning and implementation of blockchain and Web3 technologies in business contexts."
    },
    {
      key: "defi",
      displayName: "Decentralized Finance",
      description: "Terminology related to DeFi protocols, yield farming, lending platforms, and decentralized exchanges."
    },
    {
      key: "nft",
      displayName: "Non-Fungible Tokens",
      description: "Terms explaining NFT technology, marketplaces, standards, and use cases beyond digital art."
    },
    {
      key: "dao",
      displayName: "Decentralized Autonomous Organizations",
      description: "Concepts related to DAO governance, treasury management, voting mechanisms, and organizational structures."
    },
    {
      key: "identity",
      displayName: "Digital Identity",
      description: "Terms related to self-sovereign identity, decentralized identifiers, verifiable credentials, and privacy technologies."
    },
    {
      key: "infrastructure",
      displayName: "Web3 Infrastructure",
      description: "Technical terms related to blockchain nodes, consensus algorithms, layer 2 solutions, and network architecture."
    },
    {
      key: "security",
      displayName: "Blockchain Security",
      description: "Terms related to cryptographic security, smart contract audits, exploit prevention, and blockchain forensics."
    },
    {
      key: "metaverse",
      displayName: "Metaverse",
      description: "Terminology for virtual worlds, digital real estate, interoperability standards, and metaverse economics."
    },
    {
      key: "crypto_crime",
      displayName: "Crypto Crime",
      description: "Terms related to cryptocurrency-based criminal activities, money laundering, sanctions evasion, and blockchain forensics for law enforcement."
    }
    // Add all your new categories here with appropriate descriptions
  ];
};

// Generate category-specific term sets dynamically
export const CATEGORY_TERM_SETS = getUniqueCategories().map(category => 
  createCategoryTermSet(category.key, category.displayName, category.description)
);

// Export all glossary structured data
export const ALL_GLOSSARY_STRUCTURED_DATA = [
  GLOSSARY_STRUCTURED_DATA,
  ...GLOSSARY_TERM_STRUCTURED_DATA,
  ...CATEGORY_TERM_SETS
];
