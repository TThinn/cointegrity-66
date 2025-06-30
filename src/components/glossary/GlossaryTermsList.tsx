
import React from "react";
import { GlossaryTerm } from "./types";
import { LoadingState } from "./components/LoadingState";
import { SearchResultsSection } from "./components/SearchResultsSection";
import { AlphabeticalSection } from "./components/AlphabeticalSection";

interface GlossaryTermsListProps {
  letters: string[];
  groupedTerms: Record<string, GlossaryTerm[]>;
  isLoading: boolean;
  isSearching?: boolean;
  searchTerm?: string;
}

export const GlossaryTermsList: React.FC<GlossaryTermsListProps> = ({
  letters,
  groupedTerms,
  isLoading,
  isSearching = false,
  searchTerm = ""
}) => {
  // Show loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Handle the case where no terms match filters
  if (letters.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6 text-center">
        <p className="text-white/80">No glossary terms found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div>
      {letters.map((letter) => {
        const termsForLetter = groupedTerms[letter] || [];
        
        // If this is a search, implement two-stage results with enhanced matching
        if (isSearching && letter === 'Search Results') {
          return (
            <SearchResultsSection
              key={letter}
              terms={termsForLetter}
              searchTerm={searchTerm}
            />
          );
        }
        
        // Regular alphabetical browsing (non-search)
        return (
          <AlphabeticalSection
            key={letter}
            letter={letter}
            terms={termsForLetter}
          />
        );
      })}
    </div>
  );
};
