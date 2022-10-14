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
  };
}

interface Env {
  public: {
    stage: string;
    pokemon: {
      api: string;
    };
  };
  server: {
    images: {
      allowedDomains: string[];
    };
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
    pokemon: {
      api: publicRuntimeConfig.pokeApiUrl,
    },
  },
  server: {
    images: {
      allowedDomains: serverRuntimeConfig.allowedImageDomains,
    },
    pokemon: {
      api: serverRuntimeConfig.pokeApiUrl,
      limit: serverRuntimeConfig.pokemonLimit,
    },
  },
};
