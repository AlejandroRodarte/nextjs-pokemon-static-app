import React from 'react';

import { DefaultLayout } from '../../../components/layouts';
import { CustomNextPage } from '../../../types/next/custom-next-page.type';

interface PokemonPageProps {}

const PokemonPage: CustomNextPage<PokemonPageProps> = () => {
  return <div>PokemonPage</div>;
};

PokemonPage.getLayout = (page) => (
  <DefaultLayout title="Algun pokemon">{page}</DefaultLayout>
);

export default PokemonPage;
