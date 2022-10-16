import getConfig from 'next/config';

interface Config {
  publicRuntimeConfig: {
    stage: string;
    pokeApiUrl: string;
    pokemonSpritesUrl: string;
  };
  serverRuntimeConfig: {
    allowedImageDomains: string[];
    pokeApiUrl: string;
    pokemonLimit: number;
    pokemonSpritesUrl: string;
    stage: string;
  };
}

interface Env {
  public: {
    stage: string;
    isDev: boolean;
    pokemon: {
      api: string;
      spritesUrl: string;
    };
  };
  server: {
    stage: string;
    images: {
      allowedDomains: string[];
    };
    isDev: boolean;
    pokemon: {
      api: string;
      limit: number;
      spritesUrl: string;
    };
  };
}

const { publicRuntimeConfig, serverRuntimeConfig }: Config = getConfig();

export const env: Env = {
  public: {
    stage: publicRuntimeConfig.stage,
    isDev: ['development-docker', 'development-local'].includes(
      publicRuntimeConfig.stage
    ),
    pokemon: {
      api: publicRuntimeConfig.pokeApiUrl,
      spritesUrl: publicRuntimeConfig.pokemonSpritesUrl,
    },
  },
  server: {
    stage: serverRuntimeConfig.stage,
    images: {
      allowedDomains: serverRuntimeConfig.allowedImageDomains,
    },
    isDev: ['development-docker', 'development-local'].includes(
      serverRuntimeConfig.stage
    ),
    pokemon: {
      api: serverRuntimeConfig.pokeApiUrl,
      limit: serverRuntimeConfig.pokemonLimit,
      spritesUrl: serverRuntimeConfig.pokemonSpritesUrl,
    },
  },
};
