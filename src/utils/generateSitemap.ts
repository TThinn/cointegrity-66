
import fs from 'fs';
import path from 'path';

/**
 * Generates a sitemap.xml file with current dates
 * This script should be run during the build process
 */
export function generateSitemap(): void {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>https://cointegrity.io/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://cointegrity.io/lovable-uploads/23b8985f-164c-4c02-a983-2dfa808c0689.png</image:loc>
      <image:caption>Cointegrity Logo</image:caption>
    </image:image>
  </url>
  <!-- URLs for each section with proper paths -->
  <url>
    <loc>https://cointegrity.io/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://cointegrity.io/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://cointegrity.io/partners</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://cointegrity.io/team</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://cointegrity.io/testimonials</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://cointegrity.io/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://cointegrity.io/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

  // Write the sitemap to the public directory
  try {
    fs.writeFileSync(path.resolve(process.cwd(), 'public/sitemap.xml'), sitemap);
    console.log('Sitemap successfully generated with current date:', today);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Allow command-line execution
if (require.main === module) {
  generateSitemap();
}
