module.exports = {
  preset: 'jest-expo',
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/tests/**/*.test.tsx',
    '**/core/tests/**/*.test.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@design-system)',
  ],
  moduleNameMapper: {
    '^@core$': '<rootDir>/core',
    '^@design-system$': '<rootDir>/design-system',
    '^@design-system/(.*)$': '<rootDir>/design-system/$1',
  },
  testEnvironment: 'node',
};
