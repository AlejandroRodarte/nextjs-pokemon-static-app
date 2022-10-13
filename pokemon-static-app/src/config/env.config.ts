import getConfig from 'next/config';

interface Config {
  publicRuntimeConfig: {
    stage: string;
  };
}

interface Env {
  public: {
    stage: string;
  };
}

const { publicRuntimeConfig }: Config = getConfig();

export const env: Env = {
  public: {
    stage: publicRuntimeConfig.stage,
  },
};
