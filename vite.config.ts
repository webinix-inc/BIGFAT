import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && viteCompression({ algorithm: 'gzip' }),
    mode === "production" && viteCompression({ algorithm: 'brotli' }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
      },
    },
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Keep React and React-DOM together - critical for proper loading
          // Must be first to ensure React loads before any other dependencies
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          // All React-dependent libraries must be grouped together
          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          // React Query
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'react-vendor';
          }
          // React-related libraries
          if (
            id.includes('node_modules/react-helmet') ||
            id.includes('node_modules/react-hook-form') ||
            id.includes('node_modules/react-day-picker') ||
            id.includes('node_modules/react-resizable') ||
            id.includes('node_modules/react-dom/')
          ) {
            return 'react-vendor';
          }
          // Radix UI components - depend on React
          if (id.includes('node_modules/@radix-ui')) {
            return 'react-vendor';
          }
          // Animation libraries (framer-motion might use React)
          if (id.includes('node_modules/framer-motion')) {
            return 'animation-vendor';
          }
          // Icons (lucide-react doesn't depend on React, but keep separate)
          if (id.includes('node_modules/lucide-react')) {
            return 'icons-vendor';
          }
          // Other large dependencies (non-React only)
          // Exclude anything that might reference React
          if (id.includes('node_modules')) {
            // Double-check: if it's a React-related package, put it in react-vendor
            if (
              id.includes('react') ||
              id.includes('@radix-ui') ||
              id.includes('@tanstack')
            ) {
              return 'react-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Disable source maps in production for better performance
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', 'react-router-dom'],
    exclude: ['@tanstack/react-query'],
  },
  // CSS optimization
  css: {
    devSourcemap: false,
  },
}));
