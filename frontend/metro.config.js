const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

config.resolver = {
  ...config.resolver,
  assetExts: [
    ...config.resolver.assetExts,
    'png',
    'jpg',
    'jpeg',
    'gif',
    'webp',
    'svg',
    'bin'
  ],
  sourceExts: [
    ...config.resolver.sourceExts,
    'jsx',
    'js',
    'ts',
    'tsx',
    'json',
    'cjs'
  ],
};

module.exports = config;