
// Enhanced breadcrumb structured data for improved navigation SEO
export const generateBreadcrumbStructuredData = (
  currentPath: string,
  currentHash: string,
  termName?: string
) => {
  const breadcrumbs = [];
  const baseUrl = "https://cointegrity.io";
  
  // Add homepage as the first item
  breadcrumbs.push({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": {
      "@type": "WebPage",
      "@id": baseUrl,
      "url": baseUrl,
      "name": "Cointegrity - Web3 Consulting"
    }
  });
  
  // Handle path-based pages
  const pathWithoutSlash = currentPath.replace(/^\/+/, '');
  if (pathWithoutSlash) {
    const pathSegments = pathWithoutSlash.split('/').filter(Boolean);
    
    // Add each path segment as a breadcrumb item
    pathSegments.forEach((segment, index) => {
      const position = index + 2; // +2 because home is position 1
      const itemPath = pathSegments.slice(0, index + 1).join('/');
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      const url = `${baseUrl}/${itemPath}`;
      
      breadcrumbs.push({
        "@type": "ListItem",
        "position": position,
        "name": name,
        "item": {
          "@type": "WebPage",
          "@id": url,
          "url": url,
          "name": name
        }
      });
    });
    
    // Add specific term if provided (for glossary terms)
    if (termName && currentPath.includes('glossary')) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": breadcrumbs.length + 1,
        "name": termName,
        "item": {
          "@type": "DefinedTerm",
          "@id": `${baseUrl}/glossary/${termName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          "url": `${baseUrl}/glossary/${termName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          "name": termName
        }
      });
    }
  }
  
  // Handle hash-based navigation on homepage
  else if (currentHash) {
    const hashSegment = currentHash.replace('#', '');
    const name = hashSegment.charAt(0).toUpperCase() + hashSegment.slice(1);
    
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": name,
      "item": {
        "@type": "WebPageElement",
        "@id": `${baseUrl}/${currentHash}`,
        "url": `${baseUrl}/${currentHash}`,
        "name": name
      }
    });
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}${currentPath}#breadcrumb`,
    "name": "Navigation Breadcrumb",
    "description": "Site navigation breadcrumb for improved user experience",
    "itemListElement": breadcrumbs
  };
};

// Enhanced breadcrumb for glossary categories
export const generateCategoryBreadcrumbStructuredData = (
  categoryName: string,
  categoryValue: string
) => {
  const baseUrl = "https://cointegrity.io";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}/glossary#breadcrumb-${categoryValue}`,
    "name": `${categoryName} Category Breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": {
          "@type": "WebPage",
          "@id": baseUrl,
          "url": baseUrl
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Glossary",
        "item": {
          "@type": "WebPage",
          "@id": `${baseUrl}/glossary`,
          "url": `${baseUrl}/glossary`
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryName,
        "item": {
          "@type": "CollectionPage",
          "@id": `${baseUrl}/glossary#${categoryValue}`,
          "url": `${baseUrl}/glossary?category=${categoryValue}`,
          "name": `${categoryName} Terms`
        }
      }
    ]
  };
};
