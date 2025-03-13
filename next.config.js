/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['pub-ae7a867ffdfc4078b5859520121853d0.r2.dev'],
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
  },
  // Add output configuration
  output: 'standalone',
  // Minimize the output
  swcMinify: true,
  // Disable source maps in production
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
