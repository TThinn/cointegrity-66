
// HowTo structured data based on the Process section
export const HOWTO_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How To Navigate Web3 Implementation",
  "description": "A structured approach to transform your business with Web3 technology, focusing on delivering maximum value through discovery, strategy, implementation, and scaling.",
  "totalTime": "P3M", // Estimated total time (3 months)
  "image": {
    "@type": "ImageObject",
    "url": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
    "width": "512",
    "height": "512"
  },
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "Consulting fee varies by project scope"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Discover",
      "text": "Understand your team, company objectives, problems being solved, and challenges faced through a comprehensive screening process.",
      "image": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
      "url": "https://cointegrity.io/#process",
      "itemListElement": [
        {
          "@type": "HowToDirection",
          "text": "Schedule an initial discovery call with our team"
        },
        {
          "@type": "HowToDirection",
          "text": "Complete our comprehensive Web3 readiness assessment"
        },
        {
          "@type": "HowToDirection",
          "text": "Identify core business objectives and challenges"
        }
      ]
    },
    {
      "@type": "HowToStep",
      "name": "Strategize",
      "text": "Develop a tailored roadmap aligning Web3 concerns with compliance planning, strategic positioning, and go-to-market strategies to maximize impact and reach goals.",
      "image": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
      "url": "https://cointegrity.io/#process",
      "itemListElement": [
        {
          "@type": "HowToDirection",
          "text": "Evaluate existing Web3 integration opportunities"
        },
        {
          "@type": "HowToDirection",
          "text": "Create a customized implementation roadmap"
        },
        {
          "@type": "HowToDirection",
          "text": "Establish compliance frameworks and strategic positioning"
        }
      ]
    },
    {
      "@type": "HowToStep",
      "name": "Implement",
      "text": "Our team guides you through execution, ensuring constant progress and confidence in internal decision making, making you comfortable operating in the Web3 market.",
      "image": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
      "url": "https://cointegrity.io/#process",
      "itemListElement": [
        {
          "@type": "HowToDirection",
          "text": "Execute the customized Web3 implementation plan"
        },
        {
          "@type": "HowToDirection",
          "text": "Establish performance metrics and tracking"
        },
        {
          "@type": "HowToDirection",
          "text": "Train teams on Web3 technologies and processes"
        }
      ]
    },
    {
      "@type": "HowToStep",
      "name": "Scale",
      "text": "Help accelerate growth through capital raising, community building, and ongoing optimization, with continuous guidance to adapt to regulatory changes and new opportunities.",
      "image": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
      "url": "https://cointegrity.io/#process",
      "itemListElement": [
        {
          "@type": "HowToDirection",
          "text": "Implement capital raising strategies"
        },
        {
          "@type": "HowToDirection",
          "text": "Develop community engagement programs"
        },
        {
          "@type": "HowToDirection",
          "text": "Create ongoing optimization and regulatory adaptation frameworks"
        }
      ]
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Strategic Web3 Framework"
    },
    {
      "@type": "HowToTool",
      "name": "Tokenomics Design Tools"
    },
    {
      "@type": "HowToTool",
      "name": "Regulatory Compliance Templates"
    },
    {
      "@type": "HowToTool",
      "name": "Capital Acceleration Resources"
    }
  ]
};
