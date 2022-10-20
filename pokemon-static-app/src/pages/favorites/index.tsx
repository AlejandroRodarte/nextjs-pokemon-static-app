import React, { useState, useEffect } from 'react';

import { DefaultLayout } from '../../components/layouts';
import { CustomNextPage } from '../../types/next/custom-next-page.type';
import { NoFavoritePokemons } from '../../components/pokemon/NoFavoritePokemons';
import { useLocalStorage } from '../../hooks/use-local-storage.hook';
import { PokemonLocalStorageMap } from '../../types/local-storage/pokemon-local-storage-map.type';
import { PokemonFavorite } from '../../interfaces/local-storage/pokemon-favorite.interface';
import { pokemonLocalStorageKeys } from '../../constants/local-storage/pokemon-local-storage-keys.constants';

interface FavoritesPageProps {}

const FavoritesPage: CustomNextPage<FavoritesPageProps> = () => {
  const { get: getPokemonItem } = useLocalStorage<PokemonLocalStorageMap>();

  const [pokemonFavorites, setpokemonFavorites] = useState<PokemonFavorite[]>(
    []
  );

  useEffect(() => {
    const pokemonFavorites = getPokemonItem(pokemonLocalStorageKeys.FAVORITES);
    if (pokemonFavorites) setpokemonFavorites(() => pokemonFavorites);
  }, [setpokemonFavorites]);

  return pokemonFavorites.length === 0 ? <NoFavoritePokemons /> : null;
};

FavoritesPage.getLayout = (page) => (
  <DefaultLayout title="Pokemons - Favoritos">{page}</DefaultLayout>
);

export default FavoritesPage;
