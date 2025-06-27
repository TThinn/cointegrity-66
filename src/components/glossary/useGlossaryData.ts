import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "./types";
import { glossaryTerms } from "@/data/glossaryTerms";
import { toast } from "sonner";
import { batchTransformTerms } from "./utils/termTransformation";

/**
 * Enhanced scoring system for term matching with smart word-based matching
 * Clear tier-based scoring system for optimal search results
 */
const scoreTermMatch = (term: GlossaryTerm, searchTerm: string): number => {
  if (!searchTerm) return 0;
  
  const query = searchTerm.toLowerCase().trim();
  const termName = term.term.toLowerCase().trim();
  const definition = term.definition.toLowerCase();
  const question = term.question?.toLowerCase() || '';
  
  // Normalize search query and term name for better matching
  const normalizeText = (text: string) => text.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  const normalizedQuery = normalizeText(query);
  const normalizedTermName = normalizeText(termName);
  
  // Split into words for word-based matching
  const queryWords = normalizedQuery.split(' ');
  const termWords = normalizedTermName.split(' ');
  
  // TIER 1: EXACT MATCH - Highest priority (10000)
  if (termName === query || normalizedTermName === normalizedQuery) {
    console.log(`🎯 EXACT MATCH: "${term.term}" = 10000`);
    return 10000;
  }
  
  // TIER 2: PERFECT WORD MATCH - Very high priority (9000-9999)
  const exactWordMatches = queryWords.filter(qWord => 
    termWords.some(tWord => tWord === qWord)
  ).length;
  
  if (exactWordMatches === queryWords.length && queryWords.length > 1) {
    const score = 9000 + (100 - termName.length) + (exactWordMatches * 10);
    console.log(`🔥 PERFECT WORDS: "${term.term}" = ${score} (${exactWordMatches}/${queryWords.length} words)`);
    return score;
  }
  
  // TIER 3: TERM STARTS WITH QUERY - High priority (7000-7999)
  if (termName.startsWith(query) || normalizedTermName.startsWith(normalizedQuery)) {
    const score = 7000 + (100 - termName.length); // Shorter terms rank higher
    console.log(`🚀 STARTS WITH: "${term.term}" = ${score}`);
    return score;
  }
  
  // TIER 4: WORD STARTS WITH QUERY - High-medium priority (6000-6999)
  const wordStartMatches = termWords.filter(word => 
    queryWords.some(qWord => word.startsWith(qWord))
  ).length;
  
  if (wordStartMatches > 0) {
    const score = 6000 + (wordStartMatches * 100) + (100 - termName.length);
    console.log(`🌟 WORD STARTS: "${term.term}" = ${score} (${wordStartMatches} words)`);
    return score;
  }
  
  // TIER 5: TERM CONTAINS QUERY - Medium priority (4000-4999)
  if (termName.includes(query) || normalizedTermName.includes(normalizedQuery)) {
    const position = Math.min(termName.indexOf(query), normalizedTermName.indexOf(normalizedQuery));
    const actualPosition = position === -1 ? Math.max(termName.indexOf(query), normalizedTermName.indexOf(normalizedQuery)) : position;
    const score = 4000 + (100 - actualPosition) + (exactWordMatches * 50);
    console.log(`💫 CONTAINS: "${term.term}" = ${score} (pos: ${actualPosition})`);
    return score;
  }
  
  // TIER 6: PARTIAL WORD MATCHES - Medium-low priority (3000-3999)
  const partialWordMatches = queryWords.filter(qWord => 
    termWords.some(tWord => tWord.includes(qWord) && qWord.length > 2)
  ).length;
  
  if (partialWordMatches > 0) {
    const score = 3000 + (partialWordMatches * 100) + exactWordMatches * 50;
    console.log(`🔍 PARTIAL WORDS: "${term.term}" = ${score} (${partialWordMatches}/${queryWords.length})`);
    return score;
  }
  
  // TIER 7: DEFINITION STARTS WITH QUERY - Low-medium priority (400-499)
  if (definition.startsWith(query) || definition.startsWith(normalizedQuery)) {
    console.log(`📖 DEF STARTS: "${term.term}" = 400`);
    return 400;
  }
  
  // TIER 8: DEFINITION CONTAINS QUERY - Lower priority (200-399)
  if (definition.includes(query) || definition.includes(normalizedQuery)) {
    const queryOccurrences = (definition.match(new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    const wordMatches = queryWords.filter(qWord => definition.includes(qWord)).length;
    const score = 200 + Math.min(queryOccurrences * 10, 50) + (wordMatches * 20);
    console.log(`📝 DEF CONTAINS: "${term.term}" = ${score} (${queryOccurrences}x, ${wordMatches} words)`);
    return score;
  }
  
  // TIER 9: QUESTION MATCHES - Lowest priority (50-150)
  if (question) {
    if (question.startsWith(query) || question.startsWith(normalizedQuery)) {
      console.log(`❓ Q STARTS: "${term.term}" = 150`);
      return 150;
    } else if (question.includes(query) || question.includes(normalizedQuery)) {
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
      toast.success(`Successfully loaded and transformed ${rawData.length} glossary terms with questions`);
    }
  }, [dataSource, rawData]);

  // Main filtering and sorting logic - ENHANCED SEARCH-FIRST APPROACH
  const filteredAndSortedTerms = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    console.log(`🔍 Processing search: "${searchTerm}" (normalized: "${query}"), category: "${activeCategory}"`);
    
    let processedTerms = [...rawData];
    
    // ENHANCED SEARCH-FIRST APPROACH: Score and filter by search relevance FIRST
    if (query) {
      console.log(`🎯 ENHANCED SEARCH MODE: Scoring ${processedTerms.length} terms for "${query}"`);
      
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

      console.log(`📊 Enhanced search scored ${searchResults.length} relevant terms`);
      
      // Log top 15 results for debugging with scores
      if (searchResults.length > 0) {
        console.log('🏆 Top enhanced search results:');
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
