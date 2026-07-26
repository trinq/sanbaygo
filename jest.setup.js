// Jest setup for React Native tests.
// Allow act() to run outside of test environment by setting this to true
// before any tests are imported.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Mock NativeWind's runtime that depends on react-native-css-interop,
// which is not present in this monorepo's test env.
jest.mock('nativewind', () => ({
  styled: (Component) => Component,
  useColorScheme: () => ({ colorScheme: 'light' }),
  cssInterop: () => () => {},
}));
