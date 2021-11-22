const withPlugins = require('next-compose-plugins');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');

module.exports = withPlugins([
  [
    {
      webpack(config, options) {
        // The following rules allow webpack to bundle images (copied from Create React App)
        config.module.rules.push({
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
        });
        config.module.rules.push({
          test: /\.svg$/,
          use: [
            {
              loader: require.resolve('@svgr/webpack'),
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/media/[name].[hash].[ext]',
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        });
        config.plugins.push(new DuplicatesPlugin());
        return config;
      },
    },
  ],
  [withBundleAnalyzer],
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
    },
  ],
]);
