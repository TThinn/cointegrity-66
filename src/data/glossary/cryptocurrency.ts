
import { GlossaryTerm } from "./types";

export const cryptocurrencyTerms: GlossaryTerm[] = [
  {
    term: "Bitcoin",
    definition: "The first and most well-known cryptocurrency, created by Satoshi Nakamoto in 2009 as a peer-to-peer electronic cash system.",
    categories: ["cryptocurrency_types"],
    related: ["Cryptocurrency", "Blockchain", "Satoshi Nakamoto"]
  },
  {
    term: "Ethereum",
    definition: "A decentralized platform that enables smart contracts and decentralized applications (dApps) to be built and run without downtime, fraud, or interference.",
    categories: ["cryptocurrency_types"],
    related: ["Smart Contract", "dApp", "Vitalik Buterin"]
  },
  {
    term: "Altcoin",
    definition: "Any cryptocurrency other than Bitcoin, often developed to improve upon perceived limitations of Bitcoin.",
    categories: ["cryptocurrency_types"],
    related: ["Bitcoin", "Cryptocurrency", "Token"]
  },
  {
    term: "Stablecoin",
    definition: "A type of cryptocurrency designed to maintain a stable value by being pegged to a reserve asset like the US dollar or gold.",
    categories: ["cryptocurrency_types"],
    related: ["USDC", "Tether", "Fiat Currency"]
  },
  {
    term: "Memecoin",
    definition: "Cryptocurrencies inspired by internet memes or jokes, often characterized by high volatility and community-driven value.",
    categories: ["cryptocurrency_types"],
    related: ["Dogecoin", "Shiba Inu", "Community Token"]
  }
];
