import React from 'react';
import { glossaryTerms } from '@/data/glossaryTerms';
import { GlossaryTooltip } from './GlossaryTooltip';

interface GlossaryLinkedTextProps {
  children: string;
}

export const GlossaryLinkedText: React.FC<GlossaryLinkedTextProps> = ({ children }) => {
  const processTextWithGlossaryLinks = (text: string): React.ReactNode[] => {
    // Create all possible term variations for perfect matching
    const termVariationsMap = new Map();
    
    glossaryTerms.forEach(glossaryTerm => {
      const termName = glossaryTerm.term;
      
      // Add the main term
      termVariationsMap.set(termName.toLowerCase(), { term: termName, glossaryTerm });
      
      // Extract acronyms or short forms from parentheses
      const parenthesesMatch = termName.match(/\(([^)]+)\)/);
      if (parenthesesMatch) {
        const acronym = parenthesesMatch[1];
        termVariationsMap.set(acronym.toLowerCase(), { term: termName, glossaryTerm });
      }
    });

    // Sort all variations by length (longest first) to avoid partial matches
    const sortedVariations = Array.from(termVariationsMap.keys()).sort((a, b) => b.length - a.length);
    
    let processedText = text;
    const replacements: Array<{ start: number; end: number; element: React.ReactNode }> = [];
    
    // Find all matches
    sortedVariations.forEach(variation => {
      if (variation.length < 3) return;
      
      const { term: originalTerm, glossaryTerm } = termVariationsMap.get(variation);
      
      // Create exact match regex that avoids contractions
      const escapedVariation = variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedVariation}\\b(?!')`, 'gi');
      
      let match;
      while ((match = regex.exec(processedText)) !== null) {
        // Check if this position is already covered by a longer match
        const isOverlapping = replacements.some(replacement => 
          (match.index >= replacement.start && match.index < replacement.end) ||
          (match.index + match[0].length > replacement.start && match.index + match[0].length <= replacement.end)
        );
        
        if (!isOverlapping) {
          replacements.push({
            start: match.index,
            end: match.index + match[0].length,
            element: (
              <GlossaryTooltip 
                key={`${match.index}-${originalTerm}`}
                term={originalTerm}
                definition={glossaryTerm.definition}
              >
                {match[0]}
              </GlossaryTooltip>
            )
          });
        }
        
        // Reset regex to continue searching
        regex.lastIndex = match.index + 1;
      }
    });
    
    // Sort replacements by start position (descending) to replace from end to beginning
    replacements.sort((a, b) => b.start - a.start);
    
    // Build the final result
    const result: React.ReactNode[] = [];
    let lastIndex = processedText.length;
    
    replacements.forEach(replacement => {
      // Add text after this replacement
      if (lastIndex > replacement.end) {
        result.unshift(processedText.slice(replacement.end, lastIndex));
      }
      
      // Add the replacement element
      result.unshift(replacement.element);
      
      lastIndex = replacement.start;
    });
    
    // Add any remaining text at the beginning
    if (lastIndex > 0) {
      result.unshift(processedText.slice(0, lastIndex));
    }
    
    return result;
  };

  const processedContent = processTextWithGlossaryLinks(children);
  
  return <>{processedContent}</>;
};