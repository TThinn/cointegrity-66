
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GlossarySearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalCount: number;
  filteredCount: number;
}

export const GlossarySearch: React.FC<GlossarySearchProps> = ({ 
  searchTerm, 
  setSearchTerm,
  totalCount,
  filteredCount
}) => {
  // Local state for input value - only commits to searchTerm on Enter or button click
  const [inputValue, setInputValue] = useState(searchTerm);
  const isSearching = !!searchTerm.trim();

  const handleSearch = () => {
    setSearchTerm(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
  };

  return (
    <div className="mb-8">
      {/* Prominent search container with CTA styling */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">Search the Web3 Glossary</h2>
          <p className="text-white/70 text-sm">Find definitions for any Web3, blockchain, or crypto term</p>
        </div>
        
        <div className="relative max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Enter any Web3 term..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-12 pr-24 py-3 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 
                       focus:bg-white/20 focus:border-white/50 transition-all duration-300 rounded-full text-center"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
          
          {/* Search button with CTA styling */}
          <Button
            onClick={handleSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 
                       bg-white/25 backdrop-blur-sm text-white border border-white/30 
                       hover:bg-white/40 transition-all transform hover:scale-105 duration-300 
                       text-sm font-semibold rounded-full px-4"
          >
            Search
          </Button>
          
          {/* Clear search button */}
          {(inputValue || isSearching) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 
                         text-white/60 hover:text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="text-xs text-white/60 mt-2 flex justify-between items-center">
        <span>
          {isSearching ? (
            <>
              <span className="text-purple-300 font-medium">🔍 Two-Stage Search:</span> {filteredCount} of {totalCount} terms
              {filteredCount > 0 && (
                <span className="ml-2 text-white/80">
                  (direct matches first, then related)
                </span>
              )}
            </>
          ) : (
            `${totalCount} total terms available - Press Enter or click Search to find terms`
          )}
        </span>
        
        {isSearching && (
          <button 
            onClick={handleClear}
            className="text-purple-300 hover:text-purple-200 hover:underline transition-colors ml-4"
          >
            Clear search
          </button>
        )}
      </div>
    </div>
  );
};
