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
    // CSS module mocks with explicit per-component patterns
    '^.*/ResultDisplay/index\\.module\\.css$': resolve(rootDir, 'src/__mocks__/ResultDisplay/index.module.css.js'),
    '^.*/ResultDisplay/JourneyTimeline\\.module\\.css$': resolve(rootDir, 'src/__mocks__/ResultDisplay/JourneyTimeline.module.css.js'),
    '^.*/ResultDisplay/BusRecommendation\\.module\\.css$': resolve(rootDir, 'src/__mocks__/ResultDisplay/BusRecommendation.module.css.js'),
    '^.*/ResultDisplay/GrabFallback\\.module\\.css$': resolve(rootDir, 'src/__mocks__/ResultDisplay/GrabFallback.module.css.js'),
    '^.*/VehicleComparison/index\\.module\\.css$': resolve(rootDir, 'src/__mocks__/VehicleComparison/index.module.css.js'),
    '^.*/VehicleComparison/SortToggle\\.module\\.css$': resolve(rootDir, 'src/__mocks__/VehicleComparison/SortToggle.module.css.js'),
    '^.*/VehicleComparison/VehicleCard\\.module\\.css$': resolve(rootDir, 'src/__mocks__/VehicleComparison/VehicleCard.module.css.js'),
    '\\.module\\.css$': resolve(rootDir, 'src/__mocks__/styleMock.js'),
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
};
