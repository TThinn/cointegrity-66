
import { useMemo } from "react";
import { glossaryTerms } from "@/data/glossaryTerms";
import { glossaryTermsNew } from "@/data/glossaryTermsNew";
import { glossaryTerms as glossaryTermsTemp } from "@/data/temp";
import { CategoryType, GlossaryTerm } from "./types";

/**
 * Debug version of the glossary terms hook
 * For diagnostic purposes only
 */
export const useGlossaryTermsDebug = (
  searchTerm: string,
  activeCategory: CategoryType | "all"
) => {
  // Use the original data for debugging
  const allTerms = useMemo(() => {
    return glossaryTerms;
  }, []);

  // Record import status for diagnosis
  console.log("🔧 DIAGNOSTIC: Data import check", {
    originalTermsLength: glossaryTerms.length,
    newTermsLength: glossaryTermsNew.length,
    tempTermsLength: glossaryTermsTemp.length,
  });

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
                          term.categories.includes(activeCategory as any);
      
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
      grouped[firstLetter].push(term as GlossaryTerm);
    });
    
    return grouped;
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
