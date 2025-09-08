import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest-setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        'src/main',
        'src/presentation/components',
        'commitlint.config.ts',
        '**/index.ts',
        'eslint.config.js',
        'vite.config.ts',
        'vitest.config.ts',
        '.storybook',
        'src/stories',
        'dist',
      ],
      thresholds: {
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
    },
  },
})
