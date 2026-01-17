import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Pass the process.env.API_KEY to the client-side code safely
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});