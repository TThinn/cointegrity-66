
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
    <div className="mb-6">
      <div className="relative">
        <Input
          type="text"
          placeholder="Type your search and press Enter..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-20 bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 
                     focus:bg-white/10 focus:border-white/40 transition-all duration-300"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
        
        {/* Search button */}
        <Button
          onClick={handleSearch}
          size="sm"
          className="absolute right-8 top-1 h-8 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3"
        >
          Search
        </Button>
        
        {/* Clear search button */}
        {(inputValue || isSearching) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1 h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
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
