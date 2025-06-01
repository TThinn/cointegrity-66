
// Image sitemap data for SEO optimization - no visual component
export interface ImageSitemapEntry {
  loc: string;
  images: {
    loc: string;
    caption?: string;
    title?: string;
    license?: string;
  }[];
}

export const getImageSitemapData = (): ImageSitemapEntry[] => {
  const baseUrl = "https://cointegrity.io";
  
  return [
    {
      loc: `${baseUrl}/`,
      images: [
        {
          loc: `${baseUrl}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png`,
          caption: "Cointegrity Logo - Web3 & Blockchain Consultancy",
          title: "Cointegrity Main Logo"
        },
        {
          loc: `${baseUrl}/lovable-uploads/4154e717-451c-4f01-9cf6-8117a4fa0149.png`,
          caption: "Cointegrity Favicon",
          title: "Cointegrity Icon"
        }
      ]
    },
    {
      loc: `${baseUrl}/about`,
      images: [
        {
          loc: `${baseUrl}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png`,
          caption: "About Cointegrity - Web3 Experts",
          title: "Cointegrity Team"
        }
      ]
    },
    {
      loc: `${baseUrl}/services`,
      images: [
        {
          loc: `${baseUrl}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png`,
          caption: "Cointegrity Web3 & Blockchain Services",
          title: "Our Services"
        }
      ]
    },
    {
      loc: `${baseUrl}/partners`,
      images: [
        // Partner logos would be added here
        {
          loc: `${baseUrl}/lovable-uploads/AWS.png`,
          caption: "AWS Partner - Cloud Infrastructure",
          title: "Amazon Web Services Partnership"
        },
        {
          loc: `${baseUrl}/lovable-uploads/Google_Cloud.png`,
          caption: "Google Cloud Partner",
          title: "Google Cloud Partnership"
        }
      ]
    }
  ];
};

// Helper function to generate image sitemap XML (for build process)
export const generateImageSitemapXML = (): string => {
  const data = getImageSitemapData();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  data.forEach(entry => {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    
    entry.images.forEach(image => {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${image.loc}</image:loc>\n`;
      if (image.caption) xml += `      <image:caption>${image.caption}</image:caption>\n`;
      if (image.title) xml += `      <image:title>${image.title}</image:title>\n`;
      xml += `    </image:image>\n`;
    });
    
    xml += `  </url>\n`;
  });
  
  xml += '</urlset>';
  
  return xml;
};
