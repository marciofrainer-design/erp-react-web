import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@components/domain': path.resolve(__dirname, './src/components/domain'),
      '@domain': path.resolve(__dirname, './src/domain'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@comum': path.resolve(__dirname, './src/comum'),
      '@store': path.resolve(__dirname, './src/store')
    }
  }
})
