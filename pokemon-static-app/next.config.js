const allowedImageDomains =
  process.env.ALLOWED_IMAGE_DOMAINS?.split(', ') || [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    pokeApiUrl: process.env.NEXT_PUBLIC_POKEAPI_URL || '',
    stage: process.env.NEXT_PUBLIC_STAGE || 'development-local',
  },
  serverRuntimeConfig: {
    allowedImageDomains,
    pokeApiUrl: process.env.POKEAPI_URL || '',
    pokemonLimit: +(process.env.POKEMON_LIMIT || '151'),
  },
  output: 'standalone',
  images: {
    domains: allowedImageDomains,
  },
};

module.exports = nextConfig;
