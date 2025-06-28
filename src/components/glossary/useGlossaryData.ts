
import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "./types";
import { glossaryTerms } from "@/data/glossaryTerms";
import { toast } from "sonner";
import { batchTransformTerms } from "./utils/termTransformation";

/**
 * Advanced term normalization for better matching
 */
const normalizeTermAdvanced = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    // Remove common punctuation and symbols
    .replace(/[^\w\s]/g, ' ')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Create semantic equivalents for terms to handle variations
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
 * Check if two terms are semantically equivalent
 */
const areTermsEquivalent = (term1: string, term2: string): boolean => {
  const equivalents1 = createSemanticEquivalents(term1);
  const equivalents2 = createSemanticEquivalents(term2);
  
  // Check if any equivalent of term1 matches any equivalent of term2
  return equivalents1.some(eq1 => 
    equivalents2.some(eq2 => eq1 === eq2)
  );
};

/**
 * Enhanced word boundary detection
 */
const getWordBoundaryMatches = (term: string, query: string): number => {
  const termWords = normalizeTermAdvanced(term).split(/\s+/);
  const queryWords = normalizeTermAdvanced(query).split(/\s+/);
  
  let exactMatches = 0;
  let partialMatches = 0;
  
  queryWords.forEach(qWord => {
    termWords.forEach(tWord => {
      if (tWord === qWord) {
        exactMatches++;
      } else if (tWord.startsWith(qWord) || qWord.startsWith(tWord)) {
        partialMatches++;
      }
    });
  });
  
  return exactMatches * 100 + partialMatches * 50;
};

/**
 * Enhanced scoring system for term matching with semantic equivalence
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
  
  console.log(`🔍 Scoring "${term.term}" against "${searchTerm}"`);
  console.log(`  Query equivalents: ${queryEquivalents.join(', ')}`);
  console.log(`  Term equivalents: ${termEquivalents.join(', ')}`);
  
  // TIER 1: EXACT MATCH - Highest priority (10000)
  if (termName === query) {
    console.log(`🎯 EXACT MATCH: "${term.term}" = 10000`);
    return 10000;
  }
  
  // TIER 2: SEMANTIC EQUIVALENCE - Very high priority (9500-9999)
  if (areTermsEquivalent(termName, query)) {
    const score = 9500 + (100 - Math.min(termName.length, 100));
    console.log(`🔥 SEMANTIC MATCH: "${term.term}" = ${score}`);
    return score;
  }
  
  // TIER 3: PERFECT WORD MATCH - High priority (9000-9499)
  const queryWords = normalizeTermAdvanced(query).split(/\s+/);
  const termWords = normalizeTermAdvanced(termName).split(/\s+/);
  
  const exactWordMatches = queryWords.filter(qWord => 
    termWords.some(tWord => tWord === qWord)
  ).length;
  
  if (exactWordMatches === queryWords.length && queryWords.length > 1) {
    const score = 9000 + (100 - termName.length) + (exactWordMatches * 10);
    console.log(`🌟 PERFECT WORDS: "${term.term}" = ${score} (${exactWordMatches}/${queryWords.length} words)`);
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
  
  // TIER 6: WORD STARTS WITH QUERY - Medium-high priority (6000-6499)
  const wordStartMatches = termWords.filter(word => 
    queryWords.some(qWord => word.startsWith(qWord))
  ).length;
  
  if (wordStartMatches > 0) {
    const score = 6000 + (wordStartMatches * 100) + (100 - termName.length);
    console.log(`⭐ WORD STARTS: "${term.term}" = ${score} (${wordStartMatches} words)`);
    return score;
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
  
  // TIER 9: PARTIAL WORD MATCHES - Low-medium priority (3000-3499)
  const partialWordMatches = queryWords.filter(qWord => 
    termWords.some(tWord => tWord.includes(qWord) && qWord.length > 2)
  ).length;
  
  if (partialWordMatches > 0) {
    const score = 3000 + (partialWordMatches * 100) + exactWordMatches * 50;
    console.log(`🔍 PARTIAL WORDS: "${term.term}" = ${score} (${partialWordMatches}/${queryWords.length})`);
    return score;
  }
  
  // TIER 10: DEFINITION STARTS WITH QUERY - Low-medium priority (400-499)
  if (definition.startsWith(normalizedQuery)) {
    console.log(`📖 DEF STARTS: "${term.term}" = 400`);
    return 400;
  }
  
  // TIER 11: DEFINITION CONTAINS QUERY - Lower priority (200-399)
  if (definition.includes(normalizedQuery)) {
    const queryOccurrences = (definition.match(new RegExp(normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    const wordMatches = queryWords.filter(qWord => definition.includes(qWord)).length;
    const score = 200 + Math.min(queryOccurrences * 10, 50) + (wordMatches * 20);
    console.log(`📝 DEF CONTAINS: "${term.term}" = ${score} (${queryOccurrences}x, ${wordMatches} words)`);
    return score;
  }
  
  // TIER 12: QUESTION MATCHES - Lowest priority (50-150)
  if (question) {
    if (question.startsWith(normalizedQuery)) {
      console.log(`❓ Q STARTS: "${term.term}" = 150`);
      return 150;
    } else if (question.includes(normalizedQuery)) {
      const wordMatches = queryWords.filter(qWord => question.includes(qWord)).length;
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
    
    if (rawData.length < 20) {
      toast.warning(`Only ${rawData.length} terms loaded. This may indicate a data loading issue.`);
    } else {
      toast.success(`Successfully loaded and transformed ${rawData.length} glossary terms with enhanced search`);
    }
  }, [dataSource, rawData]);

  // Main filtering and sorting logic - ENHANCED SEARCH-FIRST APPROACH
  const filteredAndSortedTerms = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    console.log(`🔍 Processing enhanced search: "${searchTerm}" (normalized: "${query}"), category: "${activeCategory}"`);
    
    let processedTerms = [...rawData];
    
    // ENHANCED SEARCH-FIRST APPROACH: Score and filter by search relevance FIRST
    if (query) {
      console.log(`🎯 ENHANCED SEMANTIC SEARCH MODE: Scoring ${processedTerms.length} terms for "${query}"`);
      
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

      console.log(`📊 Enhanced semantic search scored ${searchResults.length} relevant terms`);
      
      // Log top 15 results for debugging with scores
      if (searchResults.length > 0) {
        console.log('🏆 Top enhanced semantic search results:');
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
