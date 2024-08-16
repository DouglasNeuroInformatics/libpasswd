import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*'],
      provider: 'v8',
      thresholds: {
        branches: 80,
        functions: 100,
        lines: 100,
        statements: 100
      }
    },
    watch: false
  }
});
