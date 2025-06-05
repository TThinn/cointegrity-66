
import React from "react";
import { Button } from "@/components/ui/button";
import { CategoryType } from "./types";

interface CategorySelectorProps {
  activeCategory: CategoryType | "all";
  setActiveCategory: (category: CategoryType | "all") => void;
  viewType: "grid" | "list";
}

const categoryDisplayNames: Record<CategoryType, string> = {
  blockchain: "Blockchain",
  web3: "Web3",
  ai: "Artificial Intelligence",
  regulatory: "Regulatory",
  tokenomics: "Tokenomics",
  gaming: "Gaming",
  strategy: "Strategy",
  defi: "DeFi",
  nft: "NFTs",
  dao: "DAOs",
  identity: "Digital Identity",
  infrastructure: "Infrastructure",
  security: "Security",
  metaverse: "Metaverse"
};

const categories: CategoryType[] = [
  "blockchain", "web3", "ai", "regulatory", "tokenomics", 
  "gaming", "strategy", "defi", "nft", "dao", 
  "identity", "infrastructure", "security", "metaverse"
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
