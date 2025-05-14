
import { useState, useMemo, useEffect } from "react";
import { glossaryTerms } from "@/data/glossaryTerms"; // Verify this import path
import { CategoryType } from "./types";

export const useGlossaryTerms = (
  searchTerm: string,
  activeCategory: CategoryType | "all"
) => {
  // Enhanced debug logging to identify data source issues
  const allTerms = useMemo(() => {
    console.log("DIAGNOSTIC: Attempting to load glossary terms from data source");
    console.log("DIAGNOSTIC: Import path being used:", "@/data/glossaryTerms");
    console.log("DIAGNOSTIC: Type of imported glossaryTerms:", typeof glossaryTerms);
    console.log("DIAGNOSTIC: Is glossaryTerms an array?", Array.isArray(glossaryTerms));
    console.log("DIAGNOSTIC: Loading glossary terms from data source, count:", glossaryTerms.length);
    
    // Detailed logging of the first few items to verify content
    if (glossaryTerms.length > 0) {
      console.log("DIAGNOSTIC: First 3 terms sample:", 
        glossaryTerms.slice(0, 3).map(t => t.term));
    }
    
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
      
      const matchesCategory = activeCategory === "all" || term.categories.includes(activeCategory as CategoryType);
      
      return matchesSearch && matchesCategory;
    });
  }, [sortedTerms, searchTerm, activeCategory]);

  // Log for debugging
  console.log(`Total terms in glossaryTerms: ${allTerms.length}`);
  console.log(`Filtered terms count: ${filteredTerms.length}`);
  console.log(`Active category: ${activeCategory}`);
  console.log(`Search term: "${searchTerm}"`);

  // Group terms by first letter for alphabetical index
  const groupedTerms = useMemo(() => {
    return filteredTerms.reduce((acc, term) => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(term);
      return acc;
    }, {} as Record<string, typeof glossaryTerms>);
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
