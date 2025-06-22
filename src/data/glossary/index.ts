
// Main glossary terms index - combines all category files
import { GlossaryTerm } from "./types";
import { blockchainTechnologyTerms } from "./blockchainTechnology";
import { web3Terms } from "./web3";
import { defiTerms } from "./defi";
import { nftTerms } from "./nfts";
import { daoTerms } from "./dao";
import { tokenomicsTerms } from "./tokenomics";
import { regulatoryTerms } from "./regulatory";
import { aiTerms } from "./ai";
import { gamingTerms } from "./gaming";

// Combine all terms from different categories
export const glossaryTerms: GlossaryTerm[] = [
  ...blockchainTechnologyTerms,
  ...web3Terms,
  ...defiTerms,
  ...nftTerms,
  ...daoTerms,
  ...tokenomicsTerms,
  ...regulatoryTerms,
  ...aiTerms,
  ...gamingTerms
];

// Export types for use in components
export type { GlossaryTerm, CategoryType } from "./types";

// Export individual category arrays for specific use cases
export {
  blockchainTechnologyTerms,
  web3Terms,
  defiTerms,
  nftTerms,
  daoTerms,
  tokenomicsTerms,
  regulatoryTerms,
  aiTerms,
  gamingTerms
};
