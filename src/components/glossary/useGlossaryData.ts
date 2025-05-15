
import { useState, useMemo, useEffect } from "react";
import { CategoryType, DataSourceType, GlossaryTerm } from "./types";
import { glossaryTerms } from "@/data/glossaryTerms";
import { toast } from "sonner";

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

  // Get the appropriate data based on the selected source
  // Currently we only have the original data source
  const rawData = useMemo(() => {
    console.log(`Using ${dataSource} data source`);
    
    // For now, all data sources use the same data
    // This can be expanded when additional data sources are available
    console.log(`Original data source length: ${glossaryTerms.length}`);
    return glossaryTerms;
  }, [dataSource]);

  // Log data loading on component mount
  useEffect(() => {
    console.log("Glossary data initial load:", {
      source: dataSource,
      termCount: rawData.length,
      sampleTerms: rawData.slice(0, 3).map(t => t.term)
    });
    
    setIsLoading(false);
    
    if (rawData.length < 20) {
      toast.warning(`Only ${rawData.length} terms loaded. This may indicate a data loading issue.`);
    }
  }, [dataSource, rawData]);

  // Sort terms alphabetically
  const sortedTerms = useMemo(() => {
    return [...rawData].sort((a, b) => a.term.localeCompare(b.term));
  }, [rawData]);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return sortedTerms.filter(term => {
      const matchesSearch = searchTerm === '' || 
                        term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      
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
    totalTermsCount: rawData.length
  };
};
