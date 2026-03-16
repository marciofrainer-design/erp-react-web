import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@core': path.resolve(__dirname, './src/core'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@comum': path.resolve(__dirname, './src/comum'),
      '@store': path.resolve(__dirname, './src/store')
    }
  }
})
