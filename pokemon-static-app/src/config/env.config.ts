import getConfig from 'next/config';

interface Config {
  publicRuntimeConfig: {
    stage: string;
  };
  serverRuntimeConfig: {
    allowedImageDomains: string[];
  };
}

interface Env {
  public: {
    stage: string;
  };
  server: {
    images: {
      allowedDomains: string[];
    };
  };
}

const { publicRuntimeConfig, serverRuntimeConfig }: Config = getConfig();

export const env: Env = {
  public: {
    stage: publicRuntimeConfig.stage,
  },
  server: {
    images: {
      allowedDomains: serverRuntimeConfig.allowedImageDomains,
    },
  },
};
