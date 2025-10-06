
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
import { MICA_CONSOLIDATED_STRUCTURED_DATA } from "./micaStructuredData";

// Return structured data objects instead of React components
export const getStructuredData = (currentPath = "", currentHash = "") => {
  const baseData: any[] = [
    ENHANCED_BUSINESS_STRUCTURED_DATA,
    WEBSITE_STRUCTURED_DATA,
    ...SECTIONS_STRUCTURED_DATA,
    HOWTO_STRUCTURED_DATA,
    ...EVENT_STRUCTURED_DATA,
    ...ALL_GLOSSARY_STRUCTURED_DATA,
    generateBreadcrumbStructuredData(currentPath, currentHash)
  ];

  // FAQ Schema Logic - Only ONE per page to prevent duplicates
  if (currentPath.includes('mica')) {
    // MiCA page: Use consolidated MiCA FAQ schema (includes all MiCA-specific data)
    baseData.push(...MICA_CONSOLIDATED_STRUCTURED_DATA);
  } else if (currentPath.includes('glossary')) {
    // Glossary page: Use glossary-specific FAQ schema only
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
  } else if (currentPath.includes('services') || currentHash === '#services') {
    // Services page/section: Use consolidated service FAQ schema (single schema)
    baseData.push(SERVICE_FAQ_STRUCTURED_DATA);
  } else if (currentPath === '/' || currentPath === '') {
    // Homepage: Use general FAQ schema only
    baseData.push(FAQ_STRUCTURED_DATA);
  } else {
    // Other pages: Use general FAQ schema only
    baseData.push(FAQ_STRUCTURED_DATA);
  }

  // Add testimonials schema on testimonials page (but not on glossary pages)
  if ((currentPath === '/testimonials' || currentHash === '#testimonials') && !currentPath.includes('glossary')) {
    baseData.push(TESTIMONIALS_STRUCTURED_DATA);
  }

  return baseData;
};
