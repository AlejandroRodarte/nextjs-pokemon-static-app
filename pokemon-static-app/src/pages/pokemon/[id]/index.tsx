import React, { useCallback, useMemo, useState } from 'react';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';

import { DefaultLayout } from '../../../components/layouts';
import { env } from '../../../config/env.config';
import { CustomNextPage } from '../../../types/next/custom-next-page.type';
import { pokemonService } from '../../../services/server/pokemon.service';
import { PokemonFullInfoData } from '../../../interfaces/props/pokemon-full-info-data.interface';
import { PokemonDetails } from '../../../components/pokemon';
import { PokemonDetailsProps } from '../../../components/pokemon/PokemonDetails.component';
import { useLocalStorage } from '../../../hooks/use-local-storage.hook';
import { PokemonLocalStorageMap } from '../../../types/local-storage/pokemon-local-storage-map.type';
import { pokemonLocalStorageKeys } from '../../../constants/local-storage/pokemon-local-storage-keys.constants';
import { PokemonFavorite } from '../../../interfaces/local-storage/pokemon-favorite.interface';
import { FavoriteMode } from '../../../types/pages/favorite-mode.type';
import { IS_SERVER } from '../../../constants/common.constants';

type PokemonPageUrlQuery = {
  id: string;
};

interface PokemonPageProps {
  pokemon: PokemonFullInfoData;
}

const updateFavorites = (
  oldFavorites: PokemonFavorite[],
  newFavorite: PokemonFavorite
): [PokemonFavorite[], FavoriteMode] => {
  const pokemonExists = !!oldFavorites.find((pf) => pf.id === newFavorite.id);
  let newFavorites: PokemonFavorite[];
  let newMode: FavoriteMode;

  if (!pokemonExists) {
    newFavorites = [...oldFavorites, { id: newFavorite.id }];
    newMode = 'delete';
  } else {
    newFavorites = oldFavorites.filter((pf) => pf.id !== newFavorite.id);
    newMode = 'save';
  }

  newFavorites.sort((pf1, pf2) =>
    pf1.id > pf2.id ? 1 : pf2.id < pf1.id ? -1 : 0
  );

  return [newFavorites, newMode];
};

const PokemonPage: CustomNextPage<PokemonPageProps> = (props) => {
  const { pokemon } = props;
  const { id: pokemonId } = pokemon;

  const { get: getPokemonItem, set: setPokemonItem } =
    useLocalStorage<PokemonLocalStorageMap>();

  const isPokemonOnFavorites = useMemo<boolean>(() => {
    if (IS_SERVER) return false;
    const favorites = getPokemonItem(pokemonLocalStorageKeys.FAVORITES);
    if (!favorites) return false;
    return !!favorites.find((pf) => pf.id === pokemonId);
  }, [getPokemonItem, pokemonId]);

  const [favoriteMode, setFavoriteMode] = useState<FavoriteMode>(
    isPokemonOnFavorites ? 'delete' : 'save'
  );

  const pokemonDetailsOnButtonClick = useCallback<
    PokemonDetailsProps['onButtonClick']
  >(() => {
    const newFavorite = { id: pokemonId };
    const oldFavorites = getPokemonItem(pokemonLocalStorageKeys.FAVORITES);

    if (!oldFavorites) {
      setPokemonItem(pokemonLocalStorageKeys.FAVORITES, [newFavorite]);
    } else {
      const [newFavorites, newMode] = updateFavorites(
        oldFavorites,
        newFavorite
      );
      setPokemonItem(pokemonLocalStorageKeys.FAVORITES, newFavorites);
      setFavoriteMode(() => newMode);
    }
  }, [getPokemonItem, setPokemonItem, pokemonId]);

  return (
    <PokemonDetails
      pokemon={pokemon}
      onButtonClick={pokemonDetailsOnButtonClick}
      favoriteMode={favoriteMode}
    />
  );
};

PokemonPage.getLayout = (page) => (
  <DefaultLayout title="Algun pokemon">{page}</DefaultLayout>
);

export const getStaticPaths: GetStaticPaths<PokemonPageUrlQuery> = (
  context
) => {
  const amount = env.server.isDev ? 10 : env.server.pokemon.limit;

  const paths: GetStaticPathsResult<PokemonPageUrlQuery>['paths'] = [
    ...Array(amount),
  ].map((_, i) => ({
    params: {
      id: `${i + 1}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PokemonPageProps,
  PokemonPageUrlQuery
> = async (context) => {
  const { params } = context;
  if (!params) return { notFound: true };

  const { id } = params;
  const [response, error] = await pokemonService.getPokemon(id);
  if (error || !response) return { notFound: true };

  const pokemon: PokemonFullInfoData = {
    id: response.id,
    name: response.name,
    sprites: {
      back_default: response.sprites.back_default,
      back_shiny: response.sprites.back_shiny,
      front_default: response.sprites.front_default,
      front_shiny: response.sprites.front_shiny,
      other: {
        dream_world: {
          front_default: response.sprites.other?.dream_world.front_default,
        },
      },
    },
  };

  return {
    props: { pokemon },
  };
};

export default PokemonPage;
