
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
    term: "CBDC",
    definition: "Central Bank Digital Currency - a digital form of a country's fiat currency issued by the central bank.",
    categories: ["cryptocurrency_types", "regulatory_frameworks"],
    related: ["Central Bank Digital Currency", "Digital Currency", "Fiat"]
  },
  {
    term: "Dogecoin",
    definition: "A cryptocurrency created as a joke based on the popular 'Doge' meme, which has gained significant community support.",
    categories: ["cryptocurrency_types"],
    related: ["Memecoin", "Community Token", "Altcoin"]
  },
  {
    term: "Litecoin",
    definition: "A peer-to-peer cryptocurrency created as a 'lighter' version of Bitcoin with faster transaction times.",
    categories: ["cryptocurrency_types"],
    related: ["Bitcoin", "Altcoin", "Scrypt"]
  },
  {
    term: "Ripple",
    definition: "Both a digital payment protocol and cryptocurrency (XRP) designed for fast, low-cost international money transfers.",
    categories: ["cryptocurrency_types"],
    related: ["XRP", "Payment Protocol", "Cross-border"]
  },
  {
    term: "Monero",
    definition: "A privacy-focused cryptocurrency that uses advanced cryptographic techniques to obscure transaction details.",
    categories: ["cryptocurrency_types", "privacy_technology"],
    related: ["Privacy Coin", "Ring Signatures", "Anonymity"]
  },
  {
    term: "Zcash",
    definition: "A cryptocurrency that offers enhanced privacy through zero-knowledge proofs while maintaining a public blockchain.",
    categories: ["cryptocurrency_types", "privacy_technology"],
    related: ["Privacy Coin", "zk-SNARKs", "Zero-Knowledge"]
  },
  {
    term: "Cardano",
    definition: "A blockchain platform focused on sustainability, scalability, and academic research-based development.",
    categories: ["cryptocurrency_types"],
    related: ["ADA", "Proof of Stake", "Academic Research"]
  },
  {
    term: "Polkadot",
    definition: "A multi-chain blockchain platform that enables different blockchains to transfer messages and value.",
    categories: ["cryptocurrency_types"],
    related: ["Interoperability", "Parachain", "Cross-Chain"]
  },
  {
    term: "Chainlink",
    definition: "A decentralized oracle network that connects smart contracts with real-world data.",
    categories: ["cryptocurrency_types", "smart_contracts"],
    related: ["Oracle", "Smart Contract", "External Data"]
  },
  {
    term: "Binance Coin",
    definition: "The native cryptocurrency of the Binance exchange, used for trading fee discounts and other utilities.",
    categories: ["cryptocurrency_types"],
    related: ["BNB", "Exchange Token", "Utility Token"]
  },
  {
    term: "Solana",
    definition: "A high-performance blockchain platform designed for decentralized applications and crypto-currencies.",
    categories: ["cryptocurrency_types"],
    related: ["SOL", "High Throughput", "Proof of History"]
  }
];
