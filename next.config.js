/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
  },
};

module.exports = nextConfig;
