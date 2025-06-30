
import { normalizeTermAdvanced, getBaseTermWithoutParentheses, getParentheticalContent } from './textNormalization';

/**
 * Create semantic equivalents for terms to handle variations - ENHANCED FOR PARENTHESES
 */
export const createSemanticEquivalents = (term: string): string[] => {
  const normalized = normalizeTermAdvanced(term);
  const equivalents = new Set([normalized]);
  
  // Add base term without parentheses
  const baseTerm = getBaseTermWithoutParentheses(term);
  if (baseTerm && baseTerm !== normalized) {
    equivalents.add(baseTerm);
  }
  
  // Add parenthetical content as separate searchable terms
  const parentheticals = getParentheticalContent(term);
  parentheticals.forEach(content => {
    equivalents.add(content);
  });
  
  // Handle "Layer X" variations
  const layerMatch = normalized.match(/layer\s*(\d+)/);
  if (layerMatch) {
    const layerNum = layerMatch[1];
    equivalents.add(`layer ${layerNum}`);
    equivalents.add(`layer${layerNum}`);
    equivalents.add(`l${layerNum}`);
    equivalents.add(`l ${layerNum}`);
  }
  
  // Handle "L2" style abbreviations back to full form
  const lAbbrevMatch = normalized.match(/^l\s*(\d+)$/);
  if (lAbbrevMatch) {
    const num = lAbbrevMatch[1];
    equivalents.add(`layer ${num}`);
    equivalents.add(`layer${num}`);
  }
  
  // Handle common crypto abbreviations
  const abbreviationMap: Record<string, string[]> = {
    'defi': ['decentralized finance', 'de fi'],
    'cefi': ['centralized finance', 'ce fi'],
    'nft': ['non fungible token', 'non fungible tokens'],
    'dao': ['decentralized autonomous organization'],
    'dex': ['decentralized exchange'],
    'cex': ['centralized exchange'],
    'kyc': ['know your customer'],
    'aml': ['anti money laundering'],
    'pos': ['proof of stake'],
    'pow': ['proof of work'],
    'btc': ['bitcoin'],
    'eth': ['ethereum'],
    'api': ['application programming interface'],
    'ui': ['user interface'],
    'ux': ['user experience'],
    'ico': ['initial coin offering'],
    'ido': ['initial dex offering'],
    'ieo': ['initial exchange offering'],
    'tvl': ['total value locked'],
    'apy': ['annual percentage yield'],
    'apr': ['annual percentage rate'],
    'p2p': ['peer to peer', 'peer 2 peer'],
    'web3': ['web 3', 'web three'],
    'web2': ['web 2', 'web two'],
    'ai': ['artificial intelligence'],
    'ml': ['machine learning'],
    'vr': ['virtual reality'],
    'ar': ['augmented reality'],
    'iot': ['internet of things'],
    'sdk': ['software development kit'],
    'dapp': ['decentralized application', 'decentralized app'],
    'smart contract': ['smart contracts'],
    'cryptocurrency': ['crypto currency', 'crypto'],
    'blockchain': ['block chain'],
    'whitepaper': ['white paper'],
    'roadmap': ['road map'],
    'mainnet': ['main net'],
    'testnet': ['test net']
  };
  
  // Add abbreviation expansions
  Object.entries(abbreviationMap).forEach(([abbrev, expansions]) => {
    if (normalized.includes(abbrev)) {
      expansions.forEach(expansion => {
        equivalents.add(normalized.replace(abbrev, expansion));
      });
    }
    // Also check reverse (if term contains expansion, add abbreviation)
    expansions.forEach(expansion => {
      if (normalized.includes(expansion)) {
        equivalents.add(normalized.replace(expansion, abbrev));
      }
    });
  });
  
  // Handle number-word variations
  const numberWordMap: Record<string, string> = {
    'two': '2', 'three': '3', 'four': '4', 'five': '5',
    'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'
  };
  
  Object.entries(numberWordMap).forEach(([word, num]) => {
    if (normalized.includes(word)) {
      equivalents.add(normalized.replace(word, num));
    }
    if (normalized.includes(num)) {
      equivalents.add(normalized.replace(num, word));
    }
  });
  
  return Array.from(equivalents);
};

/**
 * Check if two terms are semantically equivalent - ENHANCED FOR PARENTHESES
 */
export const areTermsEquivalent = (term1: string, term2: string): boolean => {
  const equivalents1 = createSemanticEquivalents(term1);
  const equivalents2 = createSemanticEquivalents(term2);
  
  // Check if any equivalent of term1 matches any equivalent of term2
  const isEquivalent = equivalents1.some(eq1 => 
    equivalents2.some(eq2 => eq1 === eq2)
  );
  
  if (isEquivalent) {
    console.log(`🎯 SEMANTIC EQUIVALENCE: "${term1}" ≡ "${term2}"`);
    console.log(`  Term1 equivalents: ${equivalents1.join(', ')}`);
    console.log(`  Term2 equivalents: ${equivalents2.join(', ')}`);
  }
  
  return isEquivalent;
};
