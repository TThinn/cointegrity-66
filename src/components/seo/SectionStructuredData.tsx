
import { BUSINESS_STRUCTURED_DATA } from "./businessStructuredData";
import { FAQ_STRUCTURED_DATA } from "./faqStructuredData";
import { WEBSITE_STRUCTURED_DATA } from "./websiteStructuredData";
import { SECTIONS_STRUCTURED_DATA } from "./sectionsStructuredData";
import { HOWTO_STRUCTURED_DATA } from "./howToStructuredData";
import { EVENT_STRUCTURED_DATA } from "./eventStructuredData";
import { ALL_GLOSSARY_STRUCTURED_DATA } from "./glossaryStructuredData";
import { generateBreadcrumbStructuredData } from "./breadcrumbStructuredData";
import { TESTIMONIALS_STRUCTURED_DATA } from "./testimonialsStructuredData";
import { ENHANCED_BUSINESS_STRUCTURED_DATA } from "./enhancedBusinessStructuredData";
import { SERVICE_FAQ_STRUCTURED_DATA } from "./serviceFaqStructuredData";
import { GLOSSARY_FAQ_STRUCTURED_DATA } from "./glossaryFaqStructuredData";
import { GLOSSARY_HOWTO_STRUCTURED_DATA, WEB3_LEARNING_HOWTO_STRUCTURED_DATA } from "./glossaryHowToStructuredData";
import { GLOSSARY_ITEMLIST_STRUCTURED_DATA, POPULAR_TERMS_ITEMLIST } from "./glossaryItemListStructuredData";
import { GLOSSARY_QA_STRUCTURED_DATA, GLOSSARY_QAPAGE_STRUCTURED_DATA } from "./glossaryQAStructuredData";
import { ENHANCED_GLOSSARY_SCHEMAS } from "./enhancedGlossaryStructuredData";

// Return structured data objects instead of React components
export const getStructuredData = (currentPath = "", currentHash = "") => {
  const baseData: any[] = [
    ENHANCED_BUSINESS_STRUCTURED_DATA,
    FAQ_STRUCTURED_DATA,
    WEBSITE_STRUCTURED_DATA,
    ...SECTIONS_STRUCTURED_DATA,
    HOWTO_STRUCTURED_DATA,
    ...EVENT_STRUCTURED_DATA,
    ...ALL_GLOSSARY_STRUCTURED_DATA,
    generateBreadcrumbStructuredData(currentPath, currentHash)
  ];

  // Add testimonials schema on testimonials page
  if (currentPath.includes('testimonials') || currentHash === '#testimonials') {
    baseData.push(TESTIMONIALS_STRUCTURED_DATA);
  }

  // Add service-specific FAQ schemas
  if (currentPath.includes('services') || currentHash === '#services') {
    baseData.push(
      SERVICE_FAQ_STRUCTURED_DATA.strategicPositioning,
      SERVICE_FAQ_STRUCTURED_DATA.tokenomics,
      SERVICE_FAQ_STRUCTURED_DATA.regulatory
    );
  }

  // Add enhanced glossary schemas for glossary pages
  if (currentPath.includes('glossary')) {
    baseData.push(
      GLOSSARY_FAQ_STRUCTURED_DATA,
      GLOSSARY_HOWTO_STRUCTURED_DATA,
      WEB3_LEARNING_HOWTO_STRUCTURED_DATA,
      ...GLOSSARY_ITEMLIST_STRUCTURED_DATA,
      POPULAR_TERMS_ITEMLIST,
      GLOSSARY_QAPAGE_STRUCTURED_DATA,
      ...GLOSSARY_QA_STRUCTURED_DATA.slice(0, 20), // Limit to prevent too much data
      ...ENHANCED_GLOSSARY_SCHEMAS
    );
  }

  return baseData;
};
