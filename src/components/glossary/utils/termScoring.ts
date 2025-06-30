
import { GlossaryTerm } from '../types';
import { normalizeTermAdvanced, getBaseTermWithoutParentheses } from './textNormalization';
import { createSemanticEquivalents, areTermsEquivalent } from './semanticEquivalents';
import { filterStopwords, calculateWordSpecificity } from './stopwords';

/**
 * Check if words have semantic relationship - ENHANCED IMPLEMENTATION
 */
const hasSemanticRelationship = (termWords: string[], queryWords: string[]): boolean => {
  const filteredTermWords = filterStopwords(termWords);
  const filteredQueryWords = filterStopwords(queryWords);
  
  // Require at least one meaningful word overlap for semantic relationship
  const meaningfulOverlap = filteredQueryWords.some(qWord => 
    filteredTermWords.some(tWord => {
      // Exact match
      if (tWord === qWord) return true;
      
      // Prefix match for longer words (minimum 4 chars)
      if (qWord.length >= 4 && tWord.startsWith(qWord)) return true;
      if (tWord.length >= 4 && qWord.startsWith(tWord)) return true;
      
      return false;
    })
  );
  
  return meaningfulOverlap;
};

/**
 * Enhanced word boundary detection with semantic context - ENHANCED IMPLEMENTATION
 */
const getWordBoundaryMatches = (term: string, query: string): number => {
  const termWords = normalizeTermAdvanced(term).split(/\s+/);
  const queryWords = normalizeTermAdvanced(query).split(/\s+/);
  
  // Filter out stopwords for more meaningful matching
  const filteredTermWords = filterStopwords(termWords);
  const filteredQueryWords = filterStopwords(queryWords);
  
  let exactMatches = 0;
  let partialMatches = 0;
  let specificityBonus = 0;
  
  filteredQueryWords.forEach(qWord => {
    const qSpecificity = calculateWordSpecificity(qWord);
    
    filteredTermWords.forEach(tWord => {
      const tSpecificity = calculateWordSpecificity(tWord);
      
      if (tWord === qWord) {
        exactMatches++;
        specificityBonus += Math.max(qSpecificity, tSpecificity);
      } else if (qWord.length >= 4 && (tWord.startsWith(qWord) || qWord.startsWith(tWord))) {
        partialMatches++;
        specificityBonus += Math.max(qSpecificity, tSpecificity) * 0.5;
      }
    });
  });
  
  return exactMatches * 100 + partialMatches * 50 + specificityBonus * 10;
};

/**
 * Enhanced scoring system for term matching with improved semantic context - ENHANCED IMPLEMENTATION
 */
export const scoreTermMatch = (term: GlossaryTerm, searchTerm: string): number => {
  if (!searchTerm) return 0;
  
  const query = searchTerm.toLowerCase().trim();
  const termName = term.term.toLowerCase().trim();
  const definition = term.definition.toLowerCase();
  const question = term.question?.toLowerCase() || '';
  
  // Create semantic equivalents for both query and term
  const queryEquivalents = createSemanticEquivalents(query);
  const termEquivalents = createSemanticEquivalents(termName);
  
  console.log(`🔍 ENHANCED Scoring "${term.term}" against "${searchTerm}"`);
  console.log(`  Query equivalents: ${queryEquivalents.join(', ')}`);
  console.log(`  Term equivalents: ${termEquivalents.join(', ')}`);
  
  // TIER 1: EXACT MATCH - Highest priority (10000)
  if (termName === query) {
    console.log(`🎯 EXACT MATCH: "${term.term}" = 10000`);
    return 10000;
  }
  
  // TIER 2: SEMANTIC EQUIVALENCE - Very high priority (9500-9999) - ENHANCED FOR PARENTHESES
  if (areTermsEquivalent(termName, query)) {
    const score = 9500 + (100 - Math.min(termName.length, 100));
    console.log(`🔥 SEMANTIC MATCH: "${term.term}" = ${score}`);
    return score;
  }
  
  // TIER 2.5: BASE TERM MATCH (for parenthetical terms) - Very high priority (9400-9499)
  const baseTermName = getBaseTermWithoutParentheses(termName);
  const baseQuery = getBaseTermWithoutParentheses(query);
  
  if (baseTermName && baseQuery && baseTermName === baseQuery) {
    const score = 9400 + (100 - Math.min(termName.length, 100));
    console.log(`🎯 BASE TERM MATCH: "${term.term}" base="${baseTermName}" = ${score}`);
    return score;
  }
  
  // TIER 3: PERFECT WORD MATCH - High priority (9000-9399)
  const queryWords = normalizeTermAdvanced(query).split(/\s+/);
  const termWords = normalizeTermAdvanced(termName).split(/\s+/);
  
  const filteredQueryWords = filterStopwords(queryWords);
  const filteredTermWords = filterStopwords(termWords);
  
  const exactWordMatches = filteredQueryWords.filter(qWord => 
    filteredTermWords.some(tWord => tWord === qWord)
  ).length;
  
  if (exactWordMatches === filteredQueryWords.length && filteredQueryWords.length > 0) {
    const score = 9000 + (100 - termName.length) + (exactWordMatches * 10);
    console.log(`🌟 PERFECT WORDS: "${term.term}" = ${score} (${exactWordMatches}/${filteredQueryWords.length} meaningful words)`);
    return score;
  }
  
  // TIER 4: TERM STARTS WITH QUERY - High priority (7000-7999)
  const normalizedQuery = normalizeTermAdvanced(query);
  const normalizedTerm = normalizeTermAdvanced(termName);
  
  if (normalizedTerm.startsWith(normalizedQuery)) {
    const score = 7000 + (100 - termName.length);
    console.log(`🚀 STARTS WITH: "${term.term}" = ${score}`);
    return score;
  }
  
  // TIER 5: SEMANTIC WORD STARTS - High-medium priority (6500-6999)
  const semanticWordStarts = queryEquivalents.some(qEquiv => 
    termEquivalents.some(tEquiv => tEquiv.startsWith(qEquiv))
  );
  
  if (semanticWordStarts) {
    const score = 6500 + getWordBoundaryMatches(termName, query);
    console.log(`🌈 SEMANTIC WORD STARTS: "${term.term}" = ${score}`);
    return score;
  }
  
  // TIER 6: WORD STARTS WITH QUERY - Medium-high priority (6000-6499) - ENHANCED
  const wordStartMatches = filteredTermWords.filter(word => 
    filteredQueryWords.some(qWord => word.startsWith(qWord) && qWord.length >= 3)
  ).length;
  
  if (wordStartMatches > 0) {
    // Check semantic relationship to avoid false positives
    if (hasSemanticRelationship(termWords, queryWords)) {
      const score = 6000 + (wordStartMatches * 100) + (100 - termName.length);
      console.log(`⭐ WORD STARTS: "${term.term}" = ${score} (${wordStartMatches} words, semantic: ✓)`);
      return score;
    } else {
      console.log(`⚠️ WORD STARTS REJECTED: "${term.term}" - no semantic relationship`);
    }
  }
  
  // TIER 7: TERM CONTAINS QUERY - Medium priority (4000-4999)
  if (normalizedTerm.includes(normalizedQuery)) {
    const position = normalizedTerm.indexOf(normalizedQuery);
    const score = 4000 + (100 - position) + (exactWordMatches * 50);
    console.log(`💫 CONTAINS: "${term.term}" = ${score} (pos: ${position})`);
    return score;
  }
  
  // TIER 8: SEMANTIC CONTAINS - Medium-low priority (3500-3999)
  const semanticContains = queryEquivalents.some(qEquiv => 
    termEquivalents.some(tEquiv => tEquiv.includes(qEquiv))
  );
  
  if (semanticContains) {
    const score = 3500 + getWordBoundaryMatches(termName, query);
    console.log(`🔮 SEMANTIC CONTAINS: "${term.term}" = ${score}`);
    return score;
  }
  
  // TIER 9: PARTIAL WORD MATCHES - Low-medium priority (3000-3499) - ENHANCED WITH CONTEXT
  const partialWordMatches = filteredQueryWords.filter(qWord => {
    if (qWord.length < 4) return false; // Skip very short words
    
    return filteredTermWords.some(tWord => {
      // Must have meaningful overlap and semantic relationship
      const hasOverlap = tWord.includes(qWord) || qWord.includes(tWord);
      return hasOverlap && calculateWordSpecificity(qWord) >= 3;
    });
  }).length;
  
  if (partialWordMatches > 0) {
    // Additional semantic relationship check for partial matches
    if (hasSemanticRelationship(termWords, queryWords)) {
      const score = 3000 + (partialWordMatches * 100) + exactWordMatches * 50;
      console.log(`🔍 PARTIAL WORDS: "${term.term}" = ${score} (${partialWordMatches}/${filteredQueryWords.length}, semantic: ✓)`);
      return score;
    } else {
      console.log(`⚠️ PARTIAL WORDS REJECTED: "${term.term}" - no semantic relationship`);
    }
  }
  
  // TIER 10: DEFINITION STARTS WITH QUERY - Low-medium priority (400-499)
  if (definition.startsWith(normalizedQuery)) {
    console.log(`📖 DEF STARTS: "${term.term}" = 400`);
    return 400;
  }
  
  // TIER 11: DEFINITION CONTAINS QUERY - Lower priority (200-399)
  if (definition.includes(normalizedQuery)) {
    const queryOccurrences = (definition.match(new RegExp(normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    const wordMatches = filteredQueryWords.filter(qWord => definition.includes(qWord)).length;
    const score = 200 + Math.min(queryOccurrences * 10, 50) + (wordMatches * 20);
    console.log(`📝 DEF CONTAINS: "${term.term}" = ${score} (${queryOccurrences}x, ${wordMatches} meaningful words)`);
    return score;
  }
  
  // TIER 12: QUESTION MATCHES - Lowest priority (50-150)
  if (question) {
    if (question.startsWith(normalizedQuery)) {
      console.log(`❓ Q STARTS: "${term.term}" = 150`);
      return 150;
    } else if (question.includes(normalizedQuery)) {
      const wordMatches = filteredQueryWords.filter(qWord => question.includes(qWord)).length;
      const score = 50 + (wordMatches * 10);
      console.log(`❓ Q CONTAINS: "${term.term}" = ${score}`);
      return score;
    }
  }
  
  return 0;
};
