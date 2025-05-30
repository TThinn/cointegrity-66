
import { BUSINESS_STRUCTURED_DATA } from "./businessStructuredData";
import { FAQ_STRUCTURED_DATA } from "./faqStructuredData";
import { WEBSITE_STRUCTURED_DATA } from "./websiteStructuredData";
import { SECTIONS_STRUCTURED_DATA } from "./sectionsStructuredData";
import { HOWTO_STRUCTURED_DATA } from "./howToStructuredData";
import { EVENT_STRUCTURED_DATA } from "./eventStructuredData";
import { ALL_GLOSSARY_STRUCTURED_DATA } from "./glossaryStructuredData";
import { generateBreadcrumbStructuredData } from "./breadcrumbStructuredData";

// Enhanced structured data with hreflang support
export const getStructuredDataWithHreflang = (currentPath = "", currentHash = "", language = "en") => {
  const baseStructuredData = [
    BUSINESS_STRUCTURED_DATA,
    FAQ_STRUCTURED_DATA,
    WEBSITE_STRUCTURED_DATA,
    ...SECTIONS_STRUCTURED_DATA,
    HOWTO_STRUCTURED_DATA,
    ...EVENT_STRUCTURED_DATA,
    ...ALL_GLOSSARY_STRUCTURED_DATA,
    generateBreadcrumbStructuredData(currentPath, currentHash)
  ];

  // Add hreflang support for future internationalization
  const websiteWithHreflang = {
    ...WEBSITE_STRUCTURED_DATA,
    inLanguage: language,
    availableLanguage: [
      {
        "@type": "Language",
        name: "English",
        alternateName: "en"
      }
      // Future: Add more languages here
    ]
  };

  return [
    websiteWithHreflang,
    ...baseStructuredData.slice(1) // Skip original website data
  ];
};

// Return structured data objects instead of React components
export const getStructuredData = (currentPath = "", currentHash = "") => {
  return getStructuredDataWithHreflang(currentPath, currentHash, "en");
};
