// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: './',              // Set root to current directory
  publicDir: 'public',     // Static assets directory
  build: {
    outDir: 'dist',        // Output directory for production build
    assetsDir: 'assets',   // Directory inside outDir for assets
  },
  server: {
    port: 3000,
    open: true,            // Open browser on server start
    cors: true,            // Enable CORS
  }
})