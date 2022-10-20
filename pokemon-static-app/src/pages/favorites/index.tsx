import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { DefaultLayout } from '../../components/layouts';
import { CustomNextPage } from '../../types/next/custom-next-page.type';
import { NoFavoritePokemons } from '../../components/pokemon/NoFavoritePokemons';
import { useLocalStorage } from '../../hooks/use-local-storage.hook';
import { PokemonLocalStorageMap } from '../../types/local-storage/pokemon-local-storage-map.type';
import { PokemonFavorite } from '../../interfaces/local-storage/pokemon-favorite.interface';
import { pokemonLocalStorageKeys } from '../../constants/local-storage/pokemon-local-storage-keys.constants';
import { PokemonGrid, PokemonGridProps } from '../../components/pokemon';

interface FavoritesPageProps {}

const FavoritesPage: CustomNextPage<FavoritesPageProps> = () => {
  const { get: getPokemonItem } = useLocalStorage<PokemonLocalStorageMap>();

  const [pokemonFavorites, setPokemonFavorites] = useState<PokemonFavorite[]>(
    []
  );

  const router = useRouter();
  const { push } = router;

  const pokemonGridOnPokemonCardClick = useCallback<
    PokemonGridProps['onPokemonCardClick']
  >(
    (pokemonId) => {
      push(`/pokemon/${pokemonId}`);
    },
    [push]
  );

  useEffect(() => {
    const pokemonFavorites = getPokemonItem(pokemonLocalStorageKeys.FAVORITES);
    if (pokemonFavorites) setPokemonFavorites(() => pokemonFavorites);
  }, [getPokemonItem, setPokemonFavorites]);

  return pokemonFavorites.length === 0 ? (
    <NoFavoritePokemons />
  ) : (
    <PokemonGrid
      pokemons={pokemonFavorites}
      onPokemonCardClick={pokemonGridOnPokemonCardClick}
    />
  );
};

FavoritesPage.getLayout = (page) => (
  <DefaultLayout title="Pokemons - Favoritos">{page}</DefaultLayout>
);

export default FavoritesPage;
