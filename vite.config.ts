
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';
import type { ViteDevServer } from 'vite';

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

// Enhanced cache busting plugin with proper TypeScript types
const cacheBustingPlugin = () => {
  return {
    name: 'cache-busting',
    configureServer(server: ViteDevServer) {
      // Add cache-busting headers for development
      server.middlewares.use((req: any, res: any, next: any) => {
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
export default defineConfig(({ mode }) => {
  const buildTimestamp = Date.now().toString();
  
  return {
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
      // Enhanced cache busting with build timestamps
      rollupOptions: {
        output: {
          // Add timestamp to chunk names for cache busting
          chunkFileNames: `assets/[name]-[hash]-${buildTimestamp}.js`,
          entryFileNames: `assets/[name]-[hash]-${buildTimestamp}.js`,
          assetFileNames: `assets/[name]-[hash]-${buildTimestamp}.[ext]`
        }
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production'),
      // Add build timestamp for cache invalidation
      'process.env.BUILD_TIMESTAMP': JSON.stringify(buildTimestamp),
    },
    publicDir: path.resolve(__dirname, "./public"),
  };
});
