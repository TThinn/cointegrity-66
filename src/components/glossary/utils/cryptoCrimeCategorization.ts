
import { GlossaryTerm } from "../types";

/**
 * Crypto Crime Keywords and Patterns
 * Terms that indicate criminal activity, illicit use, or regulatory violations
 */
const CRYPTO_CRIME_KEYWORDS = [
  // Direct crime terms
  'money laundering', 'laundering', 'wash', 'washing', 'clean money',
  'ransomware', 'ransom', 'extortion', 'blackmail',
  'terrorist financing', 'terrorism financing', 'terrorist funding',
  'drug trafficking', 'narcotics', 'illicit drugs', 'dark market',
  'fraud', 'fraudulent', 'scam', 'ponzi', 'pyramid scheme',
  'theft', 'stolen', 'hack', 'hacking', 'exploit', 'breach',
  'sanctions evasion', 'sanctions busting', 'embargo violation',
  'tax evasion', 'tax avoidance', 'offshore', 'tax haven',
  
  // Criminal marketplaces and services
  'silk road', 'darknet', 'dark web', 'onion', 'tor',
  'mixer', 'mixing', 'tumbler', 'tumbling', 'obfuscation',
  'privacy coin', 'anonymous transaction', 'untraceable',
  'coinjoin', 'ring signature', 'stealth address',
  'chain hopping', 'cross-chain laundering',
  
  // Regulatory violations
  'unlicensed', 'unregistered', 'illegal', 'illicit', 'criminal',
  'banned', 'prohibited', 'restricted', 'violation',
  'non-compliant', 'regulatory breach', 'kyc violation',
  'aml violation', 'fatf violation', 'ofac',
  
  // Investigation and enforcement
  'blockchain forensics', 'chain analysis', 'transaction tracking',
  'investigation', 'law enforcement', 'seizure', 'confiscation',
  'criminal investigation', 'financial crime', 'suspicious activity',
  'alert', 'red flag', 'monitoring', 'surveillance',
  
  // Specific criminal activities
  'pump and dump', 'market manipulation', 'insider trading',
  'ico scam', 'exit scam', 'rug pull', 'honeypot',
  'fake project', 'shell company', 'front company',
  'structuring', 'smurfing', 'placement', 'layering', 'integration'
];

/**
 * Criminal Entity Patterns
 * Known criminal organizations, marketplaces, or entities
 */
const CRIMINAL_ENTITIES = [
  'silk road', 'alphabay', 'dream market', 'wall street market',
  'hydra market', 'empire market', 'white house market',
  'lazarus group', 'apt', 'ransomware group',
  'wannacry', 'petya', 'notpetya', 'ryuk', 'maze',
  'conti', 'revil', 'sodinokibi', 'darkside'
];

/**
 * Terms that are crime-adjacent but not necessarily criminal
 * These need manual review
 */
const CRIME_ADJACENT_TERMS = [
  'privacy', 'anonymous', 'pseudonymous', 'confidential',
  'offshore', 'jurisdiction', 'regulation', 'compliance',
  'surveillance', 'monitoring', 'tracking', 'analysis',
  'forensics', 'investigation', 'audit', 'security'
];

/**
 * Check if a term is definitely crypto crime related
 */
export const isDefinitelyCryptoCrime = (term: GlossaryTerm): boolean => {
  const termLower = term.term.toLowerCase();
  const definitionLower = term.definition.toLowerCase();
  const combinedText = `${termLower} ${definitionLower}`;

  console.log(`🔍 Checking "${term.term}" for definite crypto crime classification`);

  // Check for direct crime keywords
  const hasDirectCrimeKeyword = CRYPTO_CRIME_KEYWORDS.some(keyword => 
    combinedText.includes(keyword.toLowerCase())
  );

  // Check for criminal entities
  const hasCriminalEntity = CRIMINAL_ENTITIES.some(entity =>
    combinedText.includes(entity.toLowerCase())
  );

  // Check for explicit criminal context in definition
  const hasCriminalContext = [
    'criminal', 'illegal', 'illicit', 'unlawful', 'prohibited',
    'violation', 'breach', 'fraud', 'scam', 'theft',
    'money laundering', 'terrorist financing', 'sanctions evasion'
  ].some(context => definitionLower.includes(context));

  const isDefiniteCrime = hasDirectCrimeKeyword || hasCriminalEntity || hasCriminalContext;
  
  if (isDefiniteCrime) {
    console.log(`✅ "${term.term}" is DEFINITELY crypto crime`);
  }
  
  return isDefiniteCrime;
};

/**
 * Check if a term might be crypto crime related (needs manual review)
 */
export const mightBeCryptoCrime = (term: GlossaryTerm): boolean => {
  const termLower = term.term.toLowerCase();
  const definitionLower = term.definition.toLowerCase();
  const combinedText = `${termLower} ${definitionLower}`;

  // Check for crime-adjacent terms
  const hasCrimeAdjacentTerm = CRIME_ADJACENT_TERMS.some(adjacent =>
    combinedText.includes(adjacent.toLowerCase())
  );

  // Check for regulatory/compliance context
  const hasRegulatoryContext = [
    'regulation', 'compliance', 'kyc', 'aml', 'fatf',
    'enforcement', 'authority', 'agency', 'license'
  ].some(context => combinedText.includes(context));

  // Check for security/investigation context
  const hasSecurityContext = [
    'security', 'forensics', 'analysis', 'tracking',
    'monitoring', 'investigation', 'audit'
  ].some(context => combinedText.includes(context));

  return hasCrimeAdjacentTerm || hasRegulatoryContext || hasSecurityContext;
};

/**
 * Specific manual categorization for known terms
 */
export const getManualCryptoCrimeClassification = (term: GlossaryTerm): 'crime' | 'not_crime' | 'review' => {
  const termLower = term.term.toLowerCase();

  // Definitely crypto crime terms
  const definiteCrimeTerms = [
    'silk road', 'darknet market', 'money laundering', 'ransomware',
    'terrorist financing', 'sanctions evasion', 'mixer', 'tumbler',
    'coinjoin', 'privacy coin', 'chain analysis', 'blockchain forensics',
    'pump and dump', 'exit scam', 'rug pull', 'ico scam',
    'market manipulation', 'insider trading', 'tax evasion'
  ];

  // Not crypto crime (legitimate privacy/security tools)
  const legitimateTerms = [
    'encryption', 'cryptography', 'hash', 'digital signature',
    'multi-signature', 'cold storage', 'hardware wallet',
    'zero knowledge proof', 'consensus', 'mining'
  ];

  if (definiteCrimeTerms.some(crime => termLower.includes(crime))) {
    console.log(`🎯 Manual classification: "${term.term}" is CRIME`);
    return 'crime';
  }

  if (legitimateTerms.some(legit => termLower.includes(legit))) {
    console.log(`✅ Manual classification: "${term.term}" is NOT CRIME`);
    return 'not_crime';
  }

  console.log(`❓ Manual classification: "${term.term}" needs REVIEW`);
  return 'review';
};

/**
 * Main categorization function
 */
export const categorizeCryptoCrime = (term: GlossaryTerm): {
  shouldAddCryptoCrime: boolean;
  shouldReplaceCategoryWith: string | null;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
} => {
  console.log(`\n🔍 CATEGORIZING: "${term.term}"`);
  console.log(`Current categories: ${term.categories.join(', ')}`);

  // Check manual classification first
  const manualClassification = getManualCryptoCrimeClassification(term);
  
  if (manualClassification === 'crime') {
    return {
      shouldAddCryptoCrime: true,
      shouldReplaceCategoryWith: null,
      confidence: 'high',
      reason: 'Manual classification as definite crypto crime term'
    };
  }

  if (manualClassification === 'not_crime') {
    return {
      shouldAddCryptoCrime: false,
      shouldReplaceCategoryWith: null,
      confidence: 'high',
      reason: 'Manual classification as legitimate term'
    };
  }

  // Check automatic classification
  if (isDefinitelyCryptoCrime(term)) {
    return {
      shouldAddCryptoCrime: true,
      shouldReplaceCategoryWith: null,
      confidence: 'high',
      reason: 'Contains explicit criminal activity keywords or context'
    };
  }

  if (mightBeCryptoCrime(term)) {
    return {
      shouldAddCryptoCrime: false,
      shouldReplaceCategoryWith: null,
      confidence: 'low',
      reason: 'Contains crime-adjacent terms but unclear criminal context'
    };
  }

  return {
    shouldAddCryptoCrime: false,
    shouldReplaceCategoryWith: null,
    confidence: 'high',
    reason: 'No criminal activity indicators found'
  };
};
