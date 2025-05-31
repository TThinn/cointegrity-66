
/**
 * SEO utility functions for enhanced metadata and Open Graph handling
 */

export interface SectionMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  structuredDataType?: string;
}

export const SECTION_METADATA: Record<string, SectionMetadata> = {
  home: {
    title: "Cointegrity Web3 Consultancy - Blockchain Solutions & Tokenomics Experts",
    description: "Leading Web3 consultancy specialized in blockchain technology, tokenomics design, and MiCA regulatory compliance for enterprises building the future of finance.",
    keywords: ["Web3 consultancy", "blockchain strategy", "tokenomics design", "MiCA compliance", "digital assets"],
    ogImage: "https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png"
  },
  about: {
    title: "About Cointegrity | Web3 & Blockchain Experts",
    description: "Learn about Cointegrity's mission to simplify Web3 complexity and our comprehensive approach to blockchain consulting and implementation.",
    keywords: ["Web3 experts", "blockchain consultancy", "digital transformation", "Web3 strategy"],
    ogImage: "https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png"
  },
  services: {
    title: "Our Web3 & Blockchain Services | Cointegrity",
    description: "Discover our comprehensive Web3 services including strategic positioning, tokenomics design, regulatory compliance, and capital acceleration solutions.",
    keywords: ["Web3 services", "blockchain consulting", "tokenomics", "regulatory compliance", "capital acceleration"],
    ogImage: "https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png"
  },
  testimonials: {
    title: "Client Success Stories | Cointegrity",
    description: "Read what our clients say about Cointegrity's Web3 consultancy services. Real success stories from businesses we've helped transform.",
    keywords: ["client testimonials", "Web3 success stories", "blockchain case studies", "client reviews"],
    ogImage: "https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png",
    structuredDataType: "reviews"
  },
  team: {
    title: "Meet Our Expert Team | Cointegrity Web3 Consultancy",
    description: "Meet the talented team of Web3 specialists behind Cointegrity's success. Our founders bring decades of experience in blockchain technology.",
    keywords: ["Web3 team", "blockchain experts", "founders", "consultancy team"],
    ogImage: "https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png"
  },
  contact: {
    title: "Contact Cointegrity | Web3 & Blockchain Consultation",
    description: "Connect with Cointegrity's Web3 experts for consultation on blockchain technology, tokenomics, and regulatory compliance solutions.",
    keywords: ["contact Web3 experts", "blockchain consultation", "get in touch", "Web3 advice"],
    ogImage: "https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png"
  }
};

/**
 * Generate internal link suggestions based on current page context
 */
export const generateInternalLinkSuggestions = (currentPath: string, currentHash: string): Array<{
  title: string;
  url: string;
  relevance: number;
  description: string;
}> => {
  const suggestions = [];
  
  // Base suggestions for all pages
  const baseSuggestions = [
    {
      title: "Our Web3 Services",
      url: "/services",
      relevance: 0.9,
      description: "Explore our comprehensive blockchain and tokenomics solutions"
    },
    {
      title: "Client Success Stories", 
      url: "/testimonials",
      relevance: 0.8,
      description: "Read testimonials from satisfied Web3 clients"
    },
    {
      title: "Meet Our Team",
      url: "/team", 
      relevance: 0.7,
      description: "Get to know our Web3 and blockchain experts"
    }
  ];
  
  // Add contextual suggestions based on current location
  if (currentPath === "/" || currentPath === "") {
    if (currentHash === "#services") {
      suggestions.push({
        title: "Contact Us for Consultation",
        url: "/contact",
        relevance: 0.95,
        description: "Ready to start your Web3 journey? Get in touch with our experts"
      });
    } else if (currentHash === "#testimonials") {
      suggestions.push({
        title: "View Our Services",
        url: "/services", 
        relevance: 0.9,
        description: "See how we can help your Web3 project succeed"
      });
    }
  }
  
  return [...suggestions, ...baseSuggestions.filter(s => !suggestions.some(existing => existing.url === s.url))]
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);
};

/**
 * Generate hreflang attributes for future internationalization
 */
export const generateHreflangData = (currentPath: string): Array<{
  hreflang: string;
  href: string;
}> => {
  const baseUrl = "https://cointegrity.io";
  const path = currentPath === "/" ? "" : currentPath;
  
  return [
    {
      hreflang: "en",
      href: `${baseUrl}${path}`
    },
    {
      hreflang: "x-default", 
      href: `${baseUrl}${path}`
    }
    // Future language support can be added here:
    // {
    //   hreflang: "no",
    //   href: `${baseUrl}/no${path}`
    // }
  ];
};

/**
 * Calculate content freshness score
 */
export const getContentFreshnessIndicator = (lastModified?: string): {
  score: number;
  label: string;
  color: string;
} => {
  if (!lastModified) {
    return { score: 0.8, label: "Recently Updated", color: "green" };
  }
  
  const lastMod = new Date(lastModified);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - lastMod.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff < 30) {
    return { score: 1.0, label: "Fresh Content", color: "green" };
  } else if (daysDiff < 90) {
    return { score: 0.8, label: "Recently Updated", color: "yellow" };
  } else {
    return { score: 0.6, label: "Established Content", color: "orange" };
  }
};

/**
 * Generate expertise signals for authority
 */
export const getExpertiseSignals = (section: string): Array<{
  type: string;
  value: string;
  authority: number;
}> => {
  const baseSignals = [
    { type: "experience", value: "5+ years Web3 expertise", authority: 0.9 },
    { type: "clients", value: "Fortune 500 companies", authority: 0.95 },
    { type: "compliance", value: "MiCA regulatory specialists", authority: 0.9 },
    { type: "recognition", value: "Industry thought leaders", authority: 0.8 }
  ];
  
  // Add section-specific signals
  const sectionSignals: Record<string, Array<{type: string; value: string; authority: number}>> = {
    services: [
      { type: "methodology", value: "Proven implementation framework", authority: 0.85 },
      { type: "results", value: "90%+ client success rate", authority: 0.9 }
    ],
    testimonials: [
      { type: "reviews", value: "5.0/5 client satisfaction", authority: 0.95 },
      { type: "referrals", value: "95% client referral rate", authority: 0.9 }
    ],
    team: [
      { type: "credentials", value: "Ex-government regulatory experts", authority: 0.95 },
      { type: "publications", value: "Industry research contributors", authority: 0.8 }
    ]
  };
  
  return [...baseSignals, ...(sectionSignals[section] || [])];
};
