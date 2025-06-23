
import { glossaryTerms } from "@/data/glossaryTerms";
import { categoryMeta } from "@/components/glossary/types";

// Generate ItemList structured data for different term collections
export const generateGlossaryItemListStructuredData = () => {
  // Create ItemList for all terms
  const allTermsItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://cointegrity.io/glossary#all-terms",
    "name": "Complete Web3 Glossary Terms",
    "description": `Complete list of ${glossaryTerms.length}+ Web3, blockchain, and cryptocurrency terms`,
    "numberOfItems": glossaryTerms.length,
    "itemListOrder": "Alphabetical",
    "itemListElement": glossaryTerms.slice(0, 100).map((term, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": term.term,
      "description": term.definition.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
      "url": `https://cointegrity.io/glossary#${term.term.toLowerCase().replace(/\s+/g, '-')}`,
      "item": {
        "@type": "DefinedTerm",
        "@id": `https://cointegrity.io/glossary#${term.term.toLowerCase().replace(/\s+/g, '-')}`,
        "name": term.term,
        "description": term.definition.replace(/<[^>]*>/g, '')
      }
    }))
  };

  // Create category-specific ItemLists
  const categoryItemLists = categoryMeta
    .filter(cat => cat.value !== "all")
    .slice(0, 10) // Limit to top 10 categories
    .map(category => {
      const categoryTerms = glossaryTerms.filter(term => 
        term.categories.includes(category.value as any)
      );
      
      return {
        "@context": "https://schema.org", 
        "@type": "ItemList",
        "@id": `https://cointegrity.io/glossary#${category.value}-terms`,
        "name": `${category.label} Terms`,
        "description": `${category.description} - ${categoryTerms.length} terms`,
        "numberOfItems": categoryTerms.length,
        "itemListOrder": "Alphabetical",
        "itemListElement": categoryTerms.slice(0, 20).map((term, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": term.term,
          "description": term.definition.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          "url": `https://cointegrity.io/glossary#${term.term.toLowerCase().replace(/\s+/g, '-')}`,
          "item": {
            "@type": "DefinedTerm",
            "@id": `https://cointegrity.io/glossary#${term.term.toLowerCase().replace(/\s+/g, '-')}`,
            "name": term.term,
            "description": term.definition.replace(/<[^>]*>/g, '')
          }
        }))
      };
    });

  return [allTermsItemList, ...categoryItemLists];
};

// Popular terms ItemList
export const POPULAR_TERMS_ITEMLIST = {
  "@context": "https://schema.org",
  "@type": "ItemList", 
  "@id": "https://cointegrity.io/glossary#popular-terms",
  "name": "Most Popular Web3 Terms",
  "description": "The most commonly searched and referenced Web3 and blockchain terms",
  "numberOfItems": 20,
  "itemListOrder": "Descending",
  "itemListElement": [
    "Blockchain", "Cryptocurrency", "Bitcoin", "Ethereum", "Smart Contract",
    "DeFi", "NFT", "DAO", "Web3", "Tokenomics", "Staking", "Mining",
    "Wallet", "Exchange", "Yield Farming", "Layer 2", "Consensus",
    "Decentralization", "Private Key", "Public Key"
  ].map((term, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": term,
    "url": `https://cointegrity.io/glossary#${term.toLowerCase().replace(/\s+/g, '-')}`
  }))
};

// Export all ItemList structured data
export const GLOSSARY_ITEMLIST_STRUCTURED_DATA = generateGlossaryItemListStructuredData();
