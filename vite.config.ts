import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ Ensure this matches what Vercel expects
    emptyOutDir: true, // Optional: clears dist folder before each build
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});