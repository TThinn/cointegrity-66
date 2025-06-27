
import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "./types";
import { glossaryTerms } from "@/data/glossaryTerms";
import { toast } from "sonner";
import { batchTransformTerms } from "./utils/termTransformation";

/**
 * Score a term based on how well it matches the search query
 * Higher scores = better matches
 * Enhanced scoring system with exact match prioritization
 */
const scoreTermMatch = (term: GlossaryTerm, searchTerm: string): number => {
  if (!searchTerm) return 0;
  
  const query = searchTerm.toLowerCase().trim();
  const termName = term.term.toLowerCase().trim();
  const definition = term.definition.toLowerCase();
  const question = term.question?.toLowerCase() || '';
  
  let score = 0;
  let matchDetails: string[] = [];
  
  // EXACT MATCH - Significantly higher score (10000)
  if (termName === query) {
    score = 10000;
    matchDetails.push(`exact match (${score})`);
    
    // Log exact matches for debugging
    if (query === 'minting') {
      console.log(`🎯 EXACT MATCH FOUND: "${term.term}" with score ${score}`);
    }
    
    return score;
  }
  
  // TERM STARTS WITH QUERY - Very high score (8000)
  if (termName.startsWith(query)) {
    score = 8000;
    matchDetails.push(`term starts with query (${score})`);
  }
  // TERM CONTAINS QUERY - High score (6000)
  else if (termName.includes(query)) {
    score = 6000;
    matchDetails.push(`term contains query (${score})`);
  }
  
  // DEFINITION MATCHES - Medium scores (only if no term match)
  if (score === 0) {
    if (definition.startsWith(query)) {
      score = 400;
      matchDetails.push(`definition starts with query (${score})`);
    } else if (definition.includes(query)) {
      // Count occurrences but cap the bonus to prevent spam
      const occurrences = (definition.match(new RegExp(query, 'g')) || []).length;
      const baseScore = 300;
      const bonusScore = Math.min(occurrences * 50, 200); // Cap bonus at 200
      score = baseScore + bonusScore;
      matchDetails.push(`definition contains query ${occurrences}x (${score})`);
    }
  }
  
  // QUESTION MATCHES - Lower scores (only if no previous matches)
  if (score === 0 && question) {
    if (question.startsWith(query)) {
      score = 200;
      matchDetails.push(`question starts with query (${score})`);
    } else if (question.includes(query)) {
      score = 100;
      matchDetails.push(`question contains query (${score})`);
    }
  }
  
  // Debug logging for specific terms
  if (query === 'minting' && score > 0) {
    console.log(`🔍 Scoring "${term.term}": ${matchDetails.join(', ')} = ${score}`);
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
    
    // Enhanced logging for top results
    if (sortedByRelevance.length > 0) {
      console.log('🏆 Top 10 search results:', sortedByRelevance.slice(0, 10).map((t, index) => ({
        rank: index + 1,
        term: t.term,
        score: t.relevanceScore,
        isExactMatch: t.term.toLowerCase().trim() === query
      })));
      
      // Special logging for "minting" searches
      if (query === 'minting') {
        const exactMatch = sortedByRelevance.find(t => t.term.toLowerCase().trim() === 'minting');
        if (exactMatch) {
          const rank = sortedByRelevance.indexOf(exactMatch) + 1;
          console.log(`🎯 "Minting" exact match found at rank ${rank} with score ${exactMatch.relevanceScore}`);
        } else {
          console.log(`❌ No exact match for "Minting" found in results`);
          console.log(`Available minting-related terms:`, 
            sortedByRelevance
              .filter(t => t.term.toLowerCase().includes('mint'))
              .map(t => ({ term: t.term, score: t.relevanceScore }))
          );
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
