import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

const coreRoot = resolve(process.cwd(), '..', 'core');

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '@core': resolve(coreRoot, 'index.ts'),
      '@core/': `${coreRoot}/`,
      '@design-system': resolve(process.cwd(), '..', 'design-system', 'tokens', 'index.ts'),
      '@design-system/': resolve(process.cwd(), '..', 'design-system') + '/',
    },
  },
});
