/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/setupTests.ts'],
    alias: {
      '@': '/src',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});

