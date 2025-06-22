
import { useMemo } from "react";
import { glossaryTerms } from "@/data/glossaryTerms";
import { CategoryType } from "./types";

/**
 * Custom hook to filter and organize glossary terms
 * Uses the imported data directly rather than trying to re-import dynamically
 */
export const useGlossaryTerms = (
  searchTerm: string,
  activeCategory: CategoryType | "all"
) => {
  // Log the data source directly
  console.log("🔍 Direct access check - glossaryTerms:", {
    length: glossaryTerms.length,
    isArray: Array.isArray(glossaryTerms),
    firstItem: glossaryTerms.length > 0 ? glossaryTerms[0].term : 'none'
  });

  // Use the imported data directly without any dynamic re-importing
  const allTerms = useMemo(() => {
    return glossaryTerms;
  }, []);

  // Sort terms alphabetically
  const sortedTerms = useMemo(() => {
    return [...allTerms].sort((a, b) => a.term.localeCompare(b.term));
  }, [allTerms]);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return sortedTerms.filter(term => {
      const matchesSearch = searchTerm === '' || 
                          term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === "all" || 
                          term.categories.some(cat => cat === activeCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [sortedTerms, searchTerm, activeCategory]);

  // Group terms by first letter for alphabetical index
  const groupedTerms = useMemo(() => {
    return filteredTerms.reduce((acc, term) => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(term);
      return acc;
    }, {} as Record<string, typeof filteredTerms>);
  }, [filteredTerms]);

  // Extract all letters that have terms
  const letters = useMemo(() => {
    return Object.keys(groupedTerms).sort();
  }, [groupedTerms]);

  return {
    filteredTerms,
    groupedTerms,
    letters,
    totalTermsCount: allTerms.length
  };
};
