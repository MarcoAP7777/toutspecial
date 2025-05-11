/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    instrumentationHook: true,
  },
};

module.exports = nextConfig;
