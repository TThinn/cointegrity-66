import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "../types";
import { loadGlossaryTerms } from "@/data/glossaryTermsLazy";
import { batchTransformTerms } from "../utils/termTransformation";
import { scoreTermMatch } from "../utils/termScoring";

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
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);

  // Load glossary terms lazily
  useEffect(() => {
    let isMounted = true;
    
    const loadTerms = async () => {
      try {
        const terms = await loadGlossaryTerms();
        if (isMounted) {
          setGlossaryTerms(terms);
          console.log(`Loaded ${terms.length} glossary terms lazily`);
        }
      } catch (error) {
        console.error('Failed to load glossary terms:', error);
      }
    };

    loadTerms();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Get the appropriate data based on the selected source and apply transformations
  const rawData = useMemo(() => {
    if (glossaryTerms.length === 0) return [];
    
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
  }, [dataSource, glossaryTerms]);

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
