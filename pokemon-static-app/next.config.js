const allowedImageDomains =
  process.env.ALLOWED_IMAGE_DOMAINS?.split(', ') || [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    pokeApiUrl: process.env.NEXT_PUBLIC_POKEAPI_URL || '',
    pokemonSpriteLogoRelativePath:
      process.env.NEXT_PUBLIC_POKEMON_SPRITE_LOGO_RELATIVE_PATH || '',
    pokemonSpritesUrl: process.env.NEXT_PUBLIC_POKEMON_SPRITES_URL || '',
    stage: process.env.NEXT_PUBLIC_STAGE || 'development-local',
  },
  serverRuntimeConfig: {
    allowedImageDomains,
    pokeApiUrl: process.env.POKEAPI_URL || '',
    pokemonLimit: +(process.env.POKEMON_LIMIT || '151'),
    pokemonSpriteLogoRelativePath:
      process.env.POKEMON_SPRITE_LOGO_RELATIVE_PATH || '',
    pokemonSpritesUrl: process.env.POKEMON_SPRITES_URL || '',
    stage: process.env.STAGE || 'development-local',
  },
  output: 'standalone',
  images: {
    domains: allowedImageDomains,
  },
};

module.exports = nextConfig;
