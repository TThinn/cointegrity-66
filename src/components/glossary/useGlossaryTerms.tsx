
import { useState, useMemo } from "react";
import { glossaryTerms } from "@/data/glossaryTerms";
import { CategoryType } from "./types";

export const useGlossaryTerms = (
  searchTerm: string,
  activeCategory: CategoryType | "all"
) => {
  // Sort terms alphabetically
  const sortedTerms = useMemo(() => {
    return [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));
  }, []);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return sortedTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "all" || term.categories.includes(activeCategory as CategoryType);
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
    }, {} as Record<string, typeof glossaryTerms>);
  }, [filteredTerms]);

  // Extract all letters that have terms
  const letters = useMemo(() => {
    return Object.keys(groupedTerms).sort();
  }, [groupedTerms]);

  return {
    filteredTerms,
    groupedTerms,
    letters
  };
};
