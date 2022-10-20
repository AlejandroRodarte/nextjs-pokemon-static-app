import { FavoriteMode } from '../types/pages/favorite-mode.type';
import { PokemonDetailsProps } from '../components/pokemon';
import { PokemonFavorite } from '../interfaces/local-storage/pokemon-favorite.interface';
import { pokemonLocalStorageKeys } from '../constants/local-storage/pokemon-local-storage-keys.constants';
import { PokemonLocalStorageMap } from '../types/local-storage/pokemon-local-storage-map.type';
import { updateFavorites } from '../helpers/pages/pokemon';
import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from './use-local-storage.hook';

type Args = {
  pokemon: {
    id: number;
    name: string;
    img?: string;
  };
};

type Returns = {
  favoriteMode: FavoriteMode;
  pokemonDetailsOnButtonClick: PokemonDetailsProps['onButtonClick'];
};

export const usePokemonPageCommonData = (args: Args): Returns => {
  const {
    pokemon: { id: pokemonId, name: pokemonName, img: pokemonImg },
  } = args;

  const { get: getPokemonItem, set: setPokemonItem } =
    useLocalStorage<PokemonLocalStorageMap>();

  const [favoriteMode, setFavoriteMode] = useState<FavoriteMode>('save');

  useEffect(() => {
    const favorites = getPokemonItem(pokemonLocalStorageKeys.FAVORITES);
    const isPokemonOnFavorites = !(
      !favorites || !favorites.find((pf) => pf.id === pokemonId)
    );
    if (isPokemonOnFavorites) setFavoriteMode(() => 'delete');
  }, [getPokemonItem, pokemonId, setFavoriteMode]);

  const pokemonDetailsOnButtonClick = useCallback<
    PokemonDetailsProps['onButtonClick']
  >(() => {
    const newFavorite: PokemonFavorite = {
      id: pokemonId,
      name: pokemonName,
      img: pokemonImg || '/no-image.png',
    };
    const oldFavorites = getPokemonItem(pokemonLocalStorageKeys.FAVORITES);

    if (!oldFavorites) {
      setPokemonItem(pokemonLocalStorageKeys.FAVORITES, [newFavorite]);
      setFavoriteMode(() => 'delete');
    } else {
      const [newFavorites, newMode] = updateFavorites(
        oldFavorites,
        newFavorite
      );
      setPokemonItem(pokemonLocalStorageKeys.FAVORITES, newFavorites);
      setFavoriteMode(() => newMode);
    }
  }, [getPokemonItem, setPokemonItem, pokemonId, pokemonName, pokemonImg]);

  return { favoriteMode, pokemonDetailsOnButtonClick };
};
