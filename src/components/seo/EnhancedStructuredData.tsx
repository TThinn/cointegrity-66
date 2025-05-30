
import { useEffect } from 'react';

interface ReviewSchema {
  "@context": string;
  "@type": string;
  itemReviewed: {
    "@type": string;
    name: string;
  };
  reviewRating: {
    "@type": string;
    ratingValue: number;
    bestRating: number;
  };
  author: {
    "@type": string;
    name: string;
  };
  reviewBody: string;
}

interface FAQSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

interface LocalBusinessSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    "@type": string;
    addressCountry: string;
    addressRegion: string;
  };
  founder: Array<{
    "@type": string;
    name: string;
  }>;
  areaServed: string[];
  serviceType: string[];
  expertise: string[];
}

export const EnhancedStructuredData = () => {
  useEffect(() => {
    // Enhanced Local Business Schema
    const localBusinessSchema: LocalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Cointegrity",
      description: "Web3 consulting and blockchain implementation for Government, Corporate, and emerging Web3 sectors",
      url: "https://cointegrity.io",
      telephone: "+1-XXX-XXX-XXXX", // Add actual phone when available
      email: "requests@cointegrity.io",
      address: {
        "@type": "PostalAddress",
        addressCountry: "Global",
        addressRegion: "Worldwide"
      },
      founder: [
        {
          "@type": "Person",
          name: "Andrew Koole"
        },
        {
          "@type": "Person", 
          name: "John Pfeffer"
        }
      ],
      areaServed: ["Global", "North America", "Europe", "Asia"],
      serviceType: [
        "Web3 Consulting",
        "Blockchain Implementation",
        "Regulatory Compliance",
        "Tokenomics Design",
        "Digital Asset Strategy"
      ],
      expertise: [
        "Blockchain Technology",
        "Web3 Development",
        "Cryptocurrency",
        "Smart Contracts",
        "DeFi",
        "NFTs",
        "Regulatory Compliance"
      ]
    };

    // Services FAQ Schema
    const servicesFAQSchema: FAQSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What Web3 consulting services do you offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer comprehensive Web3 consulting including strategic positioning, tokenomics design, regulatory compliance, and capital acceleration solutions for Government, Corporate, and Web3 sectors."
          }
        },
        {
          "@type": "Question",
          name: "How do you help with blockchain implementation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our blockchain implementation services include technical architecture design, smart contract development, integration planning, and ongoing support to ensure successful deployment and adoption."
          }
        },
        {
          "@type": "Question",
          name: "Do you provide regulatory compliance guidance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we provide comprehensive regulatory compliance guidance, helping organizations navigate the complex regulatory landscape of Web3 and digital assets while ensuring full compliance with applicable laws."
          }
        }
      ]
    };

    // Add schemas to page
    const addSchema = (schema: any, id: string) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    addSchema(localBusinessSchema, 'enhanced-local-business-schema');
    addSchema(servicesFAQSchema, 'services-faq-schema');

    // Cleanup function
    return () => {
      const schemas = document.querySelectorAll('#enhanced-local-business-schema, #services-faq-schema');
      schemas.forEach(schema => schema.remove());
    };
  }, []);

  return null;
};
