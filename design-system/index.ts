// Top-level barrel for `@design-system`.
// RN consumers: `import { ds } from '@design-system'` (resolves to this file via tsconfig paths).
// Web consumers: `import '@design-system/tokens/index.css'` (separate CSS module resolution).

export { ds } from './tokens';
export type { DesignTokens } from './tokens';
