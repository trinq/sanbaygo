import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const coreRoot = resolve(process.cwd(), '..', 'core');
const dsRoot = resolve(process.cwd(), '..', 'design-system');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '@core': resolve(coreRoot, 'index.ts'),
      '@core/': `${coreRoot}/`,
      '@design-system': resolve(dsRoot, 'index.ts'),
      '@design-system/': `${dsRoot}/`,
    },
  },
});
