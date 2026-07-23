import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = __dirname;

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>', '../core'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx', '../core/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core$': '<rootDir>/../core/index.ts',
    '^@core/(.*)$': '<rootDir>/../core/$1',
    // CSS module mocks: legacy `web/__mocks__/` is CJS and canonical.
    // Jest's manual-mock auto-discovery requires the file to live at
    // `<rootDir>/__mocks__/...` and use CJS syntax. Both directories
    // existed for a while; the duplicate at `src/__mocks__/` has been
    // removed in favor of this single source.
    '\\.module\\.css$': resolve(rootDir, '__mocks__/styleMock.js'),
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
};