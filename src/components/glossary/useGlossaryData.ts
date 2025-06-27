
import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "./types";
import { glossaryTerms } from "@/data/glossaryTerms";
import { toast } from "sonner";
import { batchTransformTerms } from "./utils/termTransformation";

/**
 * Score a term based on how well it matches the search query
 * Simplified scoring system with clear tiers to prevent conflicts
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
  
  // Enhanced debugging for specific search terms
  if (query === 'minting' && score > 0) {
    console.log(`🔍 Scoring "${term.term}": ${matchType} = ${score}`, {
      termName,
      query,
      isExactMatch: termName === query,
      score,
      matchType
    });
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
    
    // Debug: Check if "Minting" term exists in the data
    const mintingTerm = transformedTerms.find(t => t.term.toLowerCase().trim() === 'minting');
    if (mintingTerm) {
      console.log(`✅ "Minting" term found in data:`, {
        term: mintingTerm.term,
        originalTerm: mintingTerm.term,
        trimmed: mintingTerm.term.toLowerCase().trim(),
        hasQuestion: !!mintingTerm.question
      });
    } else {
      console.log(`❌ "Minting" term NOT found in transformed data`);
      // Check original data
      const originalMinting = glossaryTerms.find(t => t.term.toLowerCase().includes('mint'));
      if (originalMinting) {
        console.log(`Found in original data:`, originalMinting.term);
      }
    }
    
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

  // Filter and sort terms based on search and category with enhanced relevance scoring
  const filteredAndSortedTerms = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    console.log(`🔍 Filtering terms with search: "${searchTerm}" (normalized: "${query}"), category: "${activeCategory}"`);
    
    // First filter by category
    const categoryFiltered = rawData.filter(term => {
      const matchesCategory = activeCategory === "all" || 
                        term.categories.some(cat => 
                          cat === activeCategory
                        );
      return matchesCategory;
    });

    // If no search term, return alphabetically sorted results
    if (!query) {
      return [...categoryFiltered].sort((a, b) => a.term.localeCompare(b.term));
    }

    // Enhanced search with detailed logging
    console.log(`🎯 Starting search for "${query}" in ${categoryFiltered.length} category-filtered terms`);
    
    // Filter by search term and calculate relevance scores
    const searchFiltered = categoryFiltered
      .map(term => {
        const relevanceScore = scoreTermMatch(term, query);
        return {
          ...term,
          relevanceScore
        };
      })
      .filter(term => term.relevanceScore > 0);

    // Sort by relevance score (highest first), then alphabetically for same scores
    const sortedByRelevance = searchFiltered.sort((a, b) => {
      if (a.relevanceScore !== b.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return a.term.localeCompare(b.term);
    });

    console.log(`📊 Search results for "${query}": ${sortedByRelevance.length} terms found`);
    
    // Enhanced logging for search results
    if (sortedByRelevance.length > 0) {
      console.log('🏆 Top 10 search results:', sortedByRelevance.slice(0, 10).map((t, index) => ({
        rank: index + 1,
        term: t.term,
        score: t.relevanceScore,
        scoreType: t.relevanceScore >= 10000 ? 'EXACT' : 
                  t.relevanceScore >= 5000 ? 'STARTS' : 
                  t.relevanceScore >= 3000 ? 'CONTAINS' : 'OTHER'
      })));
      
      // Special validation for exact matches
      if (query === 'minting') {
        const exactMatch = sortedByRelevance.find(t => t.term.toLowerCase().trim() === 'minting');
        if (exactMatch) {
          const rank = sortedByRelevance.indexOf(exactMatch) + 1;
          console.log(`🎯 SUCCESS: "Minting" exact match found at rank ${rank} with score ${exactMatch.relevanceScore}`);
          
          // Verify it's actually first
          if (rank !== 1) {
            console.error(`🚨 ISSUE: Exact match should be rank 1, but is rank ${rank}`);
            console.log('First result:', sortedByRelevance[0]);
          }
        } else {
          console.error(`❌ PROBLEM: No exact match for "Minting" found in results`);
        }
      }
    }

    // Remove the relevanceScore property before returning
    return sortedByRelevance.map(({ relevanceScore, ...term }) => term);
  }, [rawData, searchTerm, activeCategory]);

  // Group terms by first letter for alphabetical index
  const groupedTerms = useMemo(() => {
    const grouped: Record<string, GlossaryTerm[]> = {};
    
    filteredAndSortedTerms.forEach(term => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      
      grouped[firstLetter].push(term);
    });
    
    return grouped;
  }, [filteredAndSortedTerms]);

  // Extract all letters that have terms
  const letters = useMemo(() => {
    return Object.keys(groupedTerms).sort();
  }, [groupedTerms]);

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
    transformationProgress
  };
};
