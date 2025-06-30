import { glossaryTerms } from "@/data/glossaryTerms";
import { GlossaryTerm } from "../types";
import { categorizeCryptoCrime } from "./cryptoCrimeCategorization";

export interface CryptoCrimeReviewResult {
  term: string;
  originalCategories: string[];
  shouldAddCryptoCrime: boolean;
  newCategories: string[];
  confidence: 'high' | 'medium' | 'low';
  reason: string;
}

/**
 * Process all glossary terms for crypto crime categorization
 */
export const processAllTermsForCryptoCrime = (): {
  results: CryptoCrimeReviewResult[];
  summary: {
    totalTerms: number;
    termsToUpdate: number;
    highConfidenceUpdates: number;
    mediumConfidenceUpdates: number;
    lowConfidenceUpdates: number;
  };
} => {
  console.log(`🚀 Starting comprehensive crypto crime review of ${glossaryTerms.length} terms`);
  
  const results: CryptoCrimeReviewResult[] = [];
  let termsToUpdate = 0;
  let highConfidenceUpdates = 0;
  let mediumConfidenceUpdates = 0;
  let lowConfidenceUpdates = 0;

  glossaryTerms.forEach((term, index) => {
    if (index % 100 === 0) {
      console.log(`📊 Processing term ${index + 1}/${glossaryTerms.length}: "${term.term}"`);
    }

    const categorization = categorizeCryptoCrime(term as GlossaryTerm);
    
    let newCategories = [...term.categories];
    let shouldUpdate = false;

    if (categorization.shouldAddCryptoCrime && !term.categories.includes('crypto_crime' as any)) {
      newCategories.push('crypto_crime' as any);
      shouldUpdate = true;
      termsToUpdate++;

      if (categorization.confidence === 'high') highConfidenceUpdates++;
      else if (categorization.confidence === 'medium') mediumConfidenceUpdates++;
      else lowConfidenceUpdates++;
    }

    if (categorization.shouldReplaceCategoryWith) {
      // Replace primary category while keeping others
      newCategories = [categorization.shouldReplaceCategoryWith as any, ...newCategories.slice(1)];
      shouldUpdate = true;
    }

    const result: CryptoCrimeReviewResult = {
      term: term.term,
      originalCategories: [...term.categories],
      shouldAddCryptoCrime: categorization.shouldAddCryptoCrime,
      newCategories,
      confidence: categorization.confidence,
      reason: categorization.reason
    };

    results.push(result);

    if (shouldUpdate) {
      console.log(`✅ UPDATE NEEDED: "${term.term}"`);
      console.log(`  Original: [${term.categories.join(', ')}]`);
      console.log(`  New: [${newCategories.join(', ')}]`);
      console.log(`  Reason: ${categorization.reason}`);
      console.log(`  Confidence: ${categorization.confidence}`);
    }
  });

  const summary = {
    totalTerms: glossaryTerms.length,
    termsToUpdate,
    highConfidenceUpdates,
    mediumConfidenceUpdates,
    lowConfidenceUpdates
  };

  console.log(`\n📊 CRYPTO CRIME CATEGORIZATION SUMMARY:`);
  console.log(`Total terms reviewed: ${summary.totalTerms}`);
  console.log(`Terms needing updates: ${summary.termsToUpdate}`);
  console.log(`High confidence updates: ${summary.highConfidenceUpdates}`);
  console.log(`Medium confidence updates: ${summary.mediumConfidenceUpdates}`);
  console.log(`Low confidence updates: ${summary.lowConfidenceUpdates}`);

  return { results, summary };
};

/**
 * Get terms that should be updated with crypto_crime category
 */
export const getTermsToUpdateForCryptoCrime = (): CryptoCrimeReviewResult[] => {
  const { results } = processAllTermsForCryptoCrime();
  return results.filter(result => result.shouldAddCryptoCrime);
};

/**
 * Get high-confidence crypto crime terms for immediate update
 */
export const getHighConfidenceCryptoCrimeTerms = (): CryptoCrimeReviewResult[] => {
  const { results } = processAllTermsForCryptoCrime();
  return results.filter(result => 
    result.shouldAddCryptoCrime && result.confidence === 'high'
  );
};
