
import { useState, useMemo, useEffect, useRef } from "react";
import { glossaryTerms } from "@/data/glossaryTerms";
import { CategoryType } from "./types";
import { toast } from "sonner";

export const useGlossaryTerms = (
  searchTerm: string,
  activeCategory: CategoryType | "all"
) => {
  // Add a mount counter to detect if the component is hot-reloaded/remounted
  const mountCount = useRef(0);
  const importCounter = useRef(0);
  
  // Track first render and mounting
  useEffect(() => {
    mountCount.current += 1;
    console.log("🔄 useGlossaryTerms hook mounted. Mount count:", mountCount.current);
    
    // Direct verification of data source
    try {
      console.log("🔄 Direct glossaryTerms check:", {
        type: typeof glossaryTerms,
        isArray: Array.isArray(glossaryTerms),
        length: glossaryTerms.length
      });
      
      if (glossaryTerms.length < 100) {
        console.warn("🔄 WARNING: glossaryTerms contains fewer items than expected");
        console.log("🔄 First few items:", glossaryTerms.slice(0, 3));
      }
    } catch (e) {
      console.error("🔄 CRITICAL ERROR accessing glossaryTerms:", e);
    }
    
    return () => {
      console.log("🔄 useGlossaryTerms hook unmounted");
    };
  }, []);

  // Enhanced debug logging to identify data source issues
  const allTerms = useMemo(() => {
    importCounter.current += 1;
    console.log(`🔄 useGlossaryTerms: Importing glossaryTerms (attempt ${importCounter.current})`);
    console.log("🔄 DIAGNOSTIC: Attempting to load glossary terms from data source");
    
    let loadedTerms = [];
    
    try {
      // Check if the import is actually an array
      if (!Array.isArray(glossaryTerms)) {
        console.error("🔄 CRITICAL ERROR: glossaryTerms is not an array:", typeof glossaryTerms);
        return [];
      }
      
      // Ensure we're getting the data correctly by creating a new reference
      loadedTerms = [...glossaryTerms]; 
      console.log("🔄 DIAGNOSTIC: Created a new reference of glossaryTerms");
      console.log("🔄 DIAGNOSTIC: Loading glossary terms from data source, count:", loadedTerms.length);
      
      // Detailed logging of the first few items to verify content
      if (loadedTerms.length > 0) {
        console.log("🔄 DIAGNOSTIC: First 3 terms sample:", 
          loadedTerms.slice(0, 3).map(t => t.term));
      }
      
      // If we have a very low number of terms, try to trigger a hard refresh
      if (loadedTerms.length < 100 && mountCount.current === 1) {
        console.warn("🔄 DIAGNOSTIC: Very few terms found. Suspect import or syntax issues.");
      }
      
      // Verify data can be serialized (check for circular references or syntax issues)
      try {
        const serializedSample = JSON.stringify(loadedTerms.slice(0, 5));
        console.log(`🔄 DIAGNOSTIC: Successfully serialized sample terms (${serializedSample.length} bytes)`);
      } catch (serializeError) {
        console.error("🔄 DIAGNOSTIC: Failed to serialize terms:", serializeError);
      }
    } catch (error) {
      console.error("🔄 CRITICAL ERROR loading glossary terms:", error);
      toast.error("Error loading glossary terms. Please check console for details.");
      return []; // Return empty array as fallback
    }
    
    return loadedTerms;
  }, []); // Empty dependency array to only run once
  
  // Sort terms alphabetically
  const sortedTerms = useMemo(() => {
    try {
      return [...allTerms].sort((a, b) => a.term.localeCompare(b.term));
    } catch (error) {
      console.error("🔄 Error sorting terms:", error);
      return allTerms;
    }
  }, [allTerms]);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    try {
      return sortedTerms.filter(term => {
        const matchesSearch = searchTerm === '' || 
                            term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = activeCategory === "all" || 
                            (term.categories && term.categories.includes(activeCategory as CategoryType));
        
        return matchesSearch && matchesCategory;
      });
    } catch (error) {
      console.error("🔄 Error filtering terms:", error);
      return sortedTerms;
    }
  }, [sortedTerms, searchTerm, activeCategory]);

  // Log for debugging
  console.log(`Total terms in glossaryTerms: ${allTerms.length}`);
  console.log(`Filtered terms count: ${filteredTerms.length}`);
  console.log(`Active category: ${activeCategory}`);
  console.log(`Search term: "${searchTerm}"`);

  // Group terms by first letter for alphabetical index
  const groupedTerms = useMemo(() => {
    try {
      return filteredTerms.reduce((acc, term) => {
        const firstLetter = term.term.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(term);
        return acc;
      }, {} as Record<string, typeof glossaryTerms>);
    } catch (error) {
      console.error("🔄 Error grouping terms:", error);
      return {} as Record<string, typeof glossaryTerms>;
    }
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
