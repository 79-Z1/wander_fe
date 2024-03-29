/* eslint-disable @typescript-eslint/no-var-requires */
const Path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const nextConfig = async () => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    env: {
      BASE_URL: process.env.NEXT_PUBLIC_SITE_URL
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 's3.ap-southeast-1.amazonaws.com'
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com'
        },
        {
          protocol: 'https',
          hostname: 'robohash.org'
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com'
        },
        {
          protocol: 'https',
          hostname: 'loremflickr.com'
        }
      ]
    },
    webpack: config => {
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        bufferutil: 'commonjs bufferutil'
      });

      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: Path.join(__dirname, './src/libs/abc-icons/dist'),
              to: Path.join(__dirname, './public/fonts'),
              noErrorOnMissing: true
            }
          ]
        })
      );

      return config;
    }
  };

  return nextConfig;
};

module.exports = nextConfig;
