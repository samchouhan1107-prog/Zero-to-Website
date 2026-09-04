import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  // GitHub Pages serves this repo at /Zero-to-Website/ — keep asset URLs relative so they resolve correctly.
  base: process.env.VITE_BASE || '/Zero-to-Website/',

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