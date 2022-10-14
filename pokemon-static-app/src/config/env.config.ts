import getConfig from 'next/config';

interface Config {
  publicRuntimeConfig: {
    stage: string;
    pokeApiUrl: string;
  };
  serverRuntimeConfig: {
    allowedImageDomains: string[];
    pokeApiUrl: string;
    pokemonLimit: number;
    stage: string;
  };
}

interface Env {
  public: {
    stage: string;
    isDev: boolean;
    pokemon: {
      api: string;
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
    },
  },
};
