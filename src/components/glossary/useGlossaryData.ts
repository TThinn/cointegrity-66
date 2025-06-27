import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "./types";
import { glossaryTerms } from "@/data/glossaryTerms";
import { toast } from "sonner";
import { batchTransformTerms } from "./utils/termTransformation";

/**
 * Score a term based on how well it matches the search query
 * Fixed tier-based scoring system with proper exact match detection
 */
const scoreTermMatch = (term: GlossaryTerm, searchTerm: string): number => {
  if (!searchTerm) return 0;
  
  const query = searchTerm.toLowerCase().trim();
  const termName = term.term.toLowerCase().trim();
  const definition = term.definition.toLowerCase();
  const question = term.question?.toLowerCase() || '';
  
  let score = 0;
  let matchType = '';
  
  // TIER 1: EXACT MATCH - Highest priority (10000)
  if (termName === query) {
    score = 10000;
    matchType = 'exact match';
  }
  // TIER 2: TERM STARTS WITH QUERY - Very high priority (5000)
  else if (termName.startsWith(query)) {
    score = 5000;
    matchType = 'term starts with';
  }
  // TIER 3: TERM CONTAINS QUERY - High priority (3000)
  else if (termName.includes(query)) {
    score = 3000;
    matchType = 'term contains';
  }
  // TIER 4: DEFINITION STARTS WITH QUERY - Medium priority (400)
  else if (definition.startsWith(query)) {
    score = 400;
    matchType = 'definition starts with';
  }
  // TIER 5: DEFINITION CONTAINS QUERY - Low-medium priority (200-300)
  else if (definition.includes(query)) {
    const occurrences = (definition.match(new RegExp(query, 'g')) || []).length;
    score = 200 + Math.min(occurrences * 20, 100); // Base 200, max bonus 100
    matchType = `definition contains (${occurrences}x)`;
  }
  // TIER 6: QUESTION MATCHES - Lowest priority (50-100)
  else if (question) {
    if (question.startsWith(query)) {
      score = 100;
      matchType = 'question starts with';
    } else if (question.includes(query)) {
      score = 50;
      matchType = 'question contains';
    }
  }
  
  // Enhanced debugging for search results
  if (query && score > 0) {
    console.log(`🔍 Scoring "${term.term}": ${matchType} = ${score}`);
  }
  
  return score;
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

  // Main filtering and sorting logic - RESTRUCTURED
  const filteredAndSortedTerms = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    console.log(`🔍 Processing search: "${searchTerm}" (normalized: "${query}"), category: "${activeCategory}"`);
    
    // STEP 1: Start with all terms
    let processedTerms = [...rawData];
    
    // STEP 2: Apply search filtering and scoring FIRST (before category filtering)
    if (query) {
      console.log(`🎯 Starting search for "${query}" in ${processedTerms.length} terms`);
      
      // Score all terms and filter by relevance
      const searchScoredTerms = processedTerms
        .map(term => {
          const relevanceScore = scoreTermMatch(term, query);
          return {
            ...term,
            relevanceScore
          };
        })
        .filter(term => term.relevanceScore > 0);

      // Sort by relevance score (highest first), then alphabetically for same scores
      searchScoredTerms.sort((a, b) => {
        if (a.relevanceScore !== b.relevanceScore) {
          return b.relevanceScore - a.relevanceScore;
        }
        return a.term.localeCompare(b.term);
      });

      console.log(`📊 Search results for "${query}": ${searchScoredTerms.length} terms found`);
      
      // Log top results for debugging
      if (searchScoredTerms.length > 0) {
        console.log('🏆 Top 5 search results:', searchScoredTerms.slice(0, 5).map((t, index) => ({
          rank: index + 1,
          term: t.term,
          score: t.relevanceScore,
          scoreType: t.relevanceScore >= 10000 ? 'EXACT' : 
                    t.relevanceScore >= 5000 ? 'STARTS' : 
                    t.relevanceScore >= 3000 ? 'CONTAINS' : 'OTHER'
        })));
      }

      // Remove relevanceScore before continuing
      processedTerms = searchScoredTerms.map(({ relevanceScore, ...term }) => term);
    }
    
    // STEP 3: Apply category filtering AFTER search scoring
    if (activeCategory !== "all") {
      processedTerms = processedTerms.filter(term => 
        term.categories.some(cat => cat === activeCategory)
      );
      console.log(`📂 Category filtered to ${processedTerms.length} terms for category: ${activeCategory}`);
    }
    
    // STEP 4: Final sorting - only alphabetical if no search query
    if (!query) {
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
