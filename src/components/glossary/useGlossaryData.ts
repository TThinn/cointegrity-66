
import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "./types";
import { glossaryTerms } from "@/data/glossaryTerms";
import { toast } from "sonner";
import { batchTransformTerms } from "./utils/termTransformation";

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

  // Sort terms alphabetically
  const sortedTerms = useMemo(() => {
    return [...rawData].sort((a, b) => a.term.localeCompare(b.term));
  }, [rawData]);

  // Filter terms based on search and category (including question field in search)
  const filteredTerms = useMemo(() => {
    return sortedTerms.filter(term => {
      const matchesSearch = searchTerm === '' || 
                        term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (term.question && term.question.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Handle category filtering with type safety
      const matchesCategory = activeCategory === "all" || 
                        term.categories.some(cat => 
                          // Ensure the category is treated as a valid CategoryType
                          cat === activeCategory
                        );
      
      return matchesSearch && matchesCategory;
    });
  }, [sortedTerms, searchTerm, activeCategory]);

  // Group terms by first letter for alphabetical index
  const groupedTerms = useMemo(() => {
    const grouped: Record<string, GlossaryTerm[]> = {};
    
    filteredTerms.forEach(term => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      
      grouped[firstLetter].push(term);
    });
    
    return grouped;
  }, [filteredTerms]);

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
    filteredTerms,
    groupedTerms,
    letters,
    isLoading,
    totalTermsCount: rawData.length,
    transformationProgress
  };
};
