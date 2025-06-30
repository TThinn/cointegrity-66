
import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "./types";
import { glossaryTerms } from "@/data/glossaryTerms";
import { batchTransformTerms } from "./utils/termTransformation";

/**
 * Stopwords to filter out from partial matching - ENHANCED IMPLEMENTATION
 */
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with',
  'group', 'system', 'protocol', 'network', 'method', 'process', 'service', 'platform',
  'technology', 'solution', 'application', 'interface', 'framework', 'standard',
  'layer', 'level', 'type', 'kind', 'form', 'way', 'part', 'piece', 'item', 'element'
]);

/**
 * Advanced term normalization for better matching - ENHANCED FOR PARENTHESES
 */
const normalizeTermAdvanced = (text: string): string => {
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
const getBaseTermWithoutParentheses = (term: string): string => {
  return normalizeTermAdvanced(term)
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Extract parenthetical content from a term
 */
const getParentheticalContent = (term: string): string[] => {
  const matches = term.match(/\(([^)]+)\)/g);
  if (!matches) return [];
  
  return matches.map(match => 
    match.replace(/[()]/g, '').trim().toLowerCase()
  );
};

/**
 * Filter out stopwords from word arrays - NEW IMPLEMENTATION
 */
const filterStopwords = (words: string[]): string[] => {
  return words.filter(word => word.length > 2 && !STOPWORDS.has(word.toLowerCase()));
};

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
 * Calculate word specificity score - NEW IMPLEMENTATION
 */
const calculateWordSpecificity = (word: string): number => {
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

/**
 * Create semantic equivalents for terms to handle variations - ENHANCED FOR PARENTHESES
 */
const createSemanticEquivalents = (term: string): string[] => {
  const normalized = normalizeTermAdvanced(term);
  const equivalents = new Set([normalized]);
  
  // Add base term without parentheses
  const baseTerm = getBaseTermWithoutParentheses(term);
  if (baseTerm && baseTerm !== normalized) {
    equivalents.add(baseTerm);
  }
  
  // Add parenthetical content as separate searchable terms
  const parentheticals = getParentheticalContent(term);
  parentheticals.forEach(content => {
    equivalents.add(content);
  });
  
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
  
  // Handle common crypto abbreviations
  const abbreviationMap: Record<string, string[]> = {
    'defi': ['decentralized finance', 'de fi'],
    'cefi': ['centralized finance', 'ce fi'],
    'nft': ['non fungible token', 'non fungible tokens'],
    'dao': ['decentralized autonomous organization'],
    'dex': ['decentralized exchange'],
    'cex': ['centralized exchange'],
    'kyc': ['know your customer'],
    'aml': ['anti money laundering'],
    'pos': ['proof of stake'],
    'pow': ['proof of work'],
    'btc': ['bitcoin'],
    'eth': ['ethereum'],
    'api': ['application programming interface'],
    'ui': ['user interface'],
    'ux': ['user experience'],
    'ico': ['initial coin offering'],
    'ido': ['initial dex offering'],
    'ieo': ['initial exchange offering'],
    'tvl': ['total value locked'],
    'apy': ['annual percentage yield'],
    'apr': ['annual percentage rate'],
    'p2p': ['peer to peer', 'peer 2 peer'],
    'web3': ['web 3', 'web three'],
    'web2': ['web 2', 'web two'],
    'ai': ['artificial intelligence'],
    'ml': ['machine learning'],
    'vr': ['virtual reality'],
    'ar': ['augmented reality'],
    'iot': ['internet of things'],
    'sdk': ['software development kit'],
    'dapp': ['decentralized application', 'decentralized app'],
    'smart contract': ['smart contracts'],
    'cryptocurrency': ['crypto currency', 'crypto'],
    'blockchain': ['block chain'],
    'whitepaper': ['white paper'],
    'roadmap': ['road map'],
    'mainnet': ['main net'],
    'testnet': ['test net']
  };
  
  // Add abbreviation expansions
  Object.entries(abbreviationMap).forEach(([abbrev, expansions]) => {
    if (normalized.includes(abbrev)) {
      expansions.forEach(expansion => {
        equivalents.add(normalized.replace(abbrev, expansion));
      });
    }
    // Also check reverse (if term contains expansion, add abbreviation)
    expansions.forEach(expansion => {
      if (normalized.includes(expansion)) {
        equivalents.add(normalized.replace(expansion, abbrev));
      }
    });
  });
  
  // Handle number-word variations
  const numberWordMap: Record<string, string> = {
    'two': '2', 'three': '3', 'four': '4', 'five': '5',
    'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'
  };
  
  Object.entries(numberWordMap).forEach(([word, num]) => {
    if (normalized.includes(word)) {
      equivalents.add(normalized.replace(word, num));
    }
    if (normalized.includes(num)) {
      equivalents.add(normalized.replace(num, word));
    }
  });
  
  return Array.from(equivalents);
};

/**
 * Check if two terms are semantically equivalent - ENHANCED FOR PARENTHESES
 */
const areTermsEquivalent = (term1: string, term2: string): boolean => {
  const equivalents1 = createSemanticEquivalents(term1);
  const equivalents2 = createSemanticEquivalents(term2);
  
  // Check if any equivalent of term1 matches any equivalent of term2
  const isEquivalent = equivalents1.some(eq1 => 
    equivalents2.some(eq2 => eq1 === eq2)
  );
  
  if (isEquivalent) {
    console.log(`🎯 SEMANTIC EQUIVALENCE: "${term1}" ≡ "${term2}"`);
    console.log(`  Term1 equivalents: ${equivalents1.join(', ')}`);
    console.log(`  Term2 equivalents: ${equivalents2.join(', ')}`);
  }
  
  return isEquivalent;
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
const scoreTermMatch = (term: GlossaryTerm, searchTerm: string): number => {
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

/**
 * Custom hook for managing glossary data sources and filtering
 */
export const useGlossaryData = (
  searchTerm: string = "",
  activeCategory: CategoryType | "all" = "all",
  initialDataSource: DataSourceType = "original"
) => {
  // Track the current data source
  const [dataSource, setDataSource] = useState<DataSourceType>(initialDataSource);
  const [isLoading, setIsLoading] = useState(true);
  const [transformationProgress, setTransformationProgress] = useState(0);

  // Get the appropriate data based on the selected source and apply transformations
  const rawData = useMemo(() => {
    console.log(`Using ${dataSource} data source`);
    console.log(`Original data source length: ${glossaryTerms.length}`);
    
    // Transform terms to include questions and updated definitions
    const transformedTerms = batchTransformTerms(
      glossaryTerms,
      (processed, total) => {
        setTransformationProgress(Math.round((processed / total) * 100));
      }
    );
    
    console.log(`Transformed ${transformedTerms.length} terms with questions`);
    return transformedTerms;
  }, [dataSource]);

  // Log data loading on component mount
  useEffect(() => {
    console.log("Glossary data initial load:", {
      source: dataSource,
      termCount: rawData.length,
      sampleTerms: rawData.slice(0, 3).map(t => ({ term: t.term, hasQuestion: !!t.question }))
    });
    
    setIsLoading(false);
  }, [dataSource, rawData]);

  // Main filtering and sorting logic - ENHANCED SEARCH-FIRST APPROACH
  const filteredAndSortedTerms = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    console.log(`🔍 Processing ENHANCED search with stopwords: "${searchTerm}" (normalized: "${query}"), category: "${activeCategory}"`);
    
    let processedTerms = [...rawData];
    
    // ENHANCED SEARCH-FIRST APPROACH: Score and filter by search relevance FIRST
    if (query) {
      console.log(`🎯 ENHANCED STOPWORD SEARCH MODE: Scoring ${processedTerms.length} terms for "${query}"`);
      
      // Score all terms and filter by relevance
      const searchResults = processedTerms
        .map(term => ({
          ...term,
          relevanceScore: scoreTermMatch(term, query)
        }))
        .filter(term => term.relevanceScore > 0)
        .sort((a, b) => {
          // Primary sort: by relevance score (highest first)
          if (a.relevanceScore !== b.relevanceScore) {
            return b.relevanceScore - a.relevanceScore;
          }
          // Secondary sort: alphabetically for same scores
          return a.term.localeCompare(b.term);
        });

      console.log(`📊 Enhanced search with stopwords scored ${searchResults.length} relevant terms`);
      
      // Log top 15 results for debugging with scores
      if (searchResults.length > 0) {
        console.log('🏆 Top enhanced search results with stopword filtering:');
        searchResults.slice(0, 15).forEach((term, index) => {
          console.log(`  ${index + 1}. "${term.term}" (score: ${term.relevanceScore})`);
        });
      }

      // Remove relevanceScore before continuing and apply category filter
      processedTerms = searchResults.map(({ relevanceScore, ...term }) => term);
      
      // Apply category filter AFTER search scoring
      if (activeCategory !== "all") {
        processedTerms = processedTerms.filter(term => 
          term.categories.some(cat => cat === activeCategory)
        );
        console.log(`📂 Category filtered to ${processedTerms.length} terms for category: ${activeCategory}`);
      }
    } else {
      // NO SEARCH: Apply category filter first, then sort alphabetically  
      console.log(`📂 BROWSE MODE: Filtering by category: ${activeCategory}`);
      
      if (activeCategory !== "all") {
        processedTerms = processedTerms.filter(term => 
          term.categories.some(cat => cat === activeCategory)
        );
        console.log(`📂 Category filtered to ${processedTerms.length} terms`);
      }
      
      // Alphabetical sort for browsing
      processedTerms.sort((a, b) => a.term.localeCompare(b.term));
    }
    
    console.log(`✅ Final result: ${processedTerms.length} terms`);
    return processedTerms;
  }, [rawData, searchTerm, activeCategory]);

  // Group terms by first letter ONLY for non-search results
  const groupedTerms = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    
    // If searching, don't group - return flat list
    if (query) {
      return { 'Search Results': filteredAndSortedTerms };
    }
    
    // Otherwise, group alphabetically
    const grouped: Record<string, GlossaryTerm[]> = {};
    
    filteredAndSortedTerms.forEach(term => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(term);
    });
    
    return grouped;
  }, [filteredAndSortedTerms, searchTerm]);

  // Extract all letters that have terms
  const letters = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    
    // If searching, return special search key
    if (query) {
      return ['Search Results'];
    }
    
    // Otherwise, return sorted letters
    return Object.keys(groupedTerms).sort();
  }, [groupedTerms, searchTerm]);

  // Change data source and preserve filters
  const changeDataSource = (newSource: DataSourceType) => {
    setIsLoading(true);
    setDataSource(newSource);
  };

  return {
    dataSource,
    changeDataSource,
    filteredTerms: filteredAndSortedTerms,
    groupedTerms,
    letters,
    isLoading,
    totalTermsCount: rawData.length,
    transformationProgress,
    isSearching: !!searchTerm.trim()
  };
};
