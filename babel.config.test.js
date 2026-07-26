// Minimal babel config for jest test runs.
// Skips nativewind/babel (which requires react-native-worklets) because
// the current test scope only exercises pure hooks — no styled components
// or cssInterop() calls.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'react' }],
    ],
  };
};
