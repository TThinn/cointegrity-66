export type GlossaryTerm = {
  term: string;
  definition: string;
  categories: ("blockchain_technology" | "cryptocurrency_types" | "web3" | "defi" | "cefi" | "nfts_collectibles" | "tokenomics" | "exchanges_trading" | "wallets_security" | "mining_staking" | "regulatory_frameworks" | "compliance" | "crypto_history" | "infrastructure_applications" | "gaming_metaverse" | "social_community" | "ai_data" | "depin" | "cross_chain" | "smart_contracts" | "technical_analysis" | "privacy_technology" | "layer2_solutions" | "tokenization" | "crypto_economics")[];
  related?: string[];
  trending?: number; // 1-10 scale, 10 being most trending
};

// Lazy load glossary terms to reduce initial bundle size
export const loadGlossaryTerms = async (): Promise<GlossaryTerm[]> => {
  const { glossaryTerms } = await import('./glossaryTerms');
  return glossaryTerms;
};