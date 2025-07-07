import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "../types";
import { loadGlossaryTerms } from "@/data/glossaryTermsLazy";
import { scoreTermMatch } from "../utils/termScoring";
import { isDirectMatch } from "../utils/termMatching";

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

  // Use glossary terms directly without expensive transformations
  const rawData = useMemo(() => {
    if (glossaryTerms.length === 0) return [];
    console.log(`Fast mode: Using ${glossaryTerms.length} terms directly`);
    setIsLoading(false);
    return glossaryTerms;
  }, [glossaryTerms]);

  // FAST filtering and sorting logic - Simple for browsing, advanced for search
  const filteredAndSortedTerms = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    let processedTerms = [...rawData];
    
    if (query) {
      // SEARCH MODE: Use advanced scoring but only when actually searching
      console.log(`🔍 ADVANCED SEARCH MODE: Scoring ${processedTerms.length} terms for "${query}"`);
      
      const searchResults = processedTerms
        .map(term => ({
          ...term,
          relevanceScore: scoreTermMatch(term, query)
        }))
        .filter(term => term.relevanceScore > 0)
        .sort((a, b) => {
          if (a.relevanceScore !== b.relevanceScore) {
            return b.relevanceScore - a.relevanceScore;
          }
          return a.term.localeCompare(b.term);
        });

      console.log(`📊 Advanced search found ${searchResults.length} relevant terms`);
      
      processedTerms = searchResults.map(({ relevanceScore, ...term }) => term);
      
      // Apply category filter AFTER search scoring
      if (activeCategory !== "all") {
        processedTerms = processedTerms.filter(term => 
          term.categories.some(cat => cat === activeCategory)
        );
      }
    } else {
      // BROWSE MODE: Fast simple filtering
      console.log(`📂 FAST BROWSE MODE: Category filter: ${activeCategory}`);
      
      if (activeCategory !== "all") {
        processedTerms = processedTerms.filter(term => 
          term.categories.some(cat => cat === activeCategory)
        );
      }
      
      // Simple alphabetical sort for browsing
      processedTerms.sort((a, b) => a.term.localeCompare(b.term));
    }
    
    console.log(`✅ Result: ${processedTerms.length} terms`);
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
    isSearching: !!searchTerm.trim()
  };
};
