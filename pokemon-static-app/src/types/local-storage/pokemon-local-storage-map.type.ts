import { PokemonFavorite } from '../../interfaces/local-storage/pokemon-favorite.interface';
import { pokemonLocalStorageKeys } from '../../constants/local-storage/pokemon-local-storage-keys.constants';

export type PokemonLocalStorageMap = {
  [pokemonLocalStorageKeys.FAVORITES]: {
    data: PokemonFavorite[];
  };
};
