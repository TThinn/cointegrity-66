
import { normalizeTermAdvanced, getBaseTermWithoutParentheses } from './textNormalization';
import { areTermsEquivalent } from './semanticEquivalents';
import { GlossaryTerm } from '../types';

/**
 * Check if a term is a direct match using semantic equivalence - ENHANCED FOR PARENTHESES
 */
export const isDirectMatch = (term: GlossaryTerm, query: string): boolean => {
  if (!query) return false;
  
  const normalizedQuery = normalizeTermAdvanced(query);
  const normalizedTerm = normalizeTermAdvanced(term.term);
  
  // Check for exact match
  if (normalizedTerm === normalizedQuery) return true;
  
  // Check for semantic equivalence (handles parentheses, Layer 2, Layer-2, L2 variations)
  if (areTermsEquivalent(term.term, query)) return true;
  
  // Check base term match (for parenthetical terms)
  const baseTermName = getBaseTermWithoutParentheses(term.term);
  const baseQuery = getBaseTermWithoutParentheses(query);
  
  if (baseTermName && baseQuery && baseTermName === baseQuery) {
    console.log(`🎯 BASE TERM DIRECT MATCH: "${term.term}" base="${baseTermName}" matches query base="${baseQuery}"`);
    return true;
  }
  
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
