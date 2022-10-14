const allowedImageDomains =
  process.env.ALLOWED_IMAGE_DOMAINS?.split(', ') || [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    stage: process.env.NEXT_PUBLIC_STAGE || 'development-local',
  },
  serverRuntimeConfig: {
    allowedImageDomains,
  },
  output: 'standalone',
  images: {
    domains: allowedImageDomains,
  },
};

module.exports = nextConfig;
