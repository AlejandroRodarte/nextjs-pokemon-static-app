import { pokemonLocalStorageKeys } from '../../constants/local-storage/pokemon-local-storage-keys.constants';
import { PokemonFavorite } from '../../interfaces/local-storage/pokemon-favorite.interface';

export type PokemonLocalStorageMap = {
  [pokemonLocalStorageKeys.FAVORITES]: {
    data: PokemonFavorite[];
  };
};
