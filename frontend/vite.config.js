import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    open: false,
    host: true,
    proxy: {
      // Monitoring app runs on 5174 — proxied under same origin so Supabase localStorage session is shared.
      '/monitoring': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      },
    },
  }
});