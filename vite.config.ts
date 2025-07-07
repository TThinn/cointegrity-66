import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { splitVendorChunkPlugin } from 'vite';

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
      splitVendorChunkPlugin(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      sourcemap: mode === 'development',
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Core vendor chunks
            'vendor-react': ['react', 'react-dom'],
            'vendor-routing': ['react-router-dom'],
            'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-accordion', '@radix-ui/react-tabs'],
            'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
            'vendor-icons': ['lucide-react'],
            
            // Feature chunks
            'chunk-seo': ['react-helmet-async'],
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name!.split('.');
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name!)) {
              return `images/[name]-[hash].${ext}`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name!)) {
              return `fonts/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          }
        }
      },
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 1000,
    },
    esbuild: {
      target: 'es2020',
      legalComments: 'none',
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom',
        'lucide-react',
        '@radix-ui/react-dialog',
        '@radix-ui/react-accordion'
      ],
      exclude: []
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production'),
      'process.env.BUILD_TIMESTAMP': JSON.stringify(buildTimestamp),
    },
    publicDir: path.resolve(__dirname, "./public"),
  };
});
