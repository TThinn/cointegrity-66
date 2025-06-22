
import React from "react";
import { Button } from "@/components/ui/button";
import { CategoryType } from "./types";

interface CategorySelectorProps {
  activeCategory: CategoryType | "all";
  setActiveCategory: (category: CategoryType | "all") => void;
  viewType: "grid" | "list";
}

const categoryDisplayNames: Record<CategoryType, string> = {
  blockchain_technology: "Blockchain Technology",
  cryptocurrency_types: "Cryptocurrency Types", 
  web3: "Web3",
  defi: "DeFi",
  cefi: "CeFi",
  nfts_collectibles: "NFTs & Collectibles",
  tokenomics: "Tokenomics",
  exchanges_trading: "Exchanges & Trading",
  wallets_security: "Wallets & Security",
  mining_staking: "Mining & Staking",
  regulatory_frameworks: "Regulatory Frameworks",
  compliance: "Compliance",
  crypto_history: "Crypto History",
  infrastructure_applications: "Infrastructure Applications",
  gaming_metaverse: "Gaming & Metaverse",
  social_community: "Social & Community",
  ai_data: "AI & Data",
  depin: "DePIN",
  cross_chain: "Cross-Chain",
  smart_contracts: "Smart Contracts",
  technical_analysis: "Technical Analysis",
  privacy_technology: "Privacy Technology",
  layer2_solutions: "Layer 2 Solutions",
  tokenization: "Tokenization",
  crypto_economics: "Cryptoeconomics",
  identity: "Digital Identity",
  dao: "DAO"
};

const categories: CategoryType[] = [
  "blockchain_technology", "cryptocurrency_types", "web3", "defi", "cefi", 
  "nfts_collectibles", "tokenomics", "exchanges_trading", "wallets_security", "mining_staking",
  "regulatory_frameworks", "compliance", "crypto_history", "infrastructure_applications", 
  "gaming_metaverse", "social_community", "ai_data", "depin", "cross_chain", 
  "smart_contracts", "technical_analysis", "privacy_technology", "layer2_solutions", 
  "tokenization", "crypto_economics", "identity", "dao"
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  activeCategory,
  setActiveCategory,
  viewType
}) => {
  if (viewType === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory("all")}
          className={`text-xs ${
            activeCategory === "all" 
              ? "bg-white/20 text-white border-white/40 hover:bg-white/30" 
              : "bg-white/5 backdrop-blur-sm border-white/20 text-white/80 hover:bg-white/20 hover:text-white"
          }`}
        >
          All Categories
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={`text-xs ${
              activeCategory === category 
                ? "bg-white/20 text-white border-white/40 hover:bg-white/30" 
                : "bg-white/5 backdrop-blur-sm border-white/20 text-white/80 hover:bg-white/20 hover:text-white"
            }`}
          >
            {categoryDisplayNames[category]}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => setActiveCategory("all")}
        className={`text-xs ${
          activeCategory === "all" 
            ? "bg-white/20 text-white border-white/40 hover:bg-white/30" 
            : "bg-white/5 backdrop-blur-sm border-white/20 text-white/80 hover:bg-white/20 hover:text-white"
        }`}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(category)}
          className={`text-xs ${
            activeCategory === category 
              ? "bg-white/20 text-white border-white/40 hover:bg-white/30" 
              : "bg-white/5 backdrop-blur-sm border-white/20 text-white/80 hover:bg-white/20 hover:text-white"
          }`}
        >
          {categoryDisplayNames[category]}
        </Button>
      ))}
    </div>
  );
};
