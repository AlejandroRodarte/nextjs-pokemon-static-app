import { addConfettiOnFavorite } from './add-confetti-on-favorite.helper';
import { insertToSortedArray } from '../../arrays/insert-to-sorted-array.helper';
import { FavoriteMode } from '../../../types/pages/favorite-mode.type';
import { PokemonFavorite } from '../../../interfaces/local-storage/pokemon-favorite.interface';

export const updateFavorites = (
  oldFavorites: PokemonFavorite[],
  newFavorite: PokemonFavorite
): [PokemonFavorite[], FavoriteMode] => {
  const pokemonExists = !!oldFavorites.find((pf) => pf.id === newFavorite.id);
  let newFavorites: PokemonFavorite[];
  let newMode: FavoriteMode;

  if (!pokemonExists) {
    newFavorites = insertToSortedArray(
      oldFavorites,
      newFavorite,
      (midFavorite, newFavorite) => midFavorite.id < newFavorite.id
    );
    newMode = 'delete';
    addConfettiOnFavorite();
  } else {
    newFavorites = oldFavorites.filter((pf) => pf.id !== newFavorite.id);
    newMode = 'save';
  }

  return [newFavorites, newMode];
};
