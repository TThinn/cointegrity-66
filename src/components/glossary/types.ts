
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
  | "metaverse";

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
  { value: "metaverse", label: "Metaverse", description: "Virtual worlds" }
];

// Define a data source selection type
export type DataSourceType = "original" | "new" | "temp";

// Data source options for display
export const dataSources = [
  { value: "original", label: "Original Glossary Terms" },
  { value: "new", label: "New Glossary Terms" }
];

// Interface for glossary term structure
export interface GlossaryTerm {
  term: string;
  definition: string;
  categories: CategoryType[];
  related?: string[];
}
