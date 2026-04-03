/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

const aliases = {
  '@': path.resolve(__dirname, './src'),
  '@app': path.resolve(__dirname, './src/app'),
  '@components': path.resolve(__dirname, './src/components'),
  '@pages': path.resolve(__dirname, './src/pages'),
  '@consts': path.resolve(__dirname, './src/consts'),
  '@context': path.resolve(__dirname, './src/context'),
  '@hooks': path.resolve(__dirname, './src/hooks'),
  '@infra': path.resolve(__dirname, './src/infra'),
  '@domain': path.resolve(__dirname, './src/domain'),
  '@assets': path.resolve(__dirname, './src/assets'),
  '@types': path.resolve(__dirname, './src/types'),
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: aliases },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['src/test/**', 'src/main.tsx', 'src/**/*.d.ts', 'src/components/ui/**'],
    },
  },
})
