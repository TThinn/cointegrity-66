
// Website structured data
export const WEBSITE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://cointegrity.io/#website",
  "url": "https://cointegrity.io/",
  "name": "Cointegrity - Web3 & Blockchain Solutions",
  "description": "Leading Web3 consultancy specialized in blockchain technology and digital asset transformation",
  "keywords": "web3 consulting, blockchain implementation, tokenomics design, MiCA compliance, digital asset strategy",
  "publisher": {
    "@type": "Organization",
    "name": "Cointegrity",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cointegrity.io/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png",
      "width": 512,
      "height": 512
    },
    "sameAs": [
      "https://twitter.com/Cointegrity",
      "https://linkedin.com/company/cointegrity"
    ]
  },
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://cointegrity.io/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    {
      "@type": "ReadAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://cointegrity.io/glossary"
      }
    },
    {
      "@type": "ContactAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://cointegrity.io/contact"
      }
    }
  ],
  "inLanguage": "en-US"
};
