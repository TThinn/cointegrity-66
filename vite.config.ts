
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// Custom plugin to update sitemap lastmod dates
const updateSitemapDates = () => {
  return {
    name: 'update-sitemap-dates',
    buildEnd() {
      // Path to sitemap
      const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
      
      if (fs.existsSync(sitemapPath)) {
        let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
        
        // Replace PHP date tags with current date
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        sitemapContent = sitemapContent.replace(/(<lastmod>)<\?php echo date\('Y-m-d'\); \?>(<\/lastmod>)/g, 
          `$1${currentDate}$2`);
        
        fs.writeFileSync(sitemapPath, sitemapContent);
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    updateSitemapDates(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Force single React instance to prevent hook call errors
    dedupe: ['react', 'react-dom'],
  },
  // Optimize dependencies to prevent duplication
  optimizeDeps: {
    include: ['react', 'react-dom', '@radix-ui/react-tooltip'],
    force: true
  },
  // Ensure consistent React module resolution
  define: {
    // Ensure consistent React environment
    'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production')
  },
  publicDir: path.resolve(__dirname, "./public"),
}));
