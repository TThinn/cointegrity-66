
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
}

export const GlossaryTermsList: React.FC<GlossaryTermsListProps> = ({
  letters,
  groupedTerms,
  isLoading
}) => {
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
    <>
      {letters.map((letter) => (
        <div key={letter} id={`section-${letter}`} className="mb-8">
          <div className="sticky top-0 bg-[#080112]/90 backdrop-blur-sm z-10 py-2">
            <h2 className="text-2xl font-bold text-white">{letter}</h2>
            <Separator className="my-2 bg-white/20" />
          </div>
          
          <div className="space-y-4">
            {groupedTerms[letter] && groupedTerms[letter].map((term, index) => (
              <div 
                key={`${letter}-${term.term}-${index}`}
                className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start flex-wrap mb-4">
                    <h3 className="text-xl font-semibold text-white" id={term.term.toLowerCase().replace(/\s+/g, '-')}>
                      {term.term}
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
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
