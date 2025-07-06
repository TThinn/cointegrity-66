export const MICA_CONSOLIDATED_STRUCTURED_DATA = [
  // Main MiCA FAQPage Schema - Consolidated from all sources
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://cointegrity.io/mica-ready-waitlist#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is MiCA and when does it apply to crypto businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Markets in Crypto-Assets (MiCA) is the EU's comprehensive regulatory framework for cryptocurrency and digital assets, fully effective from December 30, 2024. MiCA applies to any business that issues crypto-assets, provides crypto-asset services, operates in or targets EU markets, or holds more than €5 million in crypto-assets on behalf of clients."
        }
      },
      {
        "@type": "Question",
        "name": "How much faster is your MiCA compliance solution compared to traditional consulting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI-powered MiCA compliance suite delivers results 10x faster than traditional consulting with 90% cost reduction. Traditional consulting takes 6-18 months and costs €300,000-€1,000,000+, while our solution provides comprehensive compliance in 2-6 months at €75,000-€200,000."
        }
      },
      {
        "@type": "Question",
        "name": "Which EU member state should I choose for MiCA authorization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Top-tier jurisdictions include Luxembourg (fastest approval 3-4 months), Netherlands (comprehensive guidance), Ireland (English-speaking), and Malta (blockchain-friendly). Our AI-powered jurisdiction analysis evaluates all 27 EU member states based on your specific business model and requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a CASP license for my crypto business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You need a CASP (Crypto-Asset Service Provider) license if you provide services like custody, trading, portfolio management, advice, or platform operation in the EU. Our AI-powered screening tool analyzes your specific business model to determine exact licensing requirements across all 27 EU member states."
        }
      },
      {
        "@type": "Question",
        "name": "What makes your MiCA solution different from traditional consulting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI-powered platform delivers instant analysis vs months-long consulting processes, costs 90% less than traditional firms, provides real-time regulatory updates, and offers 24/7 availability. Built by Europe's leading Web3 consultancy with proven regulatory expertise."
        }
      }
    ]
  },
  
  // MiCA Software Application Schema
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://cointegrity.io/mica-ready-waitlist#software",
    "name": "MiCA-Ready Suite",
    "description": "World's fastest AI-powered MiCA compliance SaaS platform delivering instant regulatory analysis and automated CASP authorization workflows",
    "applicationCategory": "Regulatory Technology",
    "operatingSystem": "Web-based",
    "offers": [
      {
        "@type": "Offer",
        "name": "MiCA Intelligence Feed",
        "description": "AI-curated MiCA regulatory updates and news",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer", 
        "name": "License Screening",
        "description": "AI-powered CASP license requirement analysis",
        "price": "1500",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "Full Application Support", 
        "description": "End-to-end MiCA authorization preparation",
        "priceRange": "€75,000-€200,000"
      }
    ],
    "featureList": [
      "Instant MiCA regulatory analysis",
      "Automated license screening",
      "AI-powered document generation", 
      "Real-time compliance monitoring",
      "Multi-jurisdiction support"
    ],
    "provider": {
      "@type": "Organization",
      "name": "Cointegrity",
      "url": "https://cointegrity.io"
    }
  },

  // MiCA Service Schema
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://cointegrity.io/mica-ready-waitlist#service",
    "name": "MiCA Compliance Consulting",
    "description": "Expert MiCA compliance services from Europe's leading Web3 consultancy",
    "provider": {
      "@type": "Organization",
      "name": "Cointegrity",
      "url": "https://cointegrity.io"
    },
    "serviceType": "Regulatory Compliance Consulting",
    "areaServed": {
      "@type": "Place",
      "name": "European Union"
    }
  },

  // MiCA Course/Educational Content Schema
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://cointegrity.io/mica-ready-waitlist#education",
    "name": "MiCA Compliance Mastery",
    "description": "Comprehensive MiCA regulatory framework education and implementation guidance",
    "provider": {
      "@type": "Organization",
      "name": "Cointegrity",
      "url": "https://cointegrity.io"
    },
    "courseMode": "online",
    "educationalLevel": "Professional"
  }
];