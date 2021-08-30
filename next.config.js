const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withTM = require('next-transpile-modules')(['react-tradingview-embed']);

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = withPlugins([
  [withImages],
  [
    withBundleAnalyzer,
    {
      enabled: process.env.ANALYZE === 'true',
    },
  ],
  [withTM],
  [
    {
      pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
      eslint: {
        dirs: ['src', 'scripts'],
      },
      // https://stackoverflow.com/a/68016564
      images: {
        disableStaticImages: true,
      },
      experimental: { esmExternals: true },
    },
  ],
]);
