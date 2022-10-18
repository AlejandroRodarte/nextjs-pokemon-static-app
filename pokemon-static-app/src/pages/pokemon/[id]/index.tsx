import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

import { DefaultLayout } from '../../../components/layouts';
import { CustomNextPage } from '../../../types/next/custom-next-page.type';

type PokemonPageUrlQuery = {
  id: string;
};

interface PokemonPageProps {
  id: number;
  name: string;
}

const PokemonPage: CustomNextPage<PokemonPageProps> = () => {
  return <div>PokemonPage</div>;
};

PokemonPage.getLayout = (page) => (
  <DefaultLayout title="Algun pokemon">{page}</DefaultLayout>
);

export const getStaticPaths: GetStaticPaths<PokemonPageUrlQuery> = (
  context
) => {
  return {
    paths: [
      {
        params: {
          id: '1',
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PokemonPageProps> = (context) => {
  return {
    props: {
      id: 1,
      name: 'Bulbasaur',
    },
  };
};

export default PokemonPage;
