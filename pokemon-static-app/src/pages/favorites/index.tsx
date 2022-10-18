import React from 'react';

import { DefaultLayout } from '../../components/layouts';
import { CustomNextPage } from '../../types/next/custom-next-page.type';

interface FavoritesPageProps {}

const FavoritesPage: CustomNextPage<FavoritesPageProps> = () => {
  return <div>FavoritesPage</div>;
};

FavoritesPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default FavoritesPage;
