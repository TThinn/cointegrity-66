import { glossaryTerms } from '../src/data/glossaryTerms';
import { generateGlossaryTermHtml, generateGlossaryIndexHtml } from './prerender/templates';
import { writeDistFile, generateSlug } from './prerender/utils';

// Core vocabulary terms that should always be pre-rendered regardless of trending score
const CORE_TERMS = [
  'blockchain',
  'bitcoin',
  'ethereum',
  'cryptocurrency',
  'defi',
  'nft',
  'smart contract',
  'wallet',
  'stablecoin',
  'web3',
  'dao',
  'token',
  'mining',
  'staking',
  'consensus',
  'decentralization',
  'gas',
  'layer 2',
  'bridge',
  'liquidity'
];

/**
 * Select top terms for pre-rendering based on trending score and core vocabulary
 */
const selectTermsForPrerendering = (
  terms: typeof glossaryTerms,
  maxTerms: number = 200
): typeof glossaryTerms => {
  // Normalize core terms for comparison
  const normalizedCore = CORE_TERMS.map(t => t.toLowerCase());
  
  // Score each term
  const scoredTerms = terms.map(term => {
    const isCore = normalizedCore.some(core => 
      term.term.toLowerCase().includes(core) || core.includes(term.term.toLowerCase())
    );
    const trendingScore = term.trending || 5;
    // Core terms get a boost, then sort by trending
    const priority = (isCore ? 100 : 0) + trendingScore;
    return { term, priority, isCore };
  });
  
  // Sort by priority (highest first)
  scoredTerms.sort((a, b) => b.priority - a.priority);
  
  // Take top N terms
  return scoredTerms.slice(0, maxTerms).map(s => s.term);
};

/**
 * Pre-render glossary terms to static HTML
 */
export const prerenderGlossary = async (maxTerms: number = 200): Promise<void> => {
  console.log('\n📖 Pre-rendering glossary terms...');
  
  // Select terms for pre-rendering
  const selectedTerms = selectTermsForPrerendering(glossaryTerms, maxTerms);
  console.log(`  Selected ${selectedTerms.length} terms out of ${glossaryTerms.length} total`);
  
  let successCount = 0;
  let errorCount = 0;
  
  // Pre-render individual terms
  for (const term of selectedTerms) {
    try {
      const html = generateGlossaryTermHtml(term);
      const slug = generateSlug(term.term);
      const filePath = `glossary/${slug}/index.html`;
      writeDistFile(filePath, html);
      successCount++;
    } catch (error) {
      errorCount++;
      console.error(`  ✗ Failed to render ${term.term}:`, error);
    }
  }
  
  // Show sample of rendered terms
  console.log(`  Sample rendered terms: ${selectedTerms.slice(0, 5).map(t => t.term).join(', ')}...`);
  
  // Pre-render glossary index (with ALL terms for navigation)
  try {
    const indexHtml = generateGlossaryIndexHtml(glossaryTerms);
    writeDistFile('glossary/index.html', indexHtml);
    console.log('  ✓ glossary/index.html (with all terms)');
  } catch (error) {
    console.error('  ✗ Failed to render glossary index:', error);
  }
  
  console.log(`\n📊 Glossary pre-rendering complete: ${successCount} terms, ${errorCount} errors`);
};

// Run if called directly
if (require.main === module) {
  prerenderGlossary().then(() => {
    console.log('✅ Glossary pre-rendering finished');
  });
}
