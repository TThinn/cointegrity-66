
import { useState, useMemo, useEffect, useRef } from "react";
import { glossaryTermsNew } from "@/data/glossaryTermsNew"; 
import { glossaryTerms } from "@/data/glossaryTerms";
import { glossaryTermsTemp } from "@/data/temp";
import { CategoryType } from "./types";
import { toast } from "sonner";

export const useGlossaryTermsDebug = (
  searchTerm: string,
  activeCategory: CategoryType | "all"
) => {
  // Track which data source to use
  const [dataSource, setDataSource] = useState<"original" | "new" | "temp">("new");
  
  // Count imports to detect reloads
  const importCounter = useRef(0);
  const termsRef = useRef({
    original: glossaryTerms,
    new: glossaryTermsNew,
    temp: glossaryTermsTemp
  });
  
  // On mount, check for stored preference
  useEffect(() => {
    const storedSource = localStorage.getItem("glossary_data_source");
    if (storedSource === "new" || storedSource === "temp") {
      setDataSource(storedSource);
      toast.info(`Using ${storedSource} data source`);
    }
    
    // Compare all three data sources to identify issues
    console.log("🔍 DEBUG: Original glossaryTerms length:", glossaryTerms.length);
    console.log("🔍 DEBUG: New glossaryTermsNew length:", glossaryTermsNew.length);
    console.log("🔍 DEBUG: Temp glossaryTermsTemp length:", glossaryTermsTemp.length);
    
    // Check if the imports are resolving to the same object
    console.log("🔍 DEBUG: Are original and new imports the same object?", glossaryTerms === glossaryTermsNew);
    console.log("🔍 DEBUG: Are original and temp imports the same object?", glossaryTerms === glossaryTermsTemp);
    console.log("🔍 DEBUG: Are new and temp imports the same object?", glossaryTermsNew === glossaryTermsTemp);
    
    // Check data types
    console.log("🔍 DEBUG: Original type:", Array.isArray(glossaryTerms) ? "Array" : typeof glossaryTerms);
    console.log("🔍 DEBUG: New type:", Array.isArray(glossaryTermsNew) ? "Array" : typeof glossaryTermsNew);
    console.log("🔍 DEBUG: Temp type:", Array.isArray(glossaryTermsTemp) ? "Array" : typeof glossaryTermsTemp);
    
    // Check memory addresses
    console.log("🔍 DEBUG: Original glossaryTerms memory reference:", glossaryTerms);
    console.log("🔍 DEBUG: New glossaryTermsNew memory reference:", glossaryTermsNew);
    console.log("🔍 DEBUG: Temp glossaryTermsTemp memory reference:", glossaryTermsTemp);
    
    // Compare the first item to see if they're the same
    if (glossaryTerms.length > 0 && glossaryTermsNew.length > 0) {
      console.log("🔍 DEBUG: First item in original same as new?", 
        JSON.stringify(glossaryTerms[0]) === JSON.stringify(glossaryTermsNew[0]));
    }
    
    if (glossaryTerms.length > 0 && glossaryTermsTemp.length > 0) {
      console.log("🔍 DEBUG: First item in original same as temp?", 
        JSON.stringify(glossaryTerms[0]) === JSON.stringify(glossaryTermsTemp[0]));
    }
    
    // Track module imports
    try {
      console.log("🔍 DEBUG: Module context:", import.meta.url);
    } catch (e) {
      console.log("🔍 DEBUG: Error getting module info", e);
    }
  }, []);
  
  // Debug logging with enhanced info for debugging
  const allTerms = useMemo(() => {
    importCounter.current += 1;
    
    console.log(`🔍 DEBUG: Using ${dataSource} data source (import attempt ${importCounter.current})`);
    
    // Select the appropriate data source
    let terms;
    if (dataSource === "new") {
      terms = glossaryTermsNew;
    } else if (dataSource === "temp") {
      terms = glossaryTermsTemp;
    } else {
      terms = glossaryTerms; // Original source
    }
    
    console.log("🔍 DEBUG: Terms loaded count:", terms.length);
    
    // Try to analyze the data structure more deeply
    try {
      const firstFewTerms = terms.slice(0, 3);
      console.log("🔍 DEBUG: First few terms:", firstFewTerms);
      
      // Check if terms have all expected properties
      if (terms.length > 0) {
        const expectedProps = ['term', 'definition', 'categories'];
        const firstTerm = terms[0];
        for (const prop of expectedProps) {
          console.log(`🔍 DEBUG: Has "${prop}" property?`, Object.hasOwnProperty.call(firstTerm, prop));
        }
      }
    } catch (e) {
      console.error("🔍 DEBUG: Error analyzing terms:", e);
    }
    
    // Check for any potential circular references or serialization issues
    try {
      const serialized = JSON.stringify(terms.slice(0, 5));
      console.log(`🔍 DEBUG: Terms can be serialized successfully (${serialized.length} chars)`);
    } catch (e) {
      console.error("🔍 DEBUG: Failed to serialize terms:", e);
    }
    
    return terms;
  }, [dataSource]);
  
  // Sort terms alphabetically
  const sortedTerms = useMemo(() => {
    try {
      return [...allTerms].sort((a, b) => a.term.localeCompare(b.term));
    } catch (e) {
      console.error("🔍 DEBUG: Error sorting terms:", e);
      return allTerms; // Return unsorted as fallback
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
                              term.categories.includes(activeCategory as CategoryType);
        
        return matchesSearch && matchesCategory;
      });
    } catch (e) {
      console.error("🔍 DEBUG: Error filtering terms:", e);
      return sortedTerms; // Return unfiltered as fallback
    }
  }, [sortedTerms, searchTerm, activeCategory]);

  // Log for debugging
  console.log(`🔍 DEBUG: Total terms in allTerms: ${allTerms.length}`);
  console.log(`🔍 DEBUG: Filtered terms count: ${filteredTerms.length}`);

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
      }, {} as Record<string, typeof allTerms>);
    } catch (e) {
      console.error("🔍 DEBUG: Error grouping terms:", e);
      return {} as Record<string, typeof allTerms>;
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
    totalTermsCount: allTerms.length,
    currentDataSource: dataSource,
    setDataSource
  };
};
