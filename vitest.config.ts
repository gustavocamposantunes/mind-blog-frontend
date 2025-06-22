import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      exclude: [
        'src/main',
        'src/presentation/components',
        'commitlint.config.ts',
        '**/index.ts',
        'eslint.config.js',
        'vite.config.ts',
        'vitest.config.ts',
      ],
      thresholds: {
        global: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
        },
      }
    }
  },
})