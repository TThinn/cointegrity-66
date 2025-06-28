
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { GlossaryTerm } from "./types";

interface GlossaryTermsListProps {
  letters: string[];
  groupedTerms: Record<string, GlossaryTerm[]>;
  isLoading: boolean;
  isSearching?: boolean;
  searchTerm?: string;
}

/**
 * Advanced term normalization for better matching (matching useGlossaryData)
 */
const normalizeTermAdvanced = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Create semantic equivalents for terms to handle variations (matching useGlossaryData)
 */
const createSemanticEquivalents = (term: string): string[] => {
  const normalized = normalizeTermAdvanced(term);
  const equivalents = new Set([normalized]);
  
  // Handle "Layer X" variations
  const layerMatch = normalized.match(/layer\s*(\d+)/);
  if (layerMatch) {
    const layerNum = layerMatch[1];
    equivalents.add(`layer ${layerNum}`);
    equivalents.add(`layer${layerNum}`);
    equivalents.add(`l${layerNum}`);
    equivalents.add(`l ${layerNum}`);
  }
  
  // Handle "L2" style abbreviations back to full form
  const lAbbrevMatch = normalized.match(/^l\s*(\d+)$/);
  if (lAbbrevMatch) {
    const num = lAbbrevMatch[1];
    equivalents.add(`layer ${num}`);
    equivalents.add(`layer${num}`);
  }
  
  return Array.from(equivalents);
};

/**
 * Check if two terms are semantically equivalent (matching useGlossaryData)
 */
const areTermsEquivalent = (term1: string, term2: string): boolean => {
  const equivalents1 = createSemanticEquivalents(term1);
  const equivalents2 = createSemanticEquivalents(term2);
  
  return equivalents1.some(eq1 => 
    equivalents2.some(eq2 => eq1 === eq2)
  );
};

export const GlossaryTermsList: React.FC<GlossaryTermsListProps> = ({
  letters,
  groupedTerms,
  isLoading,
  isSearching = false,
  searchTerm = ""
}) => {
  // Enhanced function to check if a term is a direct match using semantic equivalence
  const isDirectMatch = (term: GlossaryTerm, query: string): boolean => {
    if (!query) return false;
    
    const normalizedQuery = normalizeTermAdvanced(query);
    const normalizedTerm = normalizeTermAdvanced(term.term);
    
    // Check for exact match
    if (normalizedTerm === normalizedQuery) return true;
    
    // Check for semantic equivalence (handles Layer 2, Layer-2, L2 variations)
    if (areTermsEquivalent(term.term, query)) return true;
    
    // Check if term starts with the query (for cases like "mint" matching "minting")
    if (normalizedTerm.startsWith(normalizedQuery) || normalizedQuery.startsWith(normalizedTerm)) {
      const longer = normalizedTerm.length > normalizedQuery.length ? normalizedTerm : normalizedQuery;
      const shorter = normalizedTerm.length <= normalizedQuery.length ? normalizedTerm : normalizedQuery;
      
      // Allow if the longer word is just a form of the shorter (simple heuristic)
      if (longer.startsWith(shorter) && longer.length - shorter.length <= 3) {
        return true;
      }
    }
    
    return false;
  };

  // Function to render a term card
  const renderTermCard = (term: GlossaryTerm, index: number, isDirect: boolean = false) => (
    <div 
      key={`${term.term}-${index}`}
      className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start flex-wrap mb-4">
          <h3 className="text-xl font-semibold text-white" id={term.term.toLowerCase().replace(/\s+/g, '-')}>
            {term.term}
            {/* Show indicators for search results */}
            {isSearching && (
              <span className="ml-2 text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded">
                {isDirect ? '🎯 Perfect Match' : `#${index + 1}`}
              </span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {term.categories && term.categories.map((category, categoryIndex) => (
              <Badge 
                key={`${term.term}-${category}-${categoryIndex}`}
                variant="outline" 
                className="text-xs bg-white/10 border-white/30 text-white/90 hover:bg-white/20"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Display question if available */}
        {term.question && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-purple-300 mb-1">Question:</h4>
            <p className="text-sm text-white/90 italic">{term.question}</p>
          </div>
        )}
        
        <div className="text-sm text-white/80">
          <p dangerouslySetInnerHTML={{ __html: term.definition }} />
          {term.related && term.related.length > 0 && (
            <div className="mt-3">
              <span className="text-xs font-semibold text-white/90">Related terms: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {term.related.map((relatedTerm, relatedIndex) => (
                  <a 
                    key={`${term.term}-related-${relatedTerm}-${relatedIndex}`}
                    href={`#${relatedTerm.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs text-purple-300 hover:text-purple-200 hover:underline transition-colors"
                  >
                    {relatedTerm}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map(i => (
          <div key={i}>
            <Skeleton className="h-10 w-24 mb-4 bg-white/10" />
            <div className="space-y-4">
              {[1, 2, 3].map(j => (
                <div key={j} className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                  <Skeleton className="h-6 w-48 mb-4 bg-white/20" />
                  <Skeleton className="h-20 w-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
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
          // Separate direct matches from other results using enhanced matching
          const directMatches = termsForLetter.filter(term => isDirectMatch(term, searchTerm));
          const relatedTerms = termsForLetter.filter(term => !isDirectMatch(term, searchTerm));
          
          console.log(`🎯 Enhanced Direct matches for "${searchTerm}":`, directMatches.map(t => t.term));
          console.log(`🔗 Related terms for "${searchTerm}":`, relatedTerms.map(t => t.term));
          
          return (
            <div key={letter} className="mb-8">
              {/* Direct matches section */}
              {directMatches.length > 0 ? (
                <div className="mb-8">
                  <div className="space-y-4">
                    {directMatches.map((term, index) => renderTermCard(term, index, true))}
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
                    {relatedTerms.map((term, index) => renderTermCard(term, index + directMatches.length, false))}
                  </div>
                </div>
              )}
            </div>
          );
        }
        
        // Regular alphabetical browsing (non-search)
        return (
          <div key={letter} id={`section-${letter}`} className="mb-8">
            <div className="sticky top-0 bg-[#080112]/90 backdrop-blur-sm z-10 py-2">
              <h2 className="text-2xl font-bold text-white">{letter}</h2>
              <Separator className="my-2 bg-white/20" />
            </div>
            
            <div className="space-y-4">
              {termsForLetter.map((term, index) => renderTermCard(term, index, false))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
