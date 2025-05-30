
import { BUSINESS_STRUCTURED_DATA } from "./businessStructuredData";
import { FAQ_STRUCTURED_DATA } from "./faqStructuredData";
import { ENHANCED_FAQ_STRUCTURED_DATA } from "./enhancedFaqStructuredData";
import { WEBSITE_STRUCTURED_DATA } from "./websiteStructuredData";
import { SECTIONS_STRUCTURED_DATA } from "./sectionsStructuredData";
import { HOWTO_STRUCTURED_DATA } from "./howToStructuredData";
import { EVENT_STRUCTURED_DATA } from "./eventStructuredData";
import { ALL_GLOSSARY_STRUCTURED_DATA } from "./glossaryStructuredData";
import { generateBreadcrumbStructuredData } from "./breadcrumbStructuredData";
import { generateTestimonialsStructuredData, AGGREGATE_RATING_STRUCTURED_DATA } from "./testimonialsStructuredData";
import { SERVICES_STRUCTURED_DATA } from "./serviceStructuredData";

// Return structured data objects instead of React components
export const getStructuredData = (currentPath = "", currentHash = "") => {
  const testimonialReviews = generateTestimonialsStructuredData();
  
  return [
    BUSINESS_STRUCTURED_DATA,
    FAQ_STRUCTURED_DATA,
    ENHANCED_FAQ_STRUCTURED_DATA,
    WEBSITE_STRUCTURED_DATA,
    ...SECTIONS_STRUCTURED_DATA,
    HOWTO_STRUCTURED_DATA,
    ...EVENT_STRUCTURED_DATA,
    ...ALL_GLOSSARY_STRUCTURED_DATA,
    ...SERVICES_STRUCTURED_DATA,
    ...testimonialReviews,
    AGGREGATE_RATING_STRUCTURED_DATA,
    generateBreadcrumbStructuredData(currentPath, currentHash)
  ];
};
