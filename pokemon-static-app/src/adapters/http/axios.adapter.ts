import { AxiosInstance } from 'axios';

import { asyncWrapper } from '../../helpers/wrappers/async-wrapper.helper';
import { DataErrorTuple } from '../../types/common/data-error-tuple.type';
import { HttpAdapter } from '../../interfaces/adapters/http-adapter.interface';
import { pokeApiAxios } from '../../axios/server/poke-api.axios';

export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async get<QueryParams, Response>(options: {
    url: string;
    queryParams: QueryParams;
  }): Promise<DataErrorTuple<Response, Error>> {
    const { url, queryParams } = options;

    const [response, error] = await asyncWrapper(async () => {
      const response = await this.axios.get<Response>(url, {
        params: queryParams,
      });
      return response.data;
    });

    return [response, error];
  }
}

export const pokemonAxiosAdapter = new AxiosAdapter(pokeApiAxios);
