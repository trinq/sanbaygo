// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...(config.resolver.alias || {}),
  '@design-system': path.resolve(__dirname, 'design-system'),
  '@design-system/': path.resolve(__dirname, 'design-system') + '/',
};

module.exports = config;
