
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { GlossaryTerm } from "../types";

interface TermCardProps {
  term: GlossaryTerm;
  index: number;
  isDirect?: boolean;
  isSearching?: boolean;
}

export const TermCard: React.FC<TermCardProps> = ({
  term,
  index,
  isDirect = false,
  isSearching = false
}) => {
  const termSlug = term.term.toLowerCase().replace(/[^a-z0-9]/g, '-');

  return (
    <Link to={`/glossary/${termSlug}`} className="block">
      <div 
        key={`${term.term}-${index}`}
        className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 hover:border-primary/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-start flex-wrap mb-4">
            <h3 className="text-xl font-semibold text-white" id={term.term.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
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
                    <Link 
                      key={`${term.term}-related-${relatedTerm}-${relatedIndex}`}
                      to={`/glossary/${relatedTerm.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      className="text-xs text-purple-300 hover:text-purple-200 hover:underline transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {relatedTerm}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
