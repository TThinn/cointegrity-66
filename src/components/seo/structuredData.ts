
// Enhanced JSON-LD structured data with more detailed service descriptions and emphasis on Web3 compliance
export const BUSINESS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Cointegrity Web3 Consultancy",
  "description": "Leading Web3 consultancy helping businesses navigate blockchain technology and digital asset transformation with expert strategic consulting and implementation services for the future of finance.",
  "url": "https://cointegrity.io",
  "logo": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
  "image": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
  "sameAs": [
    "https://twitter.com/Cointegrity",
    "https://linkedin.com/company/cointegrity",
    "https://github.com/cointegrity"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Norway"
  },
  "priceRange": "$$$",
  "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
  "telephone": "+4712345678",
  "email": "contact@cointegrity.io",
  "keywords": "Web3 compliance, MiCA regulation, tokenomics, blockchain consulting, digital asset compliance, future of finance, decentralized finance, crypto regulation, Web3 strategy, token design",
  "slogan": "Shaping the Future of Finance",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://cointegrity.io"
  },
  "service": [
    {
      "@type": "Service",
      "name": "Strategic Positioning",
      "description": "Transforming Web3 vision into market reality with tailored frameworks aligned with business objectives for the future of finance.",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Service",
      "name": "Token Architecture",
      "description": "Delivering optimized tokenomics models that drive real business value in the evolving future of finance landscape.",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Service",
      "name": "Regulatory Navigation",
      "description": "Guiding through the complex digital asset compliance landscape with focus on MiCA framework and the future of finance regulations.",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Service",
      "name": "Capital Acceleration",
      "description": "Transforming promising Web3 projects into well-funded ventures positioned for success in the future of finance.",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
      }
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web3 Consulting Services",
    "itemListElement": [
      {
        "@type": "OfferCatalogItem",
        "name": "Blockchain Strategy",
        "itemOffered": {
          "@type": "Service",
          "name": "Blockchain Strategy Consultation"
        }
      },
      {
        "@type": "OfferCatalogItem",
        "name": "Tokenomics Design",
        "itemOffered": {
          "@type": "Service",
          "name": "Token Economics Design"
        }
      }
    ]
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Josh Wilson"
      },
      "reviewBody": "We're grateful for Cointegrity's support in securing grants and connecting us with top blockchain partners. Their expertise unlocked opportunities we couldn't access alone.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "datePublished": "2025-02-15"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Michelle Park"
      },
      "reviewBody": "Cointegrity's tokenomics design transformed our project, creating a sustainable model aligned with the future of finance that's attracted significant investment and user growth.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "datePublished": "2025-03-20"
    }
  ]
};

// FAQ structured data for enhanced SEO
export const FAQ_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Cointegrity offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cointegrity offers strategic positioning, token architecture, regulatory navigation focused on MiCA compliance, and capital acceleration services for businesses navigating the future of finance."
      }
    },
    {
      "@type": "Question",
      "name": "How does Cointegrity help with MiCA compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our regulatory navigation service guides you through the complex digital asset compliance landscape with a focus on the MiCA framework in Europe, developing robust compliance strategies tailored to your specific needs."
      }
    },
    {
      "@type": "Question",
      "name": "What is Cointegrity's approach to tokenomics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We analyze your Web3 commercial architecture and develop optimized tokenomics models that drive real business value, balancing utility, incentives, and economic sustainability for the future of finance."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Cointegrity based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cointegrity is based in Norway but provides Web3 and blockchain consulting services globally for businesses seeking expert guidance on digital asset transformation."
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact Cointegrity for a consultation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can contact Cointegrity through our website contact form, by emailing contact@cointegrity.io, or by calling +4712345678 during our business hours."
      }
    }
  ]
};

// Section specific structured data for improved anchor link indexing
export const SECTIONS_STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://cointegrity.io/#about",
    "name": "About Cointegrity",
    "description": "Learn about Cointegrity's mission to simplify Web3 complexity and our comprehensive approach to blockchain consulting.",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://cointegrity.io/#website"
    },
    "inLanguage": "en-US"
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://cointegrity.io/#services",
    "name": "Our Web3 & Blockchain Services",
    "description": "Discover our comprehensive Web3 services including strategic positioning, tokenomics design, regulatory compliance, and capital acceleration solutions.",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://cointegrity.io/#website"
    },
    "inLanguage": "en-US"
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://cointegrity.io/#founders",
    "name": "Meet Our Expert Team",
    "description": "Meet the talented team of Web3 specialists behind Cointegrity's success with decades of experience in blockchain technology.",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://cointegrity.io/#website"
    },
    "inLanguage": "en-US"
  }
];

// Website structured data
export const WEBSITE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://cointegrity.io/#website",
  "url": "https://cointegrity.io/",
  "name": "Cointegrity - Web3 & Blockchain Solutions",
  "description": "Leading Web3 consultancy specialized in blockchain technology and digital asset transformation",
  "publisher": {
    "@type": "Organization",
    "name": "Cointegrity",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
      "width": 512,
      "height": 512
    }
  },
  "inLanguage": "en-US"
};
