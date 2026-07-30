/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '.',
  watchman: false,
  testMatch: [
    '<rootDir>/__tests__/**/*.test.ts',
    '<rootDir>/__tests__/**/*.test.tsx',
    '<rootDir>/__tests__/**/*.test.mjs',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core$': '<rootDir>/../core/index.ts',
    '^@design-system$': '<rootDir>/../design-system/tokens/index.ts',
    '^@design-system/(.*)$': '<rootDir>/../design-system/$1',
    '^@core/(.*)$': '<rootDir>/../core/$1',
    '\\.module\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
};
