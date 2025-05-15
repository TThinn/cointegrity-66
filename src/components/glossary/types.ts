
import { GlossaryTerm as SourceGlossaryTerm } from "@/data/glossaryTerms";

// Extract category types from the source definition
export type CategoryType = SourceGlossaryTerm['categories'][0];

// Category metadata for display
export const categoryMeta = [
  { value: "all", label: "All Terms", description: "Browse all glossary terms" },
  { value: "blockchain", label: "Blockchain", description: "Core blockchain concepts" },
  { value: "web3", label: "Web3", description: "Decentralized web concepts" },
  { value: "ai", label: "AI", description: "Artificial intelligence concepts" },
  { value: "regulatory", label: "Regulatory", description: "Compliance and regulation" },
  { value: "tokenomics", label: "Tokenomics", description: "Token economics" },
  { value: "gaming", label: "Gaming", description: "Blockchain gaming" },
  { value: "strategy", label: "Strategy", description: "Strategic implementation" },
  { value: "defi", label: "DeFi", description: "Decentralized finance" },
  { value: "nft", label: "NFTs", description: "Non-fungible tokens" },
  { value: "dao", label: "DAOs", description: "Decentralized organizations" },
  { value: "identity", label: "Identity", description: "Digital identity solutions" },
  { value: "infrastructure", label: "Infrastructure", description: "Web3 infrastructure" },
  { value: "security", label: "Security", description: "Blockchain security" },
  { value: "metaverse", label: "Metaverse", description: "Virtual worlds" },
  // Add display entries for original categories
  { value: "blockchain_technology", label: "Blockchain Technology", description: "Foundational blockchain concepts" },
  { value: "cryptocurrency_types", label: "Cryptocurrency Types", description: "Different types of cryptocurrencies" },
  { value: "cefi", label: "CeFi", description: "Centralized finance" },
  { value: "nfts_collectibles", label: "NFTs & Collectibles", description: "Non-fungible tokens and digital collectibles" },
  { value: "exchanges_trading", label: "Exchanges & Trading", description: "Cryptocurrency exchanges and trading" },
  { value: "wallets_security", label: "Wallets & Security", description: "Cryptocurrency wallets and security" },
  { value: "mining_staking", label: "Mining & Staking", description: "Cryptocurrency mining and staking" },
  { value: "tax", label: "Tax", description: "Cryptocurrency taxation" },
  { value: "trading_strategy", label: "Trading Strategy", description: "Cryptocurrency trading strategies" },
  { value: "hardware_security", label: "Hardware Security", description: "Hardware security for cryptocurrencies" },
  { value: "crypto_economics", label: "Cryptoeconomics", description: "Economic principles of cryptocurrencies" },
  { value: "regulatory_frameworks", label: "Regulatory Frameworks", description: "Legal frameworks for cryptocurrencies" },
  { value: "tokenization", label: "Tokenization", description: "Converting assets to tokens" },
  { value: "layer2_solutions", label: "Layer 2 Solutions", description: "Scaling solutions built on top of blockchains" },
  { value: "compliance", label: "Compliance", description: "Regulatory compliance in crypto" },
  { value: "crypto_history", label: "Crypto History", description: "History of cryptocurrency" },
  { value: "infrastructure_applications", label: "Infrastructure Applications", description: "Applications built on blockchain infrastructure" },
  { value: "gaming_metaverse", label: "Gaming & Metaverse", description: "Gaming and metaverse applications" },
  { value: "social_community", label: "Social & Community", description: "Social and community aspects of crypto" },
  { value: "ai_data", label: "AI & Data", description: "AI and data in blockchain" },
  { value: "depin", label: "DePIN", description: "Decentralized Physical Infrastructure Networks" },
  { value: "cross_chain", label: "Cross-Chain", description: "Cross-chain technologies and solutions" },
  { value: "smart_contracts", label: "Smart Contracts", description: "Blockchain-based contracts" },
  { value: "technical_analysis", label: "Technical Analysis", description: "Market analysis techniques" },
  { value: "privacy_technology", label: "Privacy Technology", description: "Technology for preserving privacy" }
];

// Define a data source selection type - simplified to only include available sources
export type DataSourceType = "original";

// Interface for glossary term structure - now extends the source definition
export interface GlossaryTerm extends SourceGlossaryTerm {}

