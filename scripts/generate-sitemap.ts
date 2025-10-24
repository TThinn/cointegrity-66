import { glossaryTerms } from '../src/data/glossaryTerms';
import * as fs from 'fs';
import * as path from 'path';

// Generate slug using Pattern B (matches the routing logic)
const generateSlug = (term: string): string => {
  return term.toLowerCase().replace(/[^a-z0-9]/g, '-');
};

const generateSitemap = () => {
  const baseUrl = 'https://cointegrity.io';
  const currentDate = new Date().toISOString().split('T')[0];

  // Start the XML sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${baseUrl}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png</image:loc>
      <image:caption>Cointegrity Logo</image:caption>
    </image:image>
  </url>
  
  <!-- Main glossary page -->
  <url>
    <loc>${baseUrl}/glossary</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

  // Add all glossary term pages
  glossaryTerms.forEach((glossaryTerm) => {
    const slug = generateSlug(glossaryTerm.term);
    sitemap += `  <url>
    <loc>${baseUrl}/glossary/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // Add other important pages
  sitemap += `  <!-- Section pages -->
  <url>
    <loc>${baseUrl}/#about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#partners</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#process</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#founders</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#testimonials</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Resource pages -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${baseUrl}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png</image:loc>
      <image:caption>Cointegrity Web3 Blog</image:caption>
    </image:image>
  </url>
  <url>
    <loc>${baseUrl}/mica-ready-waitlist</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>2024-11-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/thank-you</loc>
    <lastmod>2024-12-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  // Write to public/sitemap.xml
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
  
  console.log(`✅ Sitemap generated successfully with ${glossaryTerms.length} glossary terms`);
  console.log(`📄 Total URLs in sitemap: ${glossaryTerms.length + 12}`);
  console.log(`📍 Sitemap saved to: ${sitemapPath}`);
};

// Run the generator
generateSitemap();
