
// Define category types for proper filtering
export type CategoryType = 
  | "blockchain" 
  | "web3" 
  | "ai" 
  | "regulatory" 
  | "tokenomics" 
  | "gaming" 
  | "strategy"
  | "defi"
  | "nft"
  | "dao"
  | "identity"
  | "infrastructure"
  | "security"
  | "metaverse"
  // Original glossary categories
  | "blockchain_technology"
  | "cryptocurrency_types"
  | "cefi"
  | "nfts_collectibles"
  | "exchanges_trading"
  | "wallets_security"
  | "mining_staking"
  | "tax"  // Added this missing category
  | "trading_strategy"  // Added this missing category
  | "hardware_security"  // Added this missing category
  | "crypto_economics"
  | "regulatory_frameworks"
  | "tokenization"
  | "layer2_solutions"
  | "compliance";

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
  { value: "compliance", label: "Compliance", description: "Regulatory compliance in crypto" }
];

// Define a data source selection type - simplified to only include available sources
export type DataSourceType = "original";

// Interface for glossary term structure
export interface GlossaryTerm {
  term: string;
  definition: string;
  categories: CategoryType[];
  related?: string[];
}
