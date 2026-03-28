import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy API calls to Flask during development
    // so you don't get CORS errors when running locally
    proxy: {
      '/analyze': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
