/**
 * Advanced term normalization for better matching - ENHANCED FOR PARENTHESES
 */
export const normalizeTermAdvanced = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    // Normalize spaces around parentheses but keep them
    .replace(/\s*\(\s*/g, ' (')
    .replace(/\s*\)\s*/g, ') ')
    // Remove other punctuation but preserve parentheses
    .replace(/[^\w\s()]/g, ' ')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Create base term without parenthetical content
 */
export const getBaseTermWithoutParentheses = (term: string): string => {
  return normalizeTermAdvanced(term)
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Extract parenthetical content from a term
 */
export const getParentheticalContent = (term: string): string[] => {
  const matches = term.match(/\(([^)]+)\)/g);
  if (!matches) return [];
  
  return matches.map(match => 
    match.replace(/[()]/g, '').trim().toLowerCase()
  );
};
