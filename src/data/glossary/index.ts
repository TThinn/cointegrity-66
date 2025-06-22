
// Main glossary terms index - combines all category files
import { GlossaryTerm } from "./types";
import { blockchainTechnologyTerms } from "./blockchainTechnology";
import { cryptocurrencyTerms } from "./cryptocurrency";
import { web3Terms } from "./web3";
import { defiTerms } from "./defi";
import { cefiTerms } from "./cefi";
import { nftTerms } from "./nfts";
import { daoTerms } from "./dao";
import { tokenomicsTerms } from "./tokenomics";
import { exchangesTerms } from "./exchanges";
import { walletsTerms } from "./wallets";
import { miningTerms } from "./mining";
import { regulatoryTerms } from "./regulatory";
import { complianceTerms } from "./compliance";
import { historyTerms } from "./history";
import { infrastructureTerms } from "./infrastructure";
import { gamingTerms } from "./gaming";
import { socialTerms } from "./social";
import { aiTerms } from "./ai";
import { depinTerms } from "./depin";
import { crossChainTerms } from "./crosschain";
import { smartContractTerms } from "./smartcontracts";
import { technicalAnalysisTerms } from "./technical";
import { privacyTerms } from "./privacy";
import { layer2Terms } from "./layer2";
import { tokenizationTerms } from "./tokenization";
import { cryptoEconomicsTerms } from "./cryptoeconomics";

// Combine all terms from different categories
export const glossaryTerms: GlossaryTerm[] = [
  ...blockchainTechnologyTerms,
  ...cryptocurrencyTerms,
  ...web3Terms,
  ...defiTerms,
  ...cefiTerms,
  ...nftTerms,
  ...daoTerms,
  ...tokenomicsTerms,
  ...exchangesTerms,
  ...walletsTerms,
  ...miningTerms,
  ...regulatoryTerms,
  ...complianceTerms,
  ...historyTerms,
  ...infrastructureTerms,
  ...gamingTerms,
  ...socialTerms,
  ...aiTerms,
  ...depinTerms,
  ...crossChainTerms,
  ...smartContractTerms,
  ...technicalAnalysisTerms,
  ...privacyTerms,
  ...layer2Terms,
  ...tokenizationTerms,
  ...cryptoEconomicsTerms
];

// Export types for use in components
export type { GlossaryTerm, CategoryType } from "./types";

// Export individual category arrays for specific use cases
export {
  blockchainTechnologyTerms,
  cryptocurrencyTerms,
  web3Terms,
  defiTerms,
  cefiTerms,
  nftTerms,
  daoTerms,
  tokenomicsTerms,
  exchangesTerms,
  walletsTerms,
  miningTerms,
  regulatoryTerms,
  complianceTerms,
  historyTerms,
  infrastructureTerms,
  gamingTerms,
  socialTerms,
  aiTerms,
  depinTerms,
  crossChainTerms,
  smartContractTerms,
  technicalAnalysisTerms,
  privacyTerms,
  layer2Terms,
  tokenizationTerms,
  cryptoEconomicsTerms
};
