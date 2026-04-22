import { defineConfig } from 'vitest/config';
import path from 'path';

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
};

export default defineConfig({
  resolve: { alias: aliases },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});