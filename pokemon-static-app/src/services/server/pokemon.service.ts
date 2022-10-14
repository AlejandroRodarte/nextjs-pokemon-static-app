import { HttpAdapter } from '../../interfaces/adapters/http-adapter.interface';
import { GetPokemonsResponse } from '../../interfaces/pokemon/get-pokemons-response.interface';
import { DataErrorTuple } from '../../types/common/data-error-tuple.type';
import { pokemonAxiosAdapter } from '../../adapters/http/axios.adapter';

type GetPokemonsQueryParams = {
  limit: number;
};

export class PokemonService {
  private readonly http: HttpAdapter;

  constructor(http: HttpAdapter) {
    this.http = http;
  }

  async getPokemons(
    limit: number
  ): Promise<DataErrorTuple<GetPokemonsResponse['results'], Error>> {
    const [response, error] = await this.http.get<
      GetPokemonsQueryParams,
      GetPokemonsResponse
    >({ url: 'pokemon', queryParams: { limit } });
    return [response?.results, error];
  }
}

export const pokemonService = new PokemonService(pokemonAxiosAdapter);
