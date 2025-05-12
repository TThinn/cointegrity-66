
import { 
  BUSINESS_STRUCTURED_DATA,
  FAQ_STRUCTURED_DATA,
  WEBSITE_STRUCTURED_DATA,
  SECTIONS_STRUCTURED_DATA
} from "./structuredData/index";

// Return structured data objects instead of React components
export const getStructuredData = () => {
  return [
    BUSINESS_STRUCTURED_DATA,
    FAQ_STRUCTURED_DATA,
    WEBSITE_STRUCTURED_DATA,
    ...SECTIONS_STRUCTURED_DATA
  ];
};
