
import { GlossaryTerm } from "./types";

export const defiTerms: GlossaryTerm[] = [
  {
    term: "DeFi",
    definition: "Decentralized Finance - a financial ecosystem built on blockchain technology that eliminates intermediaries and provides open access to financial services.",
    categories: ["defi"],
    related: ["DEX", "Yield Farming", "Liquidity Pool"]
  },
  {
    term: "DEX",
    definition: "Decentralized Exchange - a peer-to-peer marketplace where users can trade cryptocurrencies without a central authority.",
    categories: ["defi", "exchanges_trading"],
    related: ["AMM", "Liquidity Pool", "Slippage"]
  },
  {
    term: "Yield Farming",
    definition: "The practice of earning rewards by providing liquidity to DeFi protocols, often involving complex strategies across multiple platforms.",
    categories: ["defi"],
    related: ["Liquidity Mining", "LP Token", "APY"]
  },
  {
    term: "Liquidity Pool",
    definition: "A collection of funds locked in a smart contract that provides liquidity for decentralized trading and lending.",
    categories: ["defi"],
    related: ["AMM", "LP Token", "Impermanent Loss"]
  },
  {
    term: "AMM",
    definition: "Automated Market Maker - a protocol that uses mathematical formulas to price assets and enable trading without traditional order books.",
    categories: ["defi"],
    related: ["DEX", "Liquidity Pool", "Slippage"]
  }
];
