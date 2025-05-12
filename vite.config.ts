
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { generateSitemap } from './src/utils/generateSitemap'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080
  },
  plugins: [
    react(),
    {
      name: 'generate-sitemap',
      closeBundle: () => {
        generateSitemap();
      }
    }
  ],
})
