import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import React from 'react';

import { DefaultLayout } from '../../../components/layouts';
import { env } from '../../../config/env.config';
import { CustomNextPage } from '../../../types/next/custom-next-page.type';
import { pokemonService } from '../../../services/server/pokemon.service';
import { PokemonFullInfoData } from '../../../interfaces/props/pokemon-full-info-data.interface';

type PokemonPageUrlQuery = {
  id: string;
};

interface PokemonPageProps {
  pokemon: PokemonFullInfoData;
}

const PokemonPage: CustomNextPage<PokemonPageProps> = (props) => {
  const { pokemon } = props;
  return <div>PokemonPage</div>;
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

  return {
    props: { pokemon: {} },
  };
};

export default PokemonPage;
