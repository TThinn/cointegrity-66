
/**
 * Stopwords to filter out from partial matching - ENHANCED IMPLEMENTATION
 */
export const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with',
  'group', 'system', 'protocol', 'network', 'method', 'process', 'service', 'platform',
  'technology', 'solution', 'application', 'interface', 'framework', 'standard',
  'layer', 'level', 'type', 'kind', 'form', 'way', 'part', 'piece', 'item', 'element'
]);

/**
 * Filter out stopwords from word arrays - NEW IMPLEMENTATION
 */
export const filterStopwords = (words: string[]): string[] => {
  return words.filter(word => word.length > 2 && !STOPWORDS.has(word.toLowerCase()));
};

/**
 * Calculate word specificity score - NEW IMPLEMENTATION
 */
export const calculateWordSpecificity = (word: string): number => {
  // Very common words get low specificity
  if (STOPWORDS.has(word)) return 0;
  
  // Short words are less specific
  if (word.length <= 2) return 1;
  if (word.length <= 3) return 2;
  
  // Medium words are moderately specific
  if (word.length <= 5) return 3;
  
  // Longer words are more specific
  return 4;
};
