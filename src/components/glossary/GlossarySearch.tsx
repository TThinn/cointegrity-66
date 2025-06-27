
import React from "react";
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
  const isSearching = !!searchTerm.trim();

  return (
    <div className="mb-6">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search terms, definitions, or questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 
                     focus:bg-white/10 focus:border-white/40 transition-all duration-300"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/60" />
        
        {/* Clear search button */}
        {isSearching && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm("")}
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
              <span className="text-purple-300 font-medium">🔍 Search Results:</span> {filteredCount} of {totalCount} terms
              {filteredCount > 0 && (
                <span className="ml-2 text-white/80">
                  (sorted by relevance)
                </span>
              )}
            </>
          ) : (
            `${totalCount} total terms available`
          )}
        </span>
        
        {isSearching && (
          <button 
            onClick={() => setSearchTerm("")}
            className="text-purple-300 hover:text-purple-200 hover:underline transition-colors ml-4"
          >
            Clear search
          </button>
        )}
      </div>
    </div>
  );
};
