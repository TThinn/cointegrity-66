
import { Helmet } from "react-helmet-async";

// Hreflang support for future internationalization - no visual component
export const HreflangSupport = ({ currentPath }: { currentPath: string }) => {
  // Base URL for the site
  const baseUrl = "https://cointegrity.io";
  
  // Current supported languages (expandable for future internationalization)
  const supportedLanguages = [
    { code: 'en', region: 'US', label: 'English (US)' },
    // Future languages can be added here
    // { code: 'es', region: 'ES', label: 'Spanish (Spain)' },
    // { code: 'fr', region: 'FR', label: 'French (France)' },
  ];

  // Generate hreflang URLs
  const generateHreflangUrls = () => {
    return supportedLanguages.map(lang => ({
      hreflang: `${lang.code}-${lang.region}`,
      href: `${baseUrl}${currentPath}${lang.code !== 'en' ? `?lang=${lang.code}` : ''}`
    }));
  };

  const hreflangUrls = generateHreflangUrls();

  return (
    <Helmet>
      {/* Add x-default for international targeting */}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${currentPath}`} />
      
      {/* Add specific language alternates */}
      {hreflangUrls.map(({ hreflang, href }) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
      
      {/* Add language metadata */}
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
    </Helmet>
  );
};
