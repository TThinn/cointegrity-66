import { GlossaryTerm } from "../types";

/**
 * Generates a question for a glossary term based on its term and definition
 */
export const generateQuestionForTerm = (term: string, definition: string): string => {
  // Clean the term for question generation
  const cleanTerm = term.trim();
  
  // Generate contextual questions based on term patterns
  if (cleanTerm.toLowerCase().includes('what is') || cleanTerm.toLowerCase().includes('what are')) {
    return cleanTerm + '?';
  }
  
  // For acronyms (all caps with 2-6 characters)
  if (/^[A-Z]{2,6}$/.test(cleanTerm)) {
    return `What does ${cleanTerm} stand for?`;
  }
  
  // For terms ending in common suffixes
  if (cleanTerm.toLowerCase().endsWith('ing')) {
    return `What is ${cleanTerm}?`;
  }
  
  if (cleanTerm.toLowerCase().endsWith('tion') || cleanTerm.toLowerCase().endsWith('sion')) {
    return `What is ${cleanTerm}?`;
  }
  
  // For compound terms with common patterns
  if (cleanTerm.toLowerCase().includes('protocol')) {
    return `What is the ${cleanTerm}?`;
  }
  
  if (cleanTerm.toLowerCase().includes('network') || cleanTerm.toLowerCase().includes('chain')) {
    return `What is ${cleanTerm}?`;
  }
  
  // Default question format
  return `What is ${cleanTerm}?`;
};

/**
 * Transforms a definition to start with a direct answer
 */
export const transformDefinitionToAnswer = (term: string, definition: string, question: string): string => {
  const cleanTerm = term.trim();
  const cleanDefinition = definition.trim();
  
  // If definition already starts with the term name, keep as is
  if (cleanDefinition.toLowerCase().startsWith(cleanTerm.toLowerCase())) {
    return cleanDefinition;
  }
  
  // If definition starts with "A" or "An", modify to include term
  if (cleanDefinition.match(/^(A|An)\s/i)) {
    return cleanDefinition.replace(/^(A|An)\s/i, `${cleanTerm} is $1 `);
  }
  
  // If definition starts with "The", modify to include term
  if (cleanDefinition.match(/^The\s/i)) {
    return `${cleanTerm} is ${cleanDefinition.toLowerCase()}`;
  }
  
  // Default transformation - prepend term
  return `${cleanTerm} is ${cleanDefinition.toLowerCase()}`;
};

/**
 * Transforms a glossary term to include question and updated definition
 */
export const transformGlossaryTerm = (term: GlossaryTerm): GlossaryTerm => {
  // Generate question if not exists
  const question = term.question || generateQuestionForTerm(term.term, term.definition);
  
  // Transform definition to start with answer
  const transformedDefinition = transformDefinitionToAnswer(term.term, term.definition, question);
  
  return {
    ...term,
    question,
    definition: transformedDefinition
  };
};

/**
 * Batch transform multiple terms with progress tracking
 */
export const batchTransformTerms = (
  terms: GlossaryTerm[], 
  onProgress?: (processed: number, total: number) => void
): GlossaryTerm[] => {
  const transformed: GlossaryTerm[] = [];
  
  terms.forEach((term, index) => {
    transformed.push(transformGlossaryTerm(term));
    
    if (onProgress && (index + 1) % 50 === 0) {
      onProgress(index + 1, terms.length);
    }
  });
  
  if (onProgress) {
    onProgress(terms.length, terms.length);
  }
  
  return transformed;
};
