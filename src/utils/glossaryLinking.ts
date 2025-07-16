import { glossaryTerms } from "@/data/glossaryTerms";

// Create a map of terms for efficient lookup
const termMap = new Map();
const termVariations = new Map();

// Initialize the term maps
glossaryTerms.forEach(term => {
  const normalizedTerm = term.term.toLowerCase();
  termMap.set(normalizedTerm, term);
  
  // Add variations for better matching
  const variations = [
    term.term,
    term.term.toLowerCase(),
    term.term.replace(/\s+/g, '-'),
    term.term.replace(/[^\w\s]/g, ''), // Remove special characters
  ];
  
  variations.forEach(variation => {
    if (variation && variation.length > 2) {
      termVariations.set(variation.toLowerCase(), term);
    }
  });
});

// Sort terms by length (longest first) for better matching
const sortedTerms = glossaryTerms
  .map(term => term.term)
  .sort((a, b) => b.length - a.length);

export function linkGlossaryTerms(text: string): string {
  let linkedText = text;
  
  // Don't process text that already has HTML links
  if (linkedText.includes('<a ') || linkedText.includes('</a>')) {
    return linkedText;
  }
  
  // Process terms from longest to shortest to avoid partial matches
  sortedTerms.forEach(term => {
    // Skip very short terms to avoid over-linking
    if (term.length < 3) return;
    
    // Create a more flexible regex that handles various cases
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');
    
    linkedText = linkedText.replace(regex, (match) => {
      // Don't link if already inside HTML tags
      const beforeMatch = linkedText.substring(0, linkedText.indexOf(match));
      const openTags = (beforeMatch.match(/<[^>]*$/g) || []).length;
      const closeTags = (beforeMatch.match(/>/g) || []).length;
      
      // If we're inside an HTML tag, don't link
      if (openTags > closeTags) {
        return match;
      }
      
      const termSlug = createGlossaryAnchor(term);
      return `<a href="/glossary#${termSlug}" class="glossary-link" title="Learn more about ${term}">${match}</a>`;
    });
  });
  
  return linkedText;
}

export function createGlossaryAnchor(term: string): string {
  return term.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}