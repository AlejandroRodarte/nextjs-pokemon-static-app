import { HttpAdapter } from '../../interfaces/adapters/http-adapter.interface';
import { GetPokemonsResponse } from '../../interfaces/pokemon/get-pokemons-response.interface';
import { DataErrorTuple } from '../../types/common/data-error-tuple.type';
import { pokemonAxiosAdapter } from '../../adapters/http/axios.adapter';
import { GetPokemonResponse } from '../../interfaces/pokemon/get-pokemon-response.interface';

type GetPokemonsQueryParams = {
  limit: string;
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
      GetPokemonsResponse,
      GetPokemonsQueryParams
    >({ url: 'pokemon', queryParams: { limit: limit.toString() } });
    return [response?.results, error];
  }

  async getPokemon(
    id: string
  ): Promise<DataErrorTuple<GetPokemonResponse, Error>> {
    const [response, error] = await this.http.get<GetPokemonResponse>({
      url: `pokemon/${id}`,
    });
    return [response, error];
  }
}

export const pokemonService = new PokemonService(pokemonAxiosAdapter);
