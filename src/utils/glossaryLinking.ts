import { glossaryTerms } from "@/data/glossaryTerms";
import React from 'react';
import { GlossaryTooltip } from '@/components/blog/GlossaryTooltip';

export function linkGlossaryTerms(text: string): string {
  let linkedText = text;
  
  // Don't process text that already has HTML links
  if (linkedText.includes('<a ') || linkedText.includes('</a>')) {
    return linkedText;
  }
  
  // Create all possible term variations for perfect matching
  const termVariationsMap = new Map();
  
  glossaryTerms.forEach(glossaryTerm => {
    const termName = glossaryTerm.term;
    
    // Add the main term
    termVariationsMap.set(termName.toLowerCase(), { term: termName, glossaryTerm });
    
    // Extract acronyms or short forms from parentheses (e.g., "DAO" from "Decentralized Autonomous Organization (DAO)")
    const parenthesesMatch = termName.match(/\(([^)]+)\)/);
    if (parenthesesMatch) {
      const acronym = parenthesesMatch[1];
      termVariationsMap.set(acronym.toLowerCase(), { term: termName, glossaryTerm });
    }
  });
  
  // Sort all variations by length (longest first) to avoid partial matches
  const sortedVariations = Array.from(termVariationsMap.keys()).sort((a, b) => b.length - a.length);
  
  // Process each variation for perfect matches only
  sortedVariations.forEach(variation => {
    const { term: originalTerm } = termVariationsMap.get(variation);
    
    // Skip very short terms to avoid over-linking
    if (variation.length < 3) return;
    
    // Create exact match regex that avoids contractions (case-insensitive)
    const escapedVariation = variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Use negative lookahead to avoid matching words followed by apostrophes (contractions)
    const regex = new RegExp(`\\b${escapedVariation}\\b(?!')`, 'gi');
    
    linkedText = linkedText.replace(regex, (match) => {
      // Don't link if already inside HTML tags or existing links
      const beforeMatch = linkedText.substring(0, linkedText.indexOf(match));
      const openTags = (beforeMatch.match(/<[^>]*$/g) || []).length;
      const closeTags = (beforeMatch.match(/>/g) || []).length;
      
      // If we're inside an HTML tag, don't link
      if (openTags > closeTags) {
        return match;
      }
      
      // Check if we're already inside a link
      if (beforeMatch.includes('<a ') && !beforeMatch.includes('</a>')) {
        return match;
      }
      
      const termSlug = createGlossaryAnchor(originalTerm);
      return `<a href="/glossary#${termSlug}" class="glossary-link" title="Learn more about ${originalTerm}">${match}</a>`;
    });
  });
  
  return linkedText;
}

export function createGlossaryAnchor(term: string): string {
  return term.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}