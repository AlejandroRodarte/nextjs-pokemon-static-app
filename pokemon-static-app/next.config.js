/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    stage: process.env.NEXT_PUBLIC_STAGE || 'development-local',
  },
  output: 'standalone',
};

module.exports = nextConfig;
