
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
  },
  {
    term: "Cryptocurrency",
    definition: "A digital or virtual currency that uses cryptography for security and operates independently of a central bank.",
    categories: ["cryptocurrency_types"],
    related: ["Digital Currency", "Cryptography", "Decentralization"]
  },
  {
    term: "Token",
    definition: "A digital asset created and managed on an existing blockchain platform, representing various utilities or assets.",
    categories: ["cryptocurrency_types"],
    related: ["Cryptocurrency", "Smart Contract", "Utility"]
  },
  {
    term: "Privacy Coin",
    definition: "Cryptocurrencies designed to provide enhanced privacy and anonymity for transactions.",
    categories: ["cryptocurrency_types", "privacy_technology"],
    related: ["Monero", "Zcash", "Privacy"]
  },
  {
    term: "Central Bank Digital Currency",
    definition: "Digital versions of a country's fiat currency issued and controlled by the central bank.",
    categories: ["cryptocurrency_types", "regulatory_frameworks"],
    related: ["CBDC", "Digital Currency", "Government"]
  },
  {
    term: "Utility Token",
    definition: "A cryptocurrency designed to provide access to a specific product or service within a blockchain ecosystem.",
    categories: ["cryptocurrency_types", "tokenomics"],
    related: ["Token Utility", "Ecosystem", "Use Case"]
  }
];
