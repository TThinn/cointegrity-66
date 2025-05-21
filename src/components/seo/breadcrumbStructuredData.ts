
// Breadcrumb structured data for improved navigation SEO
export const generateBreadcrumbStructuredData = (
  currentPath: string,
  currentHash: string
) => {
  const breadcrumbs = [];
  const baseUrl = "https://cointegrity.io";
  
  // Add homepage as the first item
  breadcrumbs.push({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": baseUrl
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
      
      breadcrumbs.push({
        "@type": "ListItem",
        "position": position,
        "name": name,
        "item": `${baseUrl}/${itemPath}`
      });
    });
  }
  
  // Handle hash-based navigation on homepage
  else if (currentHash) {
    const hashSegment = currentHash.replace('#', '');
    const name = hashSegment.charAt(0).toUpperCase() + hashSegment.slice(1);
    
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": name,
      "item": `${baseUrl}/${currentHash}`
    });
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
};
