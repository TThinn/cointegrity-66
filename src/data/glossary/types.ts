
// Type definitions for glossary terms
export interface GlossaryTerm {
  term: string;
  definition: string;
  categories: CategoryType[];
  related?: string[];
}

export type CategoryType = 
  | "blockchain_technology"
  | "cryptocurrency_types"
  | "web3"
  | "defi"
  | "cefi"
  | "nfts_collectibles"
  | "tokenomics"
  | "exchanges_trading"
  | "wallets_security"
  | "mining_staking"
  | "regulatory_frameworks"
  | "compliance"
  | "crypto_history"
  | "infrastructure_applications"
  | "gaming_metaverse"
  | "social_community"
  | "ai_data"
  | "depin"
  | "cross_chain"
  | "smart_contracts"
  | "technical_analysis"
  | "privacy_technology"
  | "layer2_solutions"
  | "tokenization"
  | "crypto_economics"
  | "identity"
  | "dao";
