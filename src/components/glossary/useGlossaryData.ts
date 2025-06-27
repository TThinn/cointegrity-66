
import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "./types";
import { glossaryTerms } from "@/data/glossaryTerms";
import { toast } from "sonner";
import { batchTransformTerms } from "./utils/termTransformation";

/**
 * Score a term based on how well it matches the search query
 * Higher scores = better matches
 */
const scoreTermMatch = (term: GlossaryTerm, searchTerm: string): number => {
  if (!searchTerm) return 0;
  
  const query = searchTerm.toLowerCase();
  const termName = term.term.toLowerCase();
  const definition = term.definition.toLowerCase();
  const question = term.question?.toLowerCase() || '';
  
  // Exact match in term name gets highest score
  if (termName === query) return 1000;
  
  // Term starts with search query gets very high score
  if (termName.startsWith(query)) return 800;
  
  // Term contains search query gets high score
  if (termName.includes(query)) return 600;
  
  // Definition starts with search query gets medium-high score
  if (definition.startsWith(query)) return 400;
  
  // Definition contains search query gets medium score
  if (definition.includes(query)) return 300;
  
  // Question starts with search query gets medium score
  if (question && question.startsWith(query)) return 200;
  
  // Question contains search query gets low score
  if (question && question.includes(query)) return 100;
  
  // No match
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

  // Filter and sort terms based on search and category with relevance scoring
  const filteredAndSortedTerms = useMemo(() => {
    console.log(`Filtering terms with search: "${searchTerm}", category: "${activeCategory}"`);
    
    // First filter by category
    const categoryFiltered = rawData.filter(term => {
      const matchesCategory = activeCategory === "all" || 
                        term.categories.some(cat => 
                          cat === activeCategory
                        );
      return matchesCategory;
    });

    // If no search term, return alphabetically sorted results
    if (!searchTerm.trim()) {
      return [...categoryFiltered].sort((a, b) => a.term.localeCompare(b.term));
    }

    // Filter by search term and calculate relevance scores
    const searchFiltered = categoryFiltered
      .map(term => ({
        ...term,
        relevanceScore: scoreTermMatch(term, searchTerm.trim())
      }))
      .filter(term => term.relevanceScore > 0);

    // Sort by relevance score (highest first), then alphabetically for same scores
    const sortedByRelevance = searchFiltered.sort((a, b) => {
      if (a.relevanceScore !== b.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return a.term.localeCompare(b.term);
    });

    console.log(`Search results: ${sortedByRelevance.length} terms found`);
    console.log('Top 5 results:', sortedByRelevance.slice(0, 5).map(t => ({
      term: t.term,
      score: t.relevanceScore
    })));

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
