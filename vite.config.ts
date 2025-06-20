
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// Custom plugin to update sitemap dates
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

// Cache busting plugin for development and production
const cacheBustingPlugin = () => {
  return {
    name: 'cache-busting',
    configureServer(server) {
      // Add cache-busting headers for development
      server.middlewares.use((req, res, next) => {
        // Prevent caching of HTML files and API responses
        if (req.url?.endsWith('.html') || req.url?.includes('/api/')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        }
        next();
      });
    }
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
    cacheBustingPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: mode === 'development',
    // Add cache busting with build timestamps
    rollupOptions: {
      output: {
        // Add timestamp to chunk names for cache busting
        chunkFileNames: (chunkInfo) => {
          const timestamp = Date.now();
          return `assets/[name]-[hash]-${timestamp}.js`;
        },
        entryFileNames: (chunkInfo) => {
          const timestamp = Date.now();
          return `assets/[name]-[hash]-${timestamp}.js`;
        },
        assetFileNames: (assetInfo) => {
          const timestamp = Date.now();
          return `assets/[name]-[hash]-${timestamp}.[ext]`;
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production'),
    // Add build timestamp for cache invalidation
    'process.env.BUILD_TIMESTAMP': JSON.stringify(Date.now().toString()),
  },
  publicDir: path.resolve(__dirname, "./public"),
}));

