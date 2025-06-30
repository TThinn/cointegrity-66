
import React from "react";
import { Separator } from "@/components/ui/separator";
import { GlossaryTerm } from "../types";
import { TermCard } from "./TermCard";
import { isDirectMatch } from "../utils/termMatching";

interface SearchResultsSectionProps {
  terms: GlossaryTerm[];
  searchTerm: string;
}

export const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  terms,
  searchTerm
}) => {
  // Separate direct matches from other results using enhanced matching
  const directMatches = terms.filter(term => isDirectMatch(term, searchTerm));
  const relatedTerms = terms.filter(term => !isDirectMatch(term, searchTerm));
  
  console.log(`🎯 Enhanced PARENTHESES Direct matches for "${searchTerm}":`, directMatches.map(t => t.term));
  console.log(`🔗 Related terms for "${searchTerm}":`, relatedTerms.map(t => t.term));
  
  return (
    <div className="mb-8">
      {/* Direct matches section */}
      {directMatches.length > 0 ? (
        <div className="mb-8">
          <div className="space-y-4">
            {directMatches.map((term, index) => (
              <TermCard 
                key={`direct-${term.term}-${index}`}
                term={term} 
                index={index} 
                isDirect={true}
                isSearching={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <p className="text-orange-200 text-sm">
              <strong>No perfect match found</strong> for "{searchTerm}"
            </p>
          </div>
        </div>
      )}
      
      {/* Related terms section */}
      {relatedTerms.length > 0 && (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
              <span className="text-purple-300">🔗</span>
              Related Terms
              <span className="text-sm text-white/60 font-normal">({relatedTerms.length} found)</span>
            </h3>
            <Separator className="my-2 bg-white/20" />
          </div>
          
          <div className="space-y-4">
            {relatedTerms.map((term, index) => (
              <TermCard 
                key={`related-${term.term}-${index}`}
                term={term} 
                index={index + directMatches.length} 
                isDirect={false}
                isSearching={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
