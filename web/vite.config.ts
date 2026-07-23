import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const coreRoot = resolve(process.cwd(), '..', 'core');
const dsRoot = resolve(process.cwd(), '..', 'design-system');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Regex-anchored aliases — exact-match (^) and prefix-match.
      // Anchored with /$ to avoid prefix-stripping bugs like
      // `@design-system/x` accidentally resolving to
      // `design-system/index.ts/x`.
      { find: /^@core$/, replacement: resolve(coreRoot, 'index.ts') },
      { find: /^@core\/(.*)$/, replacement: resolve(coreRoot, '$1') },
      { find: /^@design-system$/, replacement: resolve(dsRoot, 'index.ts') },
      { find: /^@design-system\/(.*)$/, replacement: resolve(dsRoot, '$1') },
      { find: /^@\/(.*)$/, replacement: resolve(process.cwd(), 'src', '$1') },
    ],
  },
});