
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

  return baseData;
};
