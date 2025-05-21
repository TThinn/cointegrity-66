
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
      "url": "https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png",
      "width": 512,
      "height": 512
    }
  },
  "inLanguage": "en-US",
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://cointegrity.io/glossary?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  ],
  "hasPart": [
    {
      "@type": "WebPage",
      "@id": "https://cointegrity.io/#services",
      "url": "https://cointegrity.io/services",
      "name": "Our Web3 & Blockchain Services"
    },
    {
      "@type": "WebPage",
      "@id": "https://cointegrity.io/#about",
      "url": "https://cointegrity.io/about",
      "name": "About Cointegrity"
    },
    {
      "@type": "WebPage",
      "@id": "https://cointegrity.io/#founders",
      "url": "https://cointegrity.io/team",
      "name": "Meet Our Expert Team"
    },
    {
      "@type": "WebPage",
      "@id": "https://cointegrity.io/glossary",
      "url": "https://cointegrity.io/glossary",
      "name": "Web3 & Blockchain Glossary"
    }
  ],
  "sameAs": [
    "https://twitter.com/Cointegrity",
    "https://linkedin.com/company/cointegrity",
    "https://github.com/cointegrity"
  ],
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://cointegrity.io/#organization"
  }
};
