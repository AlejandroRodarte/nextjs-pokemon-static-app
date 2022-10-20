import React from 'react';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';

import { CustomNextPage } from '../../../types/next/custom-next-page.type';
import { DefaultLayout } from '../../../components/layouts';
import { env } from '../../../config/env.config';
import { mapGetPokemonResponseToPokemonFullInfoData } from '../../../helpers/object-mappers/map-get-pokemon-response-to-pokemon-full-info-data.helper';
import { PokemonDetails } from '../../../components/pokemon';
import { PokemonFullInfoData } from '../../../interfaces/props/pokemon-full-info-data.interface';
import { pokemonService } from '../../../services/server/pokemon.service';
import { usePokemonPageCommonData } from '../../../hooks/use-pokemon-page-common-data';

type PokemonPageUrlQuery = {
  id: string;
};

interface PokemonPageProps {
  pokemon: PokemonFullInfoData;
}

const PokemonPage: CustomNextPage<PokemonPageProps> = (props) => {
  const { pokemon } = props;
  const { favoriteMode, pokemonDetailsOnButtonClick } =
    usePokemonPageCommonData({
      pokemon: {
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.sprites.other.dream_world.front_default,
      },
    });

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
  const [response, error] = await pokemonService.getPokemonByIndex(id);
  if (error || !response) return { notFound: true };

  const pokemon = mapGetPokemonResponseToPokemonFullInfoData(response);

  return {
    props: { pokemon },
  };
};

export default PokemonPage;
