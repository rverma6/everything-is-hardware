import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
      },
    },
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist', // Outputs to 'frontend/dist'
    assetsDir: 'assets'
  }
});
