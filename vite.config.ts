import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  // Custom domain (webzonebw.shop) serves from root. Override with VITE_BASE for GitHub Pages subpath.
  base: process.env.VITE_BASE || '/',

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
    // HMR is disabled in AI Studio via DISABLE_HMR.
    hmr: process.env.DISABLE_HMR !== 'true',

    // Disable file watching when HMR is disabled.
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
}));