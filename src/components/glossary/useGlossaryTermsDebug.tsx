
import { useState, useMemo, useEffect } from "react";
import { glossaryTermsNew } from "@/data/glossaryTermsNew"; 
import { glossaryTerms } from "@/data/glossaryTerms";
import { CategoryType } from "./types";

export const useGlossaryTermsDebug = (
  searchTerm: string,
  activeCategory: CategoryType | "all"
) => {
  // Compare both data sources to identify issues
  useEffect(() => {
    console.log("🔍 DEBUG: Original glossaryTerms length:", glossaryTerms.length);
    console.log("🔍 DEBUG: New glossaryTermsNew length:", glossaryTermsNew.length);
    
    // Check if the imports are resolving to the same object
    console.log("🔍 DEBUG: Are imports the same object?", glossaryTerms === glossaryTermsNew);
    
    // Check memory addresses
    console.log("🔍 DEBUG: Original glossaryTerms memory reference:", glossaryTerms);
    console.log("🔍 DEBUG: New glossaryTermsNew memory reference:", glossaryTermsNew);
    
    // Compare the first item to see if they're the same
    if (glossaryTerms.length > 0 && glossaryTermsNew.length > 0) {
      console.log("🔍 DEBUG: First item in original same as new?", 
        JSON.stringify(glossaryTerms[0]) === JSON.stringify(glossaryTermsNew[0]));
    }
    
    // Track module imports
    try {
      console.log("🔍 DEBUG: Module context:", import.meta.url);
    } catch (e) {
      console.log("🔍 DEBUG: Error getting module info", e);
    }
  }, []);
  
  // Enhanced debug logging to identify data source issues
  const allTerms = useMemo(() => {
    console.log("🔍 DEBUG: Using new glossaryTermsNew for testing");
    
    // Force using the new data source
    const terms = glossaryTermsNew;
    
    console.log("🔍 DEBUG: Terms loaded count:", terms.length);
    console.log("🔍 DEBUG: Terms sample:", terms.slice(0, 2));
    
    // Check for any potential circular references or serialization issues
    try {
      const serialized = JSON.stringify(terms.slice(0, 5));
      console.log("🔍 DEBUG: Terms can be serialized successfully");
    } catch (e) {
      console.error("🔍 DEBUG: Failed to serialize terms:", e);
    }
    
    return terms;
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
      
      const matchesCategory = activeCategory === "all" || term.categories.includes(activeCategory as CategoryType);
      
      return matchesSearch && matchesCategory;
    });
  }, [sortedTerms, searchTerm, activeCategory]);

  // Log for debugging
  console.log(`🔍 DEBUG: Total terms in allTerms: ${allTerms.length}`);
  console.log(`🔍 DEBUG: Filtered terms count: ${filteredTerms.length}`);

  // Group terms by first letter for alphabetical index
  const groupedTerms = useMemo(() => {
    return filteredTerms.reduce((acc, term) => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(term);
      return acc;
    }, {} as Record<string, typeof allTerms>);
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
