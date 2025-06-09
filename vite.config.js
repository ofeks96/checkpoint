import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://swapi.dev',
        changeOrigin: true,
        secure: false, // <- allows bypassing bad SSL
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
