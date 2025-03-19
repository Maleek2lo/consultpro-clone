import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    host: true
  },
  base: '/consultpro-clone/', // This will be your repository name
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
  },
});
