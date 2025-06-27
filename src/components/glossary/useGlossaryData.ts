
import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "./types";
import { glossaryTerms } from "@/data/glossaryTerms";
import { toast } from "sonner";
import { batchTransformTerms } from "./utils/termTransformation";

/**
 * Score a term based on how well it matches the search query
 * Clear tier-based scoring system for optimal search results
 */
const scoreTermMatch = (term: GlossaryTerm, searchTerm: string): number => {
  if (!searchTerm) return 0;
  
  const query = searchTerm.toLowerCase().trim();
  const termName = term.term.toLowerCase().trim();
  const definition = term.definition.toLowerCase();
  const question = term.question?.toLowerCase() || '';
  
  // TIER 1: EXACT MATCH - Highest priority (10000)
  if (termName === query) {
    console.log(`🎯 EXACT MATCH: "${term.term}" = 10000`);
    return 10000;
  }
  
  // TIER 2: TERM STARTS WITH QUERY - Very high priority (5000-5999)
  if (termName.startsWith(query)) {
    const score = 5000 + (100 - termName.length); // Shorter terms rank higher
    console.log(`🚀 STARTS WITH: "${term.term}" = ${score}`);
    return score;
  }
  
  // TIER 3: TERM CONTAINS QUERY - High priority (3000-3999)
  if (termName.includes(query)) {
    const position = termName.indexOf(query);
    const score = 3000 + (100 - position); // Earlier position ranks higher
    console.log(`💫 CONTAINS: "${term.term}" = ${score}`);
    return score;
  }
  
  // TIER 4: DEFINITION STARTS WITH QUERY - Medium priority (400-499)
  if (definition.startsWith(query)) {
    console.log(`📖 DEF STARTS: "${term.term}" = 400`);
    return 400;
  }
  
  // TIER 5: DEFINITION CONTAINS QUERY - Low-medium priority (200-300)
  if (definition.includes(query)) {
    const occurrences = (definition.match(new RegExp(query, 'g')) || []).length;
    const score = 200 + Math.min(occurrences * 10, 100);
    console.log(`📝 DEF CONTAINS: "${term.term}" = ${score} (${occurrences}x)`);
    return score;
  }
  
  // TIER 6: QUESTION MATCHES - Lowest priority (50-100)
  if (question) {
    if (question.startsWith(query)) {
      console.log(`❓ Q STARTS: "${term.term}" = 100`);
      return 100;
    } else if (question.includes(query)) {
      console.log(`❓ Q CONTAINS: "${term.term}" = 50`);
      return 50;
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

  // Main filtering and sorting logic - OPTIMIZED FOR SEARCH
  const filteredAndSortedTerms = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    console.log(`🔍 Processing search: "${searchTerm}" (normalized: "${query}"), category: "${activeCategory}"`);
    
    let processedTerms = [...rawData];
    
    // SEARCH-FIRST APPROACH: Score and filter by search relevance FIRST
    if (query) {
      console.log(`🎯 SEARCH MODE: Scoring ${processedTerms.length} terms for "${query}"`);
      
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

      console.log(`📊 Search scored ${searchResults.length} relevant terms`);
      
      // Log top 10 results for debugging
      if (searchResults.length > 0) {
        console.log('🏆 Top search results:');
        searchResults.slice(0, 10).forEach((term, index) => {
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
