
/**
 * Image sitemap generation utilities for SEO
 */

export interface ImageSitemapEntry {
  loc: string;
  images: Array<{
    loc: string;
    caption?: string;
    title?: string;
    license?: string;
  }>;
}

export const generateImageSitemapData = (): ImageSitemapEntry[] => {
  const baseUrl = "https://cointegrity.io";
  
  return [
    {
      loc: `${baseUrl}/`,
      images: [
        {
          loc: `${baseUrl}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png`,
          caption: "Cointegrity Web3 Consultancy Logo",
          title: "Cointegrity - Leading Web3 and Blockchain Consultancy"
        },
        {
          loc: `${baseUrl}/lovable-uploads/4154e717-451c-4f01-9cf6-8117a4fa0149.png`,
          caption: "Cointegrity Favicon",
          title: "Cointegrity Brand Icon"
        }
      ]
    },
    {
      loc: `${baseUrl}/services`,
      images: [
        {
          loc: `${baseUrl}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png`,
          caption: "Web3 Services Overview",
          title: "Comprehensive Web3 and Blockchain Services"
        }
      ]
    },
    {
      loc: `${baseUrl}/team`,
      images: [
        {
          loc: `${baseUrl}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png`,
          caption: "Expert Web3 Team",
          title: "Meet the Cointegrity Web3 Specialists"
        }
      ]
    },
    {
      loc: `${baseUrl}/partners`,
      images: [
        // Partner logos would be added here when available
        {
          loc: `${baseUrl}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png`,
          caption: "Industry Partners Network",
          title: "Cointegrity Strategic Partners"
        }
      ]
    }
  ];
};

/**
 * Generate XML sitemap content for images
 */
export const generateImageSitemapXML = (): string => {
  const sitemapData = generateImageSitemapData();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  sitemapData.forEach(entry => {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    
    entry.images.forEach(image => {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${image.loc}</image:loc>\n`;
      if (image.caption) {
        xml += `      <image:caption>${image.caption}</image:caption>\n`;
      }
      if (image.title) {
        xml += `      <image:title>${image.title}</image:title>\n`;
      }
      if (image.license) {
        xml += `      <image:license>${image.license}</image:license>\n`;
      }
      xml += `    </image:image>\n`;
    });
    
    xml += `  </url>\n`;
  });
  
  xml += '</urlset>';
  return xml;
};
